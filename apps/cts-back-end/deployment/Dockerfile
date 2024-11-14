from node:20.17.0-alpine

workdir /workspace

copy package.json pnpm-lock.yaml prisma init.sql ./

run npm install -g pnpm@8.15.3
run pnpm add tslib
run pnpm install

copy . .

run apk add --no-cache netcat-openbsd
run apk add --no-cache postgresql-client

run  pnpm dlx prisma generate

run ls

CMD ["node", "main.js"]
