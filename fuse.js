const { fusebox, sparky, pluginPostCSS } = require('fuse-box');
const { pluginTypeChecker } = require('fuse-box-typechecker');

// just dev mode, no production setup.

class Context {
    getConfig() {
        return fusebox({
            target: 'browser',
            homeDir: './',
            output: `dist`,
            entry: `src/index.ts`,
            webIndex: {
                template: `src/index.html`,
                basePath: './'
            },
            cache:true,
            devServer: true,
            plugins: [
                pluginTypeChecker({
                    basePath: './',
                    tsConfig: './tsconfig.json'
                }),
                pluginPostCSS(/\.css$/, {
                    stylesheet: {
                        postCSS: {
                            plugins: [
                                require('tailwindcss'),
                                require('autoprefixer')
                            ]
                        }
                    }
                })
            ]
        });
    }
}

const { task } = sparky(Context);

task('default', async (ctx) => {
    const fuse = ctx.getConfig(false);
    await fuse.runDev();
});