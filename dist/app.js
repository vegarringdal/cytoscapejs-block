(function(FuseBox){FuseBox.$fuse$=FuseBox;
FuseBox.pkg("default", {}, function(___scope___){
___scope___.file("main.js", function(exports, require, module, __filename, __dirname){

Object.defineProperty(exports, "__esModule", { value: true });
require("./index.css");
var mframejs_1 = require("mframejs");
var app_1 = require("./app");
mframejs_1.configure(app_1.App).then(function (mf) {
    mf.start(document.body);
});
//# sourceMappingURL=main.js.map
});
___scope___.file("index.css", function(exports, require, module, __filename, __dirname){


require("fuse-box-css")("index.css", "body {\r\n    margin: 0;\r\n}\r\n")
});
___scope___.file("app.js", function(exports, require, module, __filename, __dirname){

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var mframejs_1 = require("mframejs");
var cytoscapeHelper_1 = require("./cytoscapeHelper");
var App = (function () {
    function App(cytoscape) {
        this.title = 'My Empty Project';
        this.textArea = '';
        this.showTools = true;
        this.toToBottom = true;
        this.testCables = [
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
        this.cytoscape = cytoscape;
    }
    App.prototype.loadTemplate = function () {
        return require('./app.html');
    };
    App.prototype.showConfig = function () {
        this.showTools = true;
    };
    App.prototype.setImage = function () {
        this.cytoscape.setImage();
    };
    App.prototype.generateImage = function () {
        var jpg64 = this.cytoscape.cy.png({ full: true, scale: 3 });
        var x = document.getElementById('image');
        x.src = jpg64;
        window.open(x.src, '_blank');
        x.src = '';
    };
    App.prototype.generate = function () {
        var cables = [];
        if (this.textArea !== '') {
            var lines = this.textArea.split('\n');
            lines.forEach(function (line) {
                var columns = line.split('\t');
                if (columns.length === 1) {
                    columns = line.split(';');
                    if (columns.length === 1) {
                        columns = line.split('    ');
                    }
                }
                switch (columns.length) {
                    case 3:
                        cables.push({ tag: columns[0], tagFrom: columns[1], tagTo: columns[2], type: 'NA', areaFrom: 'NA', areaTo: 'NA' });
                        break;
                    case 4:
                        cables.push({ tag: columns[0], tagFrom: columns[1], tagTo: columns[2], type: columns[3], areaFrom: 'NA', areaTo: 'NA' });
                        break;
                    case 5:
                        cables.push({ tag: columns[0], tagFrom: columns[1], tagTo: columns[2], type: columns[3], areaFrom: columns[4], areaTo: 'NA' });
                        break;
                    case 6:
                        cables.push({ tag: columns[0], tagFrom: columns[1], tagTo: columns[2], type: columns[3], areaFrom: columns[4], areaTo: columns[5] });
                        break;
                    default:
                }
            });
        }
        this.showTools = false;
        var cablesOption = cables.length ? cables : this.testCables;
        this.cytoscape.generate(cablesOption, this.toToBottom);
    };
    App = __decorate([
        mframejs_1.inject(cytoscapeHelper_1.CytoscapeHelper),
        __metadata("design:paramtypes", [Object])
    ], App);
    return App;
}());
exports.App = App;
//# sourceMappingURL=app.js.map
});
___scope___.file("cytoscapeHelper.js", function(exports, require, module, __filename, __dirname){

Object.defineProperty(exports, "__esModule", { value: true });
var CytoscapeHelper = (function () {
    function CytoscapeHelper() {
        this.dagreLayout = {
            name: 'dagre',
            nodeSep: 50,
            edgeSep: 10,
            rankSep: 50,
            rankDir: 'TB',
            minLen: function () {
                return 1;
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
        this.cosebilkentLayout = {
            name: 'cose-bilkent',
            ready: function () {
            },
            stop: function () {
            },
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
    CytoscapeHelper.prototype.generate = function (cables, toToBottom) {
        this.dagreLayout.rankDir = toToBottom ? 'TB' : 'LR';
        this.createCY();
        this.addStyle();
        this.createData(cables);
        this.setLayout();
    };
    CytoscapeHelper.prototype.createCY = function () {
        debugger;
        this.cy = cytoscape({
            container: document.getElementById('cy'),
            wheelSensitivity: 0.1
        });
    };
    CytoscapeHelper.prototype.createData = function (cables) {
        var addedEq = new Set();
        var nodes = [];
        var edges = [];
        var parent = 'NA';
        cables.forEach(function (cable, i) {
            if (!addedEq.has(cable.tagFrom)) {
                addedEq.add(cable.tagFrom);
                parent = cable.areaFrom || 'NA';
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
                parent = parent = cable.areaTo || 'NA';
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
            parent = parent = cable.areaTo || 'NA';
            nodes.push({
                data: {
                    id: cable.tag + '\n' + cable.type + ' ',
                    parent: parent,
                    type: 'test'
                }
            });
            edges.push({
                data: {
                    id: cable.tag + 'x' + cable.tagTo + i,
                    source: cable.tagFrom,
                    target: cable.tag + '\n' + cable.type + ' ',
                    type: 'bendPoint'
                }
            });
            edges.push({
                data: {
                    id: cable.tag + '\n' + cable.type,
                    source: cable.tag + '\n' + cable.type + ' ',
                    target: cable.tagTo
                }
            });
        });
        this.cy.add({
            nodes: nodes,
            edges: edges
        });
    };
    CytoscapeHelper.prototype.addStyle = function () {
        this.cy.style()
            .resetToDefault()
            .selector('node')
            .css({
            'content': 'data(id)',
            'text-valign': 'center',
            'text-halign': 'center',
            'shape': 'rectangle',
            'width': '150',
            'height': '18',
            'font-size': 11
        })
            .selector('node[type = "bendPoint"]')
            .css({
            'width': '8.00001px',
            'height': '8.00001px',
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
            .selector('node[type = "test" ]')
            .css({
            'width': 100,
            'target-arrow-shape': 'none',
            'opacity': 1,
            'background-color': 'white',
            'text-wrap': 'wrap',
            'font-size': 10,
            'label': 'data(id)'
        });
    };
    CytoscapeHelper.prototype.setLayout = function () {
        this.cy.layout(this.dagreLayout);
    };
    return CytoscapeHelper;
}());
exports.CytoscapeHelper = CytoscapeHelper;
//# sourceMappingURL=cytoscapeHelper.js.map
});
___scope___.file("app.html", function(exports, require, module, __filename, __dirname){

module.exports.default =  "<template>\r\n  <div id=\"tools\">\r\n    <button show.bind=\"!showTools\" click.delegate=\"showConfig()\">Show config</button>\r\n\r\n    <button show.bind=\"!showTools\" click.delegate=\"generateImage()\">generateImage</button>\r\n\r\n    <div class=\"col-md-12 col-md-offset-1\" if.bind=\"showTools\">\r\n      <h3>Block generator</h3>\r\n      <div class=\"row\">\r\n        <button click.delegate=\"generate()\">Generate</button>\r\n        <input type=\"checkbox\" checked.bind=\"toToBottom\">\r\n      </div>\r\n      <div class=\"row\">\r\n        <p>Paste in tab delimited data : Tag -> TagFrom -> TagTo -> CableType -> AreaFrom -> AreaTo</p>\r\n        <textarea style=\"width:600px;height:600px;border:1px solid\" value.bind=\"textArea\"></textarea>\r\n      </div>\r\n    </div>\r\n  </div>\r\n\r\n  <div show.bind=\"!showTools\" style=\"width:100%;height:100%\" id=\"cy\"></div>\r\n  <image id=\"image\"></image>\r\n</template>"
});
return ___scope___.entry = "main.ts";
});
FuseBox.pkg("fusebox-hot-reload", {}, function(___scope___){
___scope___.file("index.js", function(exports, require, module, __filename, __dirname){

"use strict";
/**
 * @module listens to `source-changed` socket events and actions hot reload
 */
Object.defineProperty(exports, "__esModule", { value: true });
var Client = require('fusebox-websocket').SocketClient, bundleErrors = {}, outputElement = document.createElement('div'), styleElement = document.createElement('style'), minimizeToggleId = 'fuse-box-toggle-minimized', hideButtonId = 'fuse-box-hide', expandedOutputClass = 'fuse-box-expanded-output', localStoragePrefix = '__fuse-box_';
function storeSetting(key, value) {
    localStorage[localStoragePrefix + key] = value;
}
function getSetting(key) {
    return localStorage[localStoragePrefix + key] === 'true' ? true : false;
}
var outputInBody = false, outputMinimized = getSetting(minimizeToggleId), outputHidden = false;
outputElement.id = 'fuse-box-output';
styleElement.innerHTML = "\n    #" + outputElement.id + ", #" + outputElement.id + " * {\n        box-sizing: border-box;\n    }\n    #" + outputElement.id + " {\n        z-index: 999999999999;\n        position: fixed;\n        top: 10px;\n        right: 10px;\n        width: 400px;\n        overflow: auto;\n        background: #fdf3f1;\n        border: 1px solid #eca494;\n        border-radius: 5px;\n        font-family: \"Helvetica Neue\", Helvetica, Arial, sans-serif;\n        box-shadow: 0px 3px 6px 1px rgba(0,0,0,.15);\n    }\n    #" + outputElement.id + "." + expandedOutputClass + " {\n        height: auto;\n        width: auto;\n        left: 10px;\n        max-height: calc(100vh - 50px);\n    }\n    #" + outputElement.id + " .fuse-box-errors {\n        display: none;\n    }\n    #" + outputElement.id + "." + expandedOutputClass + " .fuse-box-errors {\n        display: block;\n        border-top: 1px solid #eca494;\n        padding: 0 10px;\n    }\n    #" + outputElement.id + " button {\n        border: 1px solid #eca494;\n        padding: 5px 10px;\n        border-radius: 4px;\n        margin-left: 5px;\n        background-color: white;\n        color: black;\n        box-shadow: 0px 2px 2px 0px rgba(0,0,0,.05);\n    }\n    #" + outputElement.id + " .fuse-box-header {\n        padding: 10px;\n    }\n    #" + outputElement.id + " .fuse-box-header h4 {\n        display: inline-block;\n        margin: 4px;\n    }";
styleElement.type = 'text/css';
document.getElementsByTagName('head')[0].appendChild(styleElement);
function displayBundleErrors() {
    var errorMessages = Object.keys(bundleErrors).reduce(function (allMessages, bundleName) {
        var bundleMessages = bundleErrors[bundleName];
        return allMessages.concat(bundleMessages.map(function (message) {
            var messageOutput = message
                .replace(/\n/g, '<br>')
                .replace(/\t/g, '&nbsp;&nbps;&npbs;&nbps;')
                .replace(/ /g, '&nbsp;');
            return "<pre>" + messageOutput + "</pre>";
        }));
    }, []), errorOutput = errorMessages.join('');
    if (errorOutput && !outputHidden) {
        outputElement.innerHTML = "\n        <div class=\"fuse-box-header\" style=\"\">\n            <h4 style=\"\">Fuse Box Bundle Errors (" + errorMessages.length + "):</h4>\n            <div style=\"float: right;\">\n                <button id=\"" + minimizeToggleId + "\">" + (outputMinimized ? 'Expand' : 'Minimize') + "</button>\n                <button id=\"" + hideButtonId + "\">Hide</button>\n            </div>\n        </div>\n        <div class=\"fuse-box-errors\">\n            " + errorOutput + "\n        </div>\n        ";
        document.body.appendChild(outputElement);
        outputElement.className = outputMinimized ? '' : expandedOutputClass;
        outputInBody = true;
        document.getElementById(minimizeToggleId).onclick = function () {
            outputMinimized = !outputMinimized;
            storeSetting(minimizeToggleId, outputMinimized);
            displayBundleErrors();
        };
        document.getElementById(hideButtonId).onclick = function () {
            outputHidden = true;
            displayBundleErrors();
        };
    }
    else if (outputInBody) {
        document.body.removeChild(outputElement);
        outputInBody = false;
    }
}
exports.connect = function (port, uri, reloadFullPage) {
    if (FuseBox.isServer) {
        return;
    }
    port = port || window.location.port;
    var client = new Client({
        port: port,
        uri: uri,
    });
    client.connect();
    client.on('page-reload', function (data) {
        return window.location.reload();
    });
    client.on('page-hmr', function (data) {
        FuseBox.flush();
        FuseBox.dynamic(data.path, data.content);
        if (FuseBox.mainFile) {
            try {
                FuseBox.import(FuseBox.mainFile);
            }
            catch (e) {
                if (typeof e === 'string') {
                    if (/not found/.test(e)) {
                        return window.location.reload();
                    }
                }
                console.error(e);
            }
        }
    });
    client.on('source-changed', function (data) {
        console.info("%cupdate \"" + data.path + "\"", 'color: #237abe');
        if (reloadFullPage) {
            return window.location.reload();
        }
        /**
         * If a plugin handles this request then we don't have to do anything
         **/
        for (var index = 0; index < FuseBox.plugins.length; index++) {
            var plugin = FuseBox.plugins[index];
            if (plugin.hmrUpdate && plugin.hmrUpdate(data)) {
                return;
            }
        }
        if (data.type === "hosted-css") {
            var fileId = data.path.replace(/^\//, '').replace(/[\.\/]+/g, '-');
            var existing = document.getElementById(fileId);
            if (existing) {
                existing.setAttribute("href", data.path + "?" + new Date().getTime());
            }
            else {
                var node = document.createElement('link');
                node.id = fileId;
                node.type = 'text/css';
                node.rel = 'stylesheet';
                node.href = data.path;
                document.getElementsByTagName('head')[0].appendChild(node);
            }
        }
        if (data.type === 'js' || data.type === "css") {
            FuseBox.flush();
            FuseBox.dynamic(data.path, data.content);
            if (FuseBox.mainFile) {
                try {
                    FuseBox.import(FuseBox.mainFile);
                }
                catch (e) {
                    if (typeof e === 'string') {
                        if (/not found/.test(e)) {
                            return window.location.reload();
                        }
                    }
                    console.error(e);
                }
            }
        }
    });
    client.on('error', function (error) {
        console.log(error);
    });
    client.on('bundle-error', function (_a) {
        var bundleName = _a.bundleName, message = _a.message;
        console.error("Bundle error in " + bundleName + ": " + message);
        var errorsForBundle = bundleErrors[bundleName] || [];
        errorsForBundle.push(message);
        bundleErrors[bundleName] = errorsForBundle;
        displayBundleErrors();
    });
    client.on('update-bundle-errors', function (_a) {
        var bundleName = _a.bundleName, messages = _a.messages;
        messages.forEach(function (message) { return console.error("Bundle error in " + bundleName + ": " + message); });
        bundleErrors[bundleName] = messages;
        displayBundleErrors();
    });
};

});
return ___scope___.entry = "index.js";
});
FuseBox.pkg("fusebox-websocket", {}, function(___scope___){
___scope___.file("index.js", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var events = require('events');
var SocketClient = /** @class */ (function () {
    function SocketClient(opts) {
        opts = opts || {};
        var port = opts.port || window.location.port;
        var protocol = location.protocol === 'https:' ? 'wss://' : 'ws://';
        var domain = location.hostname || 'localhost';
        this.url = opts.host || "" + protocol + domain + ":" + port;
        if (opts.uri) {
            this.url = opts.uri;
        }
        this.authSent = false;
        this.emitter = new events.EventEmitter();
    }
    SocketClient.prototype.reconnect = function (fn) {
        var _this = this;
        setTimeout(function () {
            _this.emitter.emit('reconnect', { message: 'Trying to reconnect' });
            _this.connect(fn);
        }, 5000);
    };
    SocketClient.prototype.on = function (event, fn) {
        this.emitter.on(event, fn);
    };
    SocketClient.prototype.connect = function (fn) {
        var _this = this;
        console.log('%cConnecting to fusebox HMR at ' + this.url, 'color: #237abe');
        setTimeout(function () {
            _this.client = new WebSocket(_this.url);
            _this.bindEvents(fn);
        }, 0);
    };
    SocketClient.prototype.close = function () {
        this.client.close();
    };
    SocketClient.prototype.send = function (eventName, data) {
        if (this.client.readyState === 1) {
            this.client.send(JSON.stringify({ event: eventName, data: data || {} }));
        }
    };
    SocketClient.prototype.error = function (data) {
        this.emitter.emit('error', data);
    };
    /** Wires up the socket client messages to be emitted on our event emitter */
    SocketClient.prototype.bindEvents = function (fn) {
        var _this = this;
        this.client.onopen = function (event) {
            console.log('%cConnected', 'color: #237abe');
            if (fn) {
                fn(_this);
            }
        };
        this.client.onerror = function (event) {
            _this.error({ reason: event.reason, message: 'Socket error' });
        };
        this.client.onclose = function (event) {
            _this.emitter.emit('close', { message: 'Socket closed' });
            if (event.code !== 1011) {
                _this.reconnect(fn);
            }
        };
        this.client.onmessage = function (event) {
            var data = event.data;
            if (data) {
                var item = JSON.parse(data);
                _this.emitter.emit(item.type, item.data);
                _this.emitter.emit('*', item);
            }
        };
    };
    return SocketClient;
}());
exports.SocketClient = SocketClient;

});
return ___scope___.entry = "index.js";
});
FuseBox.pkg("events", {}, function(___scope___){
___scope___.file("index.js", function(exports, require, module, __filename, __dirname){

// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.
if (FuseBox.isServer) {
    module.exports = global.require("events");
} else {
    function EventEmitter() {
        this._events = this._events || {};
        this._maxListeners = this._maxListeners || undefined;
    }
    module.exports = EventEmitter;

    // Backwards-compat with node 0.10.x
    EventEmitter.EventEmitter = EventEmitter;

    EventEmitter.prototype._events = undefined;
    EventEmitter.prototype._maxListeners = undefined;

    // By default EventEmitters will print a warning if more than 10 listeners are
    // added to it. This is a useful default which helps finding memory leaks.
    EventEmitter.defaultMaxListeners = 10;

    // Obviously not all Emitters should be limited to 10. This function allows
    // that to be increased. Set to zero for unlimited.
    EventEmitter.prototype.setMaxListeners = function(n) {
        if (!isNumber(n) || n < 0 || isNaN(n))
            throw TypeError("n must be a positive number");
        this._maxListeners = n;
        return this;
    };

    EventEmitter.prototype.emit = function(type) {
        var er, handler, len, args, i, listeners;

        if (!this._events)
            this._events = {};

        // If there is no 'error' event listener then throw.
        if (type === "error") {
            if (!this._events.error ||
                (isObject(this._events.error) && !this._events.error.length)) {
                er = arguments[1];
                if (er instanceof Error) {
                    throw er; // Unhandled 'error' event
                }
                throw TypeError("Uncaught, unspecified \"error\" event.");
            }
        }

        handler = this._events[type];

        if (isUndefined(handler))
            return false;

        if (isFunction(handler)) {
            switch (arguments.length) {
                // fast cases
                case 1:
                    handler.call(this);
                    break;
                case 2:
                    handler.call(this, arguments[1]);
                    break;
                case 3:
                    handler.call(this, arguments[1], arguments[2]);
                    break;
                    // slower
                default:
                    args = Array.prototype.slice.call(arguments, 1);
                    handler.apply(this, args);
            }
        } else if (isObject(handler)) {
            args = Array.prototype.slice.call(arguments, 1);
            listeners = handler.slice();
            len = listeners.length;
            for (i = 0; i < len; i++)
                listeners[i].apply(this, args);
        }

        return true;
    };

    EventEmitter.prototype.addListener = function(type, listener) {
        var m;

        if (!isFunction(listener))
            throw TypeError("listener must be a function");

        if (!this._events)
            this._events = {};

        // To avoid recursion in the case that type === "newListener"! Before
        // adding it to the listeners, first emit "newListener".
        if (this._events.newListener)
            this.emit("newListener", type,
                isFunction(listener.listener) ?
                listener.listener : listener);

        if (!this._events[type])
        // Optimize the case of one listener. Don't need the extra array object.
            this._events[type] = listener;
        else if (isObject(this._events[type]))
        // If we've already got an array, just append.
            this._events[type].push(listener);
        else
        // Adding the second element, need to change to array.
            this._events[type] = [this._events[type], listener];

        // Check for listener leak
        if (isObject(this._events[type]) && !this._events[type].warned) {
            if (!isUndefined(this._maxListeners)) {
                m = this._maxListeners;
            } else {
                m = EventEmitter.defaultMaxListeners;
            }

            if (m && m > 0 && this._events[type].length > m) {
                this._events[type].warned = true;
                console.error("(node) warning: possible EventEmitter memory " +
                    "leak detected. %d listeners added. " +
                    "Use emitter.setMaxListeners() to increase limit.",
                    this._events[type].length);
                if (typeof console.trace === "function") {
                    // not supported in IE 10
                    console.trace();
                }
            }
        }

        return this;
    };

    EventEmitter.prototype.on = EventEmitter.prototype.addListener;

    EventEmitter.prototype.once = function(type, listener) {
        if (!isFunction(listener))
            throw TypeError("listener must be a function");

        var fired = false;

        function g() {
            this.removeListener(type, g);

            if (!fired) {
                fired = true;
                listener.apply(this, arguments);
            }
        }

        g.listener = listener;
        this.on(type, g);

        return this;
    };

    // emits a 'removeListener' event iff the listener was removed
    EventEmitter.prototype.removeListener = function(type, listener) {
        var list, position, length, i;

        if (!isFunction(listener))
            throw TypeError("listener must be a function");

        if (!this._events || !this._events[type])
            return this;

        list = this._events[type];
        length = list.length;
        position = -1;

        if (list === listener ||
            (isFunction(list.listener) && list.listener === listener)) {
            delete this._events[type];
            if (this._events.removeListener)
                this.emit("removeListener", type, listener);

        } else if (isObject(list)) {
            for (i = length; i-- > 0;) {
                if (list[i] === listener ||
                    (list[i].listener && list[i].listener === listener)) {
                    position = i;
                    break;
                }
            }

            if (position < 0)
                return this;

            if (list.length === 1) {
                list.length = 0;
                delete this._events[type];
            } else {
                list.splice(position, 1);
            }

            if (this._events.removeListener)
                this.emit("removeListener", type, listener);
        }

        return this;
    };

    EventEmitter.prototype.removeAllListeners = function(type) {
        var key, listeners;

        if (!this._events)
            return this;

        // not listening for removeListener, no need to emit
        if (!this._events.removeListener) {
            if (arguments.length === 0)
                this._events = {};
            else if (this._events[type])
                delete this._events[type];
            return this;
        }

        // emit removeListener for all listeners on all events
        if (arguments.length === 0) {
            for (key in this._events) {
                if (key === "removeListener") continue;
                this.removeAllListeners(key);
            }
            this.removeAllListeners("removeListener");
            this._events = {};
            return this;
        }

        listeners = this._events[type];

        if (isFunction(listeners)) {
            this.removeListener(type, listeners);
        } else if (listeners) {
            // LIFO order
            while (listeners.length)
                this.removeListener(type, listeners[listeners.length - 1]);
        }
        delete this._events[type];

        return this;
    };

    EventEmitter.prototype.listeners = function(type) {
        var ret;
        if (!this._events || !this._events[type])
            ret = [];
        else if (isFunction(this._events[type]))
            ret = [this._events[type]];
        else
            ret = this._events[type].slice();
        return ret;
    };

    EventEmitter.prototype.listenerCount = function(type) {
        if (this._events) {
            var evlistener = this._events[type];

            if (isFunction(evlistener))
                return 1;
            else if (evlistener)
                return evlistener.length;
        }
        return 0;
    };

    EventEmitter.listenerCount = function(emitter, type) {
        return emitter.listenerCount(type);
    };

    function isFunction(arg) {
        return typeof arg === "function";
    }

    function isNumber(arg) {
        return typeof arg === "number";
    }

    function isObject(arg) {
        return typeof arg === "object" && arg !== null;
    }

    function isUndefined(arg) {
        return arg === void 0;
    }
}

});
return ___scope___.entry = "index.js";
});
FuseBox.pkg("fuse-box-css", {}, function(___scope___){
___scope___.file("index.js", function(exports, require, module, __filename, __dirname){

/**
 * Listens to 'async' requets and if the name is a css file
 * wires it to `__fsbx_css`
 */

var runningInBrowser = FuseBox.isBrowser || FuseBox.target === "electron";

var cssHandler = function(__filename, contents) {
    if (runningInBrowser) {
        var styleId = __filename.replace(/[\.\/]+/g, '-');
        if (styleId.charAt(0) === '-') styleId = styleId.substring(1);
        var exists = document.getElementById(styleId);
        if (!exists) {
            //<link href="//fonts.googleapis.com/css?family=Covered+By+Your+Grace" rel="stylesheet" type="text/css">
            var s = document.createElement(contents ? 'style' : 'link');
            s.id = styleId;
            s.type = 'text/css';
            if (contents) {
                s.innerHTML = contents;
            } else {
                s.rel = 'stylesheet';
                s.href = __filename;
            }
            document.getElementsByTagName('head')[0].appendChild(s);
        } else {
            if (contents) {
                exists.innerHTML = contents;
            }
        }
    }
}
if (typeof FuseBox !== "undefined" && runningInBrowser) {
    FuseBox.on('async', function(name) {
        if (/\.css$/.test(name)) {
            cssHandler(name);
            return false;
        }
    });
}

module.exports = cssHandler;
});
return ___scope___.entry = "index.js";
});
FuseBox.pkg("mframejs", {}, function(___scope___){
___scope___.file("src/mframejs/index.js", function(exports, require, module, __filename, __dirname){

Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("./utils");
exports.MF = utils_1.MF;
exports.configure = utils_1.configure;
exports.Router = utils_1.Router;
exports.EventAggregator = utils_1.EventAggregator;
exports.Logger = utils_1.Logger;
var container_1 = require("./container");
exports.ContainerClasses = container_1.ContainerClasses;
exports.ContainerAttributes = container_1.ContainerAttributes;
exports.ContainerElements = container_1.ContainerElements;
exports.ContainerValueConverters = container_1.ContainerValueConverters;
var decorator_1 = require("./decorator");
exports.inject = decorator_1.inject;
exports.transient = decorator_1.transient;
exports.customAttribute = decorator_1.customAttribute;
exports.customElement = decorator_1.customElement;
exports.bindable = decorator_1.bindable;
exports.computedFrom = decorator_1.computedFrom;
exports.valueConverter = decorator_1.valueConverter;
exports.behavior = decorator_1.behavior;
exports.observable = decorator_1.observable;
var binding_1 = require("./binding");
exports.BindingEngine = binding_1.BindingEngine;
var interface_1 = require("./interface");
exports.IElement = interface_1.IElement;
exports.IAttribute = interface_1.IAttribute;
exports.IControllerArray = interface_1.IControllerArray;
exports.IControllerObject = interface_1.IControllerObject;
exports.IRepeatCache = interface_1.IRepeatCache;
exports.CONSTANTS = interface_1.CONSTANTS;
//# sourceMappingURL=index.js.map
});
___scope___.file("src/mframejs/utils/index.js", function(exports, require, module, __filename, __dirname){

Object.defineProperty(exports, "__esModule", { value: true });
var domEventHandler_1 = require("./domEventHandler");
exports.DomEventHandler = domEventHandler_1.DomEventHandler;
var eventAggregator_1 = require("./eventAggregator");
exports.EventAggregator = eventAggregator_1.EventAggregator;
var queue_1 = require("./queue");
exports.Queue = queue_1.Queue;
var router_1 = require("./router");
exports.Router = router_1.Router;
var configure_1 = require("./configure");
exports.configure = configure_1.configure;
var mf_1 = require("./mf");
exports.MF = mf_1.MF;
var cache_1 = require("./cache");
exports.Cache = cache_1.Cache;
var logger_1 = require("./logger");
exports.Logger = logger_1.Logger;
//# sourceMappingURL=index.js.map
});
___scope___.file("src/mframejs/utils/domEventHandler.js", function(exports, require, module, __filename, __dirname){

Object.defineProperty(exports, "__esModule", { value: true });
var DomEventHandler = (function () {
    function DomEventHandler() {
    }
    return DomEventHandler;
}());
exports.DomEventHandler = DomEventHandler;
//# sourceMappingURL=domEventHandler.js.map
});
___scope___.file("src/mframejs/utils/eventAggregator.js", function(exports, require, module, __filename, __dirname){

Object.defineProperty(exports, "__esModule", { value: true });
var EventAggregator = (function () {
    function EventAggregator() {
        this.channels = {};
    }
    EventAggregator.prototype.publish = function (channel) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        if (Array.isArray(this.channels[channel])) {
            for (var i = 0, len = this.channels[channel].length; i < len; i++) {
                this.channels[channel][i].apply(this, args);
            }
        }
        else {
        }
    };
    EventAggregator.prototype.unsubscribe = function (channel, func) {
        if (Array.isArray(this.channels[channel])) {
            for (var i = 0, len = this.channels[channel].length; i < len; i++) {
                if (this.channels[channel][i] === func) {
                    this.channels[channel].splice(i, 1);
                }
            }
        }
        else {
        }
    };
    EventAggregator.prototype.subscribe = function (channel, func) {
        if (!Array.isArray(this.channels[channel])) {
            this.channels[channel] = [];
        }
        this.channels[channel].push(func);
    };
    return EventAggregator;
}());
exports.EventAggregator = EventAggregator;
//# sourceMappingURL=eventAggregator.js.map
});
___scope___.file("src/mframejs/utils/queue.js", function(exports, require, module, __filename, __dirname){

Object.defineProperty(exports, "__esModule", { value: true });
var Queue = (function () {
    function Queue() {
        this.count = 0;
        this.tasks = [];
        this.topQueue = [];
        this.started = false;
        this.index = -1;
    }
    Queue.prototype.finsished = function () {
        return this.count === 0;
    };
    Queue.prototype.add = function (task) {
        var _this = this;
        this.count++;
        this.tasks.push(task);
        if (!this.started) {
            this.started = true;
            setTimeout(function () {
                _this.flush();
            }, 0);
        }
    };
    Queue.prototype.flush = function () {
        if (this.index < 0) {
            if (this.tasks.length < 600) {
                this.topQueue = this.tasks.slice(0, this.tasks.length);
                this.tasks = [];
            }
            else {
                this.topQueue = this.tasks.slice(0, 600);
                var newAr = this.tasks.slice(600, this.tasks.length);
                this.tasks = newAr;
            }
            this.index = this.topQueue.length - 1;
        }
        if (this.topQueue.length === 0) {
            this.started = false;
        }
        this.runTasks();
    };
    Queue.prototype.reFlush = function () {
        var _this = this;
        setTimeout(function () {
            _this.flush();
        }, 0);
    };
    Queue.prototype.runTasks = function () {
        var _this = this;
        var curTask = this.topQueue[this.index];
        this.index--;
        var done;
        done = function () {
            var nextTask = _this.topQueue[_this.index];
            _this.index--;
            if (nextTask) {
                nextTask.call(done);
                _this.count--;
            }
            else {
                if (_this.index < 0) {
                    _this.reFlush();
                }
                else {
                    _this.started = false;
                }
            }
        };
        if (curTask) {
            curTask.call(done);
        }
        this.count--;
    };
    return Queue;
}());
exports.Queue = Queue;
//# sourceMappingURL=queue.js.map
});
___scope___.file("src/mframejs/utils/router.js", function(exports, require, module, __filename, __dirname){

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var Router = (function () {
    function Router() {
        var _this = this;
        this.curRoute = 0;
        this.started = true;
        this.isNavigating = true;
        this.routersElements = [];
        this.started = false;
        this.hash = window.location.hash;
        this.config = {
            root: '#/',
            title: null,
            map: function (routes) {
                _this.routes = routes;
            },
            loader: null
        };
    }
    Router.prototype.hashChange = function () {
        var _this = this;
        this.isNavigating = true;
        setTimeout(function () {
            _this.hash = window.location.hash.slice(1).split('/');
            if (window.location.hash !== '#/' && window.location.hash !== '') {
                var hash_1 = window.location.hash.slice(1).split('/');
                var success_1 = false;
                _this.routes.forEach(function (route, i) {
                    if (hash_1[1] === route.route) {
                        _this.curRoute = i;
                        success_1 = true;
                    }
                });
                if (_this.mainRouter && success_1) {
                    _this.mainRouter.update();
                }
            }
            if (window.location.hash === '') {
                _this.curRoute = 0;
                _this.mainRouter.update();
            }
        }, 60);
    };
    Router.prototype.registerElement = function (el) {
        if (!this.mainRouter) {
            this.mainRouter = el;
        }
        else {
            this.routersElements.push(el);
        }
    };
    Router.prototype.unregisterElement = function (el) {
        if (this.mainRouter === el) {
            this.mainRouter = null;
        }
        else {
            if (this.routersElements.indexOf(el) !== -1) {
                this.routersElements.splice(this.routersElements.indexOf(el), 1);
            }
        }
    };
    Router.prototype.addConfig = function (config) {
        if (!this.started) {
            this.config = config;
            this.routes = config.routes;
            this.init();
        }
    };
    Router.prototype.init = function () {
        var _this = this;
        this.started = true;
        this.hash = this.config.root;
        this.title = this.config.title;
        window.addEventListener('hashchange', this.hashChange.bind(this));
        this.routes.forEach(function (route) {
            route.href = '#/' + route.route;
        });
        if (window.location.hash !== '#/' && window.location.hash !== '' && this.hash !== window.location.hash) {
            this.hash = window.location.hash.slice(1).split('/');
            var success_2 = false;
            this.routes.forEach(function (route, i) {
                if (_this.hash[1] === route.route) {
                    _this.curRoute = i;
                    success_2 = true;
                }
            });
            if (this.mainRouter && success_2) {
                this.mainRouter.update();
            }
        }
    };
    Router.prototype.getCurrentModule = function () {
        return this.routes[this.curRoute].modulePath;
    };
    Router.prototype.getCurrentClass = function () {
        return this.routes[this.curRoute].moduleClass;
    };
    Router.prototype.loadCurrentModule = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.routes[this.curRoute].load()];
                    case 1: return [2, _a.sent()];
                }
            });
        });
    };
    return Router;
}());
exports.Router = Router;
//# sourceMappingURL=router.js.map
});
___scope___.file("src/mframejs/utils/configure.js", function(exports, require, module, __filename, __dirname){

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("../container/index");
var mf_1 = require("./mf");
function configure(app) {
    return __awaiter(this, void 0, void 0, function () {
        var miniFramework, rootApp;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    miniFramework = index_1.ContainerClasses.get(mf_1.MF);
                    rootApp = index_1.ContainerClasses.get(app);
                    if (!(document.body === null)) return [3, 1];
                    return [2, new Promise(function (resolve) {
                            document.addEventListener('DOMContentLoaded', function () {
                                resolve(miniFramework.setRootApp(rootApp));
                            });
                        })];
                case 1: return [4, miniFramework.setRootApp(rootApp)];
                case 2: return [2, _a.sent()];
            }
        });
    });
}
exports.configure = configure;
//# sourceMappingURL=configure.js.map
});
___scope___.file("src/mframejs/container/index.js", function(exports, require, module, __filename, __dirname){

Object.defineProperty(exports, "__esModule", { value: true });
var containerClasses_1 = require("./containerClasses");
exports.ContainerClasses = containerClasses_1.ContainerClasses;
var containerAttributes_1 = require("./containerAttributes");
exports.ContainerAttributes = containerAttributes_1.ContainerAttributes;
var containerElements_1 = require("./containerElements");
exports.ContainerElements = containerElements_1.ContainerElements;
var containerValueConverters_1 = require("./containerValueConverters");
exports.ContainerValueConverters = containerValueConverters_1.ContainerValueConverters;
var containerBehavior_1 = require("./containerBehavior");
exports.ContainerBehavior = containerBehavior_1.ContainerBehavior;
//# sourceMappingURL=index.js.map
});
___scope___.file("src/mframejs/container/containerClasses.js", function(exports, require, module, __filename, __dirname){

Object.defineProperty(exports, "__esModule", { value: true });
var dep = new Map();
var singelton = new Map();
var transient = new Map();
var ContainerClasses = (function () {
    function ContainerClasses() {
    }
    ContainerClasses.get = function (_class) {
        var instance = this.getInstance(_class);
        return instance;
    };
    ContainerClasses.getInstance = function (_class) {
        if (transient.has(_class)) {
            return this.create(_class);
        }
        else {
            if (!singelton.get(_class)) {
                singelton.set(_class, this.create(_class));
            }
            return singelton.get(_class);
        }
    };
    ContainerClasses.create = function (_class) {
        var _this = this;
        var deps = dep.get(_class) || [];
        deps = deps.map(function (classX) {
            try {
                return _this.get(classX);
            }
            catch (e) {
                return classX;
            }
        });
        return new (_class.bind.apply(_class, [void 0].concat(deps)))();
    };
    ContainerClasses.setDep = function (_class, deps) {
        dep.set(_class, deps);
    };
    ContainerClasses.regTransient = function (_class) {
        if (!transient.has(_class)) {
            transient.set(_class, null);
        }
    };
    return ContainerClasses;
}());
exports.ContainerClasses = ContainerClasses;
//# sourceMappingURL=containerClasses.js.map
});
___scope___.file("src/mframejs/container/containerAttributes.js", function(exports, require, module, __filename, __dirname){

Object.defineProperty(exports, "__esModule", { value: true });
var attribute = new Map();
var ContainerAttributes = (function () {
    function ContainerAttributes() {
    }
    ContainerAttributes.regAttribute = function (_class, name) {
        if (!attribute.has(name)) {
            attribute.set(name, _class);
        }
        if (!attribute.has(name)) {
            attribute.set(name, _class);
        }
    };
    ContainerAttributes.findAttribute = function (name) {
        if (attribute.has(name)) {
            return attribute.get(name);
        }
        else {
            return null;
        }
    };
    return ContainerAttributes;
}());
exports.ContainerAttributes = ContainerAttributes;
//# sourceMappingURL=containerAttributes.js.map
});
___scope___.file("src/mframejs/container/containerElements.js", function(exports, require, module, __filename, __dirname){

Object.defineProperty(exports, "__esModule", { value: true });
var element = new Map();
var ContainerElements = (function () {
    function ContainerElements() {
    }
    ContainerElements.regElement = function (_class, name) {
        if (!element.has(name)) {
            element.set(name, _class);
        }
    };
    ContainerElements.findElement = function (name) {
        if (element.has(name)) {
            return element.get(name);
        }
        else {
            return null;
        }
    };
    return ContainerElements;
}());
exports.ContainerElements = ContainerElements;
//# sourceMappingURL=containerElements.js.map
});
___scope___.file("src/mframejs/container/containerValueConverters.js", function(exports, require, module, __filename, __dirname){

Object.defineProperty(exports, "__esModule", { value: true });
var valueConverter = new Map();
var ContainerValueConverters = (function () {
    function ContainerValueConverters() {
    }
    ContainerValueConverters.regConverter = function (_class, name) {
        if (!valueConverter.has(name)) {
            valueConverter.set(name, _class);
        }
    };
    ContainerValueConverters.findConverter = function (name) {
        if (valueConverter.has(name)) {
            return valueConverter.get(name);
        }
        else {
            return null;
        }
    };
    return ContainerValueConverters;
}());
exports.ContainerValueConverters = ContainerValueConverters;
//# sourceMappingURL=containerValueConverters.js.map
});
___scope___.file("src/mframejs/container/containerBehavior.js", function(exports, require, module, __filename, __dirname){

Object.defineProperty(exports, "__esModule", { value: true });
var behavior = new Map();
var ContainerBehavior = (function () {
    function ContainerBehavior() {
    }
    ContainerBehavior.regBehavior = function (_class, name) {
        if (!behavior.has(name)) {
            behavior.set(name, _class);
        }
    };
    ContainerBehavior.findBehavior = function (name) {
        if (behavior.has(name)) {
            return behavior.get(name);
        }
        else {
            return null;
        }
    };
    return ContainerBehavior;
}());
exports.ContainerBehavior = ContainerBehavior;
//# sourceMappingURL=containerBehavior.js.map
});
___scope___.file("src/mframejs/utils/mf.js", function(exports, require, module, __filename, __dirname){

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("../view/index");
var eventAggregator_1 = require("./eventAggregator");
var index_2 = require("../decorator/index");
var queue_1 = require("./queue");
var index_3 = require("../behavior/index");
var index_4 = require("../element/index");
var attribute_1 = require("../attribute");
var MF = (function () {
    function MF(eventAggregator, queue) {
        this.count = 0;
        this.eventAggregator = eventAggregator;
        this.queue = queue;
        if (!window.Reflect) {
            window.Reflect = Object;
        }
        this.register(index_4.MfRouter, attribute_1.ValueAttribute, attribute_1.IfAttribute, attribute_1.DelgateEventsAttribute, attribute_1.RepeatAttribute, attribute_1.MiscAttributes, attribute_1.CssAttribute, attribute_1.ModelAttribute, attribute_1.TriggerEventsAttribute, index_3.SignalBehavior, index_3.ThrottleBehavior, index_3.DebounceBehavior, index_3.TriggerBehavior);
    }
    MF.prototype.setRootApp = function (app) {
        this.app = app;
        return this;
    };
    MF.prototype.start = function (node) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.node = node;
                index_1.ViewParser.parseAndCreateElement(this.app, this.node, this);
                this.eventAggregator.publish('MF', 'MF started');
                return [2];
            });
        });
    };
    MF.prototype.register = function () {
        var _class = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            _class[_i] = arguments[_i];
        }
    };
    MF = __decorate([
        index_2.inject(eventAggregator_1.EventAggregator, queue_1.Queue),
        __metadata("design:paramtypes", [typeof (_a = typeof eventAggregator_1.EventAggregator !== "undefined" && eventAggregator_1.EventAggregator) === "function" && _a || Object, typeof (_b = typeof queue_1.Queue !== "undefined" && queue_1.Queue) === "function" && _b || Object])
    ], MF);
    return MF;
    var _a, _b;
}());
exports.MF = MF;
//# sourceMappingURL=mf.js.map
});
___scope___.file("src/mframejs/view/index.js", function(exports, require, module, __filename, __dirname){

Object.defineProperty(exports, "__esModule", { value: true });
var attributeController_1 = require("./attributeController");
exports.AttributeController = attributeController_1.AttributeController;
var elementController_1 = require("./elementController");
exports.ElementController = elementController_1.ElementController;
var interpolateController_1 = require("./interpolateController");
exports.InterpolateController = interpolateController_1.InterpolateController;
var viewController_1 = require("./viewController");
exports.ViewController = viewController_1.ViewController;
var viewParse_1 = require("./viewParse");
exports.ViewParser = viewParse_1.ViewParser;
//# sourceMappingURL=index.js.map
});
___scope___.file("src/mframejs/view/attributeController.js", function(exports, require, module, __filename, __dirname){

Object.defineProperty(exports, "__esModule", { value: true });
var viewController_1 = require("./viewController");
var index_1 = require("../container/index");
var binding_1 = require("../binding");
var index_2 = require("../utils/index");
var AttributeController = (function () {
    function AttributeController(parent, element, attribute, attributeRef, $view) {
        this.parent = parent;
        this.element = element;
        this.attribute = attribute;
        this.logger = index_2.Logger.getLogger(attribute.name, 'attribute');
        this.class = index_1.ContainerClasses.get(attributeRef);
        this.element = element;
        if ((attribute.name === 'if.bind' || attribute.name === 'repeat.for') && parent.$element) {
            if (element && !element.$view) {
                element.$view = new viewController_1.ViewController(element);
                element.$view.addAttribute(this);
            }
        }
        else {
            $view.addAttribute(this);
        }
    }
    AttributeController.prototype.init = function () {
        this.create();
    };
    AttributeController.prototype.create = function () {
        this.logger.log('created', this.attribute.name, this.attribute.value);
        this.class.$element = this.element;
        this.class.$parent = this.parent;
        this.class.$attribute = this.attribute;
        binding_1.BindingEngine.subscribeClassMetaBinding(this.class);
        if (this.class.created) {
            this.class.created();
        }
    };
    AttributeController.prototype.attached = function () {
        this.logger.log('attached', this.attribute.name, this.attribute.value);
        if (this.class.attached) {
            this.class.attached();
        }
    };
    AttributeController.prototype.detached = function () {
        this.logger.log('detached', this.attribute.name, this.attribute.value);
        if (this.class.detached) {
            this.class.detached();
        }
        binding_1.BindingEngine.unSubscribeClassMetaBinding(this.class);
        this.parent = null;
        this.element = null;
        this.attribute = null;
        this.class.$element = null;
        this.class.$parent = null;
        this.class.$attribute = null;
        this.class = null;
    };
    return AttributeController;
}());
exports.AttributeController = AttributeController;
//# sourceMappingURL=attributeController.js.map
});
___scope___.file("src/mframejs/view/viewController.js", function(exports, require, module, __filename, __dirname){

Object.defineProperty(exports, "__esModule", { value: true });
var ViewController = (function () {
    function ViewController(element) {
        this.count = 0;
        this.element = element;
    }
    ViewController.prototype.addElement = function (_class) {
        this.count++;
        if (!this.items) {
            this.items = {};
        }
        this.items['e' + this.count] = _class;
    };
    ViewController.prototype.addAttribute = function (_class) {
        this.count++;
        if (!this.items) {
            this.items = {};
        }
        this.items['a' + this.count] = _class;
    };
    ViewController.prototype.addInterpolate = function (_class) {
        this.count++;
        if (!this.items) {
            this.items = {};
        }
        this.items['i' + this.count] = _class;
    };
    ViewController.prototype.getElement = function () {
        return this.element;
    };
    ViewController.prototype.clearView = function () {
        for (var item in this.items) {
            if (this.items[item].detached) {
                this.items[item].detached();
            }
        }
        this.items = null;
        this.element = null;
    };
    return ViewController;
}());
exports.ViewController = ViewController;
//# sourceMappingURL=viewController.js.map
});
___scope___.file("src/mframejs/binding/index.js", function(exports, require, module, __filename, __dirname){

Object.defineProperty(exports, "__esModule", { value: true });
var bindingEngine_1 = require("./bindingEngine");
exports.BindingEngine = bindingEngine_1.BindingEngine;
//# sourceMappingURL=index.js.map
});
___scope___.file("src/mframejs/binding/bindingEngine.js", function(exports, require, module, __filename, __dirname){

Object.defineProperty(exports, "__esModule", { value: true });
var traverseAst_1 = require("./traverseAst");
var tokenize_1 = require("./tokenize");
var generateAst_1 = require("./generateAst");
var createBindingExpression_1 = require("./createBindingExpression");
var setValue_1 = require("./setValue");
var subscribeClassProperty_1 = require("./subscribeClassProperty");
var unSubscribeClassProperty_1 = require("./unSubscribeClassProperty");
var evaluateExpression_1 = require("./evaluateExpression");
var subscribeClassArray_1 = require("./subscribeClassArray");
var unSubscribeClassArray_1 = require("./unSubscribeClassArray");
var unSubscribeClassMetaBinding_1 = require("./unSubscribeClassMetaBinding");
var subscribeClassMetaBinding_1 = require("./subscribeClassMetaBinding");
var index_1 = require("../utils/index");
var BindingEngine = (function () {
    function BindingEngine() {
    }
    BindingEngine.tokenizeParseAndTraverseAST = function (expression, context) {
        var ast;
        if (index_1.Cache.expressionMapHas(expression)) {
            var cacheX = index_1.Cache.expressionMapGet(expression);
            ast = cacheX.ast;
        }
        else {
            var tokens = tokenize_1.tokenize(expression);
            ast = generateAst_1.generateAST(tokens);
        }
        return traverseAst_1.traverseAST(ast, context);
    };
    BindingEngine.tokenize = tokenize_1.tokenize;
    BindingEngine.traverseAST = traverseAst_1.traverseAST;
    BindingEngine.generateAST = generateAst_1.generateAST;
    BindingEngine.valueConvert = traverseAst_1.valueConvert;
    BindingEngine.getBehavior = traverseAst_1.getBehavior;
    BindingEngine.createBindingExpression = createBindingExpression_1.createBindingExpression;
    BindingEngine.setValue = setValue_1.setValue;
    BindingEngine.subscribeClassProperty = subscribeClassProperty_1.subscribeClassProperty;
    BindingEngine.unSubscribeClassProperty = unSubscribeClassProperty_1.unSubscribeClassProperty;
    BindingEngine.evaluateExpression = evaluateExpression_1.evaluateExpression;
    BindingEngine.subscribeClassArray = subscribeClassArray_1.subscribeClassArray;
    BindingEngine.unSubscribeClassArray = unSubscribeClassArray_1.unSubscribeClassArray;
    BindingEngine.unSubscribeClassMetaBinding = unSubscribeClassMetaBinding_1.unSubscribeClassMetaBinding;
    BindingEngine.subscribeClassMetaBinding = subscribeClassMetaBinding_1.subscribeClassMetaBinding;
    return BindingEngine;
}());
exports.BindingEngine = BindingEngine;
//# sourceMappingURL=bindingEngine.js.map
});
___scope___.file("src/mframejs/binding/traverseAst.js", function(exports, require, module, __filename, __dirname){

Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("../container/index");
var fromView;
var splitCache = {};
var splitLocalCache = {};
var Traverser = (_a = (function () {
        function class_1() {
        }
        return class_1;
    }()),
    _a.operator = function (val, a, b) {
        switch (val) {
            case '+': return a + b;
            case '-': return b ? a - b : -a;
            case '*': return a * b;
            case '!': return !a;
            case '%': return a % b;
            case '>': return a > b;
            case '<': return a < b;
            case '>=': return a >= b;
            case '&&': return a && b;
            case '||': return a || b;
            case '<=': return a <= b;
            case '===': return a === b;
            case '!==': return a !== b;
            case '/': return a / b;
            case '^': return a ^ b;
        }
    },
    _a.checkArity = function (ast, ctx) {
        var value;
        if (ast && ast.arity === 'literal') {
            value = ast.value;
        }
        if (ast && ast.arity === 'variable') {
            value = Traverser.variable(ast, ctx);
        }
        if (ast && ast.arity === 'binary') {
            value = Traverser.binary(ast, ctx);
        }
        if (ast && ast.arity === 'unary') {
            value = Traverser.binary(ast, ctx);
        }
        if (ast && ast.arity === 'ternary') {
            value = Traverser.ternary(ast, ctx);
        }
        if (ast && ast.arity === 'valueConverter') {
            value = Traverser.valueConverter(ast, ctx);
        }
        return value;
    },
    _a.variable = function (ast, ctx) {
        var result;
        try {
            switch (true) {
                case ast.value === 'null' && ast.arity === 'variable':
                    return null;
                case ast.value === 'undefined' && ast.arity === 'variable':
                    return undefined;
                case ast.arity === 'variable' && typeof ast.value === 'string' && ast.value.toUpperCase() === 'TRUE':
                    return true;
                case ast.arity === 'variable' && typeof ast.value === 'string' && ast.value.toUpperCase() === 'FALSE':
                    return false;
                default:
            }
            var keys = void 0;
            var keyCtx = void 0;
            if (!splitCache[ast.value]) {
                keys = ast.value.split(/\.|\[([^\]]+)\]\.?/).filter(function (x) { return x ? x : null; });
                splitCache[ast.value] = keys;
                splitLocalCache[ast.value] = typeof keys[0] === 'string' && keys[0][0] !== '$';
            }
            else {
                keys = splitCache[ast.value];
                keyCtx = splitLocalCache[ast.value];
            }
            var curObj_1;
            var curCtx_1 = ctx;
            if (ctx.isMultiContext) {
                curCtx_1 = ctx.ctx;
            }
            for (var i = 0; i < keys.length; i++) {
                if (keys[i]) {
                    if (i === 0) {
                        curObj_1 = curCtx_1[keys[i]];
                        if (keyCtx) {
                            if (curCtx_1 && curCtx_1.overrideContext) {
                                while (curCtx_1.overrideContext) {
                                    if (keys[i] in curCtx_1.overrideContext) {
                                        curObj_1 = curCtx_1.overrideContext[keys[i]];
                                    }
                                    curCtx_1 = curCtx_1.overrideContext;
                                }
                            }
                        }
                    }
                    else {
                        curObj_1 = curObj_1[keys[i]];
                    }
                }
            }
            if (ctx.isMultiContext && curObj_1 === undefined) {
                curCtx_1 = ctx;
                keys.forEach(function (prop, i) {
                    if (prop) {
                        if (i === 0) {
                            curObj_1 = curCtx_1[prop];
                            if (typeof prop === 'string' && prop[0] !== '$') {
                                if (curCtx_1 && curCtx_1.overrideContext) {
                                    while (curCtx_1.overrideContext) {
                                        if (prop in curCtx_1.overrideContext) {
                                            curObj_1 = curCtx_1.overrideContext[prop];
                                        }
                                        curCtx_1 = curCtx_1.overrideContext;
                                    }
                                }
                            }
                        }
                        else {
                            curObj_1 = curObj_1[prop];
                        }
                    }
                });
            }
            result = curObj_1;
        }
        catch (e) {
        }
        return result;
    },
    _a.binary = function (ast, ctx) {
        var second;
        if (!ast.isFunction) {
            var first = Traverser.checkArity(ast.first, ctx);
            second = Traverser.checkArity(ast.second, ctx);
            var value = Traverser.operator(ast.value, first, second);
            return value;
        }
        else {
            var results_1 = [];
            ast.second.forEach(function (res) {
                results_1.push(Traverser.evaluate(res, ctx));
            });
            var curCtx = ctx;
            if (ctx.isMultiContext) {
                curCtx = ctx.ctx;
            }
            var valueTrigger = curCtx[ast.first.value];
            if (curCtx && curCtx.overrideContext) {
                while (curCtx.overrideContext) {
                    if (curCtx.overrideContext[ast.first.value]) {
                        valueTrigger = curCtx.overrideContext[ast.first.value];
                    }
                    curCtx = curCtx.overrideContext;
                }
            }
            var value = valueTrigger.apply(curCtx, results_1);
            return value;
        }
    },
    _a.ternary = function (ast, ctx) {
        var first = Traverser.checkArity(ast.first, ctx);
        var second = Traverser.checkArity(ast.second, ctx);
        var third = Traverser.checkArity(ast.third, ctx);
        var value = first ? second : third;
        return value;
    },
    _a.valueConverter = function (ast, ctx) {
        var result;
        var args = [];
        ast.args.forEach(function (arg) {
            args.push(Traverser.checkArity(arg, ctx));
        });
        var valueConverterExist = index_1.ContainerValueConverters.findConverter(ast.value);
        var _class;
        if (valueConverterExist) {
            _class = index_1.ContainerClasses.get(valueConverterExist);
            try {
                result = fromView ? _class.fromView.apply(ctx, args) : _class.toView.apply(ctx, args);
            }
            catch (e) {
                console.log('value converter failed:' + ast.value);
            }
        }
        else {
            console.log('value converter does not exist:' + ast.value);
        }
        return result;
    },
    _a.evaluate = function (astInput, ctx) {
        fromView = false;
        var astArray = Array.isArray(astInput) ? astInput : [astInput];
        var returnArray = [];
        for (var i = 0; i < astArray.length; i++) {
            var result = void 0;
            switch (true) {
                case astArray[i].arity === 'literal':
                    result = astArray[i].value;
                    break;
                case astArray[i].arity === 'unary':
                    result = Traverser.binary(astArray[i], ctx);
                    break;
                case astArray[i].arity === 'binary':
                    result = Traverser.binary(astArray[i], ctx);
                    break;
                case astArray[i].arity === 'variable':
                    result = Traverser.variable(astArray[i], ctx);
                    break;
                case astArray[i].arity === 'ternary':
                    result = Traverser.ternary(astArray[i], ctx);
                    break;
                case astArray[i].arity === 'behavior':
                    break;
                case astArray[i].arity === 'valueConverter':
                    result = Traverser.valueConverter(astArray[i], ctx);
                    break;
                default:
                    console.log('unknown expression');
            }
            returnArray.push(result);
        }
        if (returnArray.length > 1) {
            return returnArray.join('');
        }
        else {
            return returnArray[0];
        }
    },
    _a.traverseOnlyValueConverter = function (value, ast, ctx) {
        var result;
        var args = [];
        ast.args.forEach(function (arg, i) {
            if (i > 0) {
                args.push(Traverser.checkArity(arg, ctx));
            }
        });
        args = [value].concat(args);
        var valueConverterExist = index_1.ContainerValueConverters.findConverter(ast.value);
        var _class;
        if (valueConverterExist) {
            _class = index_1.ContainerClasses.get(valueConverterExist);
            try {
                result = fromView ? _class.fromView.apply(ctx, args) : _class.toView.apply(ctx, args);
            }
            catch (e) {
                console.log('value converter failed:' + ast.value);
            }
        }
        else {
            console.log('value converter does not exist:' + ast.value);
        }
        return result;
    },
    _a.evaluateConverterFromViewOnly = function (astInput, value, ctx) {
        var astArray = Array.isArray(astInput) ? astInput : [astInput];
        var returnArray = [];
        fromView = true;
        var valueConverted = false;
        for (var i = 0; i < astArray.length; i++) {
            var result = void 0;
            switch (true) {
                case astArray[i].arity === 'valueConverter':
                    valueConverted = true;
                    result = Traverser.traverseOnlyValueConverter(value, astArray[i], ctx);
                    break;
            }
            if (result) {
                returnArray.push(result);
            }
        }
        if (returnArray.length > 1) {
            return returnArray.join('');
        }
        else {
            if (valueConverted) {
                return returnArray[0];
            }
            else {
                return value;
            }
        }
    },
    _a.getBehaviorFunctions = function (ast) {
        var astArray = Array.isArray(ast) ? ast : [ast];
        var returnArray = [];
        for (var i = 0; i < astArray.length; i++) {
            var result = void 0;
            switch (true) {
                case astArray[i].arity === 'behavior':
                    result = {
                        name: astArray[i].value,
                        args: astArray[i].args.map(function (a) { return a.value; })
                    };
                    break;
            }
            if (result) {
                returnArray.push(result);
            }
        }
        return returnArray;
    },
    _a);
exports.traverseAST = function (ast, ctx) {
    return Traverser.evaluate(ast, ctx);
};
exports.valueConvert = function (ast, ctx, value) {
    return Traverser.evaluateConverterFromViewOnly(ast, value, ctx);
};
exports.getBehavior = function (ast) {
    return Traverser.getBehaviorFunctions(ast);
};
var _a;
//# sourceMappingURL=traverseAst.js.map
});
___scope___.file("src/mframejs/binding/tokenize.js", function(exports, require, module, __filename, __dirname){

Object.defineProperty(exports, "__esModule", { value: true });
var tokenizer_1 = require("./tokenizer");
exports.tokenize = function (str) {
    var tokenizer = new tokenizer_1.Tokenizer(str);
    var tokens = tokenizer.start();
    return tokens;
};
//# sourceMappingURL=tokenize.js.map
});
___scope___.file("src/mframejs/binding/tokenizer.js", function(exports, require, module, __filename, __dirname){

Object.defineProperty(exports, "__esModule", { value: true });
var charcode_1 = require("./charcode");
var charCode = new charcode_1.CharCodes();
var Tokenizer = (function () {
    function Tokenizer(expression) {
        this.baseTokens = [];
        this.chars = [];
        this.curChar = null;
        this.curCharNo = 0;
        this.curtype = null;
        this.expressionOriginal = expression;
        this.isMix = expression.indexOf('${') !== -1;
        this.isOutsideExpression = this.isMix;
        this.expression = this.trim(this.expressionOriginal);
        this.curtype = expression.indexOf('${') > 0 ? 'string' : null;
        this.curChar = this.expression.charCodeAt(this.curCharNo);
        this.expressionLength = this.expression.length;
    }
    Tokenizer.prototype.start = function () {
        this.generateBaseTokens();
        return this.baseTokens;
    };
    Tokenizer.prototype.trim = function (expression) {
        var text = this.isOutsideExpression;
        var trimmed = '';
        for (var i = 0; i < expression.length; i++) {
            switch (true) {
                case text && charCode.DOLLAR.has(expression.charCodeAt(i)) && charCode.MUSTACHE_START.has(expression.charCodeAt(i + 1)):
                    trimmed = trimmed + expression[i];
                    text = false;
                    break;
                case !text && charCode.MUSTACHE_END.has(expression.charCodeAt(i)):
                    trimmed = trimmed + expression[i];
                    text = true;
                    break;
                case text && !charCode.STRING_START_END.has(expression.charCodeAt(i)):
                    trimmed = trimmed + expression[i];
                    break;
                case text && charCode.STRING_START_END.has(expression.charCodeAt(i)):
                    trimmed = trimmed + expression[i];
                    text = false;
                    break;
                case !text && charCode.STRING_START_END.has(expression.charCodeAt(i)):
                    trimmed = trimmed + expression[i];
                    text = true;
                    break;
                case !text && charCode.WHITESPACE.has(expression.charCodeAt(i)):
                    break;
                case !text && !charCode.WHITESPACE.has(expression.charCodeAt(i)):
                    trimmed = trimmed + expression[i];
                    break;
            }
        }
        return trimmed;
    };
    Tokenizer.prototype.advance = function () {
        this.curCharNo++;
        this.curChar = this.expression.charCodeAt(this.curCharNo);
    };
    Tokenizer.prototype.getString = function () {
        var startend = charCode.STRING_START_END.has(this.curChar);
        var expressionStart = this.expressionStart();
        var done = this.parsedAllChars();
        while (!startend && !expressionStart && !done) {
            this.chars.push(this.curChar);
            this.advance();
            startend = charCode.STRING_START_END.has(this.curChar);
            expressionStart = this.expressionStart();
            done = this.parsedAllChars();
        }
        if (this.curtype) {
            this.addToken();
        }
        if (!this.isOutsideExpression && startend && !expressionStart) {
            this.advance();
        }
    };
    Tokenizer.prototype.getNumber = function () {
        var variable = charCode.REAL.has(this.curChar);
        var expressionStart = this.expressionStart();
        var done = this.parsedAllChars();
        while (variable && !expressionStart && !done) {
            this.chars.push(this.curChar);
            this.advance();
            variable = charCode.REAL.has(this.curChar);
            expressionStart = this.expressionStart();
            done = this.parsedAllChars();
        }
        this.addToken();
    };
    Tokenizer.prototype.parsedAllChars = function () {
        var done = this.curCharNo < this.expressionLength;
        return !done;
    };
    Tokenizer.prototype.getVariable = function () {
        var variable = charCode.VARIABLE.has(this.curChar);
        var expressionStart = this.expressionStart();
        var done = this.parsedAllChars();
        while (variable && !expressionStart && !done) {
            this.chars.push(this.curChar);
            this.advance();
            variable = charCode.VARIABLE.has(this.curChar);
            expressionStart = this.expressionStart();
            done = this.parsedAllChars();
        }
        this.addToken();
    };
    Tokenizer.prototype.getOperator = function () {
        var operator = charCode.OPERATOR.has(this.curChar);
        var expressionStart = this.expressionStart();
        var bracetsLeft = charCode.BRACKETLEFT.has(this.curChar);
        var bracetsRight = charCode.BRACKETRIGHT.has(this.curChar);
        var negativeNumber = this.negativeNumber();
        var done = this.parsedAllChars();
        if (bracetsLeft || bracetsRight) {
            this.chars.push(this.curChar);
            this.advance();
        }
        else {
            while (operator && !expressionStart && !done && !bracetsLeft && !bracetsRight && !negativeNumber) {
                this.chars.push(this.curChar);
                this.advance();
                operator = charCode.OPERATOR.has(this.curChar);
                bracetsLeft = charCode.BRACKETLEFT.has(this.curChar);
                bracetsRight = charCode.BRACKETRIGHT.has(this.curChar);
                expressionStart = this.expressionStart();
                negativeNumber = this.negativeNumber();
                done = this.parsedAllChars();
            }
        }
        if (this.chars.length > 0) {
            this.addToken();
        }
        if (negativeNumber) {
            this.curtype = null;
            this.chars.push(this.curChar);
            this.advance();
        }
    };
    Tokenizer.prototype.expressionStart = function () {
        var t1 = this.expression.charCodeAt(this.curCharNo);
        var t2 = this.expression.charCodeAt(this.curCharNo + 1);
        return charCode.DOLLAR.has(t1) && charCode.MUSTACHE_START.has(t2);
    };
    Tokenizer.prototype.negativeNumber = function () {
        var t1 = this.expression.charCodeAt(this.curCharNo - 1);
        var t2 = this.expression.charCodeAt(this.curCharNo);
        var t3 = this.expression.charCodeAt(this.curCharNo + 1);
        return charCode.OPERATOR.has(t1) && charCode.PLUS_OR_MINUS.has(t2) && charCode.NUMBERS.has(t3);
    };
    Tokenizer.prototype.addToken = function () {
        var val = this.chars.map(function (a) { return String.fromCharCode(a); }).join('');
        this.baseTokens.push({
            type: this.curtype,
            value: this.curtype === 'number' ? parseFloat(val) : val
        });
        this.chars = [];
        this.curtype = null;
    };
    Tokenizer.prototype.generateBaseTokens = function () {
        var done = this.parsedAllChars();
        while (!done) {
            switch (true) {
                case this.expressionStart():
                    this.isOutsideExpression = false;
                    this.curtype = 'operator';
                    this.chars.push(';'.charCodeAt(0));
                    this.addToken();
                    this.advance();
                    this.advance();
                    break;
                case this.isOutsideExpression:
                    this.getString();
                    break;
                case this.curtype === null && charCode.STRING_START_END.has(this.curChar):
                    this.curtype = 'string';
                    this.advance();
                    this.getString();
                    break;
                case this.curtype === null && charCode.MUSTACHE_END.has(this.curChar):
                    this.isOutsideExpression = true;
                    this.curtype = 'operator';
                    this.chars.push(';'.charCodeAt(0));
                    this.addToken();
                    this.curtype = 'string';
                    this.advance();
                    break;
                case this.curtype === null && charCode.NUMBERS.has(this.curChar):
                    this.curtype = 'number';
                    this.getNumber();
                    break;
                case this.curtype === null && charCode.VARIABLE.has(this.curChar):
                    this.curtype = 'variable';
                    this.getVariable();
                    break;
                case this.curtype === null && charCode.WHITESPACE.has(this.curChar):
                    this.advance();
                    break;
                case this.curtype === null && charCode.OPERATOR.has(this.curChar):
                    this.curtype = 'operator';
                    this.getOperator();
                    break;
                default:
                    console.warn('bug tokenizer', String.fromCharCode(this.curChar));
                    console.warn('bug tokenizer', this.expression);
                    this.advance();
            }
            done = this.parsedAllChars();
        }
    };
    return Tokenizer;
}());
exports.Tokenizer = Tokenizer;
//# sourceMappingURL=tokenizer.js.map
});
___scope___.file("src/mframejs/binding/charcode.js", function(exports, require, module, __filename, __dirname){

Object.defineProperty(exports, "__esModule", { value: true });
var CharCodes = (function () {
    function CharCodes() {
        var _this = this;
        this.WHITESPACE = new Set();
        [32, 10, 13].map(function (a) { return _this.WHITESPACE.add(a); });
        this.STRING_START_END = new Set();
        ["'"].map(function (a) { return _this.STRING_START_END.add(a.charCodeAt(0)); });
        this.MINUS = new Set();
        ['-'].map(function (a) { return _this.MINUS.add(a.charCodeAt(0)); });
        this.PLUS = new Set();
        ['+'].map(function (a) { return _this.PLUS.add(a.charCodeAt(0)); });
        this.PLUS_OR_MINUS = new Set();
        ['+', '-'].map(function (a) { return _this.PLUS_OR_MINUS.add(a.charCodeAt(0)); });
        this.UNDERSCORE = new Set();
        ['_'].map(function (a) { return _this.UNDERSCORE.add(a.charCodeAt(0)); });
        this.DOT = new Set();
        ['.'].map(function (a) { return _this.DOT.add(a.charCodeAt(0)); });
        this.BRACKETLEFT = new Set();
        ['('].map(function (a) { return _this.BRACKETLEFT.add(a.charCodeAt(0)); });
        this.BRACKETRIGHT = new Set();
        [')'].map(function (a) { return _this.BRACKETRIGHT.add(a.charCodeAt(0)); });
        this.NOT = new Set();
        ['!'].map(function (a) { return _this.NOT.add(a.charCodeAt(0)); });
        this.ASSIGN = new Set();
        ['='].map(function (a) { return _this.ASSIGN.add(a.charCodeAt(0)); });
        this.OPERATOR = new Set();
        ['=', '!', '>', '<', '+', '-', '*', '/', '%', '^', '(', ')', '|', '&', '?', ':', ','].map(function (a) { return _this.OPERATOR.add(a.charCodeAt(0)); });
        this.NUMBERS = new Set();
        ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'].map(function (a) { return _this.NUMBERS.add(a.charCodeAt(0)); });
        this.LETTERS_UPPER = new Set();
        ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K',
            'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'].map(function (a) { return _this.LETTERS_UPPER.add(a.charCodeAt(0)); });
        this.LETTERS_LOWER = new Set();
        ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l',
            'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'].map(function (a) { return _this.LETTERS_LOWER.add(a.charCodeAt(0)); });
        this.LETTERS = new Set();
        ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K',
            'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
            'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l',
            'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'].map(function (a) { return _this.LETTERS.add(a.charCodeAt(0)); });
        this.SQUARE_BRACKET_RIGHT = new Set();
        ['['].map(function (a) { return _this.SQUARE_BRACKET_RIGHT.add(a.charCodeAt(0)); });
        this.SQUARE_BRACKET_LEFT = new Set();
        ['['].map(function (a) { return _this.SQUARE_BRACKET_LEFT.add(a.charCodeAt(0)); });
        this.SQUARE_BRACKETS = new Set();
        ['[', '['].map(function (a) { return _this.SQUARE_BRACKETS.add(a.charCodeAt(0)); });
        this.DOLLAR = new Set();
        ['$'].map(function (a) { return _this.DOLLAR.add(a.charCodeAt(0)); });
        this.MUSTACHE_START = new Set();
        ['{'].map(function (a) { return _this.MUSTACHE_START.add(a.charCodeAt(0)); });
        this.MUSTACHE_END = new Set();
        ['}'].map(function (a) { return _this.MUSTACHE_END.add(a.charCodeAt(0)); });
        this.REAL = new Set();
        ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '.'].map(function (a) { return _this.REAL.add(a.charCodeAt(0)); });
        this.VARIABLE = new Set();
        ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K',
            'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
            'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l',
            'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
            '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '.', '$', '_', '[', '['
        ].map(function (a) { return _this.VARIABLE.add(a.charCodeAt(0)); });
    }
    return CharCodes;
}());
exports.CharCodes = CharCodes;
//# sourceMappingURL=charcode.js.map
});
___scope___.file("src/mframejs/binding/generateAst.js", function(exports, require, module, __filename, __dirname){

Object.defineProperty(exports, "__esModule", { value: true });
var ast_1 = require("./ast");
var symbolContainer_1 = require("./symbolContainer");
var addSymbols_1 = require("./addSymbols");
var ast = new ast_1.AST();
var symbolContainer = new symbolContainer_1.SymbolContainer();
ast.addSymbolContainer(symbolContainer);
addSymbols_1.addSymbols(ast);
exports.generateAST = function (tokenArray) {
    return ast.start(tokenArray);
};
//# sourceMappingURL=generateAst.js.map
});
___scope___.file("src/mframejs/binding/ast.js", function(exports, require, module, __filename, __dirname){

Object.defineProperty(exports, "__esModule", { value: true });
var symbolTemplate_1 = require("./symbolTemplate");
var AST = (function () {
    function AST() {
        this.currentStatement = null;
        this.currentTokenIndex = 0;
    }
    AST.prototype.start = function (tokens) {
        this.tokens = tokens;
        this.currentStatement = null;
        this.currentTokenIndex = 0;
        this.currentToken = null;
        this.advance();
        var ast = this.statements();
        return ast;
    };
    AST.prototype.addSymbolContainer = function (symbolContainer) {
        this.symbolContainer = symbolContainer;
    };
    AST.prototype.symbol = function (id, bp) {
        var s = this.symbolContainer[id];
        bp = bp || 0;
        if (s) {
            if (bp >= s.lbp) {
                s.lbp = bp;
            }
        }
        else {
            s = new symbolTemplate_1.SymbolTemplate();
            s.id = s.value = id;
            s.lbp = bp;
            this.symbolContainer[id] = s;
        }
        return s;
    };
    AST.prototype.prefix = function (id, nud) {
        var s = this.symbol(id);
        var astInstance = this;
        s.nud = nud || function () {
            this.first = astInstance.expression(70);
            this.arity = 'unary';
            return this;
        };
        return s;
    };
    AST.prototype.infix = function (id, bp, led) {
        var s = this.symbol(id, bp);
        var astInstance = this;
        s.led = led || function (left) {
            this.first = left;
            this.second = astInstance.expression(bp);
            this.arity = 'binary';
            return this;
        };
        return s;
    };
    AST.prototype.infixr = function (id, bp, led) {
        var s = this.symbol(id, bp);
        var astInstance = this;
        s.led = led || function (left) {
            this.first = left;
            this.second = astInstance.expression(bp - 1);
            this.arity = 'binary';
            return this;
        };
        return s;
    };
    AST.prototype.statement = function () {
        var n = this.currentToken;
        var v;
        if (n.std) {
            this.advance();
            return n.std();
        }
        v = this.expression(0);
        return v;
    };
    AST.prototype.statements = function () {
        var a = [];
        var s;
        while (true) {
            if (this.currentToken.id === '}' || this.currentToken.id === '(end)') {
                break;
            }
            s = this.statement();
            if (this.currentStatement) {
                this.currentStatement.args.unshift(a.pop());
                this.currentStatement = null;
            }
            if (s) {
                a.push(s);
            }
        }
        return a.length === 0 ? null : a.length === 1 ? a[0] : a;
    };
    AST.prototype.advance = function (expected) {
        var type, o, token, value;
        token = this.tokens[this.currentTokenIndex];
        if (token && expected) {
            if (expected === token.id) {
            }
        }
        if (this.currentTokenIndex >= this.tokens.length) {
            this.currentToken = this.symbolContainer['(end)'];
            return;
        }
        this.currentTokenIndex += 1;
        value = token.value;
        type = token.type;
        if (type === 'variable') {
            type = 'variable';
            o = this.symbolContainer['(variable)'];
        }
        else if (type === 'operator') {
            o = this.symbolContainer[value];
            if (!o) {
                console.log('Unknown operator.', token);
            }
        }
        else if (type === 'string' || type === 'number') {
            type = 'literal';
            o = this.symbolContainer['(literal)'];
        }
        else {
            console.log('Unexpected token.', token);
        }
        this.currentToken = Object.create(o);
        this.currentToken.value = value;
        this.currentToken.arity = type;
        return this.currentToken;
    };
    AST.prototype.expression = function (rbp) {
        var left;
        var token = this.currentToken;
        this.advance();
        left = token.nud();
        try {
            while (rbp < this.currentToken.lbp) {
                token = this.currentToken;
                this.advance();
                left = token.led(left);
            }
        }
        catch (e) {
            console.log('parser fail');
        }
        return left;
    };
    return AST;
}());
exports.AST = AST;
//# sourceMappingURL=ast.js.map
});
___scope___.file("src/mframejs/binding/symbolTemplate.js", function(exports, require, module, __filename, __dirname){

Object.defineProperty(exports, "__esModule", { value: true });
var SymbolTemplate = (function () {
    function SymbolTemplate() {
    }
    SymbolTemplate.prototype.nud = function () {
        console.error('Undefined.');
    };
    SymbolTemplate.prototype.led = function () {
        console.error('Missing operator.');
    };
    return SymbolTemplate;
}());
exports.SymbolTemplate = SymbolTemplate;
//# sourceMappingURL=symbolTemplate.js.map
});
___scope___.file("src/mframejs/binding/symbolContainer.js", function(exports, require, module, __filename, __dirname){

Object.defineProperty(exports, "__esModule", { value: true });
var SymbolContainer = (function () {
    function SymbolContainer() {
    }
    return SymbolContainer;
}());
exports.SymbolContainer = SymbolContainer;
//# sourceMappingURL=symbolContainer.js.map
});
___scope___.file("src/mframejs/binding/addSymbols.js", function(exports, require, module, __filename, __dirname){

Object.defineProperty(exports, "__esModule", { value: true });
function addSymbols(astInstance) {
    var ast = astInstance;
    ast.symbol('(literal)').nud = function () {
        return this;
    };
    ast.symbol('(variable)').nud = function () {
        return this;
    };
    ast.symbol('(function)').nud = function () {
        return this;
    };
    ast.symbol('(end)');
    ast.symbol('(name)');
    ast.symbol(':');
    ast.symbol(';');
    ast.symbol(')');
    ast.symbol(']');
    ast.symbol('}');
    ast.symbol(',');
    ast.infix('+', 50);
    ast.infix('-', 50);
    ast.infix('*', 60);
    ast.infix('%', 60);
    ast.infix('/', 60);
    ast.infix('===', 40);
    ast.infix('!==', 40);
    ast.infix('<', 40);
    ast.infix('<=', 40);
    ast.infix('>', 40);
    ast.infix('^', 70);
    ast.infix('>=', 40);
    ast.infix('?', 20, function (left) {
        this.first = left;
        this.second = ast.expression(0);
        ast.advance(':');
        this.third = ast.expression(0);
        this.arity = 'ternary';
        return this;
    });
    ast.infix('.', 80, function (left) {
        this.first = left;
        if (ast.currentToken.arity !== 'name') {
            ast.currentToken.error('Expected a property name.');
        }
        ast.currentToken.arity = 'literal';
        this.second = ast.currentToken;
        this.arity = 'binary';
        ast.advance();
        return this;
    });
    ast.infix('[', 80, function (left) {
        this.first = left;
        this.second = ast.expression(0);
        this.arity = 'binary';
        ast.advance(']');
        return this;
    });
    ast.infix('(', 80, function (left) {
        if (!left) {
            return ast.expression(0);
        }
        var a = [];
        this.arity = 'binary';
        this.isFunction = true;
        this.first = left;
        this.second = a;
        if ((left.arity !== 'unary' || left.id !== 'function') &&
            left.arity !== 'variable' && left.id !== '(' &&
            left.id !== '&&' && left.id !== '||' && left.id !== '?') {
            left.error('Expected a variable name.');
        }
        if (ast.currentToken.id !== ')') {
            while (true) {
                a.push(ast.expression(0));
                if (ast.currentToken.id !== ',') {
                    break;
                }
                ast.advance(',');
            }
        }
        ast.advance(')');
        return this;
    });
    ast.prefix('-');
    ast.prefix('!');
    ast.prefix('typeof');
    ast.prefix('(', function () {
        var e = ast.expression(0);
        ast.advance(')');
        return e;
    });
    ast.infixr('&&', 30);
    ast.infixr('||', 30);
    ast.symbol('|').nud = function () {
        this.arity = 'valueConverter';
        var value = ast.expression(0);
        this.value = value.value;
        var a = [];
        this.args = a;
        while (true) {
            if (ast.currentToken.id !== ':') {
                break;
            }
            ast.advance(',');
            a.push(ast.expression(0));
        }
        ast.currentStatement = this;
        return this;
    };
    ast.symbol('&').nud = function () {
        this.arity = 'behavior';
        var value = ast.expression(0);
        this.value = value.value;
        var a = [];
        this.args = a;
        while (true) {
            if (ast.currentToken.id !== ':') {
                break;
            }
            ast.advance(',');
            a.push(ast.expression(0));
        }
        return this;
    };
    ast.symbol(';').nud = function () {
        return null;
    };
}
exports.addSymbols = addSymbols;
//# sourceMappingURL=addSymbols.js.map
});
___scope___.file("src/mframejs/binding/createBindingExpression.js", function(exports, require, module, __filename, __dirname){

Object.defineProperty(exports, "__esModule", { value: true });
var tokenize_1 = require("./tokenize");
var generateAst_1 = require("./generateAst");
var classPropertyObserverCreator_1 = require("./classPropertyObserverCreator");
var index_1 = require("../utils/index");
var index_2 = require("../interface/index");
var splitCache = {};
var contextOfObject = function (value, ctx) {
    var keys, key;
    if (!splitCache[value]) {
        keys = value.split(/\.|\[([^\]]+)\]\.?/).filter(function (x) { return x ? x : null; });
        key = keys[0];
        splitCache[value] = key;
    }
    else {
        key = splitCache[value];
    }
    var newCtx = ctx;
    var overrideCtx;
    if (ctx.isMultiContext) {
        newCtx = ctx.ctx;
    }
    if (typeof key === 'string' && key[0] !== '$') {
        if (newCtx && newCtx.overrideContext) {
            while (newCtx.overrideContext) {
                newCtx = newCtx.overrideContext;
                if (key in newCtx) {
                    overrideCtx = newCtx;
                }
            }
        }
    }
    return overrideCtx || ctx;
};
function createBindingExpression(text, _class, setterClass) {
    var x;
    var nodeText;
    var attributes;
    var ast;
    if (text) {
        nodeText = text;
        attributes = [];
        if (index_1.Cache.expressionMapHas(nodeText)) {
            x = index_1.Cache.expressionMapGet(nodeText);
            attributes = x.attributes;
            ast = x.ast;
        }
        else {
            var tokens = tokenize_1.tokenize(nodeText);
            ast = generateAst_1.generateAST(tokens);
            tokens.forEach(function (tok) {
                if (tok.type === 'variable') {
                    var newctx = contextOfObject(tok.value, _class);
                    if (typeof tok.value === 'string'
                        && tok.value[0] !== '$'
                        && newctx
                        && newctx.__proto__
                        && newctx.__proto__[index_2.CONSTANTS.META_COMPUTEDFROM]
                        && newctx.__proto__[index_2.CONSTANTS.META_COMPUTEDFROM][tok.value]) {
                        var computedFrom = newctx.__proto__[index_2.CONSTANTS.META_COMPUTEDFROM];
                        computedFrom[tok.value].attributes.forEach(function (val) {
                            if (attributes.indexOf(val) === -1) {
                                attributes.push(val);
                            }
                        });
                    }
                    else {
                        if (attributes.indexOf(tok.value) === -1) {
                            attributes.push(tok.value);
                        }
                    }
                }
            });
            index_1.Cache.expressionMapSet(nodeText, {
                attributes: attributes,
                ast: ast
            });
        }
        setterClass.setAst(ast);
        for (var i = 0; i < attributes.length; i++) {
            var newctx = contextOfObject(attributes[i], _class);
            classPropertyObserverCreator_1.ClassPropertyObserverCreator.create(newctx || _class, attributes[i], setterClass);
        }
        setterClass.init();
    }
}
exports.createBindingExpression = createBindingExpression;
function removeBindingExpression(text, _class, handlerClass) {
    if (text) {
        if (index_1.Cache.expressionMapHas(text)) {
            var cachedExpression = index_1.Cache.expressionMapGet(text);
            var attributes = cachedExpression.attributes;
            for (var i = 0; i < attributes.length; i++) {
                var newctx = contextOfObject(attributes[i], _class);
                classPropertyObserverCreator_1.ClassPropertyObserverCreator.remove(newctx || _class, attributes[i], handlerClass);
            }
        }
    }
}
exports.removeBindingExpression = removeBindingExpression;
//# sourceMappingURL=createBindingExpression.js.map
});
___scope___.file("src/mframejs/binding/classPropertyObserverCreator.js", function(exports, require, module, __filename, __dirname){

Object.defineProperty(exports, "__esModule", { value: true });
var classPropertyObserver_1 = require("./classPropertyObserver");
var emptyObject = (function () {
    function class_1() {
    }
    return class_1;
}());
var observerKeyMap = new Map();
var ClassPropertyObserverCreator = (function () {
    function ClassPropertyObserverCreator() {
    }
    ClassPropertyObserverCreator.create = function (_class, observerKey, caller) {
        this.classRef = _class;
        if (observerKeyMap.has(observerKey)) {
            this.keyParts = observerKeyMap.get(observerKey);
        }
        else {
            this.keyParts = observerKey.split(/\.|\[([^\]]+)\]\.?/).filter(function (x) { return x ? x : null; });
            observerKeyMap.set(observerKey, this.keyParts);
        }
        this.keyNo = 0;
        this.keyBlock = this.keyParts[this.keyNo];
        ClassPropertyObserverCreator.processKeys(caller);
        ClassPropertyObserverCreator.clear();
    };
    ClassPropertyObserverCreator.remove = function (_class, observerKey, caller) {
        this.classRef = _class;
        if (observerKeyMap.has(observerKey)) {
            this.keyParts = observerKeyMap.get(observerKey);
        }
        else {
            this.keyParts = observerKey.split(/\.|\[([^\]]+)\]\.?/).filter(function (x) { return x ? x : null; });
            observerKeyMap.set(observerKey, this.keyParts);
        }
        this.keyNo = 0;
        this.keyBlock = this.keyParts[this.keyNo];
        ClassPropertyObserverCreator.removeKeys(caller);
        ClassPropertyObserverCreator.clear();
    };
    ClassPropertyObserverCreator.clear = function () {
        this.classRef = null;
        this.keyParts = null;
        this.keyNo = null;
        this.keyBlock = null;
    };
    ClassPropertyObserverCreator.nextKey = function () {
        this.keyNo++;
        this.keyBlock = this.keyParts[this.keyNo];
    };
    ClassPropertyObserverCreator.processKeys = function (caller) {
        if (!this.classRef.__observer) {
            this.classRef.__observer = new emptyObject();
        }
        if (!this.classRef.__observer[this.keyBlock]) {
            this.classRef.__observer[this.keyBlock] = new classPropertyObserver_1.ClassPropertyObserver(this.classRef, this.keyBlock);
            this.classRef.__observer[this.keyBlock].subscribe(caller);
        }
        else {
            this.classRef.__observer[this.keyBlock].subscribe(caller);
            this.classRef.__observer[this.keyBlock].observe();
        }
        if (this.keyNo !== this.keyParts.length - 1 && this.keyParts.length > 1) {
            if (this.classRef) {
                this.classRef = this.classRef[this.keyBlock];
            }
            this.nextKey();
            if (this.classRef) {
                this.processKeys(caller);
            }
        }
    };
    ClassPropertyObserverCreator.removeKeys = function (caller) {
        if (this.classRef.__observer[this.keyBlock]) {
            this.classRef.__observer[this.keyBlock].unsubscribe(caller);
        }
        if (this.keyNo !== this.keyParts.length - 1 && this.keyParts.length > 1) {
            if (this.classRef) {
                this.classRef = this.classRef[this.keyBlock];
            }
            this.nextKey();
            if (this.classRef) {
                this.removeKeys(caller);
            }
        }
    };
    return ClassPropertyObserverCreator;
}());
exports.ClassPropertyObserverCreator = ClassPropertyObserverCreator;
//# sourceMappingURL=classPropertyObserverCreator.js.map
});
___scope___.file("src/mframejs/binding/classPropertyObserver.js", function(exports, require, module, __filename, __dirname){

Object.defineProperty(exports, "__esModule", { value: true });
var cc1;
var cc2;
var cc3;
var cc4;
var cc5;
var ClassPropertyObserver = (function () {
    function ClassPropertyObserver(_class, key) {
        this._class = _class;
        this.key = key;
        this.setterBind = this.setter.bind(this);
        this.getterBind = this.getter.bind(this);
        if (typeof this._class === 'object') {
            this.value = this._class[this.key];
            this.observe();
        }
    }
    ClassPropertyObserver.prototype.unsubscribe = function (caller) {
        if (this.c1 === caller) {
            this.c1 = null;
        }
        if (this.c2 === caller) {
            this.c2 = null;
        }
        if (this.c3 === caller) {
            this.c3 = null;
        }
        if (this.c4 === caller) {
            this.c4 = null;
        }
        if (this.c5 === caller) {
            this.c5 = null;
        }
        if (this.callers && this.callers.indexOf(caller) !== -1) {
            this.callers.splice(this.callers.indexOf(caller), 1);
        }
    };
    ClassPropertyObserver.prototype.subscribe = function (caller) {
        if (this.c1 !== caller && this.c2 !== caller && this.c3 !== caller && this.c4 !== caller && this.c5 !== caller) {
            if (!this.c1) {
                this.c1 = caller;
            }
            else {
                if (!this.c2) {
                    this.c2 = caller;
                }
                else {
                    if (!this.c3) {
                        this.c3 = caller;
                    }
                    else {
                        if (!this.c4) {
                            this.c4 = caller;
                        }
                        else {
                            if (!this.c5) {
                                this.c5 = caller;
                            }
                            else {
                                if (!this.callers) {
                                    this.callers = [];
                                }
                                if (this.callers.indexOf(caller) === -1) {
                                    this.callers.push(caller);
                                }
                            }
                        }
                    }
                }
            }
        }
    };
    ClassPropertyObserver.prototype.observe = function () {
        var descriptor = Reflect.getOwnPropertyDescriptor(this._class.__proto__, this.key);
        var oldDescriptor = null;
        if (descriptor) {
            oldDescriptor = descriptor.get || descriptor.set;
            if (oldDescriptor) {
                console.log('skipping dirty observer - no-dirty  //todo remove this message');
            }
        }
        if (oldDescriptor === null) {
            if (!Reflect.defineProperty(this._class, this.key, {
                configurable: true,
                enumerable: true,
                set: this.setterBind,
                get: this.getterBind
            })) {
                console.warn('This key could not be observed:' + this.key);
            }
        }
    };
    ClassPropertyObserver.prototype.setter = function (newValue) {
        if (newValue !== this.value) {
            if (typeof newValue === 'object') {
                if (newValue && newValue.__observer) {
                    newValue.__observer = null;
                }
                if (newValue && newValue.__observerArray) {
                    newValue.__observerArray = null;
                }
            }
            this.value = newValue;
            if (this.c1) {
                cc1 = this.c1;
                this.c1 = undefined;
                cc1.update();
            }
            if (this.c2) {
                cc2 = this.c2;
                this.c2 = undefined;
                cc2.update();
            }
            if (this.c3) {
                cc3 = this.c3;
                this.c3 = undefined;
                cc3.update();
            }
            if (this.c4) {
                cc4 = this.c4;
                this.c4 = undefined;
                cc4.update();
            }
            if (this.c5) {
                cc5 = this.c5;
                this.c5 = undefined;
                cc5.update();
            }
            if (this.callers && this.callers.length > 0) {
                var calls = this.callers.slice();
                this.callers = [];
                calls.forEach(function (call) {
                    call.update();
                });
            }
        }
    };
    ClassPropertyObserver.prototype.getter = function () {
        return this.value;
    };
    return ClassPropertyObserver;
}());
exports.ClassPropertyObserver = ClassPropertyObserver;
//# sourceMappingURL=classPropertyObserver.js.map
});
___scope___.file("src/mframejs/interface/index.js", function(exports, require, module, __filename, __dirname){

Object.defineProperty(exports, "__esModule", { value: true });
var i_Element_1 = require("./i_Element");
exports.IElement = i_Element_1.IElement;
var i_Attribute_1 = require("./i_Attribute");
exports.IAttribute = i_Attribute_1.IAttribute;
var i_ControllerArray_1 = require("./i_ControllerArray");
exports.IControllerArray = i_ControllerArray_1.IControllerArray;
var i_ControllerObject_1 = require("./i_ControllerObject");
exports.IControllerObject = i_ControllerObject_1.IControllerObject;
var i_RepeatCache_1 = require("./i_RepeatCache");
exports.IRepeatCache = i_RepeatCache_1.IRepeatCache;
var contants_1 = require("./contants");
exports.CONSTANTS = contants_1.CONSTANTS;
var i_Listener_1 = require("./i_Listener");
exports.IListener = i_Listener_1.IListener;
var i_Tokens_1 = require("./i_Tokens");
exports.ITokens = i_Tokens_1.ITokens;
var i_Node_1 = require("./i_Node");
exports.INode = i_Node_1.INode;
//# sourceMappingURL=index.js.map
});
___scope___.file("src/mframejs/interface/i_Element.js", function(exports, require, module, __filename, __dirname){

Object.defineProperty(exports, "__esModule", { value: true });
//# sourceMappingURL=i_Element.js.map
});
___scope___.file("src/mframejs/interface/i_Attribute.js", function(exports, require, module, __filename, __dirname){

Object.defineProperty(exports, "__esModule", { value: true });
//# sourceMappingURL=i_Attribute.js.map
});
___scope___.file("src/mframejs/interface/i_ControllerArray.js", function(exports, require, module, __filename, __dirname){

Object.defineProperty(exports, "__esModule", { value: true });
//# sourceMappingURL=i_ControllerArray.js.map
});
___scope___.file("src/mframejs/interface/i_ControllerObject.js", function(exports, require, module, __filename, __dirname){

Object.defineProperty(exports, "__esModule", { value: true });
//# sourceMappingURL=i_ControllerObject.js.map
});
___scope___.file("src/mframejs/interface/i_RepeatCache.js", function(exports, require, module, __filename, __dirname){

Object.defineProperty(exports, "__esModule", { value: true });
//# sourceMappingURL=i_RepeatCache.js.map
});
___scope___.file("src/mframejs/interface/contants.js", function(exports, require, module, __filename, __dirname){

Object.defineProperty(exports, "__esModule", { value: true });
var CONSTANTS;
(function (CONSTANTS) {
    CONSTANTS[CONSTANTS["META_BINDABLE"] = '__meta_bindable'] = "META_BINDABLE";
    CONSTANTS[CONSTANTS["META_COMPUTEDFROM"] = '__meta_computed_from'] = "META_COMPUTEDFROM";
    CONSTANTS[CONSTANTS["ELEMENT_DETACH"] = '__MF__detach'] = "ELEMENT_DETACH";
    CONSTANTS[CONSTANTS["ELEMENT_BINDED"] = '__MF__binded'] = "ELEMENT_BINDED";
    CONSTANTS[CONSTANTS["ELEMENT_ADD"] = '__MF__add'] = "ELEMENT_ADD";
})(CONSTANTS = exports.CONSTANTS || (exports.CONSTANTS = {}));
//# sourceMappingURL=contants.js.map
});
___scope___.file("src/mframejs/interface/i_Listener.js", function(exports, require, module, __filename, __dirname){

Object.defineProperty(exports, "__esModule", { value: true });
//# sourceMappingURL=i_Listener.js.map
});
___scope___.file("src/mframejs/interface/i_Tokens.js", function(exports, require, module, __filename, __dirname){

Object.defineProperty(exports, "__esModule", { value: true });
//# sourceMappingURL=i_Tokens.js.map
});
___scope___.file("src/mframejs/interface/i_Node.js", function(exports, require, module, __filename, __dirname){

Object.defineProperty(exports, "__esModule", { value: true });
//# sourceMappingURL=i_Node.js.map
});
___scope___.file("src/mframejs/binding/setValue.js", function(exports, require, module, __filename, __dirname){

Object.defineProperty(exports, "__esModule", { value: true });
var splitCache = {};
var contextOfObject = function (value, ctx) {
    var keys, key;
    if (!splitCache[value]) {
        keys = value.split(/\.|\[([^\]]+)\]\.?/).filter(function (x) { return x ? x : null; });
        key = keys[0];
        splitCache[value] = key;
    }
    else {
        key = splitCache[value];
    }
    var newCtx = ctx;
    var overrideCtx;
    if (ctx.isMultiContext) {
        newCtx = ctx.ctx;
    }
    if (typeof key === 'string' && key[0] !== '$') {
        if (newCtx && newCtx.overrideContext) {
            while (newCtx.overrideContext) {
                newCtx = newCtx.overrideContext;
                if (key in newCtx) {
                    overrideCtx = newCtx;
                }
            }
        }
    }
    return overrideCtx || ctx;
};
function setValue(_class, key, value) {
    _class = contextOfObject(key, _class);
    var keys = key.split(/\.|\[([^\]]+)\]\.?/).filter(function (x) { return x ? x : null; });
    try {
        var ref_1;
        if (keys.length > 1) {
            keys.forEach(function (prop, i) {
                if (prop) {
                    if (i === keys.length - 1) {
                        ref_1[prop] = value;
                    }
                    else {
                        if (i === 0) {
                            ref_1 = _class[prop];
                        }
                        else {
                            ref_1 = ref_1[prop];
                        }
                    }
                }
            });
        }
        else {
            _class[key] = value;
        }
    }
    catch (e) {
        try {
            console.warn('key not found, rebuilding', key);
            var newObject_1 = {};
            var ref_2;
            keys.forEach(function (prop, i) {
                if (prop) {
                    if (i === keys.length - 1) {
                        if (i === 0) {
                            newObject_1[prop] = {};
                            ref_2 = newObject_1[prop];
                        }
                        else {
                            ref_2[prop] = value;
                        }
                    }
                    else {
                        if (i === 0) {
                            newObject_1[prop] = {};
                            ref_2 = newObject_1[prop];
                        }
                        else {
                            ref_2[prop] = {};
                            ref_2 = ref_2[prop];
                        }
                    }
                }
            });
            var classRef_1 = _class;
            keys.forEach(function (prop, i) {
                if (prop) {
                    if (i === keys.length - 1) {
                        if (!classRef_1[prop]) {
                            classRef_1[prop] = newObject_1[prop];
                        }
                    }
                    else {
                        if (i === 0) {
                            if (!classRef_1[prop]) {
                                classRef_1[prop] = newObject_1[prop];
                            }
                            newObject_1 = newObject_1[prop];
                            classRef_1 = classRef_1[prop];
                        }
                        else {
                            if (!classRef_1[prop]) {
                                classRef_1[prop] = newObject_1[prop];
                            }
                            newObject_1 = newObject_1[prop];
                            classRef_1 = classRef_1[prop];
                        }
                    }
                }
            });
        }
        catch (e) {
            console.error('key not found', key);
        }
    }
}
exports.setValue = setValue;
//# sourceMappingURL=setValue.js.map
});
___scope___.file("src/mframejs/binding/subscribeClassProperty.js", function(exports, require, module, __filename, __dirname){

Object.defineProperty(exports, "__esModule", { value: true });
var propertyObserverHandler_1 = require("./propertyObserverHandler");
function subscribeClassProperty(_class, key, listener) {
    var observerHandler = new propertyObserverHandler_1.PropertyObserverHandler(key, listener);
    observerHandler.bind(_class);
    listener.caller = observerHandler;
}
exports.subscribeClassProperty = subscribeClassProperty;
//# sourceMappingURL=subscribeClassProperty.js.map
});
___scope___.file("src/mframejs/binding/propertyObserverHandler.js", function(exports, require, module, __filename, __dirname){

Object.defineProperty(exports, "__esModule", { value: true });
var traverseAst_1 = require("./traverseAst");
var createBindingExpression_1 = require("./createBindingExpression");
var index_1 = require("../utils/index");
var index_2 = require("../container/index");
var PropertyObserverHandler = (function () {
    function PropertyObserverHandler(expression, listener) {
        this.value = undefined;
        this.oldValue = undefined;
        this.newValue = undefined;
        this.isWaiting = false;
        this.isNew = true;
        this.expression = expression;
        this.listener = listener;
        this.queue = index_2.ContainerClasses.get(index_1.Queue);
    }
    PropertyObserverHandler.prototype.bind = function (context) {
        this.observing = true;
        this.context = context;
        createBindingExpression_1.createBindingExpression(this.expression, this.context, this);
    };
    PropertyObserverHandler.prototype.setAst = function (ast) {
        this.ast = ast;
        if (!this.curBehavior) {
            this.connectBehavior();
        }
    };
    PropertyObserverHandler.prototype.init = function () {
        if (this.isNew) {
            this.isNew = false;
            var oldValue = this.value;
            var newValue = traverseAst_1.traverseAST(this.ast, this.context);
            this.value = newValue;
            this.listenerCall(newValue, oldValue);
            this.isNew = false;
        }
    };
    PropertyObserverHandler.prototype.connectBehavior = function () {
        var _this = this;
        var behaviors = traverseAst_1.getBehavior(this.ast);
        if (behaviors) {
            behaviors.forEach(function (behavior) {
                if (name === 'signal') {
                    var x = index_2.ContainerBehavior.findBehavior(behavior.name);
                    if (x) {
                        _this.curBehavior = new x(_this, behavior.args);
                    }
                }
            });
        }
    };
    PropertyObserverHandler.prototype.update = function () {
        if (this.observing) {
            this.oldValue = this.value;
            this.newValue = traverseAst_1.traverseAST(this.ast, this.context);
            if (this.oldValue !== this.newValue) {
                this.value = this.newValue;
                if (!this.isWaiting) {
                    this.isWaiting = true;
                    this.queue.add(this);
                }
            }
            else {
                this.oldValue = null;
                this.newValue = null;
            }
            this.bind(this.context);
        }
    };
    PropertyObserverHandler.prototype.listenerCall = function (newValue, oldValue) {
        if (this.listener) {
            this.listener.call(newValue, oldValue);
        }
    };
    PropertyObserverHandler.prototype.call = function (done) {
        var newValue = this.newValue;
        var oldValue = this.oldValue;
        this.oldValue = null;
        this.newValue = null;
        this.listenerCall(newValue, oldValue);
        this.isWaiting = false;
        done();
    };
    PropertyObserverHandler.prototype.unbind = function () {
        if (this.observing) {
            createBindingExpression_1.removeBindingExpression(this.expression, this.context, this);
        }
        this.listener.caller = null;
        this.observing = false;
        this.context = null;
        this.listener = null;
        this.value = null;
    };
    return PropertyObserverHandler;
}());
exports.PropertyObserverHandler = PropertyObserverHandler;
//# sourceMappingURL=propertyObserverHandler.js.map
});
___scope___.file("src/mframejs/binding/unSubscribeClassProperty.js", function(exports, require, module, __filename, __dirname){

Object.defineProperty(exports, "__esModule", { value: true });
function unSubscribeClassProperty(_class, handlerClass) {
    if (handlerClass.caller) {
        handlerClass.caller.unbind();
    }
}
exports.unSubscribeClassProperty = unSubscribeClassProperty;
//# sourceMappingURL=unSubscribeClassProperty.js.map
});
___scope___.file("src/mframejs/binding/evaluateExpression.js", function(exports, require, module, __filename, __dirname){

Object.defineProperty(exports, "__esModule", { value: true });
var traverseAst_1 = require("./traverseAst");
var tokenize_1 = require("./tokenize");
var generateAst_1 = require("./generateAst");
var index_1 = require("../utils/index");
function evaluateExpression(text, _class) {
    if (text) {
        var ast = void 0;
        if (index_1.Cache.astMapHas(text)) {
            ast = index_1.Cache.astMapGet(text);
        }
        else {
            var tokens = tokenize_1.tokenize(text);
            ast = generateAst_1.generateAST(tokens);
            index_1.Cache.astMapSet(text, ast);
        }
        return traverseAst_1.traverseAST(ast, _class);
    }
    else {
        return '';
    }
}
exports.evaluateExpression = evaluateExpression;
//# sourceMappingURL=evaluateExpression.js.map
});
___scope___.file("src/mframejs/binding/subscribeClassArray.js", function(exports, require, module, __filename, __dirname){

Object.defineProperty(exports, "__esModule", { value: true });
var arrayObserverHandler_1 = require("./arrayObserverHandler");
function subscribeClassArray(_class, key, listener) {
    var observerHandler = new arrayObserverHandler_1.ArrayObserverHandler(key, listener);
    observerHandler.bind(_class);
    listener.caller = observerHandler;
}
exports.subscribeClassArray = subscribeClassArray;
//# sourceMappingURL=subscribeClassArray.js.map
});
___scope___.file("src/mframejs/binding/arrayObserverHandler.js", function(exports, require, module, __filename, __dirname){

Object.defineProperty(exports, "__esModule", { value: true });
var classArrayObserverCreator_1 = require("./classArrayObserverCreator");
var index_1 = require("../utils/index");
var index_2 = require("../container/index");
var ArrayObserverHandler = (function () {
    function ArrayObserverHandler(expression, listener) {
        this.isWaiting = false;
        this.data = undefined;
        this.expression = expression;
        this.listener = listener;
        this.isWaiting = null;
        this.queue = index_2.ContainerClasses.get(index_1.Queue);
    }
    ArrayObserverHandler.prototype.bind = function (context) {
        this.observing = true;
        this.context = context;
        classArrayObserverCreator_1.ClassArrayObserverCreator.create(this.context, this.expression, this);
    };
    ArrayObserverHandler.prototype.update = function (data) {
        this.data = data;
        if (this.observing) {
            if (!this.isWaiting) {
                this.isWaiting = true;
                this.queue.add(this);
            }
            this.bind(this.context);
        }
    };
    ArrayObserverHandler.prototype.call = function (done) {
        var data = this.data;
        this.data = null;
        if (this.listener) {
            this.listener.call(data);
        }
        this.isWaiting = false;
        done();
    };
    ArrayObserverHandler.prototype.unbind = function () {
        if (this.observing) {
            classArrayObserverCreator_1.ClassArrayObserverCreator.remove(this.context, this.expression, this);
        }
        this.listener.caller = null;
        this.listener = null;
        this.observing = false;
        this.context = null;
        this.data = null;
        this.expression = null;
    };
    return ArrayObserverHandler;
}());
exports.ArrayObserverHandler = ArrayObserverHandler;
//# sourceMappingURL=arrayObserverHandler.js.map
});
___scope___.file("src/mframejs/binding/classArrayObserverCreator.js", function(exports, require, module, __filename, __dirname){

Object.defineProperty(exports, "__esModule", { value: true });
var classArrayObserver_1 = require("./classArrayObserver");
var emptyObject = (function () {
    function class_1() {
    }
    return class_1;
}());
var observerKeyMap = {};
var ClassArrayObserverCreator = (function () {
    function ClassArrayObserverCreator() {
    }
    ClassArrayObserverCreator.create = function (_class, observerKey, caller) {
        this.classRef = _class;
        if (observerKeyMap[observerKey]) {
            this.keyParts = observerKeyMap[observerKey];
        }
        else {
            this.keyParts = observerKey.split(/\.|\[([^\]]+)\]\.?/).filter(function (x) { return x ? x : null; });
            observerKeyMap[observerKey] = this.keyParts;
        }
        this.keyNo = 0;
        this.keyBlock = this.keyParts[this.keyNo];
        ClassArrayObserverCreator.processKeys(caller);
        ClassArrayObserverCreator.clear();
    };
    ClassArrayObserverCreator.remove = function (_class, observerKey, caller) {
        this.classRef = _class;
        if (observerKeyMap[observerKey]) {
            this.keyParts = observerKeyMap[observerKey];
        }
        else {
            this.keyParts = observerKey.split(/\.|\[([^\]]+)\]\.?/).filter(function (x) { return x ? x : null; });
            observerKeyMap[observerKey] = this.keyParts;
        }
        this.keyNo = 0;
        this.keyBlock = this.keyParts[this.keyNo];
        ClassArrayObserverCreator.removeKeys(caller);
        ClassArrayObserverCreator.clear();
    };
    ClassArrayObserverCreator.clear = function () {
        this.classRef = null;
        this.keyParts = null;
        this.keyNo = null;
        this.keyBlock = null;
    };
    ClassArrayObserverCreator.nextKey = function () {
        this.keyNo++;
        this.keyBlock = this.keyParts[this.keyNo];
    };
    ClassArrayObserverCreator.processKeys = function (caller) {
        if (!this.classRef.__observerArray) {
            this.classRef.__observerArray = new emptyObject();
        }
        if (!this.classRef.__observerArray[this.keyBlock]) {
            this.classRef.__observerArray[this.keyBlock] = new classArrayObserver_1.ClassArrayObserver(this.classRef, this.keyBlock);
            this.classRef.__observerArray[this.keyBlock].subscribe(caller);
        }
        else {
            this.classRef.__observerArray[this.keyBlock].subscribe(caller);
            this.classRef.__observerArray[this.keyBlock].observe();
        }
        if (this.keyNo !== this.keyParts.length - 1 && this.keyParts.length > 1) {
            if (this.classRef) {
                this.classRef = this.classRef[this.keyBlock];
            }
            this.nextKey();
            if (this.classRef) {
                this.processKeys(caller);
            }
        }
    };
    ClassArrayObserverCreator.removeKeys = function (caller) {
        if (this.classRef.__observerArray) {
            if (this.classRef.__observerArray[this.keyBlock]) {
                this.classRef.__observerArray[this.keyBlock].unsubscribe(caller);
            }
        }
        if (this.keyNo !== this.keyParts.length - 1 && this.keyParts.length > 1) {
            if (this.classRef) {
                this.classRef = this.classRef[this.keyBlock];
            }
            this.nextKey();
            if (this.classRef) {
                this.removeKeys(caller);
            }
        }
    };
    return ClassArrayObserverCreator;
}());
exports.ClassArrayObserverCreator = ClassArrayObserverCreator;
//# sourceMappingURL=classArrayObserverCreator.js.map
});
___scope___.file("src/mframejs/binding/classArrayObserver.js", function(exports, require, module, __filename, __dirname){

Object.defineProperty(exports, "__esModule", { value: true });
var cc1;
var cc2;
var cc3;
var cc4;
var cc5;
var events = ['pop', 'push', 'reverse', 'shift', 'sort', 'splice', 'unshift', 'sort'];
events.forEach(function (eventX) {
    var eventType = Array.prototype[eventX];
    Array.prototype[eventX] = function () {
        var result = eventType.apply(this, arguments);
        if (this.__array_observer__class) {
            this.__array_observer__class.check(arguments, eventX);
        }
        return result;
    };
});
var ClassArrayObserver = (function () {
    function ClassArrayObserver(_class, key) {
        this.internalEvents = [];
        this.timer = null;
        this._class = _class;
        this.key = key;
        if (typeof this._class === 'object') {
            this.observe();
        }
    }
    ClassArrayObserver.prototype.subscribe = function (caller) {
        if (this.c1 !== caller && this.c2 !== caller && this.c3 !== caller && this.c4 !== caller && this.c5 !== caller) {
            if (!this.c1) {
                this.c1 = caller;
            }
            else {
                if (!this.c2) {
                    this.c2 = caller;
                }
                else {
                    if (!this.c3) {
                        this.c3 = caller;
                    }
                    else {
                        if (!this.c4) {
                            this.c4 = caller;
                        }
                        else {
                            if (!this.c5) {
                                this.c5 = caller;
                            }
                            else {
                                if (!this.callers) {
                                    this.callers = [];
                                }
                                if (this.callers.indexOf(caller) === -1) {
                                    this.callers.push(caller);
                                }
                            }
                        }
                    }
                }
            }
        }
    };
    ClassArrayObserver.prototype.unsubscribe = function (caller) {
        if (this.c1 === caller) {
            this.c1 = null;
        }
        if (this.c2 === caller) {
            this.c2 = null;
        }
        if (this.c3 === caller) {
            this.c3 = null;
        }
        if (this.c4 === caller) {
            this.c4 = null;
        }
        if (this.c5 === caller) {
            this.c5 = null;
        }
        if (this.callers && this.callers.indexOf(caller) !== -1) {
            this.callers.splice(this.callers.indexOf(caller), 1);
        }
    };
    ClassArrayObserver.prototype.check = function (args, event) {
        var _this = this;
        clearTimeout(this.timer);
        this.timer = 0;
        this.internalEvents.push({
            event: event,
            args: args
        });
        this.timer = setTimeout(function () {
            if (_this.c1) {
                cc1 = _this.c1;
                _this.c1 = undefined;
                cc1.update(_this.internalEvents);
            }
            if (_this.c2) {
                cc2 = _this.c2;
                _this.c2 = undefined;
                cc2.update(_this.internalEvents);
            }
            if (_this.c3) {
                cc3 = _this.c3;
                _this.c3 = undefined;
                cc3.update(_this.internalEvents);
            }
            if (_this.c4) {
                cc4 = _this.c4;
                _this.c4 = undefined;
                cc4.update(_this.internalEvents);
            }
            if (_this.c5) {
                cc5 = _this.c5;
                _this.c5 = undefined;
                cc5.update(_this.internalEvents);
            }
            if (_this.callers && _this.callers.length > 0) {
                var calls = _this.callers.slice();
                _this.callers = [];
                calls.forEach(function (call) {
                    call.update(_this.internalEvents);
                });
            }
            _this.internalEvents = null;
            _this.internalEvents = [];
        }, 0);
    };
    ClassArrayObserver.prototype.observe = function () {
        this._class[this.key].__array_observer__class = this;
    };
    return ClassArrayObserver;
}());
exports.ClassArrayObserver = ClassArrayObserver;
//# sourceMappingURL=classArrayObserver.js.map
});
___scope___.file("src/mframejs/binding/unSubscribeClassArray.js", function(exports, require, module, __filename, __dirname){

Object.defineProperty(exports, "__esModule", { value: true });
function unSubscribeClassArray(_class, handlerClass) {
    if (handlerClass.caller) {
        handlerClass.caller.unbind();
    }
}
exports.unSubscribeClassArray = unSubscribeClassArray;
//# sourceMappingURL=unSubscribeClassArray.js.map
});
___scope___.file("src/mframejs/binding/unSubscribeClassMetaBinding.js", function(exports, require, module, __filename, __dirname){

Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("../interface/index");
var unSubscribeClassProperty_1 = require("./unSubscribeClassProperty");
function unSubscribeClassMetaBinding(_class) {
    var META = _class.__proto__[index_1.CONSTANTS.META_BINDABLE];
    if (META) {
        var keys = Object.keys(META);
        for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
            var key = keys_1[_i];
            var subscribeInternal = META[key].options.subscribeInternal;
            if (subscribeInternal) {
                unSubscribeClassProperty_1.unSubscribeClassProperty(_class, subscribeInternal);
            }
            var subscribeExternal = META[key].options.subscribeExternal;
            if (_class.$parent && subscribeExternal) {
                if (_class.$element) {
                    var el = _class.$element;
                    var att = META[key].options.attribute + ".bind";
                    var attrValue = el.getAttribute(att);
                    if (attrValue) {
                        unSubscribeClassProperty_1.unSubscribeClassProperty(_class.$parent, subscribeExternal);
                    }
                }
            }
        }
    }
}
exports.unSubscribeClassMetaBinding = unSubscribeClassMetaBinding;
//# sourceMappingURL=unSubscribeClassMetaBinding.js.map
});
___scope___.file("src/mframejs/binding/subscribeClassMetaBinding.js", function(exports, require, module, __filename, __dirname){

Object.defineProperty(exports, "__esModule", { value: true });
var subscribeClassProperty_1 = require("./subscribeClassProperty");
var bindingEngine_1 = require("./bindingEngine");
var interface_1 = require("../interface");
var subscribeChangeBaseClass = (function () {
    function class_1(_class, key, meta) {
        this._class = _class;
        this.key = key;
        this.meta = meta;
    }
    class_1.prototype.call = function (newValue, oldValue) {
        if (oldValue !== newValue) {
            var key = this.key;
            var _class = this._class;
            var META = this.meta;
            if (_class[key + "Changed"]) {
                _class[key + "Changed"](newValue, oldValue);
            }
            if (META[key].options.changeHandler) {
                _class[META[key].options.changeHandler]('key', newValue, oldValue);
            }
            if (_class.$parent && key in _class.$parent) {
                if (_class.$parent[key] !== newValue) {
                    _class.$parent[key] = newValue;
                }
            }
        }
    };
    return class_1;
}());
function subscribeClassMetaBinding(_class) {
    var META = _class.__proto__[interface_1.CONSTANTS.META_BINDABLE];
    if (META) {
        var keys = Object.keys(META);
        var _loop_1 = function (key) {
            var subscribeInternal = new subscribeChangeBaseClass(_class, key, META);
            subscribeClassProperty_1.subscribeClassProperty(_class, key, subscribeInternal);
            META[key].options.subscribeInternal = subscribeInternal;
            if (META[key].observableOnly === true) {
            }
            else {
                if (_class.$attributes && !_class.$attribute) {
                    if (_class.$element && _class.$parent) {
                        var el = _class.$element;
                        var att = META[key].options.attribute + ".bind";
                        var attrValue = el.getAttribute(att);
                        if (attrValue) {
                            var subscribeExternal = Object.create({
                                call: function (newValue, oldValue) {
                                    if (oldValue !== newValue) {
                                        _class[key] = newValue;
                                    }
                                }
                            });
                            subscribeClassProperty_1.subscribeClassProperty(_class.$parent, attrValue, subscribeExternal);
                            META[key].options.subscribeExternal = subscribeExternal;
                        }
                        else {
                            att = "" + META[key].options.attribute;
                            attrValue = el.getAttribute(att);
                            if (attrValue) {
                                if (attrValue.indexOf('${') !== -1) {
                                    var val = bindingEngine_1.BindingEngine.tokenizeParseAndTraverseAST(attrValue, _class.$parent);
                                    if (val) {
                                        _class[key] = val;
                                    }
                                }
                                else {
                                    _class[key] = attrValue;
                                }
                            }
                        }
                    }
                }
                else {
                    if (_class.$element && _class.$parent) {
                        if (keys.length === 1 && key === 'value') {
                            var el = _class.$element;
                            var att = _class.$attribute.name;
                            var haveBind = att.indexOf('.bind');
                            var attrValue = el.getAttribute(att);
                            if (haveBind !== -1) {
                                var subscribeExternal = Object.create({
                                    call: function (newValue, oldValue) {
                                        if (oldValue !== newValue) {
                                            _class[key] = newValue;
                                        }
                                    }
                                });
                                subscribeClassProperty_1.subscribeClassProperty(_class.$parent, attrValue, subscribeExternal);
                                META[key].options.subscribeExternal = subscribeExternal;
                            }
                            else {
                                attrValue = el.getAttribute(att);
                                if (attrValue) {
                                    if (attrValue.indexOf('${') !== -1) {
                                        var val = bindingEngine_1.BindingEngine.tokenizeParseAndTraverseAST(attrValue, _class.$parent);
                                        if (val) {
                                            _class[key] = val;
                                        }
                                    }
                                    else {
                                        _class[key] = attrValue;
                                    }
                                }
                            }
                        }
                        else {
                            var el = _class.$element;
                            var attributeName = _class.$attribute.name;
                            var att_1 = META[key].options.attribute + ".bind";
                            var attrValues = el.getAttribute(attributeName) ? el.getAttribute(attributeName).split(';') : null;
                            if (attrValues) {
                                var attrValue_1;
                                attrValues.forEach(function (value) {
                                    var test = value.split(':');
                                    if (test && test[0].trim() === att_1) {
                                        attrValue_1 = test[1];
                                    }
                                });
                                if (attrValue_1) {
                                    var subscribeExternal = Object.create({
                                        call: function (newValue, oldValue) {
                                            if (oldValue !== newValue) {
                                                _class[key] = newValue;
                                            }
                                        }
                                    });
                                    subscribeClassProperty_1.subscribeClassProperty(_class.$parent, attrValue_1, subscribeExternal);
                                    META[key].options.subscribeExternal = subscribeExternal;
                                }
                                else {
                                    att_1 = "" + META[key].options.attribute;
                                    var attrValue_2;
                                    attrValues.forEach(function (value) {
                                        var test = value.split(':');
                                        if (test && test[0].trim() === att_1) {
                                            attrValue_2 = test[1];
                                        }
                                    });
                                    if (attrValue_2) {
                                        if (attrValue_2.indexOf('${') !== -1) {
                                            var val = bindingEngine_1.BindingEngine.tokenizeParseAndTraverseAST(attrValue_2, _class.$parent);
                                            if (val) {
                                                _class[key] = val;
                                            }
                                        }
                                        else {
                                            _class[key] = attrValue_2;
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        };
        for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
            var key = keys_1[_i];
            _loop_1(key);
        }
    }
}
exports.subscribeClassMetaBinding = subscribeClassMetaBinding;
//# sourceMappingURL=subscribeClassMetaBinding.js.map
});
___scope___.file("src/mframejs/view/elementController.js", function(exports, require, module, __filename, __dirname){

Object.defineProperty(exports, "__esModule", { value: true });
var viewParse_1 = require("./viewParse");
var viewController_1 = require("./viewController");
var index_1 = require("../container/index");
var index_2 = require("../binding/index");
var index_3 = require("../utils/index");
var ElementController = (function () {
    function ElementController(parent, element, _class, elementRef, templateString) {
        this._process = true;
        this.logger = index_3.Logger.getLogger(element.tagName, 'element');
        this.parent = parent;
        this.element = element;
        this.templateString = templateString;
        this._class = _class || index_1.ContainerClasses.get(elementRef);
        if (element && !element.$view) {
            element.$view = new viewController_1.ViewController(element);
            element.$view.addElement(this);
        }
        else {
        }
    }
    ElementController.prototype.init = function () {
        var _this = this;
        this._class.$element = this.element;
        this._class.$parent = this.parent;
        this._class.$attributes = this.element.attributes;
        index_2.BindingEngine.subscribeClassMetaBinding(this._class);
        var arr = [];
        if (this._class.loadTemplateAsync) {
            this._class.loadTemplateAsync().then(function (template) {
                _this.templateString = _this.templateString || template;
                _this.template = viewParse_1.ViewParser.createTemplate(null, _this.templateString);
                if (_this._class.configureRouter) {
                    _this.configureRouter();
                }
                _this.create();
                _this.processContent();
                if (_this._process) {
                    arr = viewParse_1.ViewParser.parseNodes(_this.template, _this._class, _this.element.$view);
                }
                if (_this._process) {
                    while (_this.template.childNodes.length) {
                        _this.element.appendChild(_this.template.firstChild);
                    }
                }
                arr.reverse();
                _this.contentProcessed(arr);
                arr.forEach(function (a) {
                    if (a.attached) {
                        a.attached();
                    }
                });
            });
        }
        else {
            this.logger.log('loadTemplate');
            if (!this._class.loadTemplate) {
                throw new Error('loadTemplate missing');
            }
            this.templateString = this.templateString || this._class.loadTemplate();
            this.template = viewParse_1.ViewParser.createTemplate(null, this.templateString);
            if (this._class.configureRouter) {
                this.configureRouter();
            }
            this.create();
            this.processContent();
            if (this._process) {
                arr = viewParse_1.ViewParser.parseNodes(this.template, this._class, this.element.$view);
            }
            if (this._process) {
                while (this.template.childNodes.length) {
                    this.element.appendChild(this.template.firstChild);
                }
            }
            arr.reverse();
            this.contentProcessed(arr);
        }
        return arr;
    };
    ElementController.prototype.configureRouter = function () {
        this.logger.log('configureRouter');
        var router = index_1.ContainerClasses.get(index_3.Router);
        var RouterConfig = {
            root: '#/',
            title: '',
            map: function (routes) {
                RouterConfig.routes = routes;
            },
            loader: ''
        };
        this._class.configureRouter(RouterConfig, router);
        router.addConfig(RouterConfig);
    };
    ElementController.prototype.create = function () {
        this.logger.log('create');
        if (this._class.created) {
            this._class.created();
        }
    };
    ElementController.prototype.processContent = function () {
        this.logger.log('processContent');
        if (this._class.processContent) {
            this._process = this._class.processContent(this.template);
        }
    };
    ElementController.prototype.contentProcessed = function (controllers) {
        this.logger.log('contentProcessed');
        if (this._class.contentProcessed && this._process) {
            this._class.contentProcessed(controllers);
        }
    };
    ElementController.prototype.attached = function () {
        this.logger.log('attached');
        if (this._class.attached) {
            this._class.attached();
        }
    };
    ElementController.prototype.detached = function () {
        this.logger.log('detached');
        if (this._class.detached) {
            this._class.detached();
        }
        index_2.BindingEngine.unSubscribeClassMetaBinding(this._class);
        this.parent = null;
        this.element = null;
        this._class.$element = null;
        this._class.$parent = null;
        this._class.$attributes = null;
        this._class = null;
    };
    return ElementController;
}());
exports.ElementController = ElementController;
//# sourceMappingURL=elementController.js.map
});
___scope___.file("src/mframejs/view/viewParse.js", function(exports, require, module, __filename, __dirname){

Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("../container/index");
var index_2 = require("../container/index");
var index_3 = require("../utils/index");
var attributeController_1 = require("./attributeController");
var elementController_1 = require("./elementController");
var interpolateController_1 = require("./interpolateController");
var ViewParser = (function () {
    function ViewParser() {
    }
    ViewParser.parseAndCreateElement = function (_class, element, parent, templateString) {
        var elementController = new elementController_1.ElementController(parent, element, _class, null, templateString);
        var controllers = elementController.init();
        elementController.attached();
        controllers.forEach(function (controller) {
            if (controller.attached) {
                controller.attached();
            }
        });
    };
    ViewParser.cleanTemplate = function (template) {
        var loopNodes = function (node) {
            for (var n = 0; n < node.childNodes.length; n++) {
                var child = node.childNodes[n];
                if (child.nodeType === 8 || (child.nodeType === 3 && !/\S/.test(child.nodeValue))) {
                    node.removeChild(child);
                    n--;
                }
                else if (child.nodeType === 1) {
                    loopNodes(child);
                }
                child = null;
            }
        };
        loopNodes(template);
    };
    ViewParser.createTemplate = function (tag, markup) {
        var template;
        if (!index_3.Cache.templateMapHas(markup)) {
            var container = document.createElement('div');
            container.innerHTML = markup.default || markup;
            var fragment = container.firstElementChild;
            if (!fragment.content) {
                fragment.content = document.createDocumentFragment();
                while (fragment.childNodes[0]) {
                    fragment.content.appendChild(fragment.childNodes[0]);
                }
            }
            template = document.createElement(tag || 'mf-template');
            ViewParser.cleanTemplate(fragment.content);
            template.appendChild(fragment.content);
            index_3.Cache.templateMapSet(markup, template);
        }
        else {
            template = index_3.Cache.templateMapGet(markup);
        }
        var x = template.cloneNode(true);
        template = null;
        return x;
    };
    ViewParser.clearAllViews = function (element) {
        var nodeFiler = function (node) {
            return node.$view ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
        };
        var nodeIterator = document.createNodeIterator(element, NodeFilter.SHOW_ALL, nodeFiler, false);
        var currentNode;
        while (currentNode = nodeIterator.nextNode()) {
            currentNode.$view.clearView();
        }
    };
    ViewParser.parseNodes = function (template, parentContext, $view) {
        var arr = [];
        var loopNodes = function (_node) {
            for (var n = 0; n < _node.childNodes.length; n++) {
                var anyControllerAttributes = false;
                var htmlNode = _node.childNodes[n];
                if (htmlNode.getAttribute) {
                    var attributeNode = htmlNode.getAttributeNode('if.bind');
                    if (attributeNode) {
                        anyControllerAttributes = true;
                        var customAttribute = index_2.ContainerAttributes.findAttribute(attributeNode.name);
                        var instance = new attributeController_1.AttributeController(parentContext, htmlNode, attributeNode, customAttribute, $view);
                        $view = htmlNode.$view ? htmlNode.$view : $view;
                        instance.init();
                        if (instance) {
                            arr.push(instance);
                        }
                    }
                    else {
                        var attributeNode_1 = htmlNode.getAttributeNode('repeat.for');
                        if (attributeNode_1) {
                            anyControllerAttributes = true;
                            var customAttribute = index_2.ContainerAttributes.findAttribute(attributeNode_1.name);
                            var instance = new attributeController_1.AttributeController(parentContext, htmlNode, attributeNode_1, customAttribute, $view);
                            $view = htmlNode.$view ? htmlNode.$view : $view;
                            instance.init();
                            if (instance) {
                                arr.push(instance);
                            }
                        }
                    }
                }
                if (!anyControllerAttributes) {
                    var childAttributes = htmlNode.attributes || [];
                    for (var i = 0; i < childAttributes.length; i++) {
                        var attr = childAttributes[i];
                        var isCustomAttribute = index_2.ContainerAttributes.findAttribute(attr.name);
                        if (!isCustomAttribute && attr.name) {
                            isCustomAttribute = index_2.ContainerAttributes.findAttribute(attr.name.replace('.bind', ''));
                            if (!isCustomAttribute && attr.name) {
                                isCustomAttribute = index_2.ContainerAttributes.findAttribute('mframejs-event-trigger.' + attr.name.split('.')[1]);
                                if (!isCustomAttribute && attr.name) {
                                    isCustomAttribute = index_2.ContainerAttributes.findAttribute('mframejs-event-delegate.' + attr.name.split('.')[1]);
                                }
                            }
                        }
                        if (isCustomAttribute) {
                            var instance = new attributeController_1.AttributeController(parentContext, htmlNode, attr, isCustomAttribute, $view);
                            $view = htmlNode.$view ? htmlNode.$view : $view;
                            instance.init();
                            if (instance) {
                                arr.push(instance);
                            }
                        }
                        else {
                            if (attr.value.indexOf('${') !== -1) {
                                var interpolateController = new interpolateController_1.InterpolateController(parentContext, attr, $view);
                                interpolateController.init();
                                arr.push(interpolateController);
                            }
                        }
                    }
                }
                if (!anyControllerAttributes) {
                    if (htmlNode.textContent && htmlNode.nodeType !== 1) {
                        if (htmlNode.textContent.indexOf('${') !== -1) {
                            var interpolateController = new interpolateController_1.InterpolateController(parentContext, htmlNode, $view);
                            interpolateController.init();
                            arr.push(interpolateController);
                        }
                    }
                    if (htmlNode.nodeType === 1) {
                        var haveCustomElement = index_1.ContainerElements.findElement(htmlNode.localName);
                        if (haveCustomElement) {
                            var elementController = new elementController_1.ElementController(parentContext, htmlNode, null, haveCustomElement, null);
                            $view = htmlNode.$view ? htmlNode.$view : $view;
                            var controllers = elementController.init();
                            arr.push(elementController);
                            arr.push.apply(arr, controllers);
                        }
                        else {
                            if (htmlNode.childNodes) {
                                loopNodes(htmlNode);
                            }
                        }
                    }
                }
            }
        };
        var tempTemplate = { childNodes: [template] };
        loopNodes(tempTemplate);
        return arr;
    };
    ViewParser.parseNodesWithCache = function (template, parentContext, cache, $view) {
        var arr = [];
        var nodeIterator = document.createTreeWalker(template, NodeFilter.SHOW_ALL, null, false);
        var yy = 0;
        var last = cache[0].last;
        var htmlNode;
        for (var i = 0; i < cache.length; i++) {
            htmlNode = nodeIterator.nextNode();
            if (cache[i].no === yy) {
                switch (cache[i].type) {
                    case 'attribute-interpolate':
                    case 'attribute':
                        if (cache[i].type === 'attribute') {
                            var attributeController = new attributeController_1.AttributeController(parentContext, htmlNode, htmlNode.attributes[cache[i].attributeCount], cache[i].set, $view);
                            $view = htmlNode.$view ? htmlNode.$view : $view;
                            attributeController.init();
                            arr.push(attributeController);
                        }
                        else {
                            var interpolateController_2 = new interpolateController_1.InterpolateController(parentContext, htmlNode.attributes[cache[i].attributeCount], $view);
                            interpolateController_2.init();
                            arr.push(interpolateController_2);
                        }
                        while (cache[i + 1] && cache[i + 1].no === yy) {
                            i++;
                            if (cache[i].type === 'attribute') {
                                var attributeController = new attributeController_1.AttributeController(parentContext, htmlNode, htmlNode.attributes[cache[i].attributeCount], cache[i].set, $view);
                                $view = htmlNode.$view ? htmlNode.$view : $view;
                                attributeController.init();
                                arr.push(attributeController);
                            }
                            else {
                                var interpolateController_3 = new interpolateController_1.InterpolateController(parentContext, htmlNode.attributes[cache[i].attributeCount], $view);
                                interpolateController_3.init();
                                arr.push(interpolateController_3);
                            }
                        }
                        break;
                    case 'element':
                        var elementController = new elementController_1.ElementController(parentContext, htmlNode, null, cache[i].set, null);
                        $view = htmlNode.$view ? htmlNode.$view : $view;
                        var controllers = elementController.init();
                        arr.push(elementController);
                        arr.push.apply(arr, controllers);
                        break;
                    case 'interpolate':
                        var interpolateController = new interpolateController_1.InterpolateController(parentContext, htmlNode, $view);
                        interpolateController.init();
                        arr.push(interpolateController);
                        break;
                }
            }
            yy++;
            if (yy > last) {
                break;
            }
        }
        return arr;
    };
    ViewParser.createNodeParseCache = function (template) {
        var cache = [];
        var attributeCount = -1;
        var yy = -1;
        var last = 0;
        var loopNodes = function (_node, controllerOverride) {
            for (var n = 0; n < _node.childNodes.length; n++) {
                yy++;
                var cacheLength = cache.length;
                var anyControllerAttributes = controllerOverride ? controllerOverride : false;
                var htmlNode = _node.childNodes[n];
                if (htmlNode.getAttribute && !controllerOverride) {
                    var haveIfBindAttribute = htmlNode.getAttribute('if.bind');
                    if (haveIfBindAttribute) {
                        anyControllerAttributes = true;
                        var childAttributes = htmlNode.attributes || [];
                        attributeCount = -1;
                        for (var i = 0; i < childAttributes.length; i++) {
                            attributeCount++;
                            var attr = childAttributes[i];
                            if (attr.name === 'if.bind') {
                                var isCustomAttribute = index_2.ContainerAttributes.findAttribute(attr.name);
                                if (isCustomAttribute) {
                                    last = yy;
                                    cache.push({
                                        no: yy,
                                        type: 'attribute',
                                        attributeCount: attributeCount,
                                        set: isCustomAttribute
                                    });
                                }
                            }
                        }
                    }
                    else {
                        var haveRepeatAttribute = htmlNode.getAttribute('repeat.for');
                        if (haveRepeatAttribute) {
                            anyControllerAttributes = true;
                            var childAttributes = htmlNode.attributes || [];
                            attributeCount = -1;
                            for (var i = 0; i < childAttributes.length; i++) {
                                attributeCount++;
                                var attr = childAttributes[i];
                                if (attr.name === 'repeat.for') {
                                    var isCustomAttribute = index_2.ContainerAttributes.findAttribute(attr.name);
                                    if (isCustomAttribute) {
                                        last = yy;
                                        cache.push({
                                            no: yy,
                                            type: 'attribute',
                                            attributeCount: attributeCount,
                                            set: isCustomAttribute
                                        });
                                    }
                                }
                            }
                        }
                    }
                }
                if (!anyControllerAttributes && !controllerOverride) {
                    var childAttributes = htmlNode.attributes || [];
                    attributeCount = -1;
                    for (var i = 0; i < childAttributes.length; i++) {
                        attributeCount++;
                        var attr = childAttributes[i];
                        var isCustomAttribute = index_2.ContainerAttributes.findAttribute(attr.name);
                        if (!isCustomAttribute && attr.name) {
                            isCustomAttribute = index_2.ContainerAttributes.findAttribute(attr.name.replace('.bind', ''));
                            if (!isCustomAttribute && attr.name) {
                                isCustomAttribute = index_2.ContainerAttributes.findAttribute('mframejs-event-trigger.' + attr.name.split('.')[1]);
                                if (!isCustomAttribute && attr.name) {
                                    isCustomAttribute = index_2.ContainerAttributes.findAttribute('mframejs-event-delegate.' + attr.name.split('.')[1]);
                                }
                            }
                        }
                        if (isCustomAttribute) {
                            last = yy;
                            cache.push({
                                no: yy,
                                type: 'attribute',
                                attributeCount: attributeCount,
                                set: isCustomAttribute
                            });
                        }
                        else {
                            if (attr.value.indexOf('${') !== -1) {
                                last = yy;
                                cache.push({
                                    no: yy,
                                    type: 'attribute-interpolate',
                                    set: null,
                                    attributeCount: attributeCount
                                });
                            }
                        }
                    }
                }
                if (!anyControllerAttributes && !controllerOverride) {
                    if (htmlNode.textContent && htmlNode.nodeType !== 1) {
                        if (htmlNode.textContent.indexOf('${') !== -1) {
                            last = yy;
                            cache.push({
                                no: yy,
                                type: 'interpolate',
                                set: null,
                                attributeCount: null
                            });
                        }
                    }
                    else {
                        if (htmlNode.nodeType === 1) {
                            var haveCustomElement = index_1.ContainerElements.findElement(htmlNode.localName);
                            if (haveCustomElement) {
                                last = yy;
                                cache.push({
                                    no: yy,
                                    type: 'element',
                                    set: haveCustomElement,
                                    attributeCount: null
                                });
                            }
                        }
                    }
                }
                if (cacheLength === cache.length) {
                    cache.push({
                        no: yy + 99,
                        type: null,
                        set: null,
                        attributeCount: null
                    });
                }
                if (htmlNode.childNodes) {
                    loopNodes(htmlNode, anyControllerAttributes);
                }
            }
        };
        loopNodes(template, false);
        cache[0].last = last;
        return cache;
    };
    return ViewParser;
}());
exports.ViewParser = ViewParser;
//# sourceMappingURL=viewParse.js.map
});
___scope___.file("src/mframejs/view/interpolateController.js", function(exports, require, module, __filename, __dirname){

Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("../binding/index");
var index_2 = require("../utils/index");
var SubscribeInternal = (function () {
    function class_1(node) {
        this.firstRun = true;
        this.name = 'Interpolate';
        this.node = node;
    }
    class_1.prototype.call = function (newValue, oldValue) {
        if (oldValue !== newValue || this.firstRun) {
            this.firstRun = false;
            if (this.node.nodeType === 2) {
                this.node.value = newValue;
            }
            else {
                this.node.data = newValue;
            }
        }
    };
    return class_1;
}());
var InterpolateController = (function () {
    function InterpolateController(parent, node, $view) {
        this.attr = false;
        if (!node.data) {
            this.attr = true;
        }
        this.logger = index_2.Logger.getLogger(this.attr ? node.value.trim() : node.data.trim(), 'interpolate');
        this.parent = parent;
        this.node = node;
        $view.addInterpolate(this);
    }
    InterpolateController.prototype.init = function () {
        this.logger.log('init');
        this.subscribeInternal = new SubscribeInternal(this.node);
        index_1.BindingEngine.subscribeClassProperty(this.parent, this.attr ? this.node.value : this.node.data, this.subscribeInternal);
    };
    InterpolateController.prototype.attached = function () {
        this.logger.log('attached');
    };
    InterpolateController.prototype.detached = function () {
        this.logger.log('detached');
        index_1.BindingEngine.unSubscribeClassProperty(this.parent, this.subscribeInternal);
        this.subscribeInternal = null;
        this.parent = null;
        this.node = null;
    };
    return InterpolateController;
}());
exports.InterpolateController = InterpolateController;
//# sourceMappingURL=interpolateController.js.map
});
___scope___.file("src/mframejs/decorator/index.js", function(exports, require, module, __filename, __dirname){

Object.defineProperty(exports, "__esModule", { value: true });
var inject_1 = require("./inject");
exports.inject = inject_1.inject;
var transient_1 = require("./transient");
exports.transient = transient_1.transient;
var customAttribute_1 = require("./customAttribute");
exports.customAttribute = customAttribute_1.customAttribute;
var customElement_1 = require("./customElement");
exports.customElement = customElement_1.customElement;
var bindable_1 = require("./bindable");
exports.bindable = bindable_1.bindable;
var observable_1 = require("./observable");
exports.observable = observable_1.observable;
var computedFrom_1 = require("./computedFrom");
exports.computedFrom = computedFrom_1.computedFrom;
var valueConverter_1 = require("./valueConverter");
exports.valueConverter = valueConverter_1.valueConverter;
var behavior_1 = require("./behavior");
exports.behavior = behavior_1.behavior;
//# sourceMappingURL=index.js.map
});
___scope___.file("src/mframejs/decorator/inject.js", function(exports, require, module, __filename, __dirname){

Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("../container/index");
function inject() {
    var deps = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        deps[_i] = arguments[_i];
    }
    return function injector(_class) {
        index_1.ContainerClasses.setDep(_class, deps);
    };
}
exports.inject = inject;
//# sourceMappingURL=inject.js.map
});
___scope___.file("src/mframejs/decorator/transient.js", function(exports, require, module, __filename, __dirname){

Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("../container/index");
function transient(_class) {
    index_1.ContainerClasses.regTransient(_class);
}
exports.transient = transient;
//# sourceMappingURL=transient.js.map
});
___scope___.file("src/mframejs/decorator/customAttribute.js", function(exports, require, module, __filename, __dirname){

Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("../container/index");
var index_2 = require("../container/index");
function customAttribute(name) {
    return function register(_class) {
        index_1.ContainerClasses.regTransient(_class);
        index_2.ContainerAttributes.regAttribute(_class, name);
    };
}
exports.customAttribute = customAttribute;
//# sourceMappingURL=customAttribute.js.map
});
___scope___.file("src/mframejs/decorator/customElement.js", function(exports, require, module, __filename, __dirname){

Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("../container/index");
var index_2 = require("../container/index");
function customElement(name) {
    return function register(_class) {
        index_1.ContainerClasses.regTransient(_class);
        index_2.ContainerElements.regElement(_class, name);
    };
}
exports.customElement = customElement;
//# sourceMappingURL=customElement.js.map
});
___scope___.file("src/mframejs/decorator/bindable.js", function(exports, require, module, __filename, __dirname){

Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("../interface/index");
function bindable(options) {
    var _options;
    _options = options;
    return function (target, key) {
        if (!target[index_1.CONSTANTS.META_BINDABLE]) {
            target[index_1.CONSTANTS.META_BINDABLE] = {};
        }
        var attribute = key.replace(/([a-z])([A-Z])/g, '$1-$2')
            .replace(/\s+/g, '-')
            .toLowerCase();
        if (options) {
            if (!options.attribute) {
                options.attribute = attribute;
            }
        }
        if (!target[index_1.CONSTANTS.META_BINDABLE][key]) {
            target[index_1.CONSTANTS.META_BINDABLE][key] = {
                key: key,
                options: _options || {
                    attribute: attribute
                }
            };
        }
    };
}
exports.bindable = bindable;
//# sourceMappingURL=bindable.js.map
});
___scope___.file("src/mframejs/decorator/observable.js", function(exports, require, module, __filename, __dirname){

Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("../interface/index");
function observable(options) {
    var _options;
    _options = options;
    return function (target, key) {
        if (!target[index_1.CONSTANTS.META_BINDABLE]) {
            target[index_1.CONSTANTS.META_BINDABLE] = {};
        }
        if (options) {
            if (!options.attribute) {
                options.attribute = null;
            }
        }
        if (!target[index_1.CONSTANTS.META_BINDABLE][key]) {
            target[index_1.CONSTANTS.META_BINDABLE][key] = {
                key: key,
                observableOnly: true,
                options: _options || {
                    attribute: null
                }
            };
        }
    };
}
exports.observable = observable;
//# sourceMappingURL=observable.js.map
});
___scope___.file("src/mframejs/decorator/computedFrom.js", function(exports, require, module, __filename, __dirname){

Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("../interface/index");
function computedFrom() {
    var options = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        options[_i] = arguments[_i];
    }
    var _options;
    _options = options;
    return function (target, key) {
        if (!target[index_1.CONSTANTS.META_COMPUTEDFROM]) {
            target[index_1.CONSTANTS.META_COMPUTEDFROM] = {};
        }
        if (!target[index_1.CONSTANTS.META_COMPUTEDFROM][key]) {
            target[index_1.CONSTANTS.META_COMPUTEDFROM][key] = {
                key: key,
                attributes: _options || {
                    attributes: []
                }
            };
        }
    };
}
exports.computedFrom = computedFrom;
//# sourceMappingURL=computedFrom.js.map
});
___scope___.file("src/mframejs/decorator/valueConverter.js", function(exports, require, module, __filename, __dirname){

Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("../container/index");
var index_2 = require("../container/index");
function valueConverter(name) {
    return function register(_class) {
        index_1.ContainerClasses.regTransient(_class);
        index_2.ContainerValueConverters.regConverter(_class, name);
    };
}
exports.valueConverter = valueConverter;
//# sourceMappingURL=valueConverter.js.map
});
___scope___.file("src/mframejs/decorator/behavior.js", function(exports, require, module, __filename, __dirname){

Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("../container/index");
var index_2 = require("../container/index");
function behavior(name) {
    return function register(_class) {
        index_1.ContainerClasses.regTransient(_class);
        index_2.ContainerBehavior.regBehavior(_class, name);
    };
}
exports.behavior = behavior;
//# sourceMappingURL=behavior.js.map
});
___scope___.file("src/mframejs/behavior/index.js", function(exports, require, module, __filename, __dirname){

Object.defineProperty(exports, "__esModule", { value: true });
var signal_1 = require("./signal");
exports.SignalBehavior = signal_1.SignalBehavior;
var throttle_1 = require("./throttle");
exports.ThrottleBehavior = throttle_1.ThrottleBehavior;
var debounce_1 = require("./debounce");
exports.DebounceBehavior = debounce_1.DebounceBehavior;
var trigger_1 = require("./trigger");
exports.TriggerBehavior = trigger_1.TriggerBehavior;
//# sourceMappingURL=index.js.map
});
___scope___.file("src/mframejs/behavior/signal.js", function(exports, require, module, __filename, __dirname){

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("../decorator/index");
var index_2 = require("../utils/index");
var index_3 = require("../container/index");
var eventAggregator = index_3.ContainerClasses.get(index_2.EventAggregator);
var SignalBehavior = (function () {
    function SignalBehavior(observer, args) {
        this.name = args[0] || 'undefined';
        if (observer.listener && observer.listener.name === 'Interpolate') {
            observer.unbindBackup = observer.unbind;
            observer.unbind = function () {
                this.unbindBackup();
            };
            eventAggregator.subscribe('signal-' + this.name, function () {
                observer.update();
            });
        }
    }
    SignalBehavior = __decorate([
        index_1.behavior('signal'),
        __metadata("design:paramtypes", [Object, Object])
    ], SignalBehavior);
    return SignalBehavior;
}());
exports.SignalBehavior = SignalBehavior;
//# sourceMappingURL=signal.js.map
});
___scope___.file("src/mframejs/behavior/throttle.js", function(exports, require, module, __filename, __dirname){

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("../decorator/index");
var ThrottleBehavior = (function () {
    function ThrottleBehavior(binding, args) {
        var time = args[0] || 100;
        if (binding.eventHandlerBinded) {
            binding.eventHandlerBindedBackup = binding.eventHandlerBinded;
            binding.detachedBackup = binding.detached;
            binding.detached = function () {
                binding.detachedBackup();
            };
            binding.eventHandlerBinded = function () {
                var _this = this;
                if (!this.timerBehavior) {
                    this.timerBehavior = setTimeout(function () {
                        binding.eventHandlerBindedBackup();
                        _this.timerBehavior = null;
                    }, time);
                }
            }.bind(binding);
        }
    }
    ThrottleBehavior = __decorate([
        index_1.behavior('throttle'),
        __metadata("design:paramtypes", [Object, Object])
    ], ThrottleBehavior);
    return ThrottleBehavior;
}());
exports.ThrottleBehavior = ThrottleBehavior;
//# sourceMappingURL=throttle.js.map
});
___scope___.file("src/mframejs/behavior/debounce.js", function(exports, require, module, __filename, __dirname){

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("../decorator/index");
var DebounceBehavior = (function () {
    function DebounceBehavior(binding, args) {
        var time = args[0] || 100;
        if (binding.eventHandlerBinded) {
            binding.eventHandlerBindedBackup = binding.eventHandlerBinded;
            binding.detachedBackup = binding.detached;
            binding.detached = function () {
                binding.detachedBackup();
            };
            binding.eventHandlerBinded = function () {
                if (this.timerBehavior) {
                    clearTimeout(this.timerBehavior);
                    this.timerBehavior = null;
                }
                this.timerBehavior = setTimeout(function () {
                    binding.eventHandlerBindedBackup();
                }, time);
            }.bind(binding);
        }
    }
    DebounceBehavior = __decorate([
        index_1.behavior('debounce'),
        __metadata("design:paramtypes", [Object, Object])
    ], DebounceBehavior);
    return DebounceBehavior;
}());
exports.DebounceBehavior = DebounceBehavior;
//# sourceMappingURL=debounce.js.map
});
___scope___.file("src/mframejs/behavior/trigger.js", function(exports, require, module, __filename, __dirname){

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("../decorator/index");
var TriggerBehavior = (function () {
    function TriggerBehavior(binding, args) {
        var trigger = args;
        if (binding.eventHandlerBinded) {
            if ('trigger' in binding && trigger) {
                binding.trigger = trigger;
            }
        }
    }
    TriggerBehavior = __decorate([
        index_1.behavior('updateTrigger'),
        __metadata("design:paramtypes", [Object, Object])
    ], TriggerBehavior);
    return TriggerBehavior;
}());
exports.TriggerBehavior = TriggerBehavior;
//# sourceMappingURL=trigger.js.map
});
___scope___.file("src/mframejs/element/index.js", function(exports, require, module, __filename, __dirname){

Object.defineProperty(exports, "__esModule", { value: true });
var mf_router_1 = require("./mf-router");
exports.MfRouter = mf_router_1.MfRouter;
//# sourceMappingURL=index.js.map
});
___scope___.file("src/mframejs/element/mf-router.js", function(exports, require, module, __filename, __dirname){

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("../utils/index");
var index_2 = require("../utils/index");
var index_3 = require("../decorator/index");
var index_4 = require("../decorator/index");
var index_5 = require("../container/index");
var index_6 = require("../view/index");
var MfRouter = (function () {
    function MfRouter(eventAggregator, router) {
        this.router = router;
        this.eventAggregator = eventAggregator;
        this.router.registerElement(this);
    }
    MfRouter.prototype.created = function () {
    };
    MfRouter.prototype.attached = function () {
        this.started = true;
        if (!this.loaded) {
            this.update();
        }
    };
    MfRouter.prototype.detached = function () {
        this.router.unregisterElement(this);
    };
    MfRouter.prototype.loadTemplateAsync = function () {
        return __awaiter(this, void 0, void 0, function () {
            var route, template, instance, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!!this.started) return [3, 1];
                        return [2, '<template></template>'];
                    case 1:
                        _a.trys.push([1, 6, , 7]);
                        route = this.router.getCurrentModule();
                        return [4, this.router.loadCurrentModule()];
                    case 2:
                        template = _a.sent();
                        if (template === undefined) {
                            console.warn('route not found' + route);
                        }
                        instance = index_5.ContainerClasses.get(template[this.router.getCurrentClass()]);
                        this.instance = instance;
                        if (!instance.loadTemplateAsync) return [3, 4];
                        return [4, instance.loadTemplateAsync()];
                    case 3: return [2, _a.sent()];
                    case 4: return [2, instance.loadTemplate()];
                    case 5: return [3, 7];
                    case 6:
                        e_1 = _a.sent();
                        return [2, "<template>" + e_1 + "</template>"];
                    case 7: return [2];
                }
            });
        });
    };
    MfRouter.prototype.loadTemplate = function () {
        if (!this.started) {
        }
        else {
            console.log('Im not supposed to trigger, BUG!!!');
        }
        return '<template></template>';
    };
    MfRouter.prototype.update = function () {
        var _this = this;
        var instanceOld = this.instance;
        var response = true;
        if (instanceOld) {
            if (instanceOld.canDeactivate) {
                response = instanceOld.canDeactivate();
            }
        }
        if (response) {
            if (instanceOld) {
                if (instanceOld.detached) {
                    instanceOld.detached();
                }
                index_6.ViewParser.clearAllViews(instanceOld.$element);
                instanceOld.$element = null;
                instanceOld.$parent = null;
                instanceOld.$attributes = null;
                instanceOld.$element = null;
            }
            while (this.$element.firstChild) {
                this.$element.removeChild(this.$element.firstChild);
            }
            var view_1 = document.createElement('view');
            this.loadTemplateAsync().then(function (templateString) {
                _this.loaded = true;
                index_6.ViewParser.parseAndCreateElement(_this.instance, view_1, _this, templateString);
                _this.$element.appendChild(view_1);
                _this.router.isNavigating = false;
                if (_this.instance.activated) {
                    _this.instance.activated();
                }
            });
        }
    };
    MfRouter = __decorate([
        index_3.customElement('mf-router'),
        index_4.inject(index_2.EventAggregator, index_1.Router),
        __metadata("design:paramtypes", [typeof (_a = typeof index_2.EventAggregator !== "undefined" && index_2.EventAggregator) === "function" && _a || Object, typeof (_b = typeof index_1.Router !== "undefined" && index_1.Router) === "function" && _b || Object])
    ], MfRouter);
    return MfRouter;
    var _a, _b;
}());
exports.MfRouter = MfRouter;
//# sourceMappingURL=mf-router.js.map
});
___scope___.file("src/mframejs/attribute/index.js", function(exports, require, module, __filename, __dirname){

Object.defineProperty(exports, "__esModule", { value: true });
var ifAttribute_1 = require("./ifAttribute");
exports.IfAttribute = ifAttribute_1.IfAttribute;
var valueAttribute_1 = require("./valueAttribute");
exports.ValueAttribute = valueAttribute_1.ValueAttribute;
var delgateEventsAttribute_1 = require("./delgateEventsAttribute");
exports.DelgateEventsAttribute = delgateEventsAttribute_1.DelgateEventsAttribute;
var triggerEventsAttribute_1 = require("./triggerEventsAttribute");
exports.TriggerEventsAttribute = triggerEventsAttribute_1.TriggerEventsAttribute;
var repeatAttribute_1 = require("./repeatAttribute");
exports.RepeatAttribute = repeatAttribute_1.RepeatAttribute;
var miscAttribute_1 = require("./miscAttribute");
exports.MiscAttributes = miscAttribute_1.MiscAttributes;
var cssAttribute_1 = require("./cssAttribute");
exports.CssAttribute = cssAttribute_1.CssAttribute;
var modelAttribute_1 = require("./modelAttribute");
exports.ModelAttribute = modelAttribute_1.ModelAttribute;
//# sourceMappingURL=index.js.map
});
___scope___.file("src/mframejs/attribute/ifAttribute.js", function(exports, require, module, __filename, __dirname){

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("../decorator/index");
var index_2 = require("../view/index");
var index_3 = require("../binding/index");
var IfAttribute = (function () {
    function IfAttribute() {
    }
    IfAttribute.prototype.created = function () {
        this.value = this.$attribute.value;
        this.$element.attributes.removeNamedItem('if.bind');
        if (this.$element && this.$element.$view) {
            this.$view = this.$element.$view;
        }
        this.elementClone = this.$element.cloneNode(true);
        this.anchor = document.createComment('mf-if-bind');
        if (this.$view) {
            this.anchor.$view = this.$view;
        }
        this.$element.parentNode.insertBefore(this.anchor, this.$element);
        this.remove();
        this.added = false;
    };
    IfAttribute.prototype.attached = function () {
        var _this = this;
        this.subscribeCall = {
            name: 'ifAttribute',
            value: this.value,
            call: function (newValue) {
                switch (true) {
                    case newValue && !_this.added:
                        _this.added = true;
                        _this.add();
                        break;
                    case !newValue && _this.added:
                        _this.remove();
                        break;
                    default:
                }
            }
        };
        index_3.BindingEngine.subscribeClassProperty(this.$parent, this.value, this.subscribeCall);
    };
    IfAttribute.prototype.detached = function () {
        index_3.BindingEngine.unSubscribeClassProperty(this.$parent, this.subscribeCall);
    };
    IfAttribute.prototype.add = function () {
        var template = this.elementClone.cloneNode(true);
        this.$element = template;
        template.$view = new index_2.ViewController(template);
        var controllers = [];
        controllers = index_2.ViewParser.parseNodes(this.$element, this.$parent, template.$view);
        this.anchor.parentNode.insertBefore(this.$element, this.anchor);
        controllers.forEach(function (x) {
            if (x.attached) {
                x.attached();
            }
        });
        controllers = null;
    };
    IfAttribute.prototype.remove = function () {
        var x = this.$element;
        if (this.added) {
            this.added = false;
            index_2.ViewParser.clearAllViews(this.$element);
            this.$element = null;
        }
        this.anchor.parentNode.removeChild(x);
        x = null;
    };
    IfAttribute = __decorate([
        index_1.customAttribute('if.bind'),
        __metadata("design:paramtypes", [])
    ], IfAttribute);
    return IfAttribute;
}());
exports.IfAttribute = IfAttribute;
//# sourceMappingURL=ifAttribute.js.map
});
___scope___.file("src/mframejs/attribute/valueAttribute.js", function(exports, require, module, __filename, __dirname){

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("../decorator/index");
var index_2 = require("../binding/index");
var index_3 = require("../utils/index");
var index_4 = require("../container/index");
var PropertyChangeHandler = (function () {
    function class_1(node) {
        this.firstRun = true;
        this.name = 'valueAttribute';
        this.node = node;
    }
    class_1.prototype.call = function (newValue, oldValue) {
        if (oldValue !== newValue || this.firstRun) {
            this.firstRun = false;
            if (oldValue !== newValue) {
                switch (true) {
                    case this.node.type === 'text':
                        this.node.value = newValue || '';
                        break;
                    case this.node.type === 'checkbox':
                        var modelBind = this.node.hasAttribute('model.bind') ? this.node.getAttributeNode('model.bind') : null;
                        if (modelBind && modelBind.getContent) {
                            var x = modelBind.getContent();
                            if (x) {
                                if (Array.isArray(newValue)) {
                                    if (newValue.indexOf(x.value) !== -1) {
                                        this.node.checked = true;
                                    }
                                    else {
                                        this.node.checked = false;
                                    }
                                }
                                else {
                                    if (newValue === x.value) {
                                        this.node.checked = true;
                                    }
                                    else {
                                        this.node.checked = false;
                                    }
                                }
                            }
                        }
                        else {
                            if (Array.isArray(newValue)) {
                                console.log('error: value is array, this should not happen');
                            }
                            else {
                                this.node.checked = newValue || false;
                            }
                        }
                        break;
                    case this.node.type === 'radio':
                        var radios = null;
                        if (this.node.form) {
                            radios = this.node.form.querySelectorAll("[name=" + this.node.name + "]");
                        }
                        else {
                            radios = document.querySelectorAll("[name=" + this.node.name + "]");
                        }
                        if (radios && radios.length > 0) {
                            var modelBind_1 = this.node.hasAttribute('model.bind') ? this.node.getAttributeNode('model.bind') : null;
                            if (modelBind_1 && modelBind_1.getContent) {
                                var x = modelBind_1.getContent();
                                if (x) {
                                    if (newValue === x.value) {
                                        this.node.checked = true;
                                    }
                                }
                            }
                        }
                        break;
                    case this.node.type === 'select-one':
                        var optionsSingle = this.node.options;
                        var index = null;
                        for (var i = 0; i < optionsSingle.length; i++) {
                            var modelBind_2 = optionsSingle[i].hasAttribute('model.bind') ? optionsSingle[i].getAttributeNode('model.bind') : null;
                            if (modelBind_2 && modelBind_2.getContent) {
                                var x = modelBind_2.getContent();
                                if (x) {
                                    if (Array.isArray(newValue)) {
                                        if (newValue[0] === x.value) {
                                            index = i;
                                        }
                                    }
                                    else {
                                        if (newValue === x.value) {
                                            index = i;
                                        }
                                    }
                                }
                            }
                        }
                        this.node.selectedIndex = index;
                        break;
                    case this.node.type === 'select-multiple':
                        var optionsMany = this.node.options;
                        for (var i = 0; i < optionsMany.length; i++) {
                            var modelBind_3 = optionsMany[i].hasAttribute('model.bind') ? optionsMany[i].getAttributeNode('model.bind') : null;
                            if (modelBind_3 && modelBind_3.getContent) {
                                var x = modelBind_3.getContent();
                                if (x) {
                                    if (Array.isArray(newValue)) {
                                        if (newValue.indexOf(x.value) !== -1) {
                                            optionsMany[i].selected = true;
                                        }
                                        else {
                                            optionsMany[i].selected = false;
                                        }
                                        if (newValue.length === 0 && x.value === null) {
                                            optionsMany[i].selected = true;
                                        }
                                    }
                                    else {
                                        if (newValue === x.value) {
                                            optionsMany[i].selected = true;
                                        }
                                        else {
                                            optionsMany[i].selected = false;
                                        }
                                    }
                                }
                            }
                        }
                        break;
                }
            }
        }
    };
    return class_1;
}());
var ValueAttribute = (function () {
    function ValueAttribute() {
        this.valueConverters = [];
        this.eventHandlerBinded = this.eventHandler.bind(this);
    }
    ValueAttribute.prototype.created = function () {
        var _this = this;
        this.expressionValue = this.$attribute.value;
        this.attributeName = this.expressionValue.split('|')[0].trim().split('&')[0].trim();
        this.trigger = null;
        this.name = this.$attribute.name;
        this.propertyChangeHandler = new PropertyChangeHandler(this.$element);
        switch (true) {
            case (this.$element.tagName === 'INPUT' && this.$element.type === 'text') || this.$element.tagName === 'TEXTAREA':
                index_2.BindingEngine.subscribeClassProperty(this.$parent, this.expressionValue, this.propertyChangeHandler);
                this.connectBehavior();
                if (!this.trigger) {
                    this.$element.addEventListener('input', this.eventHandlerBinded, false);
                }
                else {
                    this.trigger.forEach(function (trigger) {
                        _this.$element.addEventListener(trigger, _this.eventHandlerBinded, false);
                    });
                }
                break;
            case this.$element.tagName === 'INPUT' && this.$element.type === 'checkbox':
                index_2.BindingEngine.subscribeClassProperty(this.$parent, this.expressionValue, this.propertyChangeHandler);
                this.connectBehavior();
                if (!this.trigger) {
                    this.$element.addEventListener('click', this.eventHandlerBinded, false);
                }
                else {
                    this.trigger.forEach(function (trigger) {
                        _this.$element.addEventListener(trigger, _this.eventHandlerBinded, false);
                    });
                }
                break;
            case this.$element.tagName === 'INPUT' && this.$element.type === 'radio':
                index_2.BindingEngine.subscribeClassProperty(this.$parent, this.expressionValue, this.propertyChangeHandler);
                this.connectBehavior();
                if (!this.trigger) {
                    this.$element.addEventListener('click', this.eventHandlerBinded, false);
                }
                else {
                    this.trigger.forEach(function (trigger) {
                        _this.$element.addEventListener(trigger, _this.eventHandlerBinded, false);
                    });
                }
                break;
            case this.$element.tagName === 'SELECT':
                index_2.BindingEngine.subscribeClassProperty(this.$parent, this.expressionValue, this.propertyChangeHandler);
                this.connectBehavior();
                if (!this.trigger) {
                    this.$element.addEventListener('change', this.eventHandlerBinded, false);
                }
                else {
                    this.trigger.forEach(function (trigger) {
                        _this.$element.addEventListener(trigger, _this.eventHandlerBinded, false);
                    });
                }
                break;
            default:
        }
    };
    ValueAttribute.prototype.runValueConverter = function (value) {
        var x = index_3.Cache.expressionMapGet(this.expressionValue);
        return index_2.BindingEngine.valueConvert(x.ast, this.$parent, value);
    };
    ValueAttribute.prototype.connectBehavior = function () {
        var _this = this;
        if (this.expressionValue.indexOf('&') !== -1) {
            var x = index_3.Cache.expressionMapGet(this.expressionValue);
            if (!x) {
                var tokens = index_2.BindingEngine.tokenize(this.expressionValue);
                x = {};
                x.ast = index_2.BindingEngine.generateAST(tokens);
            }
            var behaviors = index_2.BindingEngine.getBehavior(x.ast);
            if (behaviors) {
                behaviors.forEach(function (behavior) {
                    var x = index_4.ContainerBehavior.findBehavior(behavior.name);
                    if (x) {
                        var curBehavior = new x(_this, behavior.args);
                        curBehavior = curBehavior;
                    }
                });
            }
        }
    };
    ValueAttribute.prototype.detached = function () {
        var _this = this;
        switch (true) {
            case (this.$element.tagName === 'INPUT' && this.$element.type === 'text') || this.$element.tagName === 'TEXTAREA':
                if (!this.trigger) {
                    this.$element.removeEventListener('input', this.eventHandlerBinded);
                }
                else {
                    this.trigger.forEach(function (trigger) {
                        _this.$element.removeEventListener(trigger, _this.eventHandlerBinded);
                    });
                }
                break;
            case this.$element.tagName === 'INPUT' && this.$element.type === 'checkbox':
                if (!this.trigger) {
                    this.$element.removeEventListener('click', this.eventHandlerBinded);
                }
                else {
                    this.trigger.forEach(function (trigger) {
                        _this.$element.removeEventListener(trigger, _this.eventHandlerBinded);
                    });
                }
                break;
            case this.$element.tagName === 'INPUT' && this.$element.type === 'radio':
                if (!this.trigger) {
                    this.$element.removeEventListener('click', this.eventHandlerBinded);
                }
                else {
                    this.trigger.forEach(function (trigger) {
                        _this.$element.removeEventListener(trigger, _this.eventHandlerBinded);
                    });
                }
                break;
            case this.$element.tagName === 'SELECT':
                if (!this.trigger) {
                    this.$element.removeEventListener('change', this.eventHandlerBinded);
                }
                else {
                    this.trigger.forEach(function (trigger) {
                        _this.$element.removeEventListener(trigger, _this.eventHandlerBinded);
                    });
                }
                break;
            default:
                this.$attribute.$parent = null;
                break;
        }
        if (this.propertyChangeHandler.caller) {
            index_2.BindingEngine.unSubscribeClassProperty(this.$parent, this.propertyChangeHandler);
        }
    };
    ValueAttribute.prototype.eventHandler = function () {
        switch (true) {
            case (this.$element.tagName === 'INPUT' && this.$element.type === 'text') || this.$element.tagName === 'TEXTAREA':
                index_2.BindingEngine.setValue(this.$parent, this.attributeName, this.runValueConverter(this.$element.value));
                break;
            case this.$element.tagName === 'INPUT' && this.$element.type === 'checkbox':
                var modelBindCheckbox = this.$element.hasAttribute('model.bind') ? this.$element.getAttributeNode('model.bind') : null;
                if (modelBindCheckbox) {
                    var value = modelBindCheckbox.getContent().value;
                    var propertyType_1 = index_2.BindingEngine.evaluateExpression(this.$attribute.nodeValue, this.$parent);
                    var isArray_1 = Array.isArray(propertyType_1);
                    var selected = this.$element.checked;
                    if (isArray_1) {
                        if (selected) {
                            var ii = propertyType_1.indexOf(value);
                            if (ii === -1) {
                                propertyType_1 = propertyType_1.concat([this.runValueConverter(value)]);
                                index_2.BindingEngine.setValue(this.$parent, this.attributeName, propertyType_1);
                            }
                        }
                        else {
                            var ii = propertyType_1.indexOf(value);
                            if (ii !== -1) {
                                propertyType_1.splice(ii, 1);
                                if (!propertyType_1.__array_observer__class) {
                                    propertyType_1 = propertyType_1.slice();
                                }
                                index_2.BindingEngine.setValue(this.$parent, this.attributeName, propertyType_1);
                            }
                            else {
                                this.$element.checked = false;
                            }
                        }
                    }
                    else {
                        index_2.BindingEngine.setValue(this.$parent, this.attributeName, this.runValueConverter(value) || false);
                    }
                }
                else {
                    index_2.BindingEngine.setValue(this.$parent, this.attributeName, this.$element.checked || false);
                }
                break;
            case this.$element.tagName === 'INPUT' && this.$element.type === 'radio':
                var modelBindRadio = this.$element.hasAttribute('model.bind') ? this.$element.getAttributeNode('model.bind') : null;
                if (modelBindRadio) {
                    var value = index_2.BindingEngine.evaluateExpression(modelBindRadio.nodeValue, modelBindRadio.getContent().$parent);
                    index_2.BindingEngine.setValue(this.$parent, this.attributeName, this.runValueConverter(value));
                }
                else {
                    index_2.BindingEngine.setValue(this.$parent, this.attributeName, this.runValueConverter(this.$element.checked));
                }
                break;
            case this.$element.tagName === 'SELECT':
                var propertyType = index_2.BindingEngine.evaluateExpression(this.$attribute.nodeValue, this.$parent);
                var isArray = Array.isArray(propertyType);
                var length = this.$element.selectedOptions.length;
                var finalValue = null;
                if (length > 1) {
                    var values = [];
                    for (var i = 0; i < length; i++) {
                        var x = this.$element.selectedOptions[i];
                        var modelBind = x.hasAttribute('model.bind') ? x.getAttributeNode('model.bind') : null;
                        var value = index_2.BindingEngine.evaluateExpression(modelBind.nodeValue, modelBind.getContent().$parent);
                        values.push(this.runValueConverter(value));
                    }
                    finalValue = values;
                }
                else {
                    if (length === 0) {
                        finalValue = null;
                    }
                    else {
                        var x = this.$element.selectedOptions[0];
                        var modelBind = x.hasAttribute('model.bind') ? x.getAttributeNode('model.bind') : null;
                        var value = index_2.BindingEngine.evaluateExpression(modelBind.nodeValue, modelBind.getContent().$parent);
                        finalValue = value;
                    }
                }
                if (isArray) {
                    index_2.BindingEngine.setValue(this.$parent, this.attributeName, Array.isArray(finalValue) ? finalValue : finalValue === null ? [] : [finalValue]);
                }
                else {
                    index_2.BindingEngine.setValue(this.$parent, this.attributeName, Array.isArray(finalValue) ? finalValue.map(function (a) { return a; }) : finalValue);
                }
                break;
        }
    };
    ValueAttribute = __decorate([
        index_1.customAttribute('value.bind'),
        index_1.customAttribute('checked.bind'),
        __metadata("design:paramtypes", [])
    ], ValueAttribute);
    return ValueAttribute;
}());
exports.ValueAttribute = ValueAttribute;
//# sourceMappingURL=valueAttribute.js.map
});
___scope___.file("src/mframejs/attribute/delgateEventsAttribute.js", function(exports, require, module, __filename, __dirname){

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("../decorator/index");
var index_2 = require("../binding/index");
var index_3 = require("../container/index");
var index_4 = require("../utils/index");
var DelgateEventsAttribute = (function () {
    function DelgateEventsAttribute() {
    }
    DelgateEventsAttribute.prototype.created = function () {
        this.name = this.$attribute.name.replace('.delegate', '');
        this.value = this.$attribute.value;
        this.expressionValue = this.$attribute.value;
        this.eventHandlerBinded = this.eventHandler.bind(this);
        this.connectBehavior();
        this.$element.addEventListener(this.name, this.eventHandlerBinded, false);
    };
    DelgateEventsAttribute.prototype.attached = function () {
    };
    DelgateEventsAttribute.prototype.detached = function () {
        this.$element.removeEventListener(this.name, this.eventHandlerBinded);
    };
    DelgateEventsAttribute.prototype.eventHandler = function (event) {
        index_2.BindingEngine.tokenizeParseAndTraverseAST(this.value, {
            ctx: this.$parent,
            $event: event,
            isMultiContext: true
        });
    };
    DelgateEventsAttribute.prototype.connectBehavior = function () {
        var _this = this;
        if (this.expressionValue.indexOf('&') !== -1) {
            var x = index_4.Cache.expressionMapGet(this.expressionValue);
            if (!x) {
                var tokens = index_2.BindingEngine.tokenize(this.expressionValue);
                x = {};
                x.ast = index_2.BindingEngine.generateAST(tokens);
            }
            var behaviors = index_2.BindingEngine.getBehavior(x.ast);
            if (behaviors) {
                behaviors.forEach(function (behavior) {
                    var x = index_3.ContainerBehavior.findBehavior(behavior.name);
                    if (x) {
                        var curBehavior = new x(_this, behavior.args);
                        curBehavior = curBehavior;
                    }
                });
            }
        }
    };
    DelgateEventsAttribute = __decorate([
        index_1.customAttribute('mframejs-event-delegate.delegate'),
        __metadata("design:paramtypes", [])
    ], DelgateEventsAttribute);
    return DelgateEventsAttribute;
}());
exports.DelgateEventsAttribute = DelgateEventsAttribute;
//# sourceMappingURL=delgateEventsAttribute.js.map
});
___scope___.file("src/mframejs/attribute/triggerEventsAttribute.js", function(exports, require, module, __filename, __dirname){

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("../decorator/index");
var index_2 = require("../binding/index");
var index_3 = require("../container/index");
var index_4 = require("../utils/index");
var TriggerEventsAttribute = (function () {
    function TriggerEventsAttribute() {
    }
    TriggerEventsAttribute.prototype.created = function () {
        this.name = this.$attribute.name.replace('.trigger', '');
        this.value = this.$attribute.value;
        this.expressionValue = this.$attribute.value;
        this.eventHandlerBinded = this.eventHandler.bind(this);
        this.connectBehavior();
        this.$element.addEventListener(this.name, this.eventHandlerBinded, false);
    };
    TriggerEventsAttribute.prototype.attached = function () {
    };
    TriggerEventsAttribute.prototype.detached = function () {
        this.$element.removeEventListener(this.name, this.eventHandlerBinded);
    };
    TriggerEventsAttribute.prototype.eventHandler = function (event) {
        index_2.BindingEngine.tokenizeParseAndTraverseAST(this.value, {
            ctx: this.$parent,
            $event: event,
            isMultiContext: true
        });
    };
    TriggerEventsAttribute.prototype.connectBehavior = function () {
        var _this = this;
        if (this.expressionValue.indexOf('&') !== -1) {
            var x = index_4.Cache.expressionMapGet(this.expressionValue);
            if (!x) {
                var tokens = index_2.BindingEngine.tokenize(this.expressionValue);
                x = {};
                x.ast = index_2.BindingEngine.generateAST(tokens);
            }
            var behaviors = index_2.BindingEngine.getBehavior(x.ast);
            if (behaviors) {
                behaviors.forEach(function (behavior) {
                    var x = index_3.ContainerBehavior.findBehavior(behavior.name);
                    if (x) {
                        var curBehavior = new x(_this, behavior.args);
                        curBehavior = curBehavior;
                    }
                });
            }
        }
    };
    TriggerEventsAttribute = __decorate([
        index_1.customAttribute('mframejs-event-trigger.trigger'),
        __metadata("design:paramtypes", [])
    ], TriggerEventsAttribute);
    return TriggerEventsAttribute;
}());
exports.TriggerEventsAttribute = TriggerEventsAttribute;
//# sourceMappingURL=triggerEventsAttribute.js.map
});
___scope___.file("src/mframejs/attribute/repeatAttribute.js", function(exports, require, module, __filename, __dirname){

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("../decorator/index");
var index_2 = require("../view/index");
var index_3 = require("../view/index");
var index_4 = require("../binding/index");
var repeatAttributeSubscriberHelpers_1 = require("./repeatAttributeSubscriberHelpers");
var RepeatAttribute = (function () {
    function RepeatAttribute() {
        this.templateArray = [];
        this.arrayType = 'object';
    }
    RepeatAttribute.prototype.setArrayLocalVariables = function (ctx, i) {
        ctx.$index = i;
        ctx.$even = i % 2 === 0 ? true : false;
        ctx.$odd = i % 2 === 0 ? false : true;
    };
    RepeatAttribute.prototype.created = function () {
        this.value = this.$attribute.value;
        this.overrideContext = this.$parent;
        this.loopBinded = this.loopArray.bind(this);
        if (this.$element && this.$element.$view) {
            this.$view = this.$element.$view;
        }
        this.$element.attributes.removeNamedItem('repeat.for');
        this.elementClone = this.$element.cloneNode(true);
        this.temp = document.createElement('div');
        var x = document.createElement('div');
        x.appendChild(this.elementClone);
        this.repeatTemplateCache = index_2.ViewParser.createNodeParseCache(x);
        this.anchor = document.createComment('mf-repeat-for');
        if (this.$view) {
            this.anchor.$view = this.$view;
        }
        this.remove();
        this.repeatForArray = this.value.split('of');
        this.repeatForArray = this.repeatForArray.map(function (x) { return x.trim(); });
        if (this.repeatForArray.length !== 2) {
            console.error('unknown expression in repeat:' + this.value);
        }
        else {
            this.rowInstanceName = this.repeatForArray[0];
            this.arrayVariableName = this.repeatForArray[1];
            this.arrayExpression = this.repeatForArray[1];
            if (this.arrayVariableName.indexOf('|')) {
                var split = this.arrayVariableName.split('|').map(function (x) { return x.trim(); });
                this.arrayVariableName = split[0];
            }
            this.$array = index_4.BindingEngine.evaluateExpression(this.arrayExpression, this.$parent);
            var propertyType = this.$array;
            if (!Array.isArray(propertyType)) {
                if (typeof propertyType === 'number') {
                    this.arrayType = 'number';
                    this.subscribePropSimple();
                }
                else {
                    if (typeof propertyType === 'string') {
                        this.arrayType = 'string';
                        this.subscribePropSimple();
                    }
                    else {
                        console.error('unknown type, only support array, string and number');
                    }
                }
            }
            else {
                this.subscribeArray();
                this.subscribePropArray();
            }
        }
    };
    RepeatAttribute.prototype.loopArray = function (changed, remove, add) {
        var array = this.$array;
        if (array) {
            if (changed) {
                if (remove) {
                    var syncLength = this.templateArray.length - remove;
                    for (var i = 0; i < this.templateArray.length; i++) {
                        if (i < syncLength) {
                            if (this.templateArray[i].ctx[this.rowInstanceName] !== array[i]) {
                                this.templateArray[i].ctx[this.rowInstanceName] = array[i];
                            }
                        }
                        else {
                            var temp = this.templateArray.pop();
                            i--;
                            this.clearInRow(temp);
                        }
                    }
                }
                if (add) {
                    var syncLength = array.length - add;
                    for (var i = 0; i < array.length; i++) {
                        if (i < syncLength) {
                            if (this.templateArray[i].ctx[this.rowInstanceName] !== this.$array[i]) {
                                this.templateArray[i].ctx[this.rowInstanceName] = this.$array[i];
                            }
                        }
                        else {
                            this.push(array[i]);
                        }
                    }
                }
            }
            else {
                for (var i = 0; i < this.$array.length; i++) {
                    if (this.templateArray[i].ctx[this.rowInstanceName] !== array[i]) {
                        this.templateArray[i].ctx[this.rowInstanceName] = array[i];
                    }
                }
            }
        }
    };
    RepeatAttribute.prototype.detached = function () {
        this.clearTemplateArray();
        if (this.arrayMethodCallHandler) {
            index_4.BindingEngine.unSubscribeClassArray(this.$parent, this.arrayMethodCallHandler);
        }
        if (this.arrayPropertyChangeHandler) {
            index_4.BindingEngine.unSubscribeClassProperty(this.$parent, this.arrayPropertyChangeHandler);
        }
        if (this.arrayPropertyChangeHandlerLocal) {
            index_4.BindingEngine.unSubscribeClassProperty(this.$parent, this.arrayPropertyChangeHandlerLocal);
        }
        this.$array = null;
        this.arrayMethodCallHandler = null;
        this.arrayPropertyChangeHandler = null;
        this.arrayPropertyChangeHandlerLocal = null;
        this.propertyChangeHandlerSimple = null;
    };
    RepeatAttribute.prototype.attached = function () {
        var _this = this;
        this.isAttached = true;
        this.$array = index_4.BindingEngine.evaluateExpression(this.arrayExpression, this.$parent);
        var array = this.$array;
        if (Array.isArray(array)) {
            array.forEach(function (ctx) {
                _this.push(ctx);
            });
        }
        else {
            if (this.arrayType === 'number') {
                if (this.templateArray.length !== array) {
                    this.clearTemplateArray();
                    for (var i = 0; i < array; i++) {
                        this.push(i);
                    }
                }
            }
            if (this.arrayType === 'string') {
                var stringLength = typeof array === 'string' ? array.length : 0;
                if (this.templateArray.length !== stringLength) {
                    this.clearTemplateArray();
                    for (var i = 0; i < stringLength; i++) {
                        this.push(array[i]);
                    }
                }
            }
        }
    };
    RepeatAttribute.prototype.subscribeArray = function () {
        if (!this.arrayMethodCallHandler) {
            this.arrayMethodCallHandler = new repeatAttributeSubscriberHelpers_1.ArrayMethodCallHandler(this);
        }
        index_4.BindingEngine.subscribeClassArray(this.$parent, this.arrayVariableName, this.arrayMethodCallHandler);
    };
    RepeatAttribute.prototype.subscribePropArray = function () {
        if (!this.arrayPropertyChangeHandler) {
            this.arrayPropertyChangeHandler = new repeatAttributeSubscriberHelpers_1.ArrayPropertyChange(this);
        }
        index_4.BindingEngine.subscribeClassProperty(this.$parent, this.arrayVariableName, this.arrayPropertyChangeHandler);
        if (this.arrayVariableName !== this.arrayExpression) {
            if (!this.arrayPropertyChangeHandlerLocal) {
                this.arrayPropertyChangeHandlerLocal = new repeatAttributeSubscriberHelpers_1.ArrayPropertyChange(this);
            }
            var y = this.arrayExpression.replace(this.arrayVariableName, '$array');
            index_4.BindingEngine.subscribeClassProperty(this, y, this.arrayPropertyChangeHandlerLocal);
        }
    };
    RepeatAttribute.prototype.subscribePropSimple = function () {
        if (!this.propertyChangeHandlerSimple) {
            this.propertyChangeHandlerSimple = new repeatAttributeSubscriberHelpers_1.PropertyChangeSimple(this);
        }
        index_4.BindingEngine.subscribeClassProperty(this.$parent, this.arrayVariableName, this.propertyChangeHandlerSimple);
    };
    RepeatAttribute.prototype.push = function (ctx, i) {
        var template = this.elementClone.cloneNode(true);
        var context = {};
        context[this.rowInstanceName] = ctx;
        context.overrideContext = this.$parent;
        this.temp.appendChild(template);
        template.$view = new index_3.ViewController(template);
        var controllers = index_2.ViewParser.parseNodesWithCache(this.temp, context, this.repeatTemplateCache, template.$view);
        if (i === undefined) {
            var length = this.templateArray.length;
            this.templateArray.push({
                ctx: context,
                template: template
            });
            this.setArrayLocalVariables(context, this.templateArray.length - 1);
            if (length) {
                this.anchor.parentNode.insertBefore(template, this.templateArray[length - 1].template.nextSibling);
            }
            else {
                this.anchor.parentNode.insertBefore(template, this.anchor.nextSibling);
            }
        }
        else {
            this.templateArray.splice(i, 0, {
                ctx: context,
                template: template
            });
            if (this.templateArray[i + 1]) {
                this.anchor.parentNode.insertBefore(template, this.templateArray[i + 1].template);
            }
            else {
                this.anchor.parentNode.appendChild(template);
            }
        }
        controllers.forEach(function (contr) {
            if (contr.attached) {
                contr.attached();
            }
        });
    };
    RepeatAttribute.prototype.pop = function () {
        var _this = this;
        if (this.templateArray.length > 0) {
            var temp = this.templateArray.pop();
            this.clearInRow(temp);
            this.templateArray.forEach(function (context, i) {
                _this.setArrayLocalVariables(context, i);
            });
        }
    };
    RepeatAttribute.prototype.shift = function () {
        var _this = this;
        if (this.templateArray.length > 0) {
            var temp = this.templateArray.shift();
            this.clearInRow(temp);
            this.templateArray.forEach(function (context, i) {
                _this.setArrayLocalVariables(context, i);
            });
        }
    };
    RepeatAttribute.prototype.splice = function (args) {
        var _this = this;
        if (this.templateArray.length > 0) {
            var index_5 = args[0];
            var deleted = args[1];
            var added = [];
            for (var i = 2; i < args.length; i++) {
                if (args[i]) {
                    added.push(args[i]);
                }
            }
            if (deleted) {
                var newIndex = index_5 + deleted - 1;
                for (var i = newIndex; i > index_5 - 1; i--) {
                    var temp = this.templateArray.splice(i, 1)[0];
                    this.clearInRow(temp);
                }
            }
            added.forEach(function (ctx) {
                _this.push(ctx, index_5);
            });
            this.templateArray.forEach(function (context, i) {
                _this.setArrayLocalVariables(context, i);
            });
        }
    };
    RepeatAttribute.prototype.clearTemplateArray = function () {
        var x = document.createElement('div');
        this.templateArray.forEach(function (temp) {
            x.appendChild(temp.template);
        });
        this.templateArray.forEach(function (temp) {
            index_2.ViewParser.clearAllViews(temp.template);
        });
        x = null;
        this.templateArray = [];
    };
    RepeatAttribute.prototype.remove = function () {
        this.clearTemplateArray();
        this.$element.parentNode.replaceChild(this.anchor, this.$element);
    };
    RepeatAttribute.prototype.clearInRow = function (rowData) {
        if (rowData) {
            var oldNode = rowData.template.parentNode.removeChild(rowData.template);
            index_2.ViewParser.clearAllViews(oldNode);
            oldNode = null;
        }
    };
    RepeatAttribute = __decorate([
        index_1.customAttribute('repeat.for'),
        __metadata("design:paramtypes", [])
    ], RepeatAttribute);
    return RepeatAttribute;
}());
exports.RepeatAttribute = RepeatAttribute;
//# sourceMappingURL=repeatAttribute.js.map
});
___scope___.file("src/mframejs/attribute/repeatAttributeSubscriberHelpers.js", function(exports, require, module, __filename, __dirname){

Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("../binding/index");
var ArrayMethodCallHandler = (function () {
    function ArrayMethodCallHandler(repeat) {
        this.repeat = repeat;
        this.name = 'repeat' + this.repeat.value;
    }
    ArrayMethodCallHandler.prototype.call = function (events) {
        var _this = this;
        var sort = true;
        events.forEach(function (event) {
            switch (event.event) {
                case 'push':
                    var i = 0;
                    while (i < event.args.length) {
                        _this.repeat.push(event.args[i]);
                        i++;
                    }
                    break;
                case 'reverse':
                case 'sort':
                    if (sort) {
                        sort = false;
                        var array = _this.repeat.$array;
                        if (array) {
                            array.forEach(function (ctx, i) {
                                _this.repeat.templateArray[i].ctx[_this.repeat.rowInstanceName] = ctx;
                                _this.repeat.setArrayLocalVariables(_this.repeat.templateArray[i].ctx, i);
                            });
                        }
                    }
                    break;
                case 'shift':
                    _this.repeat.shift();
                    break;
                case 'pop':
                    _this.repeat.pop();
                    break;
                case 'splice':
                    _this.repeat.splice(event.args);
                    break;
                default:
            }
        });
    };
    return ArrayMethodCallHandler;
}());
exports.ArrayMethodCallHandler = ArrayMethodCallHandler;
var ArrayPropertyChange = (function () {
    function ArrayPropertyChange(repeat, expression) {
        this.repeat = repeat;
        this.name = 'repeat' + this.repeat.value;
        this.expression = expression;
    }
    ArrayPropertyChange.prototype.call = function () {
        var _this = this;
        if (this.repeat.isAttached) {
            var array = index_1.BindingEngine.evaluateExpression(this.repeat.arrayExpression, this.repeat.$parent);
            if (array && this.repeat.templateArray.length !== array.length) {
                this.repeat.$array = array;
                if (this.repeat.templateArray.length !== 0 && array.length !== 0) {
                    if (this.repeat.templateArray.length > array.length) {
                        this.repeat.loopBinded(true, this.repeat.templateArray.length - array.length, 0);
                    }
                    else {
                        this.repeat.loopBinded(true, 0, array.length - this.repeat.templateArray.length);
                    }
                    index_1.BindingEngine.unSubscribeClassArray(this.repeat.$parent, this.repeat.arrayMethodCallHandler);
                    this.repeat.subscribeArray();
                }
                else {
                    this.repeat.clearTemplateArray();
                    var array_1 = index_1.BindingEngine.evaluateExpression(this.repeat.arrayExpression, this.repeat.$parent);
                    if (array_1) {
                        array_1.forEach(function (ctx) {
                            _this.repeat.push(ctx);
                        });
                        index_1.BindingEngine.unSubscribeClassArray(this.repeat.$parent, this.repeat.arrayMethodCallHandler);
                        this.repeat.subscribeArray();
                        array_1 = null;
                    }
                }
            }
            else {
                this.repeat.$array = array;
                this.repeat.loopBinded();
                index_1.BindingEngine.unSubscribeClassArray(this.repeat.$parent, this.repeat.arrayMethodCallHandler);
                if (array) {
                    this.repeat.subscribeArray();
                }
            }
        }
    };
    return ArrayPropertyChange;
}());
exports.ArrayPropertyChange = ArrayPropertyChange;
var PropertyChangeSimple = (function () {
    function PropertyChangeSimple(repeat) {
        this.repeat = repeat;
        this.name = 'repeat' + this.repeat.value;
    }
    PropertyChangeSimple.prototype.call = function (newValue) {
        if (this.repeat.isAttached) {
            if (this.repeat.arrayType === 'string') {
                var stringLength = typeof newValue === 'string' ? newValue.length : 0;
                if (this.repeat.templateArray.length !== stringLength) {
                    this.repeat.clearTemplateArray();
                    for (var i = 0; i < stringLength; i++) {
                        this.repeat.push(newValue[i]);
                    }
                }
            }
            if (this.repeat.arrayType === 'number') {
                if (this.repeat.templateArray.length !== newValue) {
                    this.repeat.clearTemplateArray();
                    for (var i = 0; i < newValue; i++) {
                        this.repeat.push(newValue);
                    }
                }
            }
        }
    };
    return PropertyChangeSimple;
}());
exports.PropertyChangeSimple = PropertyChangeSimple;
//# sourceMappingURL=repeatAttributeSubscriberHelpers.js.map
});
___scope___.file("src/mframejs/attribute/miscAttribute.js", function(exports, require, module, __filename, __dirname){

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("../decorator/index");
var index_2 = require("../binding/index");
var MiscAttributes = (function () {
    function MiscAttributes() {
    }
    MiscAttributes.prototype.created = function () {
        var _this = this;
        this.value = this.$attribute.value;
        this.name = this.$attribute.name.replace('.bind', '');
        this.init = true;
        this.subscribeInternal = {
            name: this.name + 'Attribute(misc)',
            value: this.value,
            call: function (newValue, oldValue) {
                if (oldValue !== newValue || _this.init) {
                    _this.init = false;
                    switch (_this.name) {
                        case 'readonly':
                            if (newValue) {
                                _this.$element.readOnly = newValue;
                            }
                            else {
                                _this.$element.removeAttribute(_this.name);
                            }
                            break;
                        case 'disabled':
                            if (newValue) {
                                _this.$element.disabled = newValue;
                            }
                            else {
                                _this.$element.removeAttribute(_this.name);
                            }
                            break;
                        case 'class':
                            if (newValue) {
                                _this.$element.className = newValue;
                            }
                            else {
                                _this.$element.className = '';
                            }
                            break;
                        case 'show':
                            if (newValue) {
                                _this.$element.style['display'] = 'block';
                            }
                            else {
                                _this.$element.style['display'] = 'none';
                            }
                            break;
                        default:
                            _this.$element.setAttribute(_this.name, newValue);
                    }
                }
            }
        };
        index_2.BindingEngine.subscribeClassProperty(this.$parent, this.value, this.subscribeInternal);
    };
    MiscAttributes.prototype.detached = function () {
        index_2.BindingEngine.unSubscribeClassProperty(this.$parent, this.subscribeInternal);
    };
    MiscAttributes.prototype.attached = function () {
        this.$element.removeAttribute(this.$attribute.name);
    };
    MiscAttributes = __decorate([
        index_1.customAttribute('href.bind'),
        index_1.customAttribute('readonly.bind'),
        index_1.customAttribute('disabled.bind'),
        index_1.customAttribute('show.bind'),
        index_1.customAttribute('class.bind'),
        __metadata("design:paramtypes", [])
    ], MiscAttributes);
    return MiscAttributes;
}());
exports.MiscAttributes = MiscAttributes;
//# sourceMappingURL=miscAttribute.js.map
});
___scope___.file("src/mframejs/attribute/cssAttribute.js", function(exports, require, module, __filename, __dirname){

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("../decorator/index");
var index_2 = require("../binding/index");
var CssAttribute = (function () {
    function CssAttribute() {
    }
    CssAttribute.prototype.created = function () {
        var _this = this;
        this.value = this.$attribute.value;
        this.$element.removeAttribute(this.$attribute.name);
        this.subscribeInternal = {
            name: 'cssAttribute:',
            value: this.value,
            call: function (newValue, oldValue) {
                if (oldValue !== newValue) {
                    _this.splitAndInsert(newValue);
                }
            }
        };
        index_2.BindingEngine.subscribeClassProperty(this.$parent, this.value, this.subscribeInternal);
    };
    CssAttribute.prototype.splitAndInsert = function (value) {
        var _this = this;
        try {
            var x = value
                .split(';')
                .map(function (statement) {
                return statement.split(':');
            }).map(function (result) {
                return {
                    attribute: result[0],
                    value: result[1].replace(/ /g, '')
                };
            });
            x.forEach(function (val) {
                _this.$element.style[val.attribute.trim()] = val.value.trim();
            });
        }
        catch (e) {
            console.error('could not parse css values');
        }
    };
    CssAttribute.prototype.detached = function () {
        index_2.BindingEngine.unSubscribeClassProperty(this.$parent, this.subscribeInternal);
    };
    CssAttribute.prototype.attached = function () {
    };
    CssAttribute = __decorate([
        index_1.customAttribute('css'),
        __metadata("design:paramtypes", [])
    ], CssAttribute);
    return CssAttribute;
}());
exports.CssAttribute = CssAttribute;
//# sourceMappingURL=cssAttribute.js.map
});
___scope___.file("src/mframejs/attribute/modelAttribute.js", function(exports, require, module, __filename, __dirname){

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("../decorator/index");
var index_2 = require("../binding/index");
var ModelAttribute = (function () {
    function ModelAttribute() {
    }
    ModelAttribute.prototype.created = function () {
        var _this = this;
        this.$attribute.getContent = function () {
            return _this;
        };
        this.expression = this.$attribute.value;
        this.subscribeInternal = {
            name: 'modelAttribute:',
            value: this.value,
            call: function (newValue, oldValue) {
                if (oldValue !== newValue) {
                    _this.value = newValue;
                }
            }
        };
        index_2.BindingEngine.subscribeClassProperty(this.$parent, this.expression, this.subscribeInternal);
    };
    ModelAttribute.prototype.detached = function () {
        this.$attribute.getContent = null;
    };
    ModelAttribute = __decorate([
        index_1.customAttribute('model.bind')
    ], ModelAttribute);
    return ModelAttribute;
}());
exports.ModelAttribute = ModelAttribute;
//# sourceMappingURL=modelAttribute.js.map
});
___scope___.file("src/mframejs/utils/cache.js", function(exports, require, module, __filename, __dirname){

Object.defineProperty(exports, "__esModule", { value: true });
var templateMap = new Map();
var expressionMap = new Map();
var astMap = new Map();
var splitMap = new Map();
var Cache = (function () {
    function Cache() {
    }
    Cache.clear = function () {
        templateMap.clear();
        expressionMap.clear();
        astMap.clear();
        splitMap.clear();
    };
    Cache.templateMapHas = function (x) {
        return templateMap.has(x);
    };
    Cache.templateMapSet = function (x, y) {
        return templateMap.set(x, y);
    };
    Cache.templateMapGet = function (x) {
        return templateMap.get(x);
    };
    Cache.expressionMapHas = function (x) {
        return expressionMap.has(x);
    };
    Cache.expressionMapSet = function (x, y) {
        return expressionMap.set(x, y);
    };
    Cache.expressionMapGet = function (x) {
        return expressionMap.get(x);
    };
    Cache.astMapHas = function (x) {
        return astMap.has(x);
    };
    Cache.astMapSet = function (x, y) {
        return astMap.set(x, y);
    };
    Cache.astMapGet = function (x) {
        return astMap.get(x);
    };
    Cache.splitMapHas = function (x) {
        return splitMap.has(x);
    };
    Cache.splitMapSet = function (x, y) {
        return splitMap.set(x, y);
    };
    Cache.splitMapGet = function (x) {
        return splitMap.get(x);
    };
    return Cache;
}());
exports.Cache = Cache;
//# sourceMappingURL=cache.js.map
});
___scope___.file("src/mframejs/utils/logger.js", function(exports, require, module, __filename, __dirname){

Object.defineProperty(exports, "__esModule", { value: true });
var loggerActive = false;
var id = 10000;
var defaultLog;
var Logger = (function () {
    function Logger(name, category) {
        this.id = id;
        id++;
        this.name = name;
        this.category = category || 'unamed';
    }
    Logger.getLogger = function (name, category) {
        if (loggerActive) {
            return new Logger(name, category);
        }
        else {
            return defaultLog;
        }
    };
    Logger.enable = function () {
        loggerActive = true;
    };
    Logger.disable = function () {
        loggerActive = false;
    };
    Logger.prototype.log = function () {
        var msg = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            msg[_i] = arguments[_i];
        }
        if (loggerActive) {
            console.log("Log[" + this.id + "] - [" + this.category + "] - [" + this.name + "] ", msg.join(' - '));
        }
    };
    return Logger;
}());
exports.Logger = Logger;
defaultLog = new Logger('na', 'na');
//# sourceMappingURL=logger.js.map
});
return ___scope___.entry = "src/mframejs/index.js";
});
FuseBox.import("fusebox-hot-reload").connect(4444, "", false)
FuseBox.target = "browser"
FuseBox.expose([{"alias":"*","pkg":"default/main.js"}]);
FuseBox.main("default/main.js");
})
(function(e){function r(e){var r=e.charCodeAt(0),n=e.charCodeAt(1);if((p||58!==n)&&(r>=97&&r<=122||64===r)){if(64===r){var t=e.split("/"),i=t.splice(2,t.length).join("/");return[t[0]+"/"+t[1],i||void 0]}var o=e.indexOf("/");if(o===-1)return[e];var a=e.substring(0,o),u=e.substring(o+1);return[a,u]}}function n(e){return e.substring(0,e.lastIndexOf("/"))||"./"}function t(){for(var e=[],r=0;r<arguments.length;r++)e[r]=arguments[r];for(var n=[],t=0,i=arguments.length;t<i;t++)n=n.concat(arguments[t].split("/"));for(var o=[],t=0,i=n.length;t<i;t++){var a=n[t];a&&"."!==a&&(".."===a?o.pop():o.push(a))}return""===n[0]&&o.unshift(""),o.join("/")||(o.length?"/":".")}function i(e){var r=e.match(/\.(\w{1,})$/);return r&&r[1]?e:e+".js"}function o(e){if(p){var r,n=document,t=n.getElementsByTagName("head")[0];/\.css$/.test(e)?(r=n.createElement("link"),r.rel="stylesheet",r.type="text/css",r.href=e):(r=n.createElement("script"),r.type="text/javascript",r.src=e,r.async=!0),t.insertBefore(r,t.firstChild)}}function a(e,r){for(var n in e)e.hasOwnProperty(n)&&r(n,e[n])}function u(e){return{server:require(e)}}function f(e,n){var o=n.path||"./",a=n.pkg||"default",f=r(e);if(f&&(o="./",a=f[0],n.v&&n.v[a]&&(a=a+"@"+n.v[a]),e=f[1]),e)if(126===e.charCodeAt(0))e=e.slice(2,e.length),o="./";else if(!p&&(47===e.charCodeAt(0)||58===e.charCodeAt(1)))return u(e);var s=g[a];if(!s){if(p&&"electron"!==x.target)throw"Package not found "+a;return u(a+(e?"/"+e:""))}e=e?e:"./"+s.s.entry;var l,c=t(o,e),d=i(c),v=s.f[d];return!v&&d.indexOf("*")>-1&&(l=d),v||l||(d=t(c,"/","index.js"),v=s.f[d],v||"."!==c||(d=s.s&&s.s.entry||"index.js",v=s.f[d]),v||(d=c+".js",v=s.f[d]),v||(v=s.f[c+".jsx"]),v||(d=c+"/index.jsx",v=s.f[d])),{file:v,wildcard:l,pkgName:a,versions:s.v,filePath:c,validPath:d}}function s(e,r,n){if(void 0===n&&(n={}),!p)return r(/\.(js|json)$/.test(e)?v.require(e):"");if(n&&n.ajaxed===e)return console.error(e,"does not provide a module");var i=new XMLHttpRequest;i.onreadystatechange=function(){if(4==i.readyState)if(200==i.status){var n=i.getResponseHeader("Content-Type"),o=i.responseText;/json/.test(n)?o="module.exports = "+o:/javascript/.test(n)||(o="module.exports = "+JSON.stringify(o));var a=t("./",e);x.dynamic(a,o),r(x.import(e,{ajaxed:e}))}else console.error(e,"not found on request"),r(void 0)},i.open("GET",e,!0),i.send()}function l(e,r){var n=h[e];if(n)for(var t in n){var i=n[t].apply(null,r);if(i===!1)return!1}}function c(e,r){if(void 0===r&&(r={}),58===e.charCodeAt(4)||58===e.charCodeAt(5))return o(e);var t=f(e,r);if(t.server)return t.server;var i=t.file;if(t.wildcard){var a=new RegExp(t.wildcard.replace(/\*/g,"@").replace(/[.?*+^$[\]\\(){}|-]/g,"\\$&").replace(/@@/g,".*").replace(/@/g,"[a-z0-9$_-]+"),"i"),u=g[t.pkgName];if(u){var d={};for(var m in u.f)a.test(m)&&(d[m]=c(t.pkgName+"/"+m));return d}}if(!i){var h="function"==typeof r,x=l("async",[e,r]);if(x===!1)return;return s(e,function(e){return h?r(e):null},r)}var _=t.pkgName;if(i.locals&&i.locals.module)return i.locals.module.exports;var y=i.locals={},w=n(t.validPath);y.exports={},y.module={exports:y.exports},y.require=function(e,r){return c(e,{pkg:_,path:w,v:t.versions})},p||!v.require.main?y.require.main={filename:"./",paths:[]}:y.require.main=v.require.main;var j=[y.module.exports,y.require,y.module,t.validPath,w,_];return l("before-import",j),i.fn.apply(0,j),l("after-import",j),y.module.exports}if(e.FuseBox)return e.FuseBox;var d="undefined"!=typeof WorkerGlobalScope,p="undefined"!=typeof window&&window.navigator||d,v=p?d?{}:window:global;p&&(v.global=d?{}:window),e=p&&"undefined"==typeof __fbx__dnm__?e:module.exports;var m=p?d?{}:window.__fsbx__=window.__fsbx__||{}:v.$fsbx=v.$fsbx||{};p||(v.require=require);var g=m.p=m.p||{},h=m.e=m.e||{},x=function(){function r(){}return r.global=function(e,r){return void 0===r?v[e]:void(v[e]=r)},r.import=function(e,r){return c(e,r)},r.on=function(e,r){h[e]=h[e]||[],h[e].push(r)},r.exists=function(e){try{var r=f(e,{});return void 0!==r.file}catch(e){return!1}},r.remove=function(e){var r=f(e,{}),n=g[r.pkgName];n&&n.f[r.validPath]&&delete n.f[r.validPath]},r.main=function(e){return this.mainFile=e,r.import(e,{})},r.expose=function(r){var n=function(n){var t=r[n].alias,i=c(r[n].pkg);"*"===t?a(i,function(r,n){return e[r]=n}):"object"==typeof t?a(t,function(r,n){return e[n]=i[r]}):e[t]=i};for(var t in r)n(t)},r.dynamic=function(r,n,t){this.pkg(t&&t.pkg||"default",{},function(t){t.file(r,function(r,t,i,o,a){var u=new Function("__fbx__dnm__","exports","require","module","__filename","__dirname","__root__",n);u(!0,r,t,i,o,a,e)})})},r.flush=function(e){var r=g.default;for(var n in r.f)e&&!e(n)||delete r.f[n].locals},r.pkg=function(e,r,n){if(g[e])return n(g[e].s);var t=g[e]={};return t.f={},t.v=r,t.s={file:function(e,r){return t.f[e]={fn:r}}},n(t.s)},r.addPlugin=function(e){this.plugins.push(e)},r.packages=g,r.isBrowser=p,r.isServer=!p,r.plugins=[],r}();return p||(v.FuseBox=x),e.FuseBox=x}(this))
//# sourceMappingURL=app.js.map