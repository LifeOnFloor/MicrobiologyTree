/**
 * script.js
 * このコードは、D3.jsを使用してグラフを描画します。
 * 階層構造をもつデータを使用して、ツリー型のグラフを描画します。
 *
 * rawDataの構造：
 *    - name: ノードの名前
 *    - children: 子ノード
 *    - detail: ノードの詳細情報
 *        - encodeHTML: textがHTMLの場合はtrueを設定します。
 *        - text: テキストを設定します。
 *    - default_expand: -- optional --
 *        ノードのデフォルト展開状態を設定します。
 *        このキーが存在する階層まで展開します。
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
        this.radius = ((this.width | this.height) > 600 ? 600 : Math.max(this.width, this.height)) / 1.6;
    }
}


/**
 * Mainクラスを定義しています。
 * Mainクラスでは、すべてのクラスをインスタンス化し、グラフの描画を行っています。
 */
class Main {
    // コンストラクターで、すべてのクラスをインスタンス化しています。
    constructor(rawData) {
        this.constants = new Constants(rawData);
        this.dataManagement = new DataManagement(this.constants);
        this.dataManagement.root.children.forEach(this.dataManagement.collapse);
        this.svg = this.createSVGContainer();
        this.updateSVGSize();
        this.chart = new Chart(this.constants, this.svg, this, this.dataManagement);
    }

    // SVGコンテナーを作成します。
    createSVGContainer() {
        return d3
            .select("#container")
            .append("svg")
            .attr("height", this.constants.height)
            .attr("viewBox", [-this.constants.cx, -this.constants.cy, this.constants.width, this.constants.height]);
    }

    // windowサイズが更新すると、svgのサイズを更新します。
    updateSVGSize() {
        window.addEventListener("resize", () => {
            this.dataManagement.updateWindowSizeConstants();
            this.svg
                .attr("width", this.constants.width)
                .attr("height", this.constants.height);
            this.update(this.dataManagement.root);
            }
        );
    }

