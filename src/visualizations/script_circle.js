/**
 * script_circle.js
 * D3.js v7を使用してサークル形式のツリーグラフを描画します。
 * 
 * このコードは、階層構造をもつデータを使用して、放射状のツリー型グラフを描画します。
 * 
 * グラフ詳細：
 *     - ノードのテキストをクリックすると、ノードの詳細情報が表示されます。
 *     - ノードのテキストを右クリックすると、テキストがハイライトされます。
 *
 * rawDataの構造：
 *    - name: ノードの名前
 *    - children: 子ノード
 *    - detail: ノードの詳細情報
 *        - encodeHTML: textがHTMLの場合はtrueを設定します。
 *        - text: テキストを設定します。
 *    - default_expand: (optional) ノードのデフォルト展開状態
 *    - color: (optional) ノードの色
 */


/**
 * 定数を保持するConstantsクラスを定義しています。
 */
class Constants {
    constructor(rawData) {
        this.data = rawData;
        this.margin = { top: 4, right: 5, bottom: 6, left: 5 };
        this.width = window.innerWidth - this.margin.left - this.margin.right;
        this.height = window.innerHeight - this.margin.top - this.margin.bottom;
        this.cx = this.width * 0.5;
        this.cy = this.height * 0.59;
        this.duration = 500;
        this.radius = ((this.width | this.height) > 600 ? 600 : Math.max(this.width, this.height)) / 1.6;
    }
}


/**
 * Mainクラスを定義しています。
 * Mainクラスでは、すべてのクラスをインスタンス化し、グラフの描画を行っています。
 */
class Main {
    constructor(rawData) {
        try {
            if (!rawData) {
                throw new Error('データが読み込まれていません');
            }

            this.constants = new Constants(rawData);
            this.dataManagement = new DataManagement(this.constants);
            this.dataManagement.root.children?.forEach(this.dataManagement.collapse);
            this.svg = this.createSVGContainer();
            this.updateSVGSize();
            this.chart = new Chart(this.constants, this.svg, this, this.dataManagement);
            
            // グローバルスコープに追加（リセットボタン用）
            window.main = this;
        } catch (error) {
            console.error('初期化エラー:', error);
            this.showError('アプリケーションの初期化に失敗しました。');
        }
    }

    createSVGContainer() {
        return d3
            .select("#container")
            .append("svg")
            .attr("height", this.constants.height)
            .attr("viewBox", [-this.constants.cx, -this.constants.cy, this.constants.width, this.constants.height])
            .attr("aria-label", "微生物分類ツリー");
    }

    updateSVGSize() {
        window.addEventListener("resize", () => {
            this.dataManagement.updateWindowSizeConstants();
            this.svg
                .attr("width", this.constants.width)
                .attr("height", this.constants.height)
                .attr("viewBox", [-this.constants.cx, -this.constants.cy, this.constants.width, this.constants.height]);
            this.update(this.dataManagement.root);
        });
    }

    update(source) {
        this.chart.createZoom();
        this.chart.drawChart(source);
    }

    showError(message) {
        const container = document.getElementById('container');
        container.innerHTML = `<div class="error-message">${message}</div>`;
    }
}


/**
 * データの管理と操作を行うDataManagementクラスを定義しています。
 */
class DataManagement {
    constructor(constants) {
        this.constants = constants;
        this.root = d3.hierarchy(this.constants.data)
            .sort((a, b) => d3.ascending(a.data.name, b.data.name))
            .each((d, i) => { d.id = i; });
        this.root.x0 = this.constants.height / 2;
        this.root.y0 = 0;
        this.collapse = this.collapse.bind(this);
    }

    collapse(d) {
        if (d.data.default_expand) {
            if (d.children) {
                d._children = null;
                d.children.forEach(this.collapse);
            }
        } else {
            if (d.children) {
                d._children = d.children;
                d._children.forEach(this.collapse);
                d.children = null;
            }
        }
    }

