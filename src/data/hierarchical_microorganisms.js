const rawData = {
    "name": "細菌",
    "default_expand": true,
    "detail": {
        "encodeHTML": false,
        "text": "重要な細菌のまとめ"
    },
    "children": [
        {
            "name": "スピロヘータ",
            "default_expand": true,
            "color": "#78f078",
            "detail": {
                "encodeHTML": false,
                "text": "柔軟な細胞壁を持つ"
            },
            "children": [
                {
                    "name": "Borrelia burgdorferi",
                    "default_expand": false,
                    "detail": { "encodeHTML": false, "text": "ライム病の原因菌" },
                    "children": []
                },
                {
                    "name": "Borrelia recurrentis",
                    "default_expand": false,
                    "detail": { "encodeHTML": false, "text": "回帰熱ボレリア" },
                    "children": []
                },
                {
                    "name": "Leptospira interrogans",
                    "default_expand": false,
                    "detail": { "encodeHTML": false, "text": "レプトスピラ症の原因" },
                    "children": []
                },
                {
                    "name": "Treponema pallidum",
                    "default_expand": false,
                    "detail": { "encodeHTML": false, "text": "梅毒トレポネーマ" },
                    "children": []
                }
            ]
        },
        {
            "name": "マイコプラズマ",
            "default_expand": true,
            "color": "#ece57e",
            "detail": {
                "encodeHTML": false,
                "text": "細胞壁なし"
            },
            "children": [
                {
                    "name": "Mycoplasma pneumoniae",
                    "default_expand": true,
                    "detail": { "encodeHTML": false, "text": "マイコプラズマ肺炎の原因" },
                    "children": []
                }
            ]
        },
        {
            "name": "偏性細胞内寄生体",
            "default_expand": true,
            "color": "#eb89ba",
            "detail": {
                "encodeHTML": false,
                "text": "堅固な細胞壁をもつ、単純な単細胞で、偏性細胞内寄生体。"
            },
            "children": [
                {
                    "name": "リケッチア属",
                    "default_expand": true,
                    "detail": { "encodeHTML": false, "text": "リケッチア属" },
                    "children": [
                        {
                            "name": "Rickettsia rickettsii",
                            "default_expand": true,
                            "detail": { "encodeHTML": false, "text": "ロッキー山紅斑熱の原因" },
                            "children": []
                        }
                    ]
                },
                {
                    "name": "クラミジア",
                    "default_expand": true,
                    "detail": { "encodeHTML": false, "text": "クラミジア属" },
                    "children": [
                        {
                            "name": "Chlamydia pneumoniae",
                            "default_expand": true,
                            "detail": { "encodeHTML": false, "text": "肺炎クラミジア" },
                            "children": []
                        },
                        {
                            "name": "Chlamydia psittaci",
                            "default_expand": true,
                            "detail": { "encodeHTML": false, "text": "オウム病クラミジア" },
                            "children": []
                        },
                        {
                            "name": "Chlamydia trachomatis",
                            "default_expand": true,
                            "detail": { "encodeHTML": false, "text": "トラコーマクラミジア（性器クラミジア感染症）" },
                            "children": []
                        }
                    ]
                }
            ]
        },
        {
            "name": "グラム陽性菌",
            "default_expand": true,
            "color": "#6d7af1",
            "detail": {
                "encodeHTML": false,
                "text": "堅固な細胞壁をもつ、単純な単細胞で、自由生活型。"
            },
            "children": [
                {
                    "name": "球菌",
                    "default_expand": true,
                    "detail": { "encodeHTML": false, "text": "球菌" },
                    "children": [
                        {
                            "name": "ブドウ球菌",
                            "default_expand": true,
                            "detail": { "encodeHTML": false, "text": "ブドウ球菌属" },
                            "children": [
                                {
                                    "name": "Staphylococcus aureus",
                                    "default_expand": false,
                                    "detail": {
                                        "encodeHTML": true,
                                        "text": `<div style='font-size:1.1em; font-weight:bold; color:#333; margin-bottom:5px;'>黄色ブドウ球菌</div>
                                        <span style='color:#00796b; font-weight:bold;'>学術名</span>: <i>Staphylococcus aureus</i><br>
                                        <span style='color:#00796b; font-weight:bold;'>分類</span>: 細菌.グラム陽性.球菌.カタラーゼ陽性.コアグラーゼ陽性<br>
                                        <span style='color:#00796b; font-weight:bold;'>培地</span>: マンニトール食塩寒天培地（黄色コロニー）<br>
                                        <span style='color:#00796b; font-weight:bold;'>代謝</span>: 通性嫌気性<br>
                                        <span style='color:#00796b; font-weight:bold;'>薬剤耐性</span>: メチシリン(MRSA), バンコマイシン(VRSA)<br>
                                        <span style='color:#00796b; font-weight:bold;'>毒素</span>: コアグラーゼ, エンテロトキシン, TSST-1, 表皮剥脱毒素`
                                    },
                                    "children": []
                                },
                                {
                                    "name": "Staphylococcus epidermidis",
                                    "default_expand": false,
                                    "detail": {
                                        "encodeHTML": true,
                                        "text": `<div style='font-size:1.1em; font-weight:bold; color:#333; margin-bottom:5px;'>表皮ブドウ球菌 (CNS)</div>
                                        <span style='color:#00796b; font-weight:bold;'>学術名</span>: <i>Staphylococcus epidermidis</i><br>
                                        <span style='color:#00796b; font-weight:bold;'>分類</span>: 細菌.グラム陽性.球菌.カタラーゼ陽性.コアグラーゼ陰性<br>
                                        <span style='color:#00796b; font-weight:bold;'>培地</span>: 白色コロニー<br>
                                        <span style='color:#00796b; font-weight:bold;'>薬剤耐性</span>: メチシリン, バンコマイシン<br>
                                        <span style='color:#00796b; font-weight:bold;'>備考</span>: コアグラーゼ非産生ブドウ球菌(CNS)の代表`
                                    },
                                    "children": []
                                },
                                {
                                    "name": "Staphylococcus saprophyticus",
                                    "default_expand": false,
                                    "detail": { "encodeHTML": false, "text": "腐性ブドウ球菌（尿路感染症の原因など）" },
                                    "children": []
                                }
                            ]
                        },
                        {
                            "name": "レンサ球菌属",
                            "default_expand": true,
                            "detail": { "encodeHTML": false, "text": "レンサ球菌" },
                            "children": [
                                {
                                    "name": "Streptococcus agalactiae",
                                    "default_expand": false,
                                    "detail": {
                                        "encodeHTML": false,
                                        "text": "B群レンサ球菌 (GBS)"
                                    },
                                    "children": []
                                },
                                {
                                    "name": "Streptococcus pneumoniae",
                                    "default_expand": false,
                                    "detail": {
                                        "encodeHTML": true,
                                        "text": `<div style='font-size:1.1em; font-weight:bold; color:#333; margin-bottom:5px;'>肺炎球菌</div>
                                        <span style='color:#00796b; font-weight:bold;'>学術名</span>: <i>Streptococcus pneumoniae</i><br>
                                        <span style='color:#00796b; font-weight:bold;'>分類</span>: 細菌.グラム陽性.球菌.カタラーゼ陰性.α溶血性<br>
                                        <span style='color:#00796b; font-weight:bold;'>培地</span>: α溶血性コロニー<br>
                                        <span style='color:#00796b; font-weight:bold;'>薬剤耐性</span>: ペニシリン`
                                    },
                                    "children": []
                                },
                                {
                                    "name": "Streptococcus pyogenes",
                                    "default_expand": false,
                                    "detail": {
                                        "encodeHTML": true,
                                        "text": `<div style='font-size:1.1em; font-weight:bold; color:#333; margin-bottom:5px;'>化膿レンサ球菌 (A群レンサ球菌)</div>
                                        <span style='color:#00796b; font-weight:bold;'>学術名</span>: <i>Streptococcus pyogenes</i><br>
                                        <span style='color:#00796b; font-weight:bold;'>分類</span>: 細菌.グラム陽性.球菌.カタラーゼ陰性.β溶血性<br>
                                        <span style='color:#00796b; font-weight:bold;'>培地</span>: β溶血性コロニー<br>
                                        <span style='color:#00796b; font-weight:bold;'>薬剤耐性</span>: ペニシリン`
                                    },
                                    "children": []
                                }
                            ]
                        },
                        {
                            "name": "腸球菌属",
                            "default_expand": true,
                            "detail": { "encodeHTML": false, "text": "腸球菌" },
                            "children": [
                                {
                                    "name": "Enterococcus faecium",
                                    "default_expand": false,
                                    "detail": { "encodeHTML": false, "text": "Enterococcus faecium" },
                                    "children": []
                                },
                                {
                                    "name": "Enterococcus faecalis",
                                    "default_expand": false,
                                    "detail": { "encodeHTML": false, "text": "Enterococcus faecalis" },
                                    "children": []
                                }
                            ]
                        }
                    ]
                },
                {
                    "name": "桿菌",
                    "default_expand": true,
                    "detail": { "encodeHTML": false, "text": "桿菌" },
                    "children": [
                        {
                            "name": "コリネバクテリウム属",
                            "default_expand": true,
                            "detail": { "encodeHTML": false, "text": "コリネバクテリウム属" },
                            "children": [
                                {
                                    "name": "Corynebacterium diphtheriae",
                                    "default_expand": false,
                                    "detail": { "encodeHTML": false, "text": "ジフテリア菌" },
                                    "children": []
                                }
                            ]
                        },
                        {
                            "name": "バシラス属",
                            "default_expand": true,
                            "detail": { "encodeHTML": false, "text": "バシラス属" },
                            "children": [
                                {
                                    "name": "Bacillus anthracis",
                                    "default_expand": false,
                                    "detail": { "encodeHTML": false, "text": "炭疽菌" },
                                    "children": []
                                },
                                {
                                    "name": "Bacillus cereus",
                                    "default_expand": false,
                                    "detail": { "encodeHTML": false, "text": "セレウス菌" },
                                    "children": []
                                }
                            ]
                        },
                        {
                            "name": "リステリア属",
                            "default_expand": true,
                            "detail": { "encodeHTML": false, "text": "リステリア属" },
                            "children": [
                                {
                                    "name": "Listeria monocytogenes",
                                    "default_expand": false,
                                    "detail": { "encodeHTML": false, "text": "リステリア症の原因" },
                                    "children": []
                                }
                            ]
                        },
                        {
                            "name": "クロストリジウム属",
                            "default_expand": true,
                            "detail": { "encodeHTML": false, "text": "クロストリジウム属（嫌気性）" },
                            "children": [
                                {
                                    "name": "Clostridium botulinum",
                                    "default_expand": false,
                                    "detail": { "encodeHTML": false, "text": "ボツリヌス菌" },
                                    "children": []
                                },
                                {
                                    "name": "Clostridium difficile",
                                    "default_expand": false,
                                    "detail": { "encodeHTML": false, "text": "偽膜性大腸炎の原因 (CDI)" },
                                    "children": []
                                },
                                {
                                    "name": "Clostridium perfringens",
                                    "default_expand": false,
                                    "detail": { "encodeHTML": false, "text": "ウェルシュ菌（ガス壊疽菌）" },
                                    "children": []
                                },
                                {
                                    "name": "Clostridium tetani",
                                    "default_expand": false,
                                    "detail": { "encodeHTML": false, "text": "破傷風菌" },
                                    "children": []
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        {
            "name": "グラム陰性菌",
            "default_expand": true,
            "color": "#f16d6d",
            "detail": {
                "encodeHTML": false,
                "text": "堅固な細胞壁をもつ、単純な単細胞で、自由生活型。"
            },
            "children": [
                {
                    "name": "球菌",
                    "default_expand": true,
                    "detail": { "encodeHTML": false, "text": "球菌" },
                    "children": [
                        {
                            "name": "ナイセリア属",
                            "default_expand": true,
                            "detail": { "encodeHTML": false, "text": "ナイセリア属" },
                            "children": [
                                {
                                    "name": "Neisseria gonorrhoeae",
                                    "default_expand": false,
                                    "detail": {
                                        "encodeHTML": true,
                                        "text": `<div style='font-size:1.1em; font-weight:bold; color:#333; margin-bottom:5px;'>淋菌</div>
                                        <span style='color:#00796b; font-weight:bold;'>学術名</span>: <i>Neisseria gonorrhoeae</i><br>
                                        <span style='color:#00796b; font-weight:bold;'>分類</span>: 細菌.グラム陰性.球菌.カタラーゼ陰性.オキシダーゼ陽性`
                                    },
                                    "children": []
                                },
                                {
                                    "name": "Neisseria meningitidis",
                                    "default_expand": false,
                                    "detail": {
                                        "encodeHTML": true,
                                        "text": `<div style='font-size:1.1em; font-weight:bold; color:#333; margin-bottom:5px;'>髄膜炎菌</div>
                                        <span style='color:#00796b; font-weight:bold;'>学術名</span>: <i>Neisseria meningitidis</i><br>
                                        <span style='color:#00796b; font-weight:bold;'>分類</span>: 細菌.グラム陰性.球菌.カタラーゼ陰性.オキシダーゼ陽性`
                                    },
                                    "children": []
                                }
                            ]
                        },
                        {
                            "name": "モラクセラ属",
                            "default_expand": true,
                            "detail": { "encodeHTML": false, "text": "モラクセラ属" },
                            "children": [
                                {
                                    "name": "Moraxella catarrhalis",
                                    "default_expand": true,
                                    "detail": {
                                        "encodeHTML": true,
                                        "text": `<div style='font-size:1.1em; font-weight:bold; color:#333; margin-bottom:5px;'>モラクセラ カタラーリス</div>
                                        <span style='color:#00796b; font-weight:bold;'>学術名</span>: <i>Moraxella catarrhalis</i><br>
                                        <span style='color:#00796b; font-weight:bold;'>分類</span>: 細菌.グラム陰性.球菌.カタラーゼ陽性.オキシダーゼ陽性`
                                    },
                                    "children": []
                                }
                            ]
                        },
                        {
                            "name": "アシネトバクター属",
                            "default_expand": true,
                            "detail": { "encodeHTML": false, "text": "アシネトバクター属" },
                            "children": [
                                {
                                    "name": "Acinetobacter baumannii",
                                    "default_expand": false,
                                    "detail": { "encodeHTML": false, "text": "多剤耐性アシネトバクター感染症の原因など" },
                                    "children": []
                                }
                            ]
                        }
                    ]
                },
                {
                    "name": "桿菌",
                    "default_expand": true,
                    "detail": { "encodeHTML": false, "text": "桿菌" },
                    "children": [
                        {
                            "name": "腸内細菌科",
                            "default_expand": true,
                            "detail": { "encodeHTML": false, "text": "腸内細菌科" },
                            "children": [
                                {
                                    "name": "カンピロバクター属",
                                    "default_expand": true,
                                    "detail": { "encodeHTML": false, "text": "カンピロバクター属" },
                                    "children": [
                                        {
                                            "name": "Campylobacter jejuni",
                                            "default_expand": false,
                                            "detail": { "encodeHTML": false, "text": "食中毒の原因" },
                                            "children": []
                                        }
                                    ]
                                },
                                {
                                    "name": "大腸菌",
                                    "default_expand": true,
                                    "detail": { "encodeHTML": false, "text": "大腸菌" },
                                    "children": [
                                        {
                                            "name": "Escherichia coli",
                                            "default_expand": false,
                                            "detail": {
                                                "encodeHTML": true,
                                                "text": `<div style='font-size:1.1em; font-weight:bold; color:#333; margin-bottom:5px;'>大腸菌</div>
                                                <span style='color:#00796b; font-weight:bold;'>学術名</span>: <i>Escherichia coli</i><br>
                                                <span style='color:#00796b; font-weight:bold;'>分類</span>: 細菌.グラム陰性.桿菌.カタラーゼ陰性.オキシダーゼ陰性`
                                            },
                                            "children": []
                                        }
                                    ]
                                },
                                {
                                    "name": "ヘリコバクター属",
                                    "default_expand": true,
                                    "detail": { "encodeHTML": false, "text": "ヘリコバクター属" },
                                    "children": [
                                        {
                                            "name": "Helicobacter pylori",
                                            "default_expand": false,
                                            "detail": {
                                                "encodeHTML": true,
                                                "text": `<div style='font-size:1.1em; font-weight:bold; color:#333; margin-bottom:5px;'>ヘリコバクターピロリ</div>
                                                <span style='color:#00796b; font-weight:bold;'>学術名</span>: <i>Helicobacter pylori</i>`
                                            },
                                            "children": []
                                        }
                                    ]
                                },
                                {
                                    "name": "クレブシエラ属",
                                    "default_expand": true,
                                    "detail": { "encodeHTML": false, "text": "クレブシエラ属" },
                                    "children": [
                                        {
                                            "name": "Klebsiella pneumoniae",
                                            "default_expand": false,
                                            "detail": { "encodeHTML": false, "text": "肺炎桿菌" },
                                            "children": []
                                        }
                                    ]
                                },
                                {
                                    "name": "サルモネラ属",
                                    "default_expand": true,
                                    "detail": { "encodeHTML": false, "text": "サルモネラ属" },
                                    "children": [
                                        {
                                            "name": "Salmonella typhi",
                                            "default_expand": false,
                                            "detail": { "encodeHTML": false, "text": "チフス菌" },
                                            "children": []
                                        }
                                    ]
                                },
                                {
                                    "name": "セラチア属",
                                    "default_expand": true,
                                    "detail": { "encodeHTML": false, "text": "セラチア属" },
                                    "children": [
                                        {
                                            "name": "Serratia marcescens",
                                            "default_expand": false,
                                            "detail": { "encodeHTML": false, "text": "セラチア菌" },
                                            "children": []
                                        }
                                    ]
                                },
                                {
                                    "name": "赤痢菌",
                                    "default_expand": true,
                                    "detail": { "encodeHTML": false, "text": "赤痢菌" },
                                    "children": [
                                        {
                                            "name": "Shigella sonnei",
                                            "default_expand": false,
                                            "detail": { "encodeHTML": false, "text": "ソンネ赤痢菌" },
                                            "children": []
                                        }
                                    ]
                                },
                                {
                                    "name": "ビブリオ属",
                                    "default_expand": true,
                                    "detail": { "encodeHTML": false, "text": "ビブリオ属" },
                                    "children": [
                                        {
                                            "name": "Vibrio cholerae",
                                            "default_expand": false,
                                            "detail": { "encodeHTML": false, "text": "コレラ菌" },
                                            "children": []
                                        },
                                        {
                                            "name": "Vibrio parahaemolyticus",
                                            "default_expand": false,
                                            "detail": { "encodeHTML": false, "text": "腸炎ビブリオ" },
                                            "children": []
                                        }
                                    ]
                                },
                                {
                                    "name": "エルシニア属",
                                    "default_expand": true,
                                    "detail": { "encodeHTML": false, "text": "エルシニア属" },
                                    "children": [
                                        {
                                            "name": "Yersinia pestis",
                                            "default_expand": false,
                                            "detail": { "encodeHTML": false, "text": "ペスト菌" },
                                            "children": []
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "name": "非腸内細菌科",
                            "default_expand": true,
                            "detail": { "encodeHTML": false, "text": "非腸内細菌科" },
                            "children": [
                                {
                                    "name": "Bordetella pertussis",
                                    "default_expand": false,
                                    "detail": { "encodeHTML": false, "text": "百日咳菌" },
                                    "children": []
                                },
                                {
                                    "name": "Brucella species",
                                    "default_expand": false,
                                    "detail": { "encodeHTML": false, "text": "ブルセラ菌" },
                                    "children": []
                                },
                                {
                                    "name": "Haemophilus influenzae",
                                    "default_expand": false,
                                    "detail": { "encodeHTML": false, "text": "インフルエンザ菌" },
                                    "children": []
                                },
                                {
                                    "name": "Legionella pneumophila",
                                    "default_expand": false,
                                    "detail": { "encodeHTML": false, "text": "レジオネラ菌" },
                                    "children": []
                                },
                                {
                                    "name": "Pseudomonas aeruginosa",
                                    "default_expand": false,
                                    "detail": { "encodeHTML": false, "text": "緑膿菌" },
                                    "children": []
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        {
            "name": "その他",
            "default_expand": true,
            "detail": { "encodeHTML": false, "text": "その他" },
            "children": [
                {
                    "name": "バクテロイデス属",
                    "default_expand": true,
                    "detail": { "encodeHTML": false, "text": "バクテロイデス属" },
                    "children": [
                        {
                            "name": "Bacteroides fragilis",
                            "default_expand": false,
                            "detail": { "encodeHTML": false, "text": "Bacteroides fragilis" },
                            "children": []
                        }
                    ]
                }
            ]
        },
        {
            "name": "線状",
            "default_expand": true,
            "detail": { "encodeHTML": false, "text": "線維状の細胞" },
            "children": [
                {
                    "name": "マイコバクテリウム",
                    "default_expand": true,
                    "detail": { "encodeHTML": false, "text": "抗酸菌" },
                    "children": [
                        {
                            "name": "Mycobacterium leprae",
                            "default_expand": true,
                            "detail": { "encodeHTML": false, "text": "らい菌" },
                            "children": []
                        },
                        {
                            "name": "Mycobacterium tuberculosis",
                            "default_expand": true,
                            "detail": { "encodeHTML": false, "text": "結核菌" },
                            "children": []
                        }
                    ]
                }
            ]
        }
    ]
};

const howToUseData =  {
    "name": "root",
    "children": [
        {
            "name": "このサイトについて",
            "description": "微生物を階層構造にしてまとめました。",
            "children": []
        },
        {
            "name": "使い方",
            "description": "とてもかんたん",
            "children": [
                {
                    "name": "ラベル",
                    "description": "ラベルをクリックすると詳細情報が表示されます。右クリックするとハイライトされます。",
                    "children": []
                },
                {
                    "name": "サークル",
                    "description": "サークルをクリックすると子ノードが展開・折りたたみされます。",
                    "children": []
                },
                {
                    "name": "ルートノード",
                    "description": "ルートノードを右クリックすると、別のツリーに移動します。",
                    "children": []
                }
            ]
        }
    ]
};