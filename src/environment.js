var env = process.env.NODE_ENV || 'dev';

var environment = {
  ENV: env,
  isDevelopment: env === 'dev',
  isProduction: env === 'production'
};

module.exports = environment;