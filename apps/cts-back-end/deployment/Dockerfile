from node:20.17.0-alpine

run ls

workdir /workspace

# copy package.json pnpm-lock.yaml prisma init.sql ./
copy . .

run npm install -g pnpm@8.15.3
run pnpm add tslib
run pnpm install

# copy . .

run apk add --no-cache netcat-openbsd
run apk add --no-cache postgresql-client

run  pnpm dlx prisma generate

# CMD ["node", "main.js"]
