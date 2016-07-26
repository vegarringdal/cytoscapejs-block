/* */ 
define(["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  var VGridCtx = exports.VGridCtx = function () {
    function VGridCtx(vGrid) {
      _classCallCheck(this, VGridCtx);

      this.vGrid = vGrid;
    }

    VGridCtx.prototype.setData = function setData(data) {
      this.vGridConfig.remoteLimit = data.limit || 40;
      this.vGridConfig.remoteLength = data.length || 0;
      this.vGridConfig.remoteOffset = data.offset || 0;
      this.keepFilterOnCollectionChange();
      this.vGrid.vGridCollection = data.col || [];
      this.setLoadingOverlay(false);
      this.vGrid.vGridPager.updatePager({
        limit: this.vGridConfig.remoteLimit,
        offset: this.vGridConfig.remoteOffset,
        length: this.vGridConfig.remoteLength
      });
    };

    VGridCtx.prototype.keepFilterOnCollectionChange = function keepFilterOnCollectionChange() {
      this.vGridConfig.keepFilterOnCollectionChange = true;
    };

    VGridCtx.prototype.rebuildColumns = function rebuildColumns() {
      this.vGridGenerator.rebuildColumns();
    };

    VGridCtx.prototype.scrollBottom = function scrollBottom() {
      var collectionLength = this.vGridConfig.getCollectionLength();
      this.contentElement.scrollTop = collectionLength * this.vGridConfig.attRowHeight;
    };

    VGridCtx.prototype.scrollTop = function scrollTop() {
      this.vGridGenerator.contentElement.scrollTop = 0;
    };

    VGridCtx.prototype.setScrollTop = function setScrollTop(newTop) {
      this.vGridGenerator.contentElement.scrollTop = newTop;
    };

    VGridCtx.prototype.rebuildColumnsRows = function rebuildColumnsRows() {
      this.vGridGenerator.rebuildColumnsRows();
    };

    VGridCtx.prototype.columnChangeAndCollection = function columnChangeAndCollection(resetScrollToTop) {
      this.vGridGenerator.columnChangeAndCollection(resetScrollToTop);
    };

    VGridCtx.prototype.redrawGrid = function redrawGrid() {
      this.vGridGenerator.redrawGrid();
    };

    VGridCtx.prototype.showSelectedAndNotSelected = function showSelectedAndNotSelected() {
      this.vGrid.vGridCollectionFiltered = this.vGrid.vGridCollection.slice(0);
      this.vGridGenerator.collectionChange();
    };

    VGridCtx.prototype.showOnlySelected = function showOnlySelected() {
      var _this = this;

      var newArray = [];
      this.vGridCollection.forEach(function (x, i) {
        if (_this.vGridSelection.isSelectedMain(i)) {
          newArray.push(x);
        }
      });
      this.vGrid.vGridCollectionFiltered = newArray;
      this.vGridGenerator.collectionChange();
    };

    VGridCtx.prototype.showOnlyNotSelected = function showOnlyNotSelected() {
      var _this2 = this;

      var newArray = [];
      this.vGridCollection.forEach(function (x, i) {
        if (!_this2.vGridSelection.isSelectedMain(i)) {
          newArray.push(x);
        }
      });
      this.vGrid.vGridCollectionFiltered = newArray;
      this.vGridGenerator.collectionChange();
    };

    VGridCtx.prototype.setColumns = function setColumns(paramArray) {
      this.vGridConfig.colConfig = paramArray;
      this.vGrid.vGridConfig.columnLength = paramArray.length;
    };

    VGridCtx.prototype.getColumns = function getColumns() {
      var arr = [];
      this.vGridConfig.colConfig.forEach(function (obj) {
        var x = {};
        for (var k in obj) {
          if (obj.hasOwnProperty(k)) {
            if (x[k] !== obj[k]) {
              x[k] = obj[k];
            }
          }
        }
        arr.push(x);
      });
      return arr;
    };

    VGridCtx.prototype.reGenerateColumns = function reGenerateColumns(resetScrollToTop) {
      this.vGrid.vGridMarkupGenerator.generate();
      this.vGridGenerator.columnChangeAndCollection(resetScrollToTop);
    };

    VGridCtx.prototype.orderBy = function orderBy(sortArray) {
      var _this3 = this;

      if (this.vGrid.vGridCollectionFiltered.length > 0) {
        if (this.vGrid.vGridCollection.length > this.vGridConfig.attLoadingThreshold) {
          this.vGrid.loading = true;
        }

        setTimeout(function () {

          _this3.vGrid.vGridSort.reset();

          sortArray.forEach(function (sort) {
            _this3.vGrid.vGridSort.setFilter({
              attribute: sort.attribute,
              asc: sort.asc
            }, true);
          });

          var event = new CustomEvent("sortIconUpdate", {
            detail: "",
            bubbles: true
          });
          _this3.vGrid.element.dispatchEvent(event);

          if (_this3.vGridConfig.eventOnRemoteCall) {
            _this3.vGridConfig.remoteCall();
          } else {
            _this3.vGrid.vGridSort.run(_this3.vGrid.vGridCollectionFiltered);

            if (_this3.vGrid.vGridCurrentEntityRef) {
              _this3.vGrid.vGridCollectionFiltered.forEach(function (x, index) {
                if (_this3.vGrid.vGridCurrentEntityRef[_this3.vGrid.vGridRowKey] === x[_this3.vGrid.vGridRowKey]) {
                  _this3.vGrid.vGridCurrentRow = index;
                }
              });
            }

            _this3.vGrid.vGridGenerator.collectionChange();
            _this3.vGrid.loading = false;
          }
        }, 50);
      }
    };

    VGridCtx.prototype.getMaxRows = function getMaxRows() {
      var supportedHeight = 10000;
      var testUpTo = navigator.userAgent.toLowerCase().match(/firefox/) ? 8947840 : 1000000000;
      var div = document.createElement("div");

      document.body.appendChild(div);

      while (true) {
        var test = supportedHeight + 10000;
        div.style.height = test + "px";
        if (test > testUpTo || div.clientHeight !== test) {
          break;
        } else {
          supportedHeight = test;
        }
      }
      document.body.removeChild(div);
      var total = Math.ceil(supportedHeight / this.vGridConfig.attRowHeight);
      return total + ", error margin:" + Math.ceil(10000 / this.vGridConfig.attRowHeight);
    };

    VGridCtx.prototype.scrollBottomNext = function scrollBottomNext() {
      this.vGridGenerator.scrollBottomOnNext = true;
    };

    VGridCtx.prototype.setLoadingOverlay = function setLoadingOverlay(value) {
      this.vGrid.loading = value === true ? true : false;
    };

    VGridCtx.prototype.getScrollTop = function getScrollTop() {
      return this.vGridGenerator.contentElement.scrollTop;
    };

    VGridCtx.prototype.remoteGoToFirst = function remoteGoToFirst() {
      this.vGrid.loading = true;
      this.vGridConfig.remoteOffset = 0;
      this.vGridConfig.remoteCall();
    };

    VGridCtx.prototype.remoteGoToNext = function remoteGoToNext() {
      this.vGrid.loading = true;
      this.vGridConfig.remoteOffset = this.vGridConfig.remoteOffset + this.vGridConfig.remoteLimit;
      this.vGridConfig.remoteCall();
    };

    VGridCtx.prototype.remoteGoToPage = function remoteGoToPage(x) {
      this.vGrid.loading = true;
      this.vGridConfig.remoteOffset = x * this.vGridConfig.remoteLimit;
      this.vGridConfig.remoteCall();
    };

    VGridCtx.prototype.remoteGoToOffset = function remoteGoToOffset(x) {
      this.vGrid.loading = true;
      this.vGridConfig.remoteOffset = x;
      this.vGridConfig.remoteCall();
    };

    VGridCtx.prototype.remoteGoTofirstPrev = function remoteGoTofirstPrev() {
      this.vGrid.loading = true;
      this.vGridConfig.remoteOffset = this.vGridConfig.remoteOffset - this.vGridConfig.remoteLimit;
      this.vGridConfig.remoteCall();
    };

    VGridCtx.prototype.remoteGoTofirstLast = function remoteGoTofirstLast() {
      this.vGrid.loading = true;
      this.vGridConfig.remoteOffset = this.vGridConfig.remoteLength - this.vGridConfig.remoteLimit;
      this.vGridConfig.remoteCall();
    };

    _createClass(VGridCtx, [{
      key: "vGridSelection",
      get: function get() {
        if (this.vGrid) {
          return this.vGrid.vGridSelection;
        } else {
          return null;
        }
      }
    }, {
      key: "vGridConfig",
      get: function get() {
        if (this.vGrid) {
          return this.vGrid.vGridConfig;
        } else {
          return null;
        }
      }
    }, {
      key: "vGridCellHelper",
      get: function get() {
        if (this.vGrid) {
          return this.vGrid.vGridCellHelper;
        } else {
          return null;
        }
      }
    }, {
      key: "vGridElement",
      get: function get() {
        if (this.vGrid) {
          return this.vGrid.element;
        } else {
          return null;
        }
      }
    }, {
      key: "vGridSortable",
      get: function get() {
        if (this.vGrid) {
          return this.vGrid.vGridSortable;
        } else {
          return null;
        }
      }
    }, {
      key: "vGridResizable",
      get: function get() {
        if (this.vGrid) {
          return this.vGrid.vGridResizable;
        } else {
          return null;
        }
      }
    }, {
      key: "vGridFilter",
      get: function get() {
        if (this.vGrid) {
          return this.vGrid.vGridFilter;
        } else {
          return null;
        }
      }
    }, {
      key: "vGridSort",
      get: function get() {
        if (this.vGrid) {
          return this.vGrid.vGridSort;
        } else {
          return null;
        }
      }
    }, {
      key: "vGridObservables",
      get: function get() {
        if (this.vGrid) {
          return this.vGrid.vGridObservables;
        } else {
          return null;
        }
      }
    }, {
      key: "vGridGenerator",
      get: function get() {
        if (this.vGrid) {
          return this.vGrid.vGridGenerator;
        } else {
          return null;
        }
      }
    }, {
      key: "vGridCurrentEntityRef",
      get: function get() {
        if (this.vGrid) {
          return this.vGrid.vGridCurrentEntityRef;
        } else {
          return null;
        }
      }
    }, {
      key: "vGridRowKey",
      get: function get() {
        if (this.vGrid) {
          return this.vGrid.vGridRowKey;
        } else {
          return null;
        }
      }
    }, {
      key: "vGridCollectionFiltered",
      get: function get() {
        if (this.vGrid) {
          return this.vGrid.vGridCollectionFiltered;
        } else {
          return null;
        }
      }
    }, {
      key: "vGridCollection",
      get: function get() {
        if (this.vGrid) {
          return this.vGrid.vGridCollection;
        } else {
          return null;
        }
      }
    }]);

    return VGridCtx;
  }();
});