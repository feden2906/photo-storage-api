/* eslint-disable */
const typeorm = require('typeorm');

let config;
try {
  config = require('./src/config/database/static/type-orm-configuration-static');
} catch {
  // config = require('./dist/src/config/database/type-orm-configuration');
}
const defaultOptions = config.typeOrmStaticConfig;
const dataSource = new typeorm.DataSource(defaultOptions);

module.exports = [dataSource];
