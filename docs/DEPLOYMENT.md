# GitHub公開とデプロイガイド

このドキュメントでは、Microbiology TreeプロジェクトをGitHubに公開し、GitHub Pagesでホスティングする手順を説明します。

## 📋 前提条件

- GitHubアカウント
- Gitがインストールされていること
- プロジェクトファイルがローカルにあること

## 🚀 GitHubへの公開手順

### 1. GitHubでリポジトリを作成

1. [GitHub](https://github.com)にログイン
2. 右上の「+」→「New repository」をクリック
3. リポジトリ設定:
   - **Repository name**: `microbiology-tree`
   - **Description**: `Interactive visualization tool for microbiology classification using D3.js`
   - **Public** を選択
   - `Initialize this repository with a README` は**チェックしない**
4. 「Create repository」をクリック

### 2. ローカルリポジトリの初期化

```bash
# プロジェクトディレクトリに移動
cd microbiology-tree

# Gitリポジトリを初期化
git init

# ファイルをステージング
git add .

# 初回コミット
git commit -m "Initial commit: Microbiology Tree visualization tool"

# リモートリポジトリを追加（LifeOnFloorを自分のGitHubユーザー名に置き換え）
git remote add origin https://github.com/LifeOnFloor/microbiology-tree.git

# メインブランチにプッシュ
git branch -M main
git push -u origin main
```

## 🌐 GitHub Pagesでの公開

### 方法1: 設定からの有効化（推奨）

1. GitHubのリポジトリページで「Settings」タブをクリック
2. 左サイドバーの「Pages」をクリック
3. Source セクションで:
   - **Branch**: `main`
   - **Folder**: `/ (root)`
4. 「Save」をクリック
5. 数分後、`https://LifeOnFloor.github.io/microbiology-tree/` でアクセス可能

### 方法2: GitHub Actions（自動デプロイ）

プロジェクトにはすでに `.github/workflows/deploy.yml` が含まれているので、
main ブランチにプッシュすると自動的にデプロイされます。

## 📝 README.mdの更新

公開後、以下の箇所を更新してください:

1. **LifeOnFloor** を自分のGitHubユーザー名に置き換え
2. **LifeOnFloor** を自分の名前に置き換え（LICENSE, package.json, index.htmlなど）
3. デモのスクリーンショットを追加:
   ```bash
   # スクリーンショットを撮影し、docs/imagesに保存
   # README.mdの画像パスを確認
   ```

## 🔧 カスタマイズ

### 表示形式の変更

`index.html` の以下の部分を編集:

```html
<!-- サークル形式 -->
<script src="src/visualizations/script_circle.js"></script>

<!-- 水平ツリー形式に変更する場合 -->
<!-- <script src="src/visualizations/script_vertical.js"></script> -->
```

### データの追加

1. `src/data/microorganisms.json` にデータを追加
2. `python src/utils/transform_data.py` を実行
3. 変更をコミット＆プッシュ

## 🐛 トラブルシューティング

### GitHub Pagesが表示されない

- 数分待ってから再度アクセス
- リポジトリが Public になっているか確認
- Settings > Pages で正しく設定されているか確認

### D3.jsが読み込めない

- ブラウザの開発者ツールでエラーを確認
- インターネット接続を確認（D3.jsはCDNから読み込まれます）

### データが表示されない

- `src/data/hierarchical_microorganisms.js` が正しく生成されているか確認
- ブラウザのコンソールでエラーメッセージを確認

## 📊 アクセス統計の追加（オプション）

Google Analyticsを追加する場合:

1. Google Analyticsでプロパティを作成
2. `index.html` の `<head>` にトラッキングコードを追加

## 🔄 更新とメンテナンス

### コードの更新

```bash
# 変更を加える
git add .
git commit -m "説明メッセージ"
git push origin main
```

### バージョン管理

```bash
# タグを作成
git tag -a v1.0.0 -m "Version 1.0.0"
git push origin v1.0.0
```

## 📧 サポート

問題が発生した場合:

1. [Issues](https://github.com/LifeOnFloor/microbiology-tree/issues) で既存の問題を検索
2. 新しいissueを作成
3. できるだけ詳細な情報を提供（エラーメッセージ、スクリーンショットなど）

## 🎉 完了！

これで、あなたのMicrobiology Treeプロジェクトが世界中に公開されました！

次のステップ:
- [ ] README.mdのリンクを更新
- [ ] スクリーンショットを追加
- [ ] データを完成させる
- [ ] SNSでシェア

---

**参考リンク:**
- [GitHub Pages ドキュメント](https://docs.github.com/ja/pages)
- [Git入門](https://git-scm.com/book/ja/v2)
