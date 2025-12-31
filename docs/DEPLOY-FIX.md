# 🚨 GitHub Pages デプロイエラーの修正

## エラーの原因

GitHub Actionsに`gh-pages`ブランチへの書き込み権限がありません。

## ✅ 解決方法（推奨）

GitHub Actionsを使わずに、mainブランチから直接デプロイします。

### ステップ1: GitHub Actionsファイルを削除

`.github/workflows/deploy.yml` を削除してください：

```bash
rm -rf .github
git add .
git commit -m "Remove GitHub Actions workflow"
git push
```

### ステップ2: GitHub Pagesを設定

1. GitHubのリポジトリページを開く
2. **Settings** タブをクリック
3. 左サイドバーの **Pages** をクリック
4. **Source** セクションで：
   - **Deploy from a branch** を選択
   - **Branch**: `main` を選択
   - **Folder**: `/ (root)` を選択
5. **Save** をクリック

### ステップ3: 確認

数分待ってから、以下のURLにアクセス：
```
https://lifeonfloor.github.io/MicrobiologyTree/
```

---

## 🔧 別の解決方法（GitHub Actionsを使い続ける場合）

### 方法A: Workflow permissionsを変更

1. GitHubのリポジトリページを開く
2. **Settings** タブをクリック
3. 左サイドバーの **Actions** → **General** をクリック
4. 一番下の **Workflow permissions** セクションで：
   - ✅ **Read and write permissions** を選択
   - ✅ **Allow GitHub Actions to create and approve pull requests** にチェック
5. **Save** をクリック
6. 再度 Actions を実行（またはコミットをプッシュ）

### 方法B: GitHub Pagesの設定を変更

1. GitHubのリポジトリページを開く
2. **Settings** → **Pages**
3. **Source** で：
   - **GitHub Actions** を選択（Deploy from a branch ではなく）
4. **Save** をクリック

この場合、`.github/workflows/deploy.yml` を以下に置き換える必要があります：

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches:
      - main

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
      - name: Checkout
        uses: actions/checkout@v3
      
      - name: Setup Pages
        uses: actions/configure-pages@v3
      
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v2
        with:
          path: '.'
      
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v2
```

---

## 📝 まとめ

**推奨**: 方法1（GitHub Actionsを削除）が最もシンプルです。

静的サイトなので、mainブランチから直接デプロイするだけで十分です。
GitHub Actionsは、ビルドステップが必要な場合にのみ使用してください。

## ✅ 確認方法

デプロイが成功したら：

1. https://lifeonfloor.github.io/MicrobiologyTree/ にアクセス
2. ツリーが正しく表示されることを確認
3. 各ボタン（リセット、ヘルプ）が動作することを確認
4. モバイルでも確認
