import { db } from "../db.js";

export const getRooms = (_, res) => {
  const q = "SELECT * FROM CENTRO_CIRURGICO";

  db.query(q, (err, data) => {
    if (err) return res.json(err);

    return res.status(200).json(data);
  });
};

export const addRoom = (req, res) => {
  const q =
    "INSERT INTO CENTRO_CIRURGICO(`nm_cen_cirurgico`) VALUES(?)";

  const { nm_cen_cirurgico } = req.body; 

  db.query(q, nm_cen_cirurgico, (err) => {
    if (err) {
      console.error("Erro ao inserir centro cirúrgico:", err);
      return res.status(500).json({ error: "Erro ao inserir centro cirúrgico." });
    }

    return res.status(200).json("Centro criado com sucesso.");
  });
};

export const deleteRoom = (req, res) => {
  const q = "DELETE FROM CENTRO_CIRURGICO WHERE `id_cen_cirurgico` = ?";

  db.query(q, [req.params.id], (err, result) => {
    if (err) {
      console.error("Erro ao deletar centro cirúrgico:", err);
      return res.status(500).json({ error: "Erro ao deletar centro cirúrgico." });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Centro cirúrgico não encontrado." });
    }

    return res.status(200).json("Centro deletado com sucesso.");
  });
};
