'use strict';

System.register(['bootstrap'], function (_export, _context) {
  "use strict";

  return {
    setters: [function (_bootstrap) {}],
    execute: function () {
      function configure(aurelia) {
        aurelia.use.standardConfiguration().plugin('aurelia-v-grid');

        aurelia.start().then(function () {
          return aurelia.setRoot();
        });
      }

      _export('configure', configure);
    }
  };
});
//# sourceMappingURL=main.js.map
