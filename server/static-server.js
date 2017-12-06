const express = require('express');
const cors = require('cors');
const history = require('connect-history-api-fallback');

const config = require('../config');
const PORT = process.env.PORT || config.build.port;
const app = express();

app.use(cors());
// 避免刷新无页面 404
app.use(history());

app.use('/api', require('./api'));

app.use(express.static('dist'));

// 404
app.use((req, res) => {
  const err = new Error('Not Found');
  err.status = 404;
  res.send(err);
});
// 500
app.use((req, res) => {
  console.log(`server 500 error: url:  + ${req.url}`);
  console.log('............////////////////...................////////////////////...........');
  return res.status(500).send('500 status');
});

app.get('/', (req, res, next) => {
  try {
    res.render('/dist/index');
  } catch (err) {
    next(err);
  }
});
// 路由匹配错误
app.get('*', (req, res, next) => {
  console.log('404 handler...');
  res.send('404', {
    status: 404,
    title: 'NotFound'
  });
});

module.exports = app.listen(PORT, (err) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log(`VueMobile app listening on port: ${PORT}\n`);
});
