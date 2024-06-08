import { db } from "../db.js";

export const getEspecialidade = (_, res) => {
  const q = "SELECT * FROM ESPECIALIDADE";
  db.query(q, (err, data) => {
    if (err) return res.json(err);

    return res.status(200).json(data);
  });
};