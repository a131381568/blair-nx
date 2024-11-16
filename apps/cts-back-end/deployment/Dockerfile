from node:20.17.0-alpine

workdir /workspace

RUN apk add --no-cache curl
run apk add --no-cache netcat-openbsd
run apk add --no-cache postgresql-client

run npm install -g pnpm@8.15.3
run pnpm add tslib
run pnpm install --frozen-lockfile

copy . .

HEALTHCHECK --interval=15s --timeout=10s --start-period=30s --retries=3 \
    CMD curl -f http://localhost:3000/api/health || exit 1

ENV NODE_ENV=production
ENV PORT=3000

EXPOSE 3000

run  pnpm dlx prisma generate

CMD ["node", "main.js"]
