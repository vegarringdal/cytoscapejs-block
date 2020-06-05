import { customElement, property } from "@simple-html/core";
import { CytoscapeHelper } from "./cytoscapeHelper";
import { html } from "lit-html";
import { dummydata } from "./dummydata";


@customElement("app-root")
export class App extends HTMLElement {
  // references to this $element and parent
  public copyright = "Copyright (c) 2018 Vegar Ringdal <vegar.ringdal@gmail.com>";
  public textArea = "";
  @property() public showTools = "";
  public verticalDraw = true;

  public cytoscape: any;

  // for testing purposes so it generates something without data
  public testCables: any = dummydata;

  constructor() {
    super();
    this.cytoscape = new CytoscapeHelper();
  }

  public showConfig() {
    this.showTools = "";
  }

  public hideConfig() {
    this.showTools = "none";
  }

  public setImage() {
    this.cytoscape.setImage();
  }

  public generateImage() {
    const jpg64 = this.cytoscape.cy.png({ full: true, scale: 3 });
    const image = new Image();
    image.src = jpg64;
    const w = window.open("");
    w.document.write(image.outerHTML);
  }

  public generate() {
    this.hideConfig();
    let cables: any = [];
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
    return html`
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
                @click=${(e:any) => {
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
          <textarea placeholder="Generator will use dummy data if nothing is added." class="m-2 w-56 h-56" @change=${(e:any)=>{this.textArea = e.target.value}}></textarea>
        </div>

        <div class="p-1 side"><div id="cy"></div></div>
      </div>
    `;
  }
}
