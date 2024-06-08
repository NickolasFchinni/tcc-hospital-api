import { db } from "../db.js";

export const getSalas = (_, res) => {
  const q = "SELECT * FROM SALA_CIRURGICA";

  db.query(q, (err, data) => {
    if (err) return res.json(err);

    return res.status(200).json(data);
  });
};

export const addSala = (req, res) => {
  const q = "INSERT INTO SALA_CIRURGICA(`nm_sala_cirurgica`, `id_cen_cirurgico`) VALUES (?, ?)";
  const { nm_sala_cirurgica, id_cen_cirurgico } = req.body;

  db.query(q, [nm_sala_cirurgica, id_cen_cirurgico], (err) => {
    if (err) {
      console.error("Erro ao inserir sala cirúrgica:", err);
      return res.status(500).json({ error: "Erro ao inserir sala cirúrgica." });
    }

    return res.status(200).json("Sala criada com sucesso.");
  });
};



export const deleteSala = (req, res) => {
  const q = "DELETE FROM SALA_CIRURGICA WHERE `id_sala_cirurgica` = ?";

  db.query(q, [req.params.id], (err) => {
    if (err) return res.json(err);

    return res.status(200).json("Sala deletada com sucesso.");
  });
};
