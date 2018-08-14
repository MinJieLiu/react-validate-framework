import path from 'path';
import webpack from 'webpack';
import debugFuc from 'debug';
import express from 'express';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import config from './webpack.config';

const debug = debugFuc('app:config:dev:server');

const app = express();
const compiler = webpack(config);

app.use(webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath,
  reload: true,
  stats: config.stats,
}));

app.use(webpackHotMiddleware(compiler, {
  log: debug,
}));

app.use(express.static(path.join(__dirname, 'static')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../example/index.html'));
});

app.listen(3000, (err) => {
  if (err) {
    debug(err);
    return;
  }
  debug('Listening at http://localhost:3000');
});
