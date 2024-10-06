# Cts Back End

- 專案名稱：cts-back-end
- 本機端網址：http://localhost:3000

此為 [catching-the-star-master](https://github.com/a131381568/ctsm-sql) 的後端重構專案

## 本地開發介紹

### 起本地伺服器
```shell
pnpm exec nx serve cts-back-end
```

### 檢查程式碼
```shell
pnpm exec nx lint cts-back-end
```

### Prisma 操作
```shell
pnpm exec nx prisma:m cts-back-end
pnpm exec nx prisma:g cts-back-end
```

# Bruno API 文件

需要讓`.env`放置在`apps/cts-back-end/bruno`下才會生效
