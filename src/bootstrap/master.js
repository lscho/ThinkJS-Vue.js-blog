const fs = require('fs');
think.beforeStartServer(async() => {
  // 压缩模板
  if (think.env === 'production') {
    if (!fs.existsSync(think.ROOT_PATH + '/runtime/')) {
      fs.mkdirSync(think.ROOT_PATH + '/runtime/');
    }
    if (!fs.existsSync(think.ROOT_PATH + '/runtime/view/')) {
      fs.mkdirSync(think.ROOT_PATH + '/runtime/view/');
    }
    var minify = require('html-minifier').minify;
    const views = fs.readdirSync(think.ROOT_PATH + '/view');
    views.forEach((val, index) => {
      const data = fs.readFileSync(think.ROOT_PATH + '/view/' + val, 'utf8');
      const minifyData = minify(data, {removeComments: true, collapseWhitespace: true, minifyJS: true, minifyCSS: true});
      fs.writeFileSync(think.ROOT_PATH + '/runtime/view/' + val, minifyData);
    });
  }
});