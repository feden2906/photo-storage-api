// eslint-disable-next-line @typescript-eslint/no-var-requires
const typeorm = require('typeorm');

let config;
try {
  config = require('./src/config/database/type-orm-configuration');
} catch {
  config = require('./dist/src/config/database/postgresql/type-orm-configuration');
}
const defaultOptions = config.TypeOrmConfigurations.staticConfig;
const dataSource = new typeorm.DataSource(defaultOptions);

module.exports = [dataSource];
