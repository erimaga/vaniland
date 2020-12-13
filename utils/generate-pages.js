const fss = require('fs');
const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const { titleCase } = require('./format-string');

const parent = fss.readdirSync(path.resolve(__dirname, '../pages'));

const devMode = process.env.NODE_ENV === 'development';

const pagesPlugin = [];

const generate = (file, template, folder) => {
  const title = file.replace(/\.pug$/, '');
  const index = title === 'index';

  if (folder !== 'views') {
    const page = new HtmlWebpackPlugin({
      template,
      filename: index
        ? `${folder}/index.html`
        : `${folder}/${title}/index.html`,
      title: index ? titleCase(folder) : titleCase(title),
      inject: 'head',
      chunks: ['main', title],
      minify: !devMode,
      favicon: path.resolve(__dirname, '../static/favicon.png'),
    });

    pagesPlugin.push(page);
  }
};

parent.forEach((child) => {
  const location = path.resolve(__dirname, `../pages/${child}`);
  const page = fss.readdirSync(location);

  if (page.length !== 0) {
    page.forEach((file) => {
      const template = path.join(location, `/${file}`);
      generate(file, template, child);
    });
  }
});

module.exports = pagesPlugin;
