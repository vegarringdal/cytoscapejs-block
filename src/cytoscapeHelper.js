export class CytoscapeHelper {


  /********************************************
   *  call to generate
   * ******************************************/
  generate(cables, toToBottom) {

    this.dagreLayout.rankDir= toToBottom ? 'TB':'LR'

    this.createCY();
    this.addStyle();
    this.createData(cables);
    this.setLayout();
  }


  /********************************************
   *  creates the cy element
   * ******************************************/
  createCY() {
    this.cy = cytoscape({
      container: document.getElementById('cy'),
      wheelSensitivity: 0.1
    });
  }


  /********************************************
   *  creates the data nodes/edges
   * ******************************************/
  createData(cables) {
    
    //this is not very good atm, but works..

    let addedEq = new Set();
    let nodes = [];
    let edges = [];
    let tags = [];
    let parent = "NA";

    //loop the cable tags
    cables.forEach((cable, i)=> {

      //check if equipment in tag from is added as node
      if (!addedEq.has(cable.tagFrom)) {
        addedEq.add(cable.tagFrom);

        //find out if we have parent "room number"
        parent = cable.areaFrom || "NA";

        //if we havent added that from before then lets add it
        if (!addedEq.has(parent)) {
          nodes.push({
            data: {
              id: parent
            }
          })
        }

        //create main node with parent
        nodes.push({
          data: {
            id: cable.tagFrom,
            parent: parent
          }
        })
      }

      //check if equipment is added as node
      if (!addedEq.has(cable.tagTo)) {
        addedEq.add(cable.tagTo);

        //find out if we have parent "room number"
        parent = parent = cable.areaTo || "NA";

        //if we havent added that from before then lets add it
        if (!addedEq.has(parent)) {
          nodes.push({
            data: {
              id: parent
            }
          })
        }

        //create main node with parent
        nodes.push({
          data: {
            id: cable.tagTo,
            parent: parent
          }
        })
      }

      parent = parent = cable.areaTo || "NA";
      nodes.push({
        data: {
          id: cable.tag + '\n' + cable.type + " ",
          parent: parent,
          type: "test"
        }
      });


      //create edge
      edges.push({
        data: {
          id: cable.tag + 'x' + cable.tagTo + i,
          source: cable.tagFrom,
          target: cable.tag + '\n' + cable.type + " ",
          type: "bendPoint"
        }
      });

      edges.push({
        data: {
          id: cable.tag + '\n' + cable.type,
          source: cable.tag + '\n' + cable.type + " ",
          target: cable.tagTo
        }
      })


    });

    //set edges and nodes to cytoscape
    this.cy.add({
      nodes: nodes,
      edges: edges
    })


  }


  /********************************************
   *  adds the style
   * ******************************************/
  addStyle() {
    this.cy.style()
      .resetToDefault()
      .selector('node')
      .css({
        'content': 'data(id)',
        'text-valign': 'center',
        'text-halign': 'center',
        'shape': 'rectangle',
        'width': "150",
        'height': "18",
        "font-size": 11
      })
      .selector('node[type = "bendPoint"]')
      .css({
        'width': '8.00001px',
        'height': '8.00001px',
        'label': 'data(none)'
      })

      //.selector()
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
        //'label': 'data(id)',
        'width': 1,
        'line-color': '#ccc',
        //'edge-text-rotation': 'autorotate',
        'text-wrap': 'wrap',
        "font-size": 10
      })
      /*.selector('selected')
       .css({
       'background-color': 'black',
       'line-color': 'black',
       'target-arrow-color': 'black',
       'source-arrow-color': 'black'
       })*/
      .selector('edge[type = "bendPoint" ]')
      .css({
        'width': 1,
        'target-arrow-shape': 'none',
        'opacity': 1,
        'label': 'data(none)'
      })
      .selector('node[type = "test" ]')
      .css({
        'width': 100,
        'target-arrow-shape': 'none',
        'opacity': 1,
        'background-color': 'white',
        'text-wrap': 'wrap',
        "font-size": 10,
        'label': 'data(id)'
      })
  }


  /********************************************
   *  sets the layout
   * ******************************************/
  setLayout() {
    this.cy.layout(this.dagreLayout)
  }


  /********************************************
   *  1 extra layout not in cytoscape by default
   * ******************************************/
  dagreLayout = {
    name: 'dagre',
    // dagre algo options, uses default value on undefined
    nodeSep: 50,//undefined, // the separation between adjacent nodes in the same rank
    edgeSep: 10,//undefined, // the separation between adjacent edges in the same rank
    rankSep: 50,//undefined, // the separation between adjacent nodes in the same rank
    rankDir: 'TB',//undefined, // 'TB' for top to bottom flow, 'LR' for left to right
    minLen: function (edge) {
      return 1;
    }, // number of ranks to keep between the source and target of the edge
    edgeWeight: function (edge) {
      return 1;
    }, // higher weight edges are generally made shorter and straighter than lower weight edges

    // general layout options
    fit: true, // whether to fit to viewport
    padding: 20, // fit padding
    animate: false, // whether to transition the node positions
    animationDuration: 500, // duration of animation in ms if enabled
    animationEasing: undefined, // easing of animation if enabled
    boundingBox: undefined, // constrain layout bounds; { x1, y1, x2, y2 } or { x1, y1, w, h }
    ready: function () {
    }, // on layoutready
    stop: function () {
    } // on layoutstop
  };


  /********************************************
   *  1 extra layout not in cytoscape by default
   * ******************************************/
  cosebilkentLayout = {
    name: 'cose-bilkent',
    // Called on `layoutready`
    ready: function () {
    },
    // Called on `layoutstop`
    stop: function () {
    },
    // Whether to fit the network view after when done
    fit: true,
    // Padding on fit
    padding: 10,
    // Whether to enable incremental mode
    randomize: true,
    // Node repulsion (non overlapping) multiplier
    nodeRepulsion: 4500,
    // Ideal edge (non nested) length
    idealEdgeLength: 200,
    // Divisor to compute edge forces
    edgeElasticity: 0.45,//0.45,
    // Nesting factor (multiplier) to compute ideal edge length for nested edges
    nestingFactor: 0.1,
    // Gravity force (constant)
    gravity: 0.9,
    // Maximum number of iterations to perform
    numIter: 2500,
    // For enabling tiling
    tile: true,
    // Type of layout animation. The option set is {'during', 'end', false}
    animate: 'end',
    // Represents the amount of the vertical space to put between the zero degree members during the tiling operation(can also be a function)
    tilingPaddingVertical: 100,
    // Represents the amount of the horizontal space to put between the zero degree members during the tiling operation(can also be a function)
    tilingPaddingHorizontal: 100,
    // Gravity range (constant) for compounds
    gravityRangeCompound: 1.5,
    // Gravity force (constant) for compounds
    gravityCompound: 1.0,
    // Gravity range (constant)
    gravityRange: 3.8
  };


}
