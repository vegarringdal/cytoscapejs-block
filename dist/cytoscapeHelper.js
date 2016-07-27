"use strict";

System.register([], function (_export, _context) {
  "use strict";

  var CytoscapeHelper;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [],
    execute: function () {
      _export("CytoscapeHelper", CytoscapeHelper = function () {
        function CytoscapeHelper() {
          _classCallCheck(this, CytoscapeHelper);

          this.dagreLayout = {
            name: 'dagre',

            nodeSep: 50,
            edgeSep: 10,
            rankSep: 50,
            rankDir: 'TB',
            minLen: function minLen(edge) {
              return 1;
            },
            edgeWeight: function edgeWeight(edge) {
              return 1;
            },
            fit: true,
            padding: 20,
            animate: false,
            animationDuration: 500,
            animationEasing: undefined,
            boundingBox: undefined,
            ready: function ready() {},
            stop: function stop() {} };
          this.cosebilkentLayout = {
            name: 'cose-bilkent',

            ready: function ready() {},

            stop: function stop() {},

            fit: true,

            padding: 10,

            randomize: true,

            nodeRepulsion: 4500,

            idealEdgeLength: 200,

            edgeElasticity: 0.45,
            nestingFactor: 0.1,

            gravity: 0.9,

            numIter: 2500,

            tile: true,

            animate: 'end',

            tilingPaddingVertical: 100,

            tilingPaddingHorizontal: 100,

            gravityRangeCompound: 1.5,

            gravityCompound: 1.0,

            gravityRange: 3.8
          };
        }

        CytoscapeHelper.prototype.generate = function generate(cables) {
          this.createCY();
          this.addStyle();
          this.createData(cables);
          this.setLayout();
        };

        CytoscapeHelper.prototype.createCY = function createCY() {
          this.cy = cytoscape({
            container: document.getElementById('cy'),
            wheelSensitivity: 0.1
          });
        };

        CytoscapeHelper.prototype.createData = function createData(cables) {

          var addedEq = new Set();
          var nodes = [];
          var edges = [];
          var tags = [];
          var parent = "NA";

          cables.forEach(function (cable, i) {
            if (!addedEq.has(cable.tagFrom)) {
              addedEq.add(cable.tagFrom);

              parent = cable.areaFrom || "NA";

              if (!addedEq.has(parent)) {
                nodes.push({
                  data: {
                    id: parent
                  }
                });
              }

              nodes.push({
                data: {
                  id: cable.tagFrom,
                  parent: parent
                }
              });
            }

            if (!addedEq.has(cable.tagTo)) {
              addedEq.add(cable.tagTo);

              parent = parent = cable.areaTo || "NA";

              if (!addedEq.has(parent)) {
                nodes.push({
                  data: {
                    id: parent
                  }
                });
              }

              nodes.push({
                data: {
                  id: cable.tagTo,
                  parent: parent
                }
              });
            }

            parent = parent = cable.areaTo || "NA";
            nodes.push({
              data: {
                id: cable.tagFrom + cable.tagTo + i,
                parent: parent,
                type: "bendPoint"
              }
            });

            edges.push({
              data: {
                id: cable.tag + 'x' + cable.tagTo + i,
                source: cable.tagFrom,
                target: cable.tagFrom + cable.tagTo + i,
                type: "bendPoint"
              }
            });

            edges.push({
              data: {
                id: cable.tag + '\n' + cable.type,
                source: cable.tagFrom + cable.tagTo + i,
                target: cable.tagTo
              }
            });
          });

          this.cy.add({
            nodes: nodes,
            edges: edges
          });
        };

        CytoscapeHelper.prototype.addStyle = function addStyle() {
          this.cy.style().resetToDefault().selector('node').css({
            'content': 'data(id)',
            'text-valign': 'center',
            'text-halign': 'center',
            'shape': 'rectangle',
            'width': "150",
            'height': "18",
            "font-size": 11
          }).selector('node[type = "bendPoint"]').css({
            'width': '8.00001px',
            'height': '8.00001px',
            'label': 'data(none)'
          }).selector('$node > node').css({
            'padding-top': '10px',
            'padding-left': '10px',
            'margin-left': '40px',
            'padding-bottom': '10px',
            'padding-right': '10px',
            'text-valign': 'top',
            'text-halign': 'left',
            'background-color': 'white'
          }).selector('edge').css({
            'target-arrow-shape': 'triangle',
            'curve-style': 'bezier'
          }).selector('edge').css({
            'label': 'data(id)',
            'width': 1,
            'line-color': '#ccc',

            'text-wrap': 'wrap',
            "font-size": 10
          }).selector('edge[type = "bendPoint" ]').css({
            'width': 1,
            'target-arrow-shape': 'none',
            'opacity': 1,
            'label': 'data(none)'
          });
        };

        CytoscapeHelper.prototype.setLayout = function setLayout() {
          this.cy.layout(this.dagreLayout);
        };

        return CytoscapeHelper;
      }());

      _export("CytoscapeHelper", CytoscapeHelper);
    }
  };
});
//# sourceMappingURL=cytoscapeHelper.js.map
