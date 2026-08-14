# GitHub Actions で `jf audit --sast` を実行する

このプロジェクトを GitHub にプッシュして、Actions 上で **JFrog SAST (JAS)** だけを回すための手順です。
ワークフロー定義は [`.github/workflows/jf-audit.yml`](.github/workflows/jf-audit.yml) にあります。

> SAST はソースコードの静的解析のみで完結するため、**Node.js / npm のセットアップは不要**です。
> `npm install` も走らせません。SCA / Secrets も同時に回したい場合は末尾のセクション 9 を参照。

---

## 1. 前提

- JFrog Platform (SaaS または Self-Hosted) のアカウントがあること
- **Advanced Security (JAS)** が有効なライセンスであること
- リポジトリを GitHub にプッシュしていること

---

## 2. GitHub Secrets の登録

リポジトリの **Settings → Secrets and variables → Actions → New repository secret** で以下を登録します。

| Secret 名 | 値 | 例 |
|---|---|---|
| `JF_URL` | JFrog Platform の URL(末尾スラッシュなし) | `https://mycompany.jfrog.io` |
| `JF_ACCESS_TOKEN` | Identity Token / Access Token | `eyJ2ZXIiOiIy...` |

### Access Token の作り方
1. JFrog Platform にログイン
2. 右上のアバター → **Edit Profile** → **Generate an Identity Token**
3. 生成された文字列を `JF_ACCESS_TOKEN` に登録

### (推奨) OIDC で認証する場合
Access Token を Secret に持たなくて済みます。

1. JFrog Platform 側で GitHub OIDC Integration を作成
2. `setup-jfrog-cli` ステップで以下を有効化し `JF_ACCESS_TOKEN` env を削除
   ```yaml
   with:
     oidc-provider-name: my-github-oidc
     oidc-audience: jfrog-github
   ```

---

## 3. ワークフローの動き

1. **Checkout** — リポジトリを取得
2. **Setup JFrog CLI** — `jf` コマンドを利用可能に
3. **jf rt ping** — 接続確認
4. **jf audit --sast** — SAST のみを実行し `jf-audit.sarif` を出力
5. **Upload SARIF to Code Scanning** — GitHub の **Security → Code scanning** に取り込み
6. **Upload SARIF as artifact** — Actions の Artifact としても保存 (14 日間)

---

## 4. 結果の確認

- **Code Scanning**: リポジトリの **Security → Code scanning** に `jfrog-sast` カテゴリで表示
- **Artifact**: Actions のジョブ画面から `jf-audit-sarif` をダウンロード

---

## 5. あとで SCA / Secrets も足したくなったら

Node.js のセットアップと `npm install` が必要になります。SAST の前に以下を挿入:

```yaml
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'

      - name: Install dependencies
        run: npm install --ignore-scripts
```

そして `jf audit` の引数に `--secrets` などを追加してください。
