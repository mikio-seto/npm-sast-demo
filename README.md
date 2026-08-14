# npm-sast-test

`jf audit` の **SAST (JAS)** を Node.js / npm プロジェクトで検証するためのテストプロジェクトです。
意図的に脆弱なコードを含んでいます。**本番環境では絶対に動かさないでください。**

## 含まれる脆弱性

| ファイル | 種別 | CWE |
|---|---|---|
| [src/sql-injection.js](src/sql-injection.js) | SQL Injection (concat / template literal) | CWE-89 |
| [src/command-injection.js](src/command-injection.js) | OS Command Injection (`exec` / `execSync`) | CWE-78 |
| [src/xss.js](src/xss.js) | Reflected XSS (`res.send` / `res.write`) | CWE-79 |
| [src/path-traversal.js](src/path-traversal.js) | Path Traversal (`fs.readFile`) | CWE-22 |
| [src/ssrf.js](src/ssrf.js) | SSRF (`axios.get` / `http.get`) | CWE-918 |
| [src/code-injection.js](src/code-injection.js) | Code Injection (`eval` / `Function` / `setTimeout` string) | CWE-94/95 |
| [src/nosql-injection.js](src/nosql-injection.js) | NoSQL Injection (Mongo `$where`) | CWE-943 |
| [src/weak-crypto.js](src/weak-crypto.js) | Weak crypto (MD5 / SHA1 / DES-ECB / `Math.random`) | CWE-327/328/338 |
| [src/hardcoded-secrets.js](src/hardcoded-secrets.js) | Hardcoded credentials & API keys | CWE-798 |
| [src/open-redirect.js](src/open-redirect.js) | Open Redirect | CWE-601 |
| [src/prototype-pollution.js](src/prototype-pollution.js) | Prototype Pollution (`_.merge`) | CWE-1321 |
| [src/regex-dos.js](src/regex-dos.js) | ReDoS | CWE-1333 |
| [package.json](package.json) | 古い依存関係 (SCA 側の検出用) | — |

## セットアップ

```bash
cd npm-sast-test && npm install
```

> SAST だけなら `npm install` すら不要です。ソース静的解析のみで完結します。

## 実行 — SAST 単体

```bash
cd npm-sast-test && jf audit --sast
```

## 実行 — SCA + SAST + Secrets

```bash
cd npm-sast-test && jf audit --sast --secrets
```

## SARIF 出力

```bash
cd npm-sast-test && jf audit --sast --format=sarif > sast.sarif
```

## GitHub Actions で回す

`.github/workflows/jf-audit.yml` を同梱しています。
セットアップ手順と Secrets の登録方法は [README.github-actions.md](README.github-actions.md) を参照してください。

## 期待される検出

`jf audit --sast` を実行すると、少なくとも以下の CWE カテゴリが検出されるはずです。

- CWE-89 (SQL Injection)
- CWE-78 (OS Command Injection)
- CWE-79 (XSS)
- CWE-22 (Path Traversal)
- CWE-918 (SSRF)
- CWE-94 / CWE-95 (Code Injection / `eval` / `Function`)
- CWE-943 (NoSQL Injection)
- CWE-327 / CWE-328 / CWE-338 (Weak Crypto / Weak RNG)
- CWE-798 (Hardcoded Credentials) — Secrets scanner でも検出
- CWE-601 (Open Redirect)
- CWE-1321 (Prototype Pollution)
- CWE-1333 (ReDoS)
