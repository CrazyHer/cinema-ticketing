import Redis = require('ioredis');
import config = require('../config.json');

const { hostname, password, port, db } = config.redis;
const redis = new Redis({
  host: hostname,
  password,
  port,
  maxRetriesPerRequest: 5,
  db,
});

export default redis;
