import { db } from "../db.js";

export const addMateriais = (req, res) => {
  const materiais = req.body.materiais;

  if (!materiais || !Array.isArray(materiais) || materiais.length === 0) {
    return res.status(400).json({ error: "Nenhum material fornecido para inserção." });
  }

  const q =
    "INSERT INTO MATERIAL_AVISO (`id_aviso_cirurgia`, `id_material`, `nr_quantidade`) VALUES ?";

  const values = materiais.map(material => [
    material.id_aviso_cirurgia,
    material.id_material,
    material.nr_quantidade || 0, // Tratamento para quantidade, caso seja null ou undefined
  ]);

  db.query(q, [values], (err) => {
    if (err) {
      console.error("Erro ao inserir materiais:", err);
      return res.status(500).json({ error: "Erro ao inserir materiais." });
    }

    return res.status(200).json("Materiais criados com sucesso.");
  });
};

export const deleteAvisoMaterial = (req, res) => {
  const q2 = "DELETE FROM MATERIAL_AVISO WHERE `id_aviso_cirurgia` = ?";

  db.query(q2, [req.params.id], (err) => {
    if (err) return res.json(err);

    return res.status(200).json("Materiais deletados com sucesso.");
  });
};

