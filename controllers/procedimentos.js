import { db } from "../db.js";

export const getProcedimentos = (req, res) => {
  const idProcedimento = req.params.id; 

  const q = `
    SELECT CO_PROCEDIMENTO, NO_PROCEDIMENTO 
    FROM tb_procedimento 
    WHERE CO_PROCEDIMENTO = ?;
  `;

  db.query(q, [idProcedimento], (err, data) => {
    if (err) return res.status(500).json({ error: err.message });

    if (data.length === 0) {
      return res.status(404).json({ message: "Procedimento não encontrado" });
    }

    const procedimento = data[0];
    return res.status(200).json({
      CO_PROCEDIMENTO: procedimento.CO_PROCEDIMENTO,
      NO_PROCEDIMENTO: procedimento.NO_PROCEDIMENTO,
    });
  });
};