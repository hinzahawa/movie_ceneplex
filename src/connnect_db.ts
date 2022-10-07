{
  const mysql: any = require("mysql");

  const connection: any = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "movies_ceneplex",
  });

  connection.connect(function (err: any, res: any) {
    if (err) throw err;
    console.log("Connected mysql!");
    connection.end();
  });
}
