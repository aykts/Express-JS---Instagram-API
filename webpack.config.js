const tailwindcss = require('tailwindcss');

mix.sass('resources/sass/tailwind.scss', 'public/css')
   .options({
       processCssUrls: false,
       postCss       : [tailwindcss('./tailwind.js')],
   }).version();