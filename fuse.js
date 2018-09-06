const { FuseBox, QuantumPlugin, WebIndexPlugin, Sparky, HTMLPlugin, CSSPlugin } = require("fuse-box");
const BASE_PATH = './';

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
    });
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
`;

let webIndexTemplate =
    `<!DOCTYPE html>
    <html>
        <head>
        <meta charset="utf-8">
        <title>block generator</title>
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
        globals: { 'default': '*' },
        target: target,
        output: isProduction ? "build/$name.js" : "dist/$name.js",
        cache: false,
        tsConfig: [{ target: bundleName }],
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



Sparky.task('copy-css', () => {
    return Sparky.src('*.*', {
        base: BASE_PATH + 'styles'
    })
        .dest(BASE_PATH + (isProduction ? 'build/styles' : 'dist/styles'));
});


Sparky.task("build", ["production", "clean-gh", "copy-css", "production", "config"], () => {
    fuse.run();
});

Sparky.task("default", ["clean", "copy-css", "config"], () => {
    fuse.dev();
    bundle.hmr().watch();
    fuse.run();
});