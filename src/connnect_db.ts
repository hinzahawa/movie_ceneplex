const { Sequelize } = require("sequelize");
const db: any = {
  host: process.env.DB_HOST,
  dialect: process.env.MYSQL,
  database: process.env.DATABASE,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
};
const sequelize = new Sequelize(db.database, db.username, db.password, {
  host: db.host,
  dialect: db.dialect,
});
try {
  sequelize.authenticate();
  console.info("Connection has been mysql successfully.");
  // sequelize.close();
} catch (error) {
  console.error("Unable to connect to the database:", error);
}
