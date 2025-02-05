/* eslint-env node */
const path = require('path');

const utils = require('@gravity-ui/gulp-utils');
const {task, src, dest, series, parallel} = require('gulp');
// eslint-disable-next-line no-unused-vars
const rename = require('gulp-rename');
const replace = require('gulp-replace');
const sass = require('gulp-sass')(require('sass'));
const sourcemaps = require('gulp-sourcemaps');
const {rimrafSync} = require('rimraf');

const BUILD_CLIENT_DIR = path.resolve('build');
const SERVER_CLIENT_DIR = path.resolve('server');
const ESM_DIR = 'esm';
const CJS_DIR = 'cjs';
const SASS_LOADER_OPTIONS = {
    loadPaths: ['./node_modules'],
};

// eslint-disable-next-line no-unused-vars
const CONFIG_EXTENSION_FOR_DECLARATION = {
    emitDeclarationOnly: true,
    isolatedModules: false,
    declaration: true,
};

const CONFIG_EXTENSION_FOR_COMPILE = {
    incremental: true,
    isolatedModules: true,
};

const SRC_FOR_INDEX_BUILD = [
    'src/**/*.{ts,tsx,js,jsx}',
    '!src/demo/**/*',
    '!src/stories/**/*',
    '!src/**/__stories__/**/*',
    '!src/**/__tests__/**/*',
    '!src/data/**/*',
    '!src/server.ts',
    '!test-utils/**/*',
];

const SRC_FOR_SERVER_REQUIREMENTS = [
    'src/data/**/*.{js,jsx,ts,tsx}',
    'src/models/**/*.{js,jsx,ts,tsx}',
];

const getTsConfig = async ({modules = false, extension = {}}) => {
    const project = await utils.createTypescriptProject({
        compilerOptions: {
            declaration: true,
            module: modules ? 'esnext' : 'nodenext',
            moduleResolution: modules ? 'bundler' : 'nodenext',
            ...extension,
            ...(modules ? undefined : {verbatimModuleSyntax: false}),
        },
    });

    return project;
};

task('clean', (done) => {
    rimrafSync(BUILD_CLIENT_DIR);
    rimrafSync(SERVER_CLIENT_DIR);
    rimrafSync('styles/**/*.css', {glob: true});
    done();
});

async function compileTs(modules = false) {
    const tsProject = await getTsConfig({modules});

    const transformers = [
        tsProject.customTransformers.transformScssImports,
        tsProject.customTransformers.transformLocalModules,
    ];

    return new Promise((resolve) => {
        src(SRC_FOR_INDEX_BUILD)
            .pipe(
                replace(/import '.+\.scss';/g, (match) =>
                    modules ? match.replace('.scss', '.css') : '',
                ),
            )
            .pipe(sourcemaps.init())
            .pipe(
                tsProject({
                    customTransformers: {
                        before: transformers,
                        afterDeclarations: transformers,
                    },
                }),
            )
            .pipe(sourcemaps.write('.', {includeContent: true, sourceRoot: '../../src'}))
            .pipe(
                utils.addVirtualFile({
                    fileName: 'package.json',
                    text: JSON.stringify({type: modules ? 'module' : 'commonjs'}),
                }),
            )
            .pipe(dest(path.resolve(BUILD_CLIENT_DIR, modules ? ESM_DIR : CJS_DIR)))
            .on('end', resolve);
    });
}

// function compileTsDeclaration(modules = false) {
//     const tsProject = getTsConfig({
//         modules,
//         extension: CONFIG_EXTENSION_FOR_DECLARATION,
//     });

//     return src(SRC_FOR_INDEX_BUILD)
//         .pipe(
//             replace(/import '.+\.scss';/g, (match) =>
//                 modules ? match.replace('.scss', '.css') : '',
//             ),
//         )
//         .pipe(tsProject())
//         .pipe(dest(path.resolve(BUILD_CLIENT_DIR, modules ? ESM_DIR : CJS_DIR)));
// }

async function compileServerFile() {
    // const tsProject = getTsConfig({
    //     extension: {
    //         declaration: true,
    //         isolatedModules: false,
    //     },
    // });

    // return src('src/server.ts')
    //     .pipe(rename('index.js'))
    //     .pipe(tsProject())
    //     .pipe(dest(path.resolve(SERVER_CLIENT_DIR)));

    const tsProject = await getTsConfig({});

    const transformers = [
        tsProject.customTransformers.transformScssImports,
        tsProject.customTransformers.transformLocalModules,
    ];

    return new Promise((resolve) => {
        src('src/server.ts')
            // .pipe(rename('server/index.js'))
            .pipe(sourcemaps.init())
            .pipe(
                tsProject({
                    customTransformers: {
                        before: transformers,
                        afterDeclarations: transformers,
                    },
                }),
            )
            .pipe(sourcemaps.write('.', {includeContent: true, sourceRoot: '../../src'}))
            .pipe(
                utils.addVirtualFile({
                    fileName: 'package.json',
                    text: JSON.stringify({type: 'commonjs'}),
                }),
            )
            .pipe(dest(path.resolve(SERVER_CLIENT_DIR)))
            .on('end', resolve);
    });
}

