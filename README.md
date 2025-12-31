# 🦠 Microbiology Tree - 微生物分類の可視化ツール

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![D3.js](https://img.shields.io/badge/D3.js-v7-orange.svg)](https://d3js.org/)

微生物の分類を階層構造で視覚化する、インタラクティブなWebアプリケーションです。医学・生物学の学習ツールとして、微生物の分類を直感的に理解できます。

![Demo Screenshot](docs/images/demo-circle.png)

## ✨ 特徴

- 🎨 **3種類の表示形式**
  - サークル形式（放射状ツリー）
  - 水平ツリー形式
  - 折りたたみ可能ツリー
  - **画面上のボタンでリアルタイム切り替え可能！**

- 🖱️ **インタラクティブな操作**
  - ノードのクリックで展開/折りたたみ
  - 詳細情報の表示
  - ズーム＆パン
  - ハイライト機能

- 📱 **レスポンシブデザイン**
  - デスクトップ、タブレット、スマートフォンに対応
  - タッチ操作サポート

- 💾 **設定の保存**
  - 選択した表示形式を自動保存
  - 次回訪問時に前回の設定で表示

- 🔬 **豊富な微生物データ**
  - グラム陽性菌・陰性菌
  - 球菌・桿菌
  - 薬剤耐性情報
  - 疾患情報

## 🚀 デモ

[**ライブデモを見る**](https://your-username.github.io/microbiology-tree/)

## 📦 インストール

### 方法1: 直接使用（最も簡単）

```bash
git clone https://github.com/your-username/microbiology-tree.git
cd microbiology-tree
```

任意のローカルサーバーで`index.html`を開いてください：

```bash
# Python 3の場合
python -m http.server 8000

# Node.jsのhttp-serverの場合
npx http-server
```

ブラウザで `http://localhost:8000` を開きます。

### 方法2: 開発環境のセットアップ

```bash
git clone https://github.com/your-username/microbiology-tree.git
cd microbiology-tree
npm install
npm run dev
```

## 🎮 使い方

### 基本操作

| 操作 | 説明 |
|------|------|
| **表示形式ボタン** | サークル/水平/折りたたみ形式を切り替え |
| **ノードの円をクリック** | 子ノードの展開/折りたたみ |
| **テキストをクリック** | 詳細情報カードを表示 |
| **右クリック（PC）** | テキストをハイライト |
| **長押し（スマホ）** | テキストをハイライト |
| **マウスホイール** | ズームイン/アウト |
| **ドラッグ** | グラフの移動 |
| **リセットボタン** | ズームと位置をリセット |
| **ヘルプボタン** | 使い方を表示 |

### 表示形式の切り替え

画面上部の3つのボタンで表示形式を切り替えられます：

- **⭕ サークル**: 放射状のツリー表示（美しく全体像を把握）
- **➡️ 水平**: 左から右へ展開（詳細な階層構造を確認）
- **📋 折りたたみ**: ノードをクリックして自由に展開/折りたたみ

選択した表示形式は自動的に保存され、次回訪問時も同じ形式で表示されます。

## 📁 プロジェクト構造

```
microbiology-tree/
├── index.html                  # メインHTMLファイル
├── style.css                   # スタイルシート
├── src/
│   ├── data/
│   │   ├── microorganisms.json           # 微生物データ（JSON）
│   │   └── hierarchical_microorganisms.js # 階層構造データ
│   ├── visualizations/
│   │   ├── script_circle.js    # サークル形式
│   │   ├── script_vertical.js  # 水平ツリー形式
│   │   └── script_toggle.js    # 折りたたみ形式
│   └── utils/
│       └── transform_data.py   # データ変換スクリプト
├── docs/                       # ドキュメント・画像
├── LICENSE                     # ライセンス
├── package.json               # npm設定
└── README.md                  # このファイル
```

## 🛠️ 技術スタック

- **D3.js v7** - データビジュアライゼーション
- **Vanilla JavaScript (ES6+)** - フロントエンド
- **CSS3** - スタイリング
- **Python 3** - データ変換

## 🤝 コントリビューション

コントリビューションを歓迎します！

1. このリポジトリをフォーク
2. フィーチャーブランチを作成 (`git checkout -b feature/amazing-feature`)
3. 変更をコミット (`git commit -m 'Add some amazing feature'`)
4. ブランチにプッシュ (`git push origin feature/amazing-feature`)
5. プルリクエストを作成

詳細は [CONTRIBUTING.md](CONTRIBUTING.md) をご覧ください。

## 📝 ライセンス

このプロジェクトは MIT ライセンスのもとで公開されています。詳細は [LICENSE](LICENSE) をご覧ください。

## 🙏 謝辞

- [D3.js](https://d3js.org/) - 素晴らしいビジュアライゼーションライブラリ
- 医学・生物学コミュニティ

## 📧 お問い合わせ

プロジェクトに関する質問や提案がありましたら、[Issues](https://github.com/your-username/microbiology-tree/issues) でお知らせください。

## 🔗 関連リンク

- [D3.js ドキュメント](https://d3js.org/)
- [微生物学の基礎](https://example.com)

---

⭐ このプロジェクトが役に立ったら、スターをつけていただけると嬉しいです！
