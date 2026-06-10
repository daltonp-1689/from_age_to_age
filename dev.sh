#!/bin/sh
# Downloads Node if missing from /tmp, then starts the Vite dev server
NODE_DIR=/tmp/node-v22.14.0-darwin-arm64
if [ ! -f "$NODE_DIR/bin/npm" ]; then
  echo "Downloading Node.js..."
  curl -fsSL https://nodejs.org/dist/v22.14.0/node-v22.14.0-darwin-arm64.tar.gz -o /tmp/node.tar.gz
  tar -xzf /tmp/node.tar.gz -C /tmp/
fi
export PATH="$NODE_DIR/bin:$PATH"
npm install --silent
exec npx vite "$@"
