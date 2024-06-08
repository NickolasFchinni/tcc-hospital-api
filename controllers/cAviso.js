import { db } from "../db.js";

export const getCAviso = (_, res) => {
  const q = "SELECT * FROM CIRURGIA_AVISO";

  db.query(q, (err, data) => {
    if (err) return res.json(err);

    return res.status(200).json(data);
  });
};

export const addCAviso = (req, res) => {
  const q =
    "INSERT INTO CIRURGIA_AVISO(`id_aviso_cirurgia`, `id_procedimento`, `tp_lateralidade`) VALUES(?)";

  const values = [
    req.body.id_aviso_cirurgia,
    req.body.id_procedimento,
    req.body.tp_lateralidade,

  ];

  db.query(q, [values], (err) => {
    if (err) return res.json(err);

    return res.status(200).json("Aviso criado com sucesso.");
  });
};
