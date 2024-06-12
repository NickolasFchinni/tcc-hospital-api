import { db } from "../db.js";

export const getCAviso = (_, res) => {
  const q = "SELECT * FROM CIRURGIA_AVISO";

  db.query(q, (err, data) => {
    if (err) return res.json(err);

    return res.status(200).json(data);
  });
};

export const getCAvisoById = (req, res) => {
  const idAvisoCirurgia = req.params.id; 

  const q = "SELECT * FROM CIRURGIA_AVISO WHERE id_aviso_cirurgia = ?";

  db.query(q, [idAvisoCirurgia], (err, data) => {
    if (err) return res.status(500).json({ error: err.message });

    if (data.length === 0) {
      return res.status(404).json({ message: "Aviso cirúrgico não encontrado" });
    }

    return res.status(200).json(data[0]);
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
    if (err) {
      console.error("Erro ao inserir sala cirúrgica:", err);
      return res.status(500).json({ error: "Erro ao inserir sala cirúrgica." });
    }

    return res.status(200).json("Aviso criado com sucesso.");
  });
};

export const deleteCAviso = (req, res) => {
  const q3 = "DELETE FROM CIRURGIA_AVISO WHERE `id_aviso_cirurgia` = ?";

  db.query(q3, [req.params.id], (err) => {
    if (err) return res.json(err);

    return res.status(200).json("Aviso cirurgia deletado com sucesso.");
  });
};

