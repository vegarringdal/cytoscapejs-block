import { IElement, inject } from 'mframejs';
import { CytoscapeHelper } from './cytoscapeHelper';



@inject(CytoscapeHelper)
export class App implements IElement {
    // references to this $element and parent
    public $element: IElement;
    public $parent: IElement;
    public title = 'My Empty Project';
    public textArea = '';
    public showTools = true;
    public toToBottom = true;
    public cytoscape: any;

    // for testing purposes so it generates something without data
    public testCables: any = [
        { tag: 'cable1', tagFrom: 'light_01', tagTo: 'light_02', type: 'BFOU-2x4mm2', areaFrom: 'LV Room', areaTo: 'Office_1' },
        { tag: 'cable2', tagFrom: 'light_02', tagTo: 'light_03', type: 'BFOU-2x2.5mm2', areaFrom: 'Office_1', areaTo: 'Office_1' },
        { tag: 'cable3', tagFrom: 'light_03', tagTo: 'light_04', type: 'BFOU-2x2.5mm2', areaFrom: 'Office_1', areaTo: 'Office_2' },
        { tag: 'cable4', tagFrom: 'light_04', tagTo: 'light_05', type: 'BFOU-2x2.5mm2', areaFrom: 'Office_2', areaTo: 'Office_2' },
        { tag: 'cable5', tagFrom: 'light_05', tagTo: 'light_06', type: 'BFOU-2x2.5mm2', areaFrom: 'Office_2', areaTo: 'Office_3' },
        { tag: 'cable6', tagFrom: 'light_06', tagTo: 'light_07', type: 'BFOU-2x2.5mm2', areaFrom: 'Office_3', areaTo: 'Office_3' },
        { tag: 'cable7', tagFrom: 'light_07', tagTo: 'light_08', type: 'BFOU-2x2.5mm2', areaFrom: 'Office_3', areaTo: 'Office_3' },
        { tag: 'cable9', tagFrom: 'light_07', tagTo: 'light_010', type: 'BFOU-2x2.5mm2', areaFrom: 'Office_3', areaTo: 'Office_4' },
        { tag: 'cable8', tagFrom: 'light_08', tagTo: 'light_09', type: 'BFOU-2x2.5mm2', areaFrom: 'Office_4', areaTo: 'Office_4' }
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
