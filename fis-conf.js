// 采用 commonjs 模块化方案。
fis.hook('commonjs', {
  baseUrl: './page',
  extList: ['.js', '.jsx', '.es']
});

fis.match('*.html', {
    useMap: true
})

// npm install -g fis-parser-babel-5.x
fis.match('/page/**.{es,es6,jsx,js}', {
    parser: fis.plugin('babel-5.x', {
        sourceMaps: true
    }),
    // make sure jsx file is wrap by define, to make babel moduel works
    isMod: true,
    rExt: '.js'
});

// 使用 import 引入的时候，加载同名的 less/css 文件
fis.match('*', {
    useSameNameRequire: true
});

// dep 下的所有 js 中的 require 不需要被编译，因为有可能是 echarts 或者 webupload 文件中自己实现的 require define
fis.match('/static/**.js', {
    ignoreDependencies: true
});

// 支持 js 中直接 require css. (es6 的 import 也支持，但是先通过 es6 => es5 的转换。)
fis.match('*.{js,es,es6,jsx,ts,tsx}', {
  preprocessor: [
    fis.plugin('js-require-file'),
    fis.plugin('js-require-css')
  ]
});

// // 改用 npm 方案，而不是用 fis-components
// fis.hook('node_modules');

// // 设置成是模块化 js
// fis.match('/node_modules/**.{js,jsx,es}', {
//     isMod: true
// });


// // 加 md5
// fis.match('*.{js,css,png}', {
//   useHash: true
// });
// 清除其他配置，只保留如下配置
// fis.match('*.js', {
//   // fis-optimizer-uglify-js 插件进行压缩，已内置
//   optimizer: fis.plugin('uglify-js')
// });

// fis.match('*.css', {
//   // fis-optimizer-clean-css 插件进行压缩，已内置
//   optimizer: fis.plugin('clean-css')
// });



fis.media('debug').match('*.{js,css,png}', {
  useHash: false,
  useSprite: false,
  optimizer: null
});


// 打包压缩
// fis
// .match('/(page)/(**.{js,jsx,es})', {
//     url: '/static/$1/$2'
// })
// .match('/(widget)/(**.{js,jsx,css})', {
//     url: '/static/$1/$2'
// });

fis.match('::package', {
  // 本项目为纯前段项目，所以用 loader 编译器加载，
  // 如果用后端运行时框架，请不要使用。
  postpackager: fis.plugin('loader', {
    useInlineMap: true
  })
});


fis.match('/page/voice/**.{js,jsx,es}', {
  packTo: '/static/voice.js'
});
fis.match('/page/voice/**.css', {
  packTo: '/static/voice.css'
});
fis.match('/page/module/**.{js,jsx,es}', {
  packTo: '/static/module.js'
});
fis.match('/page/module/**.css', {
  packTo: '/static/module.css'
});
fis.match('/page/data/**.{js,jsx,es}', {
  packTo: '/static/data.js'
});
fis.match('/page/data/**.css', {
  packTo: '/static/data.css'
});

