1. make sure webpack is set up to import scss:

  ```js
  // webpack.config.js
  module.exports = {
    ...
    module: {
      rules: [{
        test: /\.scss$/,
        use: [{
          loader: "style-loader" // creates style nodes from JS strings
        }, {
          loader: "css-loader" // translates CSS into CommonJS
        }, {
          loader: "sass-loader" // compiles Sass to CSS
        }]
      }]
    }
  };
  ```

2. define variables export file in variables.scss

   ```scss
   // variables.scss
   $white-color: #fcf5ed;
   $dark-color: #402f2b;
   $light-color: #e6d5c3;
   $medium-color: #977978;
   $alert-color: #cb492a;
   $light-black-color: #706e72;
   $black-color: #414042;
   
   // the :export directive is the magic sauce for webpack
   :export {
     whitecolor: $white-color;
     darkcolor: $dark-color;
     lightcolor: $light-color;
     mediumcolor: $medium-color;
     alertcolor: $alert-color;
     lightblackcolor: $light-black-color;
     blackcolor: $black-color;
   }
   ```

3. import your variables.scss

   ```js
   import variables from 'variables.scss';
   ```


参考链接：

[Share SCSS Variables with Javascript](https://til.hashrocket.com/posts/sxbrscjuqu-share-scss-variables-with-javascript)