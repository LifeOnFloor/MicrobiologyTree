# コントリビューションガイド

Microbiology Tree プロジェクトへのコントリビューションに興味を持っていただき、ありがとうございます！

## 🌟 コントリビューションの方法

### バグ報告

バグを発見した場合：

1. [Issues](https://github.com/LifeOnFloor/microbiology-tree/issues) で既存の報告を確認
2. 新しいissueを作成し、以下を含める：
   - バグの詳細な説明
   - 再現手順
   - 期待される動作
   - 実際の動作
   - スクリーンショット（可能であれば）
   - ブラウザとOSの情報

### 機能提案

新機能のアイデアがある場合：

1. [Issues](https://github.com/LifeOnFloor/microbiology-tree/issues) で提案を検索
2. Feature Request として新しいissueを作成
3. 以下を含める：
   - 機能の説明
   - 使用例
   - なぜその機能が有用か

### プルリクエスト

コードでコントリビューションする場合：

1. **リポジトリをフォーク**

2. **ブランチを作成**
   ```bash
   git checkout -b feature/your-feature-name
   # または
   git checkout -b fix/your-bug-fix
   ```

3. **変更を加える**
   - コードスタイルガイドに従う（下記参照）
   - 適切なコメントを追加
   - 必要に応じてドキュメントを更新

4. **コミット**
   ```bash
   git commit -m "Add: 新機能の説明" 
   # または
   git commit -m "Fix: バグ修正の説明"
   ```

5. **プッシュ**
   ```bash
   git push origin feature/your-feature-name
   ```

6. **プルリクエストを作成**
   - 変更内容の詳細な説明を記入
   - 関連するissueがあれば参照

## 📝 コードスタイルガイド

### JavaScript

- ES6+の構文を使用
- クラスベースの設計を維持
- 変数名は camelCase
- クラス名は PascalCase
- 適切なコメントを追加（日本語または英語）

```javascript
// Good
class DataManagement {
    constructor(constants) {
        this.constants = constants;
    }
    
    // データを折りたたむ
    collapse(d) {
        // 実装
    }
}

// Bad
class data_management {
    constructor(c) {
        this.c = c
    }
}
```

### CSS

- BEM命名規則を推奨
- モバイルファーストのアプローチ
- レスポンシブデザインを考慮

```css
/* Good */
.node-circle {
    fill: #f0f0f0;
}

.detail-card__header {
    font-size: 1.2em;
}

/* Bad */
.nc {
    fill: #f0f0f0;
}
```

### HTML

- セマンティックなHTMLを使用
- アクセシビリティを考慮
- 適切なインデント

## 🧪 テスト

- 変更後、すべての表示形式（circle, vertical, toggle）で動作確認
- 複数のブラウザでテスト（Chrome, Firefox, Safari）
- モバイルデバイスでの動作確認

## 📚 データの追加・修正

`src/data/microorganisms.json` にデータを追加する場合：

```json
{
    "id": "M##",
    "common_name": "微生物名",
    "scientific_name": "Scientific name",
    "class": ["分類1", "分類2"],
    "metabolism": "代謝タイプ",
    "medium": "培地情報",
    "resistance": ["耐性1", "耐性2"],
    "normal_flora": "常在菌の情報"
}
```

データ追加後、`transform_data.py` を実行：

```bash
python src/utils/transform_data.py
```

## ✅ プルリクエストのチェックリスト

- [ ] コードがスタイルガイドに従っている
- [ ] 適切なコメントが追加されている
- [ ] 3つの表示形式すべてで動作確認した
- [ ] モバイルでの動作確認をした
- [ ] ドキュメントを更新した（必要な場合）
- [ ] 関連するissueを参照した

## 🙏 行動規範

- 建設的なフィードバックを提供する
- 他のコントリビューターを尊重する
- オープンで友好的なコミュニケーション
- 多様性を尊重する

## 💡 アイデア募集中

以下のような改善アイデアを募集しています：

- 新しい微生物データの追加
- UI/UXの改善
- パフォーマンスの最適化
- 新しい可視化形式
- アクセシビリティの向上
- 国際化（多言語対応）
- 検索・フィルタリング機能

## 📧 質問

質問がある場合は、[Issues](https://github.com/LifeOnFloor/microbiology-tree/issues) で気軽に聞いてください！

---

あなたのコントリビューションに感謝します！ 🎉