    updateWindowSizeConstants() {
        this.constants.width = window.innerWidth - this.constants.margin.left - this.constants.margin.right;
        this.constants.height = window.innerHeight - this.constants.margin.top - this.constants.margin.bottom;
        this.constants.cx = this.constants.width * 0.5;
        this.constants.cy = this.constants.height * 0.59;
        this.constants.radius = ((this.constants.width | this.constants.height) > 600 ? 600 : Math.max(this.constants.width, this.constants.height)) / 1.6;
    }
}


/**
 * グラフを描画し更新するChartクラスを定義しています。
 */
class Chart {
    constructor(constants, svg, main, dataManagement) {
        this.constants = constants;
        this.svg = svg;
        this.container = this.svg.append("g");
        this.main = main;
        this.dataManagement = dataManagement;
    }

    drawChart(source) {
        const clusterData = d3.cluster()
            .size([2 * Math.PI, this.constants.radius])
            .separation((a, b) => (a.parent === b.parent ? 1 : 3) / a.depth);
        const nodes = clusterData(this.dataManagement.root).descendants();
        const links = nodes.slice(1);

        const node = new Node(this.container, this.main, this.constants);
        node.updateNodes(source, nodes);

        const link = new Link(this.container, this.constants);
        link.updateLinks(source, nodes, links);
    }

    createZoom() {
        const zoom = d3.zoom()
            .scaleExtent([0.1, 10])
            .on("zoom", (event) => {
                this.container.attr("transform", event.transform);
            });
        this.svg.call(zoom);
    }
}


/**
 * ノードを描画し更新するNodeクラスを定義しています。
 */
class Node {
    constructor(container, main, constants) {
        this.container = container;
        this.main = main;
        this.constants = constants;
        this.i = 0;
        this.touchStartTime = null;
    }

    updateNodes(source, nodes) {        
        const node = this.container
            .selectAll("g.node")
            .data(source.descendants());

        const nodeEnter = this.nodeEnterUpdate(node, source);
        const nodeUpdate = this.nodeUpdateTransition(nodeEnter, node);
        this.nodeExitTransition(node, source);
    }

    nodeEnterUpdate(node, source) {
        const nodeEnter = node
            .enter()
            .append("g")
            .attr("class", "node")
            .attr("transform", d => `
                rotate(${d.x * 180 / Math.PI - 90}) 
                translate(${d.y}, 0)
                rotate(${d.x >= Math.PI ? 180 : 0})
            `)
            .attr("r", 1e-6);

        nodeEnter.append("circle")
            .attr("class", "node-circle")
            .attr("r", 8)
            .attr("role", "button")
            .attr("aria-label", d => `${d.data.name}`)
            .attr("tabindex", 0);

        nodeEnter.append("text")
            .attr("class", "node-text")
            .attr("dy", ".31em")
            .attr("x", d => d.x < Math.PI === !d.children ? 6 : -6)
            .attr("text-anchor", d => d.x < Math.PI === !d.children ? "start" : "end")
            .text(d => d.data.name)
            .attr("fill", this.colorNode.bind(this))
            .on("click", (event, d) => this.revealDetailCard(event, d))
            .on("contextmenu", (event) => {
                event.preventDefault();
                this.toggleHighlight(event);
            })
            .on("touchstart", (event) => {
                event.preventDefault();
                this.touchStartTime = Date.now();
            })
            .on("touchend", (event) => {
                const touchEndTime = Date.now();
                if (touchEndTime - this.touchStartTime > 500) {
                    this.toggleHighlight(event);
                }
            });

        return nodeEnter;
    }

    nodeUpdateTransition(nodeEnter, node) {
        const nodeUpdate = nodeEnter.merge(node);

        nodeUpdate
            .transition()
            .duration(this.constants.duration)
            .attr("transform", d => `
                rotate(${d.x * 180 / Math.PI - 90}) 
                translate(${d.y},0) 
                rotate(${d.x >= Math.PI ? 180 : 0})
            `)
            .attr("x", d => d.x < Math.PI === !d.children ? 6 : -6);

        nodeUpdate
            .select("circle")
            .attr("r", 8);

        return nodeUpdate;
    }

