const env = process.env.NODE_ENV || "dev";
const configApp: any = {
  dev: {
    DB_HOST: "localhost",
    MYSQL: "mysql",
    DATABASE: "movies_ceneplex",
    DB_USERNAME: "root",
    DB_PASSWORD: "",
    PRIVATE_KEY: "O5rd7VNsENJ5u5UFABvZ",
  },
};

module.exports = configApp[env];
