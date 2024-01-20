/**
 * script.js
 * このコードは、D3.jsを使用してグラフを描画します。
 * 階層構造をもつデータを使用して、ツリー型のグラフを描画します。
 * 
 * グラフ詳細：
 *     - ノードの円をクリックすると、ノードが収納されます。
 *     - ノードのテキストをクリックすると、ノードの詳細情報が表示されます。
 *     - ノードのテキストを右クリックすると、テキストがハイライトされます。
 *
 * rawDataの構造：
 *    - name: ノードの名前
 *    - children: 子ノード
 *    - detail: ノードの詳細情報
 *    - default_expand: -- optional --
 *         ノードのデフォルト展開状態を設定します。
 *         このキーが存在する階層まで展開します。
 * 
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
      this.duration =500;
      this.collapsedNodeRadius = 10;
      this.radius = this.calculateRadius();
    }

    // radiusを計算するための関数です。
    // radiusは、ツリーチャートの半径です。
    calculateRadius(d) {
        if (this.width > this.height) {
            return this.height / 2.5 - 100;
        } else {
            return this.width / 2.5 - 100;
        }
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
            .attr("width", this.constants.width)
            .attr("height", this.constants.height);
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
        this.root = d3.hierarchy(this.constants.data, function(d) {
        return d.children;
        });
        this.root.x0 = this.constants.height / 2;
        this.root.y0 = 0;
        this.collapse = this.collapse.bind(this);
    }

    // ノードのデフォルト展開状態を設定しています。
    // default_expandを持っている階層まで展開するように設定しています。
    collapse(d) {
        if (d.children && d.data.default_expand) {
            d._children = d.children;
            d._children.forEach(this.collapse);
            d.children = null;
        } else if (d.children && !d.data.default_expand) {
            d.children.forEach(this.collapse);
        } else if (d._children && !d.data.default_expand) {
            d._children.forEach(this.collapse);
        } else if (d._children && d.data.default_expand) {
            d.children = d._children;
            d.children.forEach(this.collapse);
            d._children = null;
        } else {
            return;
        }
    }

    // 画面サイズが変更されたとき、グラフの表示サイズを更新するために使用します。
    updateWindowSizeConstants() {
        this.constants.width = window.innerWidth - this.constants.margin.left - this.constants.margin.right;
        this.constants.height = window.innerHeight - this.constants.margin.top - this.constants.margin.bottom;
        this.constants.cx = this.constants.width * 0.5;
        this.constants.cy = this.constants.height * 0.59;
        this.constants.radius = this.constants.calculateRadius();
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
        // ツリーデータを作成する
        const treeData = d3.tree()
            .size([this.constants.height, this.constants.width])(this.dataManagement.root);
        const nodes = treeData.descendants(),
        links = treeData.descendants().slice(1);

        // ノードのy座標を180度回転させる
        nodes.forEach(function(d) {
            d.y = d.depth * 180;
        });

        // ノードの位置を固定する
        nodes.forEach(function(d) {
            d.x0 = d.x;
            d.y0 = d.y;
        });

        // ノードを描画する
        const node = new Node(this.container, this.main);
        node.updateNodes(source, nodes);

        // リンクを描画する
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
    }

    // ノードを更新します。
    updateNodes(source, nodes) {        
        const node = this.container
            .selectAll("g.node")
            .data(nodes, function(d) {
                return d.id || (d.id = ++this.i);
            }
        );

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
            .attr("transform", function(d) {
                return "translate(" + source.y0 + "," + source.x0 + ")";
            });


        // ノードの円を描画します。
        // ノードの円をクリックしたときに、ノードを収納します。
        nodeEnter.append("circle")
            .attr("class", "node-circle")
            .attr("r", 10)
            .on("click", this.toggleCollapse.bind(this));

        // ノードのテキストを描画します。
        // ノードのテキストをクリックしたときに、ノードの詳細情報を表示します。
        // ノードのテキストを右クリックしたときに、テキストをハイライトします。
        nodeEnter.append("text")
            .attr("class", "node-text")
            .attr("dy", ".35em")
            .attr("x", function(d) {
                return d.children || d._children ? -13 : 13;
            })
            .attr("text-anchor", function(d) {
                return d.children || d._children ? "end" : "start";
            })
            .text(function(d) {
                return d.data.name;
            })
            .on("click", this.revealDetailCard.bind(this))
            .on("contextmenu", this.toggleHighlight.bind(this));

        return nodeEnter;
    }

    // ノードの位置を更新するための関数です。
    nodeUpdateTransition(nodeEnter, node) {
        const nodeUpdate = nodeEnter.merge(node);

        nodeUpdate
            .transition()
            .duration(Constants.duration)
            .attr("transform", function(d) {
                return "translate(" + d.y + "," + d.x + ")";
            });

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
            .attr("transform", function(d) {
                return "translate(" + source.y + "," + source.x + ")";
            })
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

    // ノードのテキストをハイライトするための関数です。
    toggleHighlight(d) {
        d3.event.preventDefault();
    
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
        const detailCard = d3.select("#description-container")
            .append("div")
            .attr("class", "detail-card")
            .style("visibility", "hidden");


        // ノードの詳細情報を表示するカードの中身を作成します。
        // データがオブジェクトの場合は、オブジェクトのキーと値を表示します。
        // データが配列の場合は、配列の要素を表示します。
        // データが文字列の場合は、文字列を表示します。
        // 要素の中身はHTMLタグを使用できます。

        // データがオブジェクトの場合
        if (typeof d.data.description === "object") {
            Object.keys(d.data.description).forEach(function(key) {
                detailCard.append("p").text(key + ": " + d.data.description[key]);
            }
        );
        // データが配列の場合
        } else if (typeof d.data.description === "object") {
            d.data.description.forEach(function(description) {
                detailCard.append("p").text(description);
            }
        );
        // データが文字列の場合
        } else {
            detailCard.append("p").text(d.data.description ? d.data.description : d.data.name);
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

    // リンクを更新する
    updateLinks(source, nodes, links) {
        const link = this.container
            .selectAll("path.link")
            .data(links, function(d) {
                return { source: d.parent.id, target: d.id };
            }
        );

        const linkEnter = this.linkEnterUpdate(link, source);
        const linkUpdate = this.linkUpdateTransition(linkEnter, link);
        this.linkExitTransition(link, source);
    }

    // 新しく追加されたリンクを描画するための関数です。
    linkEnterUpdate(link, source) {
        const linkEnter = link
            .enter()
            .insert("path", "g")
            .attr("class", "link")
            .attr("d", function(d) {
                const o = { x: source.x0, y: source.y0 };
                return this.diagonal(o, o);
            }.bind(this));

        return linkEnter;
    }

    // リンクの位置を更新するための関数です。
    linkUpdateTransition(linkEnter, link) {
        const linkUpdate = linkEnter.merge(link);

        linkUpdate
            .transition()
            .duration(Constants.duration)
            .attr("d", function(d) {
                return this.diagonal(d, d.parent);
            }.bind(this));

        return linkUpdate;
    }

    // リンクを削除するための関数です。
    linkExitTransition(link, source) {
        const linkExit = link
            .exit()
            .transition()
            .duration(Constants.duration)
            .attr("d", function(d) {
                const o = { x: source.x, y: source.y };
                return this.diagonal(o, o);
            }.bind(this))
            .remove();
    }

    // ベジェ曲線を作成するための関数です。
    // ノード間のリンクを曲線で描画するために使用されます。
    diagonal(s, d) {
        const path = `M ${s.y} ${s.x}
                C ${(s.y + d.y) / 2} ${s.x},
                ${(s.y + d.y) / 2} ${d.x},
                ${d.y} ${d.x}`;

        return path;
    }
}


// データを読み込み、グラフを描画します。
// rawDataは別ファイルで定義したので、このファイルには含まれません。
const main = new Main(rawData);
main.update(main.dataManagement.root);