    nodeExitTransition(node, source) {
        const nodeExit = node
            .exit()
            .transition()
            .duration(this.constants.duration)
            .attr("transform", d => `rotate(${d.x * 180 / Math.PI - 90}) translate(${d.depth * 10},0) rotate(${d.x >= Math.PI ? 180 : 0})`)
            .remove();

        nodeExit
            .select("circle")
            .attr("r", 1e-6);
        
        nodeExit
            .select("text")
            .style("fill-opacity", 1e-6);
    }

    colorNode(d) {
        const setColor = (d) => {
            if (d.data.color) {
                return d.data.color;
            } else if (d.parent) {
                return setColor(d.parent);
            } else {
                return "#f0f0f0";
            }
        };
        return setColor(d);
    }

    toggleHighlight(event) {
        const textElement = d3.select(event.currentTarget);
        const isHighlighted = textElement.classed("highlighted");
        textElement.classed("highlighted", !isHighlighted);
    }

    revealDetailCard(event, d) {
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;

        // 既存のカードを削除
        d3.selectAll(".detail-card").remove();

        const detailCard = d3.select("#description-container")
            .append("div")
            .attr("class", "detail-card")
            .style("visibility", "hidden");

        if (d.data.detail?.encodeHTML) {
            detailCard.html(d.data.detail.text || d.data.name);
        } else {
            detailCard.text(d.data.detail?.text || d.data.name);
        }

        detailCard.append("button")
            .text("閉じる")
            .on("click", function() {
                detailCard.remove();
            });

        const cardWidth = detailCard.node().offsetWidth;
        const cardHeight = detailCard.node().offsetHeight;
        
        let left = event.pageX + 10;
        let top = event.pageY + 10;

        if (left + cardWidth > windowWidth) {
            left = windowWidth - cardWidth - 20;
        }

        if (top + cardHeight > windowHeight) {
            top = windowHeight - cardHeight - 20;
        }

        detailCard
            .style("left", left + "px")
            .style("top", top + "px")
            .style("visibility", "visible");
    }
}


/**
 * リンクを描画し更新するLinkクラスを定義しています。
 */
class Link {
    constructor(container, constants) {
        this.container = container;
        this.constants = constants;
    }

    updateLinks(source, nodes, links) {
        const link = this.container
            .selectAll("path.link")
            .data(links, d => d.data.id);

        const linkEnter = this.linkEnterUpdate(link, source, links);
        const linkUpdate = this.linkUpdateTransition(linkEnter, link, source);
        this.linkExitTransition(link, source);
    }

    linkEnterUpdate(link, source, links) {
        const linkEnter = link
            .enter()
            .insert("path", "g")
            .attr("class", "link")
            .attr("d", d => {
                const linkObj = links.find(link => link.data.id === d.data.id);
                return this.diagonal(linkObj.parent, linkObj);
            });
        return linkEnter;
    }

    linkUpdateTransition(linkEnter, link, source) {
        const linkUpdate = linkEnter.merge(link);

        linkUpdate
            .transition()
            .duration(this.constants.duration)
            .attr("d", d => this.diagonal(d.parent, d));
        return linkUpdate;
    }

    linkExitTransition(link, source) {
        link.exit()
            .transition()
            .duration(this.constants.duration)
            .remove();
    }

    diagonal(s, d) {
        const path = d3.linkRadial()
            .angle(d => d.x)
            .radius(d => d.y);
        return path({source: s, target: d});
    }    
}


// データを読み込み、グラフを描画します
try {
    if (typeof BACTERIA === 'undefined') {
        throw new Error('BACTERIAデータが定義されていません。');
    }
    const main = new Main(BACTERIA);
    main.update(main.dataManagement.root);
} catch (error) {
    console.error('アプリケーション起動エラー:', error);
    document.getElementById('container').innerHTML = 
        '<div class="error-message">データの読み込みに失敗しました。ページを再読み込みしてください。</div>';
}
