import { IElement, inject } from 'mframejs';
import { CytoscapeHelper } from './cytoscapeHelper';
import './index.css';



@inject(CytoscapeHelper)
export class App implements IElement {
    // references to this $element and parent
    public $element: IElement;
    public $parent: IElement;
    public copyright = 'Copyright (c) 2018 Vegar Ringdal vegar.ringdal@gmail.com';
    public textArea = '';
    public showTools = true;
    public toToBottom = true;
    public cytoscape: any;

    // for testing purposes so it generates something without data
    public testCables: any = [
        { tag: 'R-82-7895_01', tagFrom: 'Dist_board', tagTo: 'JUNCTION_BOX_1', type: 'BFOU-2x4mm2', areaFrom: 'LV Room', areaTo: 'Hall' },
        { tag: 'R-82-7895_02', tagFrom: 'JUNCTION_BOX_1', tagTo: 'LIGHT_02', type: 'BFOU-2x2.5mm2', areaFrom: 'Hall', areaTo: 'Hall' },
        { tag: 'R-82-7895_04', tagFrom: 'JUNCTION_BOX_1', tagTo: 'LIGHT_04', type: 'BFOU-2x2.5mm2', areaFrom: 'Hall', areaTo: 'Office_1' },
        { tag: 'R-82-7895_07', tagFrom: 'JUNCTION_BOX_1', tagTo: 'LIGHT_07', type: 'BFOU-2x2.5mm2', areaFrom: 'Hall', areaTo: 'Office_2' },
        { tag: 'R-82-7895_12', tagFrom: 'JUNCTION_BOX_1', tagTo: 'LIGHT_12', type: 'BFOU-2x2.5mm2', areaFrom: 'Hall', areaTo: 'Office_3' },
        { tag: 'R-82-7895_03', tagFrom: 'LIGHT_02', tagTo: 'LIGHT_03', type: 'BFOU-2x2.5mm2', areaFrom: 'Hall', areaTo: 'Hall' },
        { tag: 'R-82-7895_05', tagFrom: 'LIGHT_04', tagTo: 'LIGHT_05', type: 'BFOU-2x2.5mm2', areaFrom: 'Office_1', areaTo: 'Office_1' },
        { tag: 'R-82-7895_06', tagFrom: 'LIGHT_05', tagTo: 'LIGHT_06', type: 'BFOU-2x2.5mm2', areaFrom: 'Office_1', areaTo: 'Office_1' },
        { tag: 'R-82-7895_08', tagFrom: 'LIGHT_07', tagTo: 'LIGHT_08', type: 'BFOU-2x2.5mm2', areaFrom: 'Office_2', areaTo: 'Office_2' },
        { tag: 'R-82-7895_09', tagFrom: 'LIGHT_08', tagTo: 'LIGHT_09', type: 'BFOU-2x2.5mm2', areaFrom: 'Office_2', areaTo: 'Office_2' },
        { tag: 'R-82-7895_10', tagFrom: 'LIGHT_08', tagTo: 'LIGHT_10', type: 'BFOU-2x2.5mm2', areaFrom: 'Office_2', areaTo: 'Office_2' },
        { tag: 'R-82-7895_11', tagFrom: 'LIGHT_10', tagTo: 'LIGHT_11', type: 'BFOU-2x2.5mm2', areaFrom: 'Office_2', areaTo: 'Office_2' },
        { tag: 'R-82-7895_13', tagFrom: 'LIGHT_12', tagTo: 'LIGHT_13', type: 'BFOU-2x2.5mm2', areaFrom: 'Office_3', areaTo: 'Office_3' }
    ];


    constructor(cytoscape: any) {
        this.cytoscape = cytoscape;
    }


    public loadTemplate() {
        return require('./app.html');
    }


    public showConfig() {
        this.showTools = true;
    }


    public setImage() {
        this.cytoscape.setImage();
    }

    public generateImage() {
        const jpg64 = this.cytoscape.cy.png({ full: true, scale: 3 });
        const image = new Image();
        image.src = jpg64;
        const w = window.open('');
        w.document.write(image.outerHTML);
    }


    public generate() {


        let cables: any = [];
        if (this.textArea !== '') {

            let lines = this.textArea.split('\n');
            lines.forEach((line) => {
                let columns = line.split('\t');
                if (columns.length === 1) {
                    columns = line.split(';');
                    if (columns.length === 1) {
                        columns = line.split('    ');
                    }
                }
                cables.push({
                    tag: columns[0] || 'NA',
                    tagFrom: columns[1] || 'NA',
                    tagTo: columns[2] || 'NA',
                    type: columns[3] || 'NA',
                    areaFrom: columns[4] || 'NA',
                    areaTo: columns[5] || 'NA'
                });
            });
        }

        this.showTools = false;
        let cablesOption = cables.length ? cables : this.testCables;
        this.cytoscape.generate(cablesOption, this.toToBottom);
    }






}
