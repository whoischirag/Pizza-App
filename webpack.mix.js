const mix = require('laravel-mix');

mix.js('resources/js/app.js', 'public/js/app.js')
   .sass('resources/sass/app.scss', 'public/css/app.css');


 

mix.webpackConfig({
    resolve: {
        fallback: {
            "path": require.resolve("path-browserify"),
            "fs": false, // or require.resolve("browserify-fs") if you need fs in the browser
            "stream": require.resolve("stream-browserify"),
            "constants": require.resolve("constants-browserify"),
            "os": require.resolve("os-browserify/browser"),
            "https": require.resolve("https-browserify"),
            "http": require.resolve("stream-http"),
        }
    }
});
