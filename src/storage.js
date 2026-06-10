import { supabase } from './supabase.js'

const LOCAL_KEY = 'fromagetoage_v1'
let _userId = null

export function setUserId(uid) {
  _userId = uid
}

export async function loadState(userId) {
  _userId = userId
  try {
    const [{ data: progress, error: pe }, { data: lessons, error: le }] = await Promise.all([
      supabase.from('user_progress').select('*').eq('id', userId).single(),
      supabase.from('lesson_progress').select('*').eq('user_id', userId),
    ])

    if (!pe && progress) {
      const S = {
        xp: progress.xp,
        level: progress.level,
        streak: progress.streak,
        lastStudied: progress.last_studied,
        tracks: {},
      }

      for (const lp of (lessons || [])) {
        if (!S.tracks[lp.track_id]) S.tracks[lp.track_id] = { lessons: {} }
        S.tracks[lp.track_id].lessons[lp.lesson_id] = lp.stars
        if (lp.read_complete) S.tracks[lp.track_id][`read_${lp.lesson_id}`] = true
        if (lp.learn_tier > 0) S.tracks[lp.track_id][`learn_tier_${lp.lesson_id}`] = lp.learn_tier
        if (lp.learn_tier >= 3) S.tracks[lp.track_id][`learn_${lp.lesson_id}`] = true
        if (lp.study_complete) S.tracks[lp.track_id][`study_${lp.lesson_id}`] = true
      }

      // Fetch best exam result per track
      const { data: exams } = await supabase
        .from('exam_results')
        .select('*')
        .eq('user_id', userId)
        .order('stars', { ascending: false })

      const bestExam = {}
      for (const ex of (exams || [])) {
        if (!bestExam[ex.track_id] || ex.stars > bestExam[ex.track_id].stars) {
          bestExam[ex.track_id] = ex
        }
      }
      for (const [trackId, ex] of Object.entries(bestExam)) {
        if (!S.tracks[trackId]) S.tracks[trackId] = { lessons: {} }
        S.tracks[trackId].exam = { passed: ex.passed, score: ex.score, stars: ex.stars, takenAt: ex.taken_at }
      }

      if (!S.tracks.track1) S.tracks.track1 = { lessons: { l1: 0, l2: 0, l3: 0, l4: 0 } }

      try { localStorage.setItem(LOCAL_KEY, JSON.stringify(S)) } catch (e) {}
      return S
    }
  } catch (e) {
    console.warn('Supabase load failed, using local cache', e)
  }

  try {
    const s = localStorage.getItem(LOCAL_KEY)
    if (s) return JSON.parse(s)
  } catch (e) {}

  return { xp: 0, level: 1, streak: 0, lastStudied: null, tracks: { track1: { lessons: { l1: 0, l2: 0, l3: 0, l4: 0 } } } }
}

export function saveState(S) {
  try { localStorage.setItem(LOCAL_KEY, JSON.stringify(S)) } catch (e) {}
  if (!_userId) return
  _syncToSupabase(S)
}

async function _syncToSupabase(S) {
  try {
    await supabase.from('user_progress').upsert({
      id: _userId,
      xp: S.xp,
      level: S.level,
      streak: S.streak,
      last_studied: S.lastStudied,
      updated_at: new Date().toISOString(),
    })

    const rows = []
    for (const [trackId, track] of Object.entries(S.tracks || {})) {
      for (const [lessonId, stars] of Object.entries(track.lessons || {})) {
        rows.push({
          user_id: _userId,
          track_id: trackId,
          lesson_id: lessonId,
          stars: stars || 0,
          read_complete: !!track[`read_${lessonId}`],
          learn_tier: track[`learn_tier_${lessonId}`] || 0,
          study_complete: !!track[`study_${lessonId}`],
          updated_at: new Date().toISOString(),
        })
      }
    }
    if (rows.length > 0) {
      await supabase.from('lesson_progress').upsert(rows, { onConflict: 'user_id,track_id,lesson_id' })
    }
  } catch (e) {
    console.warn('Supabase sync failed', e)
  }
}

export async function logExamResult(trackId, { passed, score, stars }) {
  if (!_userId) return
  try {
    await supabase.from('exam_results').insert({
      user_id: _userId,
      track_id: trackId,
      passed,
      score,
      stars,
      taken_at: new Date().toISOString(),
    })
  } catch (e) {
    console.warn('Failed to log exam result', e)
  }
}
