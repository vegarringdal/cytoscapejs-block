const { FuseBox, QuantumPlugin, WebIndexPlugin, Sparky, HTMLPlugin, CSSPlugin } = require("fuse-box");

// get typechecker helper
const Typechecker = require('fuse-box-typechecker').TypeHelper
let typechecker = null;
let runTypeChecker = () => {
    // same color..
    console.log(`\x1b[36m%s\x1b[0m`, `app bundled- running typecheck`);

    // I could have had own for the sample...
    typechecker = Typechecker({
        tsConfig: './tsconfig.json',
        name: 'src',
        basePath: './',
        tsLint: './tslint.json',
        yellowOnLint: true
    })
    typechecker.runSync();
}

// variables
let fuse, bundle;
let isProduction = false;
let target = "browser@es5";
let bundleName = "app";

let instructions = `
    > main.ts 
    + **/*.{ts,html,css} 
    + fuse-box-css
    + mframejs`;




/*     Sources:
    https://cdn.rawgit.com/cytoscape/cytoscape.js-dagre/1.3.0/cytoscape-dagre.js
    https://cdn.rawgit.com/cpettitt/dagre/v0.7.4/dist/dagre.js
    https://cdnjs.cloudflare.com/ajax/libs/cytoscape/2.7.0/cytoscape.min.js
    https://cdn.rawgit.com/cytoscape/cytoscape.js-cose-bilkent/1.3.6/cytoscape-cose-bilkent.js */

let webIndexTemplate =
    `<!DOCTYPE html>
    <html>
        <head>
        <meta charset="utf-8">
        <title>block generator</title>
        <script src="./libs/cytoscape.min.js"></script>
        <script src="./libs/cytoscape-cose-bilkent.js"></script>
        <script src="./libs/dagre.js"></script>
        <script src="./libs/cytoscape-dagre.js"></script>
        <link rel="stylesheet" href="./styles/bootstrap.min.css">
        <link rel="stylesheet" href="./styles/styles.css">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <script type="text/javascript" charset="utf-8" src="./app.js"></script>
    </head>
    <body>
    </body>
    </html>`




let webIndexTemplateProduction = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>block generator</title>
        <script src="./libs/cytoscape.min.js"></script>
        <script src="./libs/cytoscape-cose-bilkent.js"></script>
        <script src="./libs/dagre.js"></script>
        <script src="./libs/cytoscape-dagre.js"></script>
        <link rel="stylesheet" href="./styles/bootstrap.min.css">
        <link rel="stylesheet" href="./styles/styles.css">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        $bundles
      </head>
      <body>
      </body>
    </html>`




Sparky.task("config", () => {
    fuse = FuseBox.init({
        homeDir: "src",
        globals: { 'default': '*' }, // we need to expore index in our bundles
        target: target,
        output: isProduction ? "build/$name.js" : "dist/$name.js",
        cache: false,
        tsConfig: [{ target: bundleName }], // override tsConfig
        plugins: [
            CSSPlugin(),
            HTMLPlugin(),
            WebIndexPlugin({ templateString: isProduction ? webIndexTemplateProduction : webIndexTemplate, path: './' }),
            isProduction && QuantumPlugin({
                uglify: true,
                polyfills: ["Promise"],
                bakeApiIntoBundle: bundleName
            })
        ]
    })

    let watchAndSourceMap = isProduction ? false : true;

    bundle = fuse.bundle(bundleName)
        .instructions(instructions)
        .sourceMaps(watchAndSourceMap)
        .completed(proc => {
            runTypeChecker();
        });
});




Sparky.task("production", () => {
    isProduction = true;
});


Sparky.task("clean", () => {
    return Sparky.src("dist/").clean("dist/");
});

Sparky.task("clean-gh", () => {
    return Sparky.src("build/").clean("build/");
});

const BASE_PATH = './';

Sparky.task('copy-css', () => {
    return Sparky.src('*.*', {
        base: BASE_PATH + 'styles'
    })
        .dest(BASE_PATH + isProduction ? 'build/styles' : 'dist/styles');
});

Sparky.task('copy-lib', () => {
    return Sparky.src('*.*', {
        base: BASE_PATH + 'libs'
    })
        .dest(BASE_PATH + isProduction ? 'build/libs' : 'dist/libs');
});

Sparky.task("build", ["clean-gh", "copy-css", "copy-lib", "production", "config"], () => {
    //  fuse.dev(); // want to run it for now
    fuse.run();
});

Sparky.task("default", ["clean", "copy-css", "copy-lib", "config"], () => {
    fuse.dev();
    bundle.hmr().watch();
    fuse.run();
});