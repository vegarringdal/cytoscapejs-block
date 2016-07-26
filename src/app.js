import {inject} from 'aurelia-framework'
import {CytoscapeHelper} from './cytoscapeHelper'

@inject(CytoscapeHelper)
export class App {

  textArea = "";
  showTools = true;


  showConfig(){
    this.showTools = true;
  }


  setImage(){
    this.cytoscape.setImage()
  }


  generateImage(){
    var jpg64 = this.cytoscape.cy.png({full:true, scale:3});
    var x = document.getElementById("image")
    x.src = jpg64
    window.open(x.src, '_blank');
    x.src = ""
  }


  generate(){


    let cables = [];
    if(this.textArea !== ""){

      let lines = this.textArea.split('\n');
      lines.forEach((line)=>{
        let columns = line.split("\t");
        if(columns.length === 1){
          columns = line.split(";"); //maybe we are using semi column
          if(columns.length === 1){
          columns = line.split("    "); //for broken tab
        }
        }
        switch(columns.length){
          case 3:
            cables.push({tag:columns[0], tagFrom:columns[1], tagTo:columns[2], type:"NA", areaFrom:"NA", areaTo:"NA"});
            break;
          case 4:
            cables.push({tag:columns[0], tagFrom:columns[1], tagTo:columns[2], type:columns[3], areaFrom:"NA", areaTo:"NA"});
            break;
          case 5:
            cables.push({tag:columns[0], tagFrom:columns[1], tagTo:columns[2], type:columns[3], areaFrom:columns[4], areaTo:"NA"});
            break;
          case 6:
            cables.push({tag:columns[0], tagFrom:columns[1], tagTo:columns[2], type:columns[3], areaFrom:columns[4], areaTo:columns[5]});
            break;
          default:
        }
      })
    }

    this.showTools = false;
    let cablesOption = cables.length ? cables : this.testCables;
    this.cytoscape.generate(cablesOption);
  }


  //for testing purposes
  testCables = [
    {tag:"cable1", tagFrom:"light_01", tagTo:"light_02", type:"BFOU-2x4mm2", areaFrom:"LV Room", areaTo:"Office_1"},
    {tag:"cable2", tagFrom:"light_02", tagTo:"light_03", type:"BFOU-2x2.5mm2", areaFrom:"Office_1", areaTo:"Office_1"},
    {tag:"cable3", tagFrom:"light_03", tagTo:"light_04", type:"BFOU-2x2.5mm2", areaFrom:"Office_1", areaTo:"Office_2"},
    {tag:"cable4", tagFrom:"light_04", tagTo:"light_05", type:"BFOU-2x2.5mm2", areaFrom:"Office_2", areaTo:"Office_2"},
    {tag:"cable5", tagFrom:"light_05", tagTo:"light_06", type:"BFOU-2x2.5mm2", areaFrom:"Office_2", areaTo:"Office_3"},
    {tag:"cable6", tagFrom:"light_06", tagTo:"light_07", type:"BFOU-2x2.5mm2", areaFrom:"Office_3", areaTo:"Office_3"},
    {tag:"cable7", tagFrom:"light_07", tagTo:"light_08", type:"BFOU-2x2.5mm2", areaFrom:"Office_3", areaTo:"Office_3"},
    {tag:"cable9", tagFrom:"light_07", tagTo:"light_010", type:"BFOU-2x2.5mm2", areaFrom:"Office_3", areaTo:"Office_4"},
    {tag:"cable8", tagFrom:"light_08", tagTo:"light_09", type:"BFOU-2x2.5mm2", areaFrom:"Office_4", areaTo:"Office_4"}
  ]


  constructor(cytoscape){
    this.cytoscape = cytoscape;
  }

}
