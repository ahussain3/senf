var env = process.env.NODE_ENV || 'staging';

var config = {
  development: {
    db: 'mongodb://localhost:27017/test'
  },
  test: {
    db: 'mongodb://localhost:27017/test'
  },
  staging: {
    db: 'mongodb://localhost:27017/test'
  },
  production: {
    db: 'mongodb://localhost:27017/test'
  }
};

module.exports = config[env];