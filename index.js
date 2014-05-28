
module.exports = process.env.CODE_COV
  ? require('./lib-cov/app.js')
  : require('./lib/app.js');
