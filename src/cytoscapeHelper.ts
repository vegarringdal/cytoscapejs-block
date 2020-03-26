//@ts-ignore
const cytoscape = require('cytoscape');
//@ts-ignore
const cytoscapeDagre = require('cytoscape-dagre');
cytoscape.use(cytoscapeDagre);

export class CytoscapeHelper {

    public cy: any;


    /********************************************
     *  1 extra layout not in cytoscape by default
     * ******************************************/
    public dagreLayout: any = {
        name: 'dagre',
        // dagre algo options, uses default value on undefined
        nodeSep: 50, // undefined, // the separation between adjacent nodes in the same rank
        edgeSep: 10, // undefined, // the separation between adjacent edges in the same rank
        rankSep: 50, // undefined, // the separation between adjacent nodes in the same rank
        rankDir: 'TB', // undefined, // 'TB' for top to bottom flow, 'LR' for left to right
        minLen: function (/*edge*/) {
            return 0.5;
        }, // number of ranks to keep between the source and target of the edge
        edgeWeight: function (/*edge*/) {
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
            // na
        }, // on layoutready
        stop: function () {
            // na
        } // on layoutstop
    };



    /********************************************
     *  call to generate
     * ******************************************/
    public generate(cables: any, toToBottom: any) {

        this.dagreLayout.rankDir = toToBottom ? 'TB' : 'LR';

        this.createCY();
        this.addStyle();
        this.createData(cables);
        this.setLayout();
    }


    /********************************************
     *  creates the cy element
     * ******************************************/
    public createCY() {


        this.cy = cytoscape({
            container: document.getElementById('cy'),
            wheelSensitivity: 0.1
        });
    }


    /********************************************
     *  creates the data nodes/edges
     * ******************************************/
    public createData(cables: any[]) {

        // this is not very good atm, but works..

        let addedEq = new Set();
        let nodes: any = [];
        let edges: any = [];


        // loop the cable tags
        cables.forEach((cable: any, i: number) => {

            // variables
            let tag = cable.tag;
            let cableType = cable.type;
            let areaFrom = cable.areaFrom;
            let areaTo = cable.areaTo;
            let tagFrom = cable.tagFrom;
            let tagTo = cable.tagTo;


            //
            // check if equipment in tag from is added as node
            //
            if (!addedEq.has(tagFrom)) {
                addedEq.add(tagFrom);


                // add area from node *
                if (!addedEq.has(areaFrom)) {
                    addedEq.add(areaFrom);
                    nodes.push({
                        data: {
                            id: areaFrom
                        }
                    });
                }


                // add from-tag node *
                nodes.push({
                    data: {
                        id: tagFrom,
                        parent: areaFrom
                    }
                });
            }



            //
            // check if equipment is added as node
            //
            if (!addedEq.has(tagTo)) {
                addedEq.add(tagTo);



                // add areato node *
                if (!addedEq.has(areaTo)) {
                    addedEq.add(areaTo);
                    nodes.push({
                        data: {
                            id: areaTo
                        }
                    });
                }


                // add to-tag node *
                nodes.push({
                    data: {
                        id: tagTo,
                        parent: areaTo
                    }
                });
            }

            //
            // add cable node *
            //
            let cableID = tag + '\n' + cableType + ' ';
            nodes.push({
                data: {
                    id: cableID,
                    parent: areaTo,
                    type: 'cableTag'
                }
            });


            //
            // add x node *
            //
            let X = i + 'pointX' + i;
            nodes.push({
                data: {
                    id: X,
                    parent: areaTo,
                    type: 'bendPoint'
                }
            });


            // create edges
            // fromtag --->  X ---> cableID ---> toTag

            // fromtag --->  X
            let edgeID01 = tagFrom + X + i;
            edges.push({
                data: {
                    id: edgeID01,
                    source: tagFrom,
                    target: X,
                    type: 'bendPoint'

                }
            });


            // X ---> cableID
            let edgeID02 = X + cableID + i;
            edges.push({
                data: {
                    id: edgeID02,
                    source: X,
                    target: cableID,
                    type: 'bendPoint'
                }
            });


            // cableID ---> toTag
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

        // set edges and nodes to cytoscape
        this.cy.add({
            nodes: nodes,
            edges: edges
        });


    }


    /********************************************
     *  adds the style
     * ******************************************/
    public addStyle() {
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

            // .selector()
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


    /********************************************
     *  sets the layout
     * ******************************************/
    public setLayout() {
        this.cy.layout(this.dagreLayout).run();
    }


}
