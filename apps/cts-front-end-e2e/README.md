# Cts Front End E2E

## 前置作業

```shell
# 有開資料庫的前提, 手動起後端
pnpm exec nx serve cts-back-end
```

## headless 模式

```shell
pnpm exec nx pw cts-front-end-e2e
```

## playwright 介面執行

```shell
pnpm exec nx pw:op cts-front-end-e2e
```

## CI 環境下執行

```shell
pnpm exec nx pw:ci cts-front-end-e2e
```

## 查看報告

> 已經跑完測試以後，有產出報告檔才能看

```shell
pnpm exec nx pw:report cts-front-end-e2e
```

## Codegen 模式

```shell
pnpm exec nx pw:codegen cts-front-end-e2e
```