    // グラフを更新します。
    update(source) {
        this.chart.createZoom();
        this.chart.drawChart(source);
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

    // ノードのデフォルト展開状態を設定しています。
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

    // 画面サイズが変更されたとき、グラフの表示サイズを更新します。
    updateWindowSizeConstants() {
        this.constants.width = window.innerWidth - this.constants.margin.left - this.constants.margin.right;
        this.constants.height = window.innerHeight - this.constants.margin.top - this.constants.margin.bottom;
        this.constants.cx = this.constants.width * 0.5;
        this.constants.cy = this.constants.height * 0.59;
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

    // グラフを描画します。
    drawChart(source) {
        // データをクラスターに変換します。
        const clusterData = d3.cluster()
            .size([2 * Math.PI, this.constants.radius])
            .separation((a, b) => (a.parent === b.parent ? 1 : 3) / a.depth);
        const nodes = clusterData(this.dataManagement.root).descendants();
        const links = nodes.slice(1);

        // ノードを描画します。
        const node = new Node(this.container, this.main);
        node.updateNodes(source, nodes);

        // リンクを描画します。
        const link = new Link(this.container);
        link.updateLinks(source, nodes, links);
    }

    // ズーム機能を作成します。
    createZoom() {
        const zoom = d3.zoom()
            .scaleExtent([0.1, 10])
            .on("zoom", () => {
                this.container.attr("transform", d3.event.transform);
            });
        this.svg.call(zoom);
    }
}


class Node {
    constructor(container, main) {
        this.container = container;
        this.main = main;
        this.i = 0;
        this.touchStartTime = null;
    }

    // ノードを更新します。
    updateNodes(source, nodes) {        
        const node = this.container
            .selectAll("g.node")
            .data(source.descendants());

        const nodeEnter = this.nodeEnterUpdate(node, source);
        const nodeUpdate = this.nodeUpdateTransition(nodeEnter, node);
        this.nodeExitTransition(node, source);
    }

    // ノードを挿入するための関数です。
    nodeEnterUpdate(node, source) {
        // 新しいノードを入力します。
        const nodeEnter = node
            .enter()
            .append("g")
            .attr("class", "node")
            .attr("transform", d => `
                rotate(${d.x * 180 / Math.PI - 90}) 
                translate(${d.y}, 0)
                rotate(${d.x >= Math.PI ? 180 : 0})
            `)
            .attr("r", 1e-6)

        // ノードの円を描画します。
        // ノードの円をクリックしたときに、ノードを収納します。
        nodeEnter.append("circle")
            .attr("class", "node-circle")
        //    .on("click", this.toggleCollapse.bind(this));


        // ノードのテキストを描画します。
        // ノードのテキストをクリックしたときに、ノードの詳細情報を表示します。
        // ノードのテキストを右クリックしたときに、ノードのテキストをハイライトします。
        nodeEnter.append("text")
            .attr("class", "node-text")
            .attr("dy", ".31em")
            .attr("x", d => d.x < Math.PI === !d.children ? 6 : -6)
            .attr("text-anchor", d => d.x < Math.PI === !d.children ? "start" : "end")
            .text(function(d) {
                return d.data.name;
            })
            .attr("fill", this.colorNode.bind(this))
            .on("click", this.revealDetailCard.bind(this))
            .on("contextmenu", () => {
                d3.event.preventDefault();
                this.toggleHighlight();
            })
            .on("touchstart", () => {
                d3.event.preventDefault();
                const startX = d3.event.touches[0].clientX;
                this.touchStartTime = d3.now();
            })
            .on("touchend", () => {
                const endX = d3.event.changedTouches[0].clientX;
                const touchEndTime = d3.now();
                if (touchEndTime - this.touchStartTime > 300) {
                    this.toggleHighlight();
                }
            });

        return nodeEnter;
    }

    // ノードの位置を更新するための関数です。
    nodeUpdateTransition(nodeEnter, node) {
        const nodeUpdate = nodeEnter.merge(node);

        nodeUpdate
            .transition()
            .duration(Constants.duration)
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

    // ノードを削除するための関数です。
    nodeExitTransition(node, source) {
        const nodeExit = node
            .exit()
            .transition()
            .duration(Constants.duration)
            .attr("transform", d => `rotate(${d.x * 180 / Math.PI - 90}) translate(${d.depth * 10},0) rotate(${d.x >= Math.PI ? 180 : 0})`)
            .remove();

        nodeExit
            .select("circle")
            .attr("r", 1e-6);
        
        nodeExit
            .select("text")
            .style("fill-opacity", 1e-6);
    }

    // ノードを折りたたむための関数です。
    toggleCollapse(d) {
        if (d.children) {
            d._children = d.children;
            d.children = null;
        } else {
            d.children = d._children;
            d._children = null;
        }
        this.main.update(d);
    }

    // ノードの色を設定するための関数です。
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

    // ノードのテキストをハイライトするための関数です。
    toggleHighlight(d) {
        const textElement = d3.select(d3.event.currentTarget);
        const isHighlighted = textElement.classed("highlighted");
        textElement.classed("highlighted", !isHighlighted);
    }

    // ノードの詳細情報を表示するための関数です。
    revealDetailCard(d) {
        // ノードの円をハイライトします。
        d3.select(d3.event.currentTarget)
            .select("circle")
            .style("stroke", "black");

        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;

        // ノードの詳細情報を表示するカードを作成します。
        // カードは、レスポンシブデザインに対応しています。
        const detailCard = d3.select("#description-container")
            .append("div")
            .attr("class", "detail-card")
            .style("visibility", "hidden");

        // ノードの詳細情報を表示するカードの中身を作成します。
        if (d.data.detail.encodeHTML) {
            // データのdetailのencodeHTMLがtrueの場合
            detailCard.html(d.data.detail.text || d.data.name);
        } else {
            // データのdetailのencodeHTMLがfalseの場合
            detailCard.text(d.data.detail.text || d.data.name);
        }

        detailCard.append("button")
            .text("Close")
            .on("click", function() {
                detailCard.remove();
            });

        const cardWidth = detailCard.node().offsetWidth;
        const cardHeight = detailCard.node().offsetHeight;
        
        let left = d3.event.pageX;
        let top = d3.event.pageY;

        if (left + cardWidth > windowWidth) {
            left = windowWidth - cardWidth;
        }

        if (top + cardHeight > windowHeight) {
            top = windowHeight - cardHeight;
        }

        detailCard.style("left", left + "px")
            .style("top", top + "px")
            .style("visibility", "visible");
    }
}


/**
 * リンクを描画し更新するLinkクラスを定義しています。
 */
class Link {
    constructor(container) {
        this.container = container;
    }

    updateLinks(source, nodes, links) {
        const link = this.container
            .selectAll("path.link")
            .data(links, function(d) {
                return d.data.id;
            });

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
            .duration(Constants.duration)
            .attr("d", d => this.diagonal(d.parent, d));
        return linkUpdate;
    }

    linkExitTransition(link, source) {
        const linkExit = link
            .exit()
            .transition()
            .duration(Constants.duration)
            .remove();
        return linkExit;
    }

    diagonal(s, d) {
        const path = d3.linkRadial()
            .angle(d => d.x)
            .radius(d => d.y);
        return path({source: s, target: d});
    }    
}



// データを読み込み、グラフを描画します。
// データは別ファイルで定義したので、このファイルには含まれません。
const main = new Main(BACTERIA);
main.update(main.dataManagement.root);
