// Based on https://medium.com/@AndrewDelPrete/using-purifycss-to-remove-unused-tailwind-css-classes-173b3ee8ee01
let mix = require("laravel-mix");
let tailwindcss = require("tailwindcss");
let glob = require("glob-all");
let PurgecssPlugin = require("purgecss-webpack-plugin");

// Custom PurgeCSS extractor for Tailwind that allows special characters in
// class names.
//
// https://github.com/FullHuman/purgecss#extractor
class TailwindExtractor {
  static extract(content) {
    return content.match(/[A-Za-z0-9-_:\/]+/g) || [];
}
}

mix
.js('resources/js/app.js', 'public/js')
.less('resources/less/app.less', 'public/css')
.options({
    postCss: [
    tailwindcss('tailwind.js'),
    ],
    processCssUrls: false
})
mix.setPublicPath('./')
// .browserSync({
//     proxy: 'mckd.local/en',
//     files: ["./**/*.css", "./**/*.js", "./**/*.php", "./*.html"]
// })
.webpackConfig({
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
            '@': __dirname + '/resources/js'
        },
    },
})
.disableSuccessNotifications()
;

// Only run PurgeCSS during production builds for faster development builds
// and so you still have the full set of utilities available during
// development.
// if (mix.inProduction()) {
//     mix.webpackConfig({
//         plugins: [
//             new PurgecssPlugin({

//                 // Specify the locations of any files you want to scan for class names.
//                 paths: glob.sync([
//         	         // path.join(__dirname, "resources/views/**/*.blade.php"),
//         	         // path.join(__dirname, "resources/assets/js/**/*.vue")
//         	         // path.join(__dirname, "resources/assets/js/**/*.vue"),
//         	         path.join(__dirname, "*.html")
//                      ]),
//                 extractors: [
//                 {
//                     extractor: TailwindExtractor,

//                     // Specify the file extensions to include when scanning for
//                     // class names.
//                     extensions: ["html", "js", "php", "vue"]
//                 }
//                 ]
//             })
//         ]
//     });
// }