const devConfig = {
  host: 'localhost',
  database: 'ts-study',
  user: 'root',
  password: 'root',
  port: 3306
}

const prodConfig = {
  host: 'xxx.xxx.xxx',
  database: 'ts-study',
  port: 3306
}

module.exports = process.env.NODE_ENV === 'development' ? devConfig : prodConfig
