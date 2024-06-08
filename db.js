import mysql from "mysql"

export const db = mysql.createConnection({
  host: 'tcc-a27xd-mariadb.external.kinsta.app',
  port: 31935,
  user: 'tcc',
  password: 'qD2*fZ6$oM8&aY0&',
  database: 'tcc'
})