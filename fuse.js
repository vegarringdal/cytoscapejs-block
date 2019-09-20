const { fusebox, sparky, pluginPostCSS } = require('fuse-box');
const { pluginTypeChecker } = require('fuse-box-typechecker');

// just dev mode, no production setup.

class Context {
    getConfig(prod) {
        return fusebox({
            target: 'browser',
            homeDir: './',
            output: prod ? 'build':`build`,
            entry: `src/index.ts`,
            webIndex: {
                template: `src/index.html`,
                publicPath: './',
            },
            cache:prod ? false: true,
            devServer: prod ? false: true,
            hmr: prod ? false: true,
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

task('dist', async (ctx) => {
    const fuse = ctx.getConfig(true);
    await fuse.runDev(); // prod broken atm
});