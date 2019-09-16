// default/src/index.js
$fsx.f[333] = (module, exports) => {
Object.defineProperty(exports, "__esModule", { value: true });
$fsx.r(33);
$fsx.r(34);
$fsx.r(332);
//# sourceMappingURL=index.js.map
}
// default/src/hmr.js
$fsx.f[33] = (module, exports) => {
Object.defineProperty(exports, "__esModule", { value: true });
const custom_elements_hmr_polyfill_1 = $fsx.r(10);
const core_1 = $fsx.r(32);
core_1.clearInstance(null);
custom_elements_hmr_polyfill_1.rerenderInnerHTML();
custom_elements_hmr_polyfill_1.applyPolyfill(custom_elements_hmr_polyfill_1.ReflowStrategy.NONE, 0, (elementName) => {
    console.log('updated', elementName);
});
//# sourceMappingURL=hmr.js.map
}
// default/src/app.js
$fsx.f[332] = (module, exports) => {
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = $fsx.r(11);
const core_1 = $fsx.r(32);
const cytoscapeHelper_1 = $fsx.r(330);
const lit_html_1 = $fsx.r(27);
const dummydata_1 = $fsx.r(331);
let App = class App extends HTMLElement {
    constructor(cytoscape) {
        super();
        this.copyright = "Copyright (c) 2018 Vegar Ringdal <vegar.ringdal@gmail.com>";
        this.textArea = "";
        this.showTools = "";
        this.verticalDraw = true;
        this.testCables = dummydata_1.dummydata;
        this.cytoscape = cytoscape;
    }
    showConfig() {
        this.showTools = "";
    }
    hideConfig() {
        this.showTools = "none";
    }
    setImage() {
        this.cytoscape.setImage();
    }
    generateImage() {
        const jpg64 = this.cytoscape.cy.png({ full: true, scale: 3 });
        const image = new Image();
        image.src = jpg64;
        const w = window.open("");
        w.document.write(image.outerHTML);
    }
    generate() {
        this.hideConfig();
        let cables = [];
        if (this.textArea !== "") {
            let lines = this.textArea.split("\n");
            lines.forEach((line, index) => {
                let columns = line.split("\t");
                if (columns.length === 1) {
                    columns = line.split(";");
                    if (columns.length === 1) {
                        columns = line.split("    ");
                    }
                }
                if (columns[0]) {
                    cables.push({
                        tag: columns[0] || "NA",
                        tagFrom: columns[1] || "NAfrom" + index,
                        tagTo: columns[2] || "NAto" + index,
                        type: columns[3] || "NA",
                        areaFrom: columns[4] || "NA",
                        areaTo: columns[5] || "NA"
                    });
                }
            });
        }
        let cablesOption = cables.length ? cables : this.testCables;
        this.cytoscape.generate(cablesOption, this.verticalDraw);
    }
    render() {
        return lit_html_1.html `
      <header class="flex flex-col flex-shrink-0 border-b">
        <h1 class="flex-1 p-2 text-3xl">Block Generator</h1>
        <h5 class=" p-2 text" >${this.copyright}</h5>
      </header>

      <div class="flex flex-row flex-grow">
        <div class="flex-col p-2  border-r">
          <button
            class="bg-indigo-500 white p-2 m-2 rounded"
            @click=${this.generate}
          >
            Generate block
          </button>
          <div>
            <label class="p-2"
              ><input
                type="checkbox"
                .checked=${this.verticalDraw}
                @click=${(e) => {
            this.verticalDraw = e.target.checked;
        }}
              />
              vertical block
            </label>
          </div>
          <div>
            <p class="ml-2">
              Paste in tab delimited data with these columns
              <br />
              (copy from excel..)
            </p>
            <ul class="ml-2 p-5 list-disc">
              <li>Tag</li>
              <li>TagFrom</li>
              <li>TagTo</li>
              <li>CableType</li>
              <li>AreaFrom</li>
              <li>AreaTo</li>
            </ul>
          </div>
          <textarea placeholder="Generator will use dummy data if nothing is added." class="m-2 w-56 h-56"></textarea>
        </div>

        <div class="p-1 side"><div id="cy"></div></div>
      </div>
    `;
    }
};
tslib_1.__decorate([
    core_1.property(),
    tslib_1.__metadata("design:type", Object)
], App.prototype, "showTools", void 0);
App = tslib_1.__decorate([
    core_1.inject(cytoscapeHelper_1.CytoscapeHelper),
    core_1.customElement("app-root"),
    tslib_1.__metadata("design:paramtypes", [Object])
], App);
exports.App = App;
//# sourceMappingURL=app.js.map
}
// default/src/cytoscapeHelper.js
$fsx.f[330] = (module, exports) => {
Object.defineProperty(exports, "__esModule", { value: true });
const cytoscape = $fsx.r(38);
const cytoscapeDagre = $fsx.r(329);
cytoscape.use(cytoscapeDagre);
class CytoscapeHelper {
    constructor() {
        this.dagreLayout = {
            name: 'dagre',
            nodeSep: 50,
            edgeSep: 10,
            rankSep: 50,
            rankDir: 'TB',
            minLen: function () {
                return 0.5;
            },
            edgeWeight: function () {
                return 1;
            },
            fit: true,
            padding: 20,
            animate: false,
            animationDuration: 500,
            animationEasing: undefined,
            boundingBox: undefined,
            ready: function () {
            },
            stop: function () {
            }
        };
    }
    generate(cables, toToBottom) {
        this.dagreLayout.rankDir = toToBottom ? 'TB' : 'LR';
        this.createCY();
        this.addStyle();
        this.createData(cables);
        this.setLayout();
    }
    createCY() {
        this.cy = cytoscape({
            container: document.getElementById('cy'),
            wheelSensitivity: 0.1
        });
    }
    createData(cables) {
        let addedEq = new Set();
        let nodes = [];
        let edges = [];
        cables.forEach((cable, i) => {
            let tag = cable.tag;
            let cableType = cable.type;
            let areaFrom = cable.areaFrom;
            let areaTo = cable.areaTo;
            let tagFrom = cable.tagFrom;
            let tagTo = cable.tagTo;
            if (!addedEq.has(tagFrom)) {
                addedEq.add(tagFrom);
                if (!addedEq.has(areaFrom)) {
                    addedEq.add(areaFrom);
                    nodes.push({
                        data: {
                            id: areaFrom
                        }
                    });
                }
                nodes.push({
                    data: {
                        id: tagFrom,
                        parent: areaFrom
                    }
                });
            }
            if (!addedEq.has(tagTo)) {
                addedEq.add(tagTo);
                if (!addedEq.has(areaTo)) {
                    addedEq.add(areaTo);
                    nodes.push({
                        data: {
                            id: areaTo
                        }
                    });
                }
                nodes.push({
                    data: {
                        id: tagTo,
                        parent: areaTo
                    }
                });
            }
            let cableID = tag + '\n' + cableType + ' ';
            nodes.push({
                data: {
                    id: cableID,
                    parent: areaTo,
                    type: 'cableTag'
                }
            });
            let X = i + 'pointX' + i;
            nodes.push({
                data: {
                    id: X,
                    parent: areaTo,
                    type: 'bendPoint'
                }
            });
            let edgeID01 = tagFrom + X + i;
            edges.push({
                data: {
                    id: edgeID01,
                    source: tagFrom,
                    target: X,
                    type: 'bendPoint'
                }
            });
            let edgeID02 = X + cableID + i;
            edges.push({
                data: {
                    id: edgeID02,
                    source: X,
                    target: cableID,
                    type: 'bendPoint'
                }
            });
            let edgeID03 = cableID + tagTo + i;
            edges.push({
                data: {
                    id: edgeID03,
                    source: cableID,
                    target: tagTo,
                    customType: 'line'
                }
            });
        });
        this.cy.add({
            nodes: nodes,
            edges: edges
        });
    }
    addStyle() {
        this.cy.style()
            .resetToDefault()
            .selector('node')
            .css({
            'content': 'data(id)',
            'text-valign': 'center',
            'text-halign': 'center',
            'shape': 'rectangle',
            'background-color': 'white',
            'border-width': '1',
            'border-color': '#ccc',
            'width': '150',
            'height': '18',
            'font-size': 11
        })
            .selector('node[type = "bendPoint"]')
            .css({
            'width': '1px',
            'height': '1px',
            'label': 'data(none)'
        })
            .selector('$node > node')
            .css({
            'padding-top': '10px',
            'padding-left': '10px',
            'margin-left': '40px',
            'padding-bottom': '10px',
            'padding-right': '10px',
            'text-valign': 'top',
            'text-halign': 'left',
            'background-color': 'white'
        })
            .selector('edge')
            .css({
            'target-arrow-shape': 'triangle',
            'curve-style': 'bezier'
        })
            .selector('edge')
            .css({
            'width': 1,
            'line-color': '#ccc',
            'text-wrap': 'wrap',
            'font-size': 10
        })
            .selector('edge[type = "bendPoint" ]')
            .css({
            'width': 1,
            'target-arrow-shape': 'none',
            'opacity': 1,
            'label': 'data(none)'
        })
            .selector('node[type = "cableTag" ]')
            .css({
            'width': 100,
            'target-arrow-shape': 'none',
            'opacity': 1,
            'border-width': '0',
            'background-color': 'white',
            'text-wrap': 'wrap',
            'font-size': 10,
            'label': 'data(id)'
        });
    }
    setLayout() {
        this.cy.layout(this.dagreLayout).run();
    }
}
exports.CytoscapeHelper = CytoscapeHelper;
//# sourceMappingURL=cytoscapeHelper.js.map
}
// default/src/dummydata.js
$fsx.f[331] = (module, exports) => {
Object.defineProperty(exports, "__esModule", { value: true });
exports.dummydata = [
    {
        tag: "R-82-7895_01",
        tagFrom: "Dist_board",
        tagTo: "JUNCTION_BOX_1",
        type: "BFOU-2x4mm2",
        areaFrom: "LV Room",
        areaTo: "Hall"
    },
    {
        tag: "R-82-7895_02",
        tagFrom: "JUNCTION_BOX_1",
        tagTo: "LIGHT_02",
        type: "BFOU-2x2.5mm2",
        areaFrom: "Hall",
        areaTo: "Hall"
    },
    {
        tag: "R-82-7895_04",
        tagFrom: "JUNCTION_BOX_1",
        tagTo: "LIGHT_04",
        type: "BFOU-2x2.5mm2",
        areaFrom: "Hall",
        areaTo: "Office_1"
    },
    {
        tag: "R-82-7895_07",
        tagFrom: "JUNCTION_BOX_1",
        tagTo: "LIGHT_07",
        type: "BFOU-2x2.5mm2",
        areaFrom: "Hall",
        areaTo: "Office_2"
    },
    {
        tag: "R-82-7895_12",
        tagFrom: "JUNCTION_BOX_1",
        tagTo: "LIGHT_12",
        type: "BFOU-2x2.5mm2",
        areaFrom: "Hall",
        areaTo: "Office_3"
    },
    {
        tag: "R-82-7895_03",
        tagFrom: "LIGHT_02",
        tagTo: "LIGHT_03",
        type: "BFOU-2x2.5mm2",
        areaFrom: "Hall",
        areaTo: "Hall"
    },
    {
        tag: "R-82-7895_05",
        tagFrom: "LIGHT_04",
        tagTo: "LIGHT_05",
        type: "BFOU-2x2.5mm2",
        areaFrom: "Office_1",
        areaTo: "Office_1"
    },
    {
        tag: "R-82-7895_06",
        tagFrom: "LIGHT_05",
        tagTo: "LIGHT_06",
        type: "BFOU-2x2.5mm2",
        areaFrom: "Office_1",
        areaTo: "Office_1"
    },
    {
        tag: "R-82-7895_08",
        tagFrom: "LIGHT_07",
        tagTo: "LIGHT_08",
        type: "BFOU-2x2.5mm2",
        areaFrom: "Office_2",
        areaTo: "Office_2"
    },
    {
        tag: "R-82-7895_09",
        tagFrom: "LIGHT_08",
        tagTo: "LIGHT_09",
        type: "BFOU-2x2.5mm2",
        areaFrom: "Office_2",
        areaTo: "Office_2"
    },
    {
        tag: "R-82-7895_10",
        tagFrom: "LIGHT_08",
        tagTo: "LIGHT_10",
        type: "BFOU-2x2.5mm2",
        areaFrom: "Office_2",
        areaTo: "Office_2"
    },
    {
        tag: "R-82-7895_11",
        tagFrom: "LIGHT_10",
        tagTo: "LIGHT_11",
        type: "BFOU-2x2.5mm2",
        areaFrom: "Office_2",
        areaTo: "Office_2"
    },
    {
        tag: "R-82-7895_13",
        tagFrom: "LIGHT_12",
        tagTo: "LIGHT_13",
        type: "BFOU-2x2.5mm2",
        areaFrom: "Office_3",
        areaTo: "Office_3"
    }
];
//# sourceMappingURL=dummydata.js.map
}
// Importing a single entry
$fsx.r(333);
//# sourceMappingURL=app.js.map