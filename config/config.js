module.exports = {
  port: process.env.port || 3000,
  db: process.env.DB_LINK || 'mongodb://localhost:27017/ITRACK-BD',
  sessionUrl: 'mongodb://localhost/passport',
};