async function compileServerRequirements() {
    // const tsProject = getTsConfig({
    //     extension: CONFIG_EXTENSION_FOR_COMPILE,
    // });

    // return src(SRC_FOR_SERVER_REQUIREMENTS, {base: 'src'})
    //     .pipe(tsProject())
    //     .pipe(dest(path.resolve(SERVER_CLIENT_DIR)));

    //     const tsProject = await getTsConfig({});

    //     const transformers = [
    //         tsProject.customTransformers.transformScssImports,
    //         tsProject.customTransformers.transformLocalModules,
    //     ];
    const tsProject = await getTsConfig({extension: CONFIG_EXTENSION_FOR_COMPILE});

    const transformers = [
        tsProject.customTransformers.transformScssImports,
        tsProject.customTransformers.transformLocalModules,
    ];

    return new Promise((resolve) => {
        src(SRC_FOR_SERVER_REQUIREMENTS)
            // .pipe(rename('server/index.js'))
            .pipe(sourcemaps.init())
            .pipe(
                tsProject({
                    customTransformers: {
                        before: transformers,
                        afterDeclarations: transformers,
                    },
                }),
            )
            .pipe(sourcemaps.write('.', {includeContent: true, sourceRoot: '../../src'}))
            .pipe(
                utils.addVirtualFile({
                    fileName: 'package.json',
                    text: JSON.stringify({type: 'commonjs'}),
                }),
            )
            .pipe(dest(path.resolve(SERVER_CLIENT_DIR)))
            .on('end', resolve);
    });
}

// function compileServerRequirementsDeclaration() {
//     const tsProject = getTsConfig({
//         extension: CONFIG_EXTENSION_FOR_DECLARATION,
//     });

//     return src(SRC_FOR_SERVER_REQUIREMENTS, {base: 'src'})
//         .pipe(tsProject())
//         .pipe(dest(path.resolve(SERVER_CLIENT_DIR)));
// }

task('compile-to-esm', () => {
    return compileTs(true);
});

task('compile-to-cjs', () => {
    return compileTs();
});

// task('compile-to-esm-declaration', () => {
//     return compileTsDeclaration(true);
// });

// task('compile-to-cjs-declaration', () => {
//     return compileTsDeclaration();
// });

task('compile-server-file', () => {
    return compileServerFile();
});

task('compile-server-requirements', () => {
    return compileServerRequirements();
});

// task('compile-server-requirements-declaration', () => {
//     return compileServerRequirementsDeclaration();
// });

task('copy-js-declarations', () => {
    return src([
        'src/**/*.d.ts',
        '!src/demo/**/*.d.ts',
        '!src/stories/**/*.d.ts',
        '!src/**/__stories__/**/*.d.ts',
        '!src/**/__tests__/**/*.d.ts',
        '!test-utils/**/*.d.ts',
    ])
        .pipe(dest(path.resolve(BUILD_CLIENT_DIR, ESM_DIR)))
        .pipe(dest(path.resolve(BUILD_CLIENT_DIR, CJS_DIR)));
});

task('copy-i18n', () => {
    return src(['src/**/i18n/*.json'])
        .pipe(dest(path.resolve(BUILD_CLIENT_DIR, ESM_DIR)))
        .pipe(dest(path.resolve(BUILD_CLIENT_DIR, CJS_DIR)));
});

task('styles-global', () => {
    return src('styles/*.scss')
        .pipe(sass.sync(SASS_LOADER_OPTIONS).on('error', sass.logError))
        .pipe(dest('styles'));
});

task('styles-components', () => {
    return src([`src/**/*.scss`, `!src/**/__stories__/**/*.scss`])
        .pipe(
            sass.sync(SASS_LOADER_OPTIONS).on('error', function (error) {
                sass.logError.call(this, error);
                process.exit(1);
            }),
        )
        .pipe(dest(path.resolve(BUILD_CLIENT_DIR, ESM_DIR)))
        .pipe(dest(path.resolve(BUILD_CLIENT_DIR, CJS_DIR)));
});

task(
    'build',
    series([
        'clean',
        parallel(['compile-to-esm', 'compile-to-cjs']),
        // parallel(['compile-to-esm-declaration', 'compile-to-cjs-declaration']),
        parallel([
            'compile-server-file',
            'compile-server-requirements',
            //     'compile-server-requirements-declaration',
        ]),
        'copy-js-declarations',
        'copy-i18n',
        parallel(['styles-global', 'styles-components']),
    ]),
);

task('default', series(['build']));
