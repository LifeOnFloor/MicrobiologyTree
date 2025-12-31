const BACTERIA = {
    "name": "細菌",
    "default_expand": true,
    "detail": {
        "encodeHTML": false,
        "text": "重要な細菌のまとめ",
    },
    "children": [
        {
            "name": "グラム陽性菌",
            "default_expand": true,
            "color": "#6d7af1",
            "detail": {
                "encodeHTML": false,
                "text": "堅固な細胞壁をもつ、単純な単細胞で、自由生活型。グラム陽性菌"
            },
            "children": [
                {
                    "name": "球菌",
                    "default_expand": true,
                    "detail": {
                        "encodeHTML": false,
                        "text": "球菌"
                    },
                    "children": [
                        {
                            "name": "ブドウ球菌",
                            "default_expand": true,
                            "detail": {
                                "encodeHTML": false,
                                "text": "ブドウ球菌属"
                            },
                            "children": [
                                {
                                    "name": "Staphylococcus aureus",
                                    "default_expand": false,
                                    "detail": {
                                        "encodeHTML": false,
                                        "text": "黄色ブドウ球菌"
                                    },
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
                "text": "堅固な細胞壁をもつ、単純な単細胞で、自由生活型。グラム陰性菌"
            },
            "children": [
                {
                    "name": "球菌",
                    "default_expand": true,
                    "detail": {
                        "encodeHTML": false,
                        "text": "球菌"
                    },
                    "children": [
                        {
                            "name": "ナイセリア属",
                            "default_expand": true,
                            "detail": {
                                "encodeHTML": false,
                                "text": "ナイセリア属"
                            },
                            "children": [
                                {
                                    "name": "Neisseria gonorrhoeae",
                                    "default_expand": false,
                                    "detail": {
                                        "encodeHTML": false,
                                        "text": "淋菌"
                                    },
                                    "children": []
                                },
                                {
                                    "name": "Neisseria meningitidis",
                                    "default_expand": false,
                                    "detail": {
                                        "encodeHTML": false,
                                        "text": "髄膜炎菌"
                                    },
                                    "children": []
                                }
                            ]
                        }
                    ]
                },
                {
                    "name": "桿菌",
                    "default_expand": true,
                    "detail": {
                        "encodeHTML": false,
                        "text": "桿菌"
                    },
                    "children": [
                        {
                            "name": "大腸菌",
                            "default_expand": true,
                            "detail": {
                                "encodeHTML": false,
                                "text": "大腸菌"
                            },
                            "children": [
                                {
                                    "name": "Escherichia coli",
                                    "default_expand": false,
                                    "detail": {
                                        "encodeHTML": false,
                                        "text": "Escherichia coli"
                                    },
                                    "children": []
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ]
};

const rawData = BACTERIA;
