import { supabase } from './supabase.js'

export async function initAuth(onSuccess) {
  const { data: { session } } = await supabase.auth.getSession()
  if (session) {
    onSuccess(session.user)
    return
  }

  _renderOverlay()

  supabase.auth.onAuthStateChange((_event, session) => {
    if (session) {
      _removeOverlay()
      onSuccess(session.user)
    }
  })
}

function _removeOverlay() {
  document.getElementById('auth-overlay')?.remove()
}

function _renderOverlay() {
  const el = document.createElement('div')
  el.id = 'auth-overlay'
  el.innerHTML = `
    <div class="auth-box">
      <div class="auth-brand">From <em>Age</em> to Age</div>
      <div class="auth-brand-sub">Church History</div>
      <div class="auth-tabs">
        <button class="auth-tab active" data-tab="signin">Sign in</button>
        <button class="auth-tab" data-tab="signup">Create account</button>
      </div>
      <div class="auth-error" id="auth-error"></div>
      <div class="auth-form" id="auth-form-signin">
        <input class="auth-input" id="signin-email" type="email" placeholder="Email" autocomplete="email"/>
        <input class="auth-input" id="signin-password" type="password" placeholder="Password" autocomplete="current-password"/>
        <button class="auth-submit" id="signin-btn">Sign in</button>
      </div>
      <div class="auth-form hidden" id="auth-form-signup">
        <input class="auth-input" id="signup-email" type="email" placeholder="Email" autocomplete="email"/>
        <input class="auth-input" id="signup-password" type="password" placeholder="Password (min 6 chars)" autocomplete="new-password"/>
        <button class="auth-submit" id="signup-btn">Create account</button>
        <p class="auth-note" id="signup-confirm" style="display:none">Check your email to confirm your account.</p>
      </div>
    </div>
  `
  document.body.appendChild(el)

  _injectStyles()
  _bindEvents(el)
}

function _bindEvents(el) {
  const tabs = el.querySelectorAll('.auth-tab')
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'))
      tab.classList.add('active')
      el.querySelectorAll('.auth-form').forEach(f => f.classList.add('hidden'))
      el.querySelector(`#auth-form-${tab.dataset.tab}`).classList.remove('hidden')
      el.querySelector('#auth-error').textContent = ''
    })
  })

  el.querySelector('#signin-btn').addEventListener('click', async () => {
    const email = el.querySelector('#signin-email').value.trim()
    const password = el.querySelector('#signin-password').value
    const errEl = el.querySelector('#auth-error')
    errEl.textContent = ''
    const btn = el.querySelector('#signin-btn')
    btn.disabled = true
    btn.textContent = 'Signing in…'
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) {
      errEl.textContent = error.message
      btn.disabled = false
      btn.textContent = 'Sign in'
    }
  })

  el.querySelector('#signup-btn').addEventListener('click', async () => {
    const email = el.querySelector('#signup-email').value.trim()
    const password = el.querySelector('#signup-password').value
    const errEl = el.querySelector('#auth-error')
    errEl.textContent = ''
    const btn = el.querySelector('#signup-btn')
    btn.disabled = true
    btn.textContent = 'Creating account…'
    const { error } = await supabase.auth.signUp({ email, password })
    if (error) {
      errEl.textContent = error.message
      btn.disabled = false
      btn.textContent = 'Create account'
    } else {
      el.querySelector('#signup-confirm').style.display = 'block'
      btn.textContent = 'Check your email'
    }
  })

  ;[['signin-email', 'signin-btn'], ['signup-email', 'signup-btn']].forEach(([inputId, btnId]) => {
    el.querySelector(`#${inputId}`)?.addEventListener('keydown', e => {
      if (e.key === 'Enter') el.querySelector(`#${btnId}`)?.click()
    })
    el.querySelector(`#${inputId}`)?.nextElementSibling?.addEventListener('keydown', e => {
      if (e.key === 'Enter') el.querySelector(`#${btnId}`)?.click()
    })
  })
}

function _injectStyles() {
  if (document.getElementById('auth-styles')) return
  const s = document.createElement('style')
  s.id = 'auth-styles'
  s.textContent = `
    #auth-overlay{position:fixed;inset:0;background:rgba(250,245,236,0.97);display:flex;align-items:center;justify-content:center;z-index:9999;font-family:'Karla',sans-serif;}
    .auth-box{background:#fff;border:1px solid #f0ebe0;border-radius:12px;padding:36px 32px;width:100%;max-width:360px;box-shadow:0 4px 24px rgba(28,21,16,0.1);}
    .auth-brand{font-family:'Lora',serif;font-size:22px;font-weight:600;color:#1c1510;text-align:center;line-height:1.1;}
    .auth-brand em{font-style:italic;font-weight:400;color:#a07830;}
    .auth-brand-sub{font-size:9px;letter-spacing:0.14em;text-transform:uppercase;color:#b8a888;font-family:'Karla',sans-serif;text-align:center;margin-bottom:24px;margin-top:3px;}
    .auth-tabs{display:flex;gap:0;margin-bottom:20px;border:1px solid #f0ebe0;border-radius:6px;overflow:hidden;}
    .auth-tab{flex:1;padding:9px;border:none;background:#faf5ec;color:#b8a888;font-family:'Karla',sans-serif;font-size:13px;cursor:pointer;transition:all 0.15s;}
    .auth-tab.active{background:#fff;color:#1c1510;font-weight:500;}
    .auth-error{font-size:12px;color:#7a1414;margin-bottom:10px;min-height:16px;text-align:center;}
    .auth-form{display:flex;flex-direction:column;gap:10px;}
    .auth-form.hidden{display:none;}
    .auth-input{padding:11px 13px;border:1px solid #f0ebe0;border-radius:6px;font-family:'Karla',sans-serif;font-size:14px;color:#1c1510;outline:none;transition:border-color 0.15s;}
    .auth-input:focus{border-color:#c4a060;}
    .auth-submit{padding:12px;background:#7a3b10;color:#fff;border:none;border-radius:6px;font-family:'Karla',sans-serif;font-size:14px;font-weight:500;cursor:pointer;transition:background 0.15s;margin-top:4px;}
    .auth-submit:hover{background:#5a2a08;}
    .auth-submit:disabled{opacity:0.6;cursor:not-allowed;}
    .auth-note{font-size:12px;color:#3a6a12;text-align:center;margin-top:4px;}
  `
  document.head.appendChild(s)
}
