"""
transform_data.py
microorganisms.jsonをhierarchical_microorganisms.jsに変換するスクリプト

使用方法:
    python src/utils/transform_data.py
"""

import json
import os

def main():
    # ファイルパスの設定
    input_file = 'src/data/microorganisms.json'
    output_file = 'src/data/hierarchical_microorganisms.js'
    
    # データの読み込み
    try:
        with open(input_file, 'r', encoding='utf-8') as f:
            data = json.load(f)
    except FileNotFoundError:
        print(f"エラー: {input_file} が見つかりません")
        return
    except json.JSONDecodeError:
        print(f"エラー: {input_file} のJSON形式が不正です")
        return
    
    # 階層構造の初期化
    hierarchical_data = {
        'name': '細菌',
        'default_expand': True,
        'detail': {
            'encodeHTML': False,
            'text': '重要な細菌のまとめ'
        },
        'children': []
    }
    
    # カテゴリの定義
    categories = {
        'グラム陽性': {'color': '#6d7af1', 'children': []},
        'グラム陰性': {'color': '#f16d6d', 'children': []}
    }
    
    # データの変換処理
    # ここでは簡略化した実装例を示します
    # 実際のプロジェクトに合わせて拡張してください
    
    for item in data:
        # item['class']を解析して階層構造を構築
        # この部分は実際のデータ構造に応じてカスタマイズが必要です
        pass
    
    # JavaScriptファイルとして出力
    try:
        with open(output_file, 'w', encoding='utf-8') as f:
            f.write('const BACTERIA = ')
            f.write(json.dumps(hierarchical_data, indent=4, ensure_ascii=False))
            f.write(';\n\nconst rawData = BACTERIA;\n')
        print(f"✓ {output_file} の生成に成功しました")
    except Exception as e:
        print(f"エラー: ファイルの書き込みに失敗しました - {e}")

if __name__ == '__main__':
    main()
