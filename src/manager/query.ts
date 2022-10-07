{
  const mysql: any = require("mysql");
  const connection: any = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "movies_ceneplex",
  });

  class Manager {
    public dbname = "";
    constructor(dbname: string) {
      this.dbname = dbname;
    }
    public async findAll(query: string = `SELECT * FROM ${this.dbname}`) {
      try {
        const data: object = await this.getData(query);
        return data;
      } catch (error) {
        throw error;
      }
    }
    private async getData(query: string): Promise<any> {
      return new Promise((resolve, reject): any => {
        connection.query(query, (err: any, result: any): any => {
          if (err) throw reject(err);
          resolve(result);
        });
      });
    }
  }

  module.exports = Manager;
}
