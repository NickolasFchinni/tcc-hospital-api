import { db } from "../db.js";

export const getCompatibleMaterials = (req, res) => {
  const { procedureId } = req.query;  

  const query = `
    SELECT 
      PC.CO_PROCEDIMENTO_PRINCIPAL AS COD_PROCEDIMENTO_PRINCIPAL,
      P.NO_PROCEDIMENTO AS NO_PROCEDIMENTO_PRINCIPAL,
      PC.CO_PROCEDIMENTO_COMPATIVEL AS COD_PROCEDIMENTO_COMPATIVEL,
      P2.NO_PROCEDIMENTO AS NO_PROCEDIMENTO_COMPATIVEL,
      P2.QT_MAXIMA_EXECUCAO AS QT_PERMITIDA
    FROM 
      rl_procedimento_compativel PC
      INNER JOIN tb_procedimento P ON P.CO_PROCEDIMENTO = PC.CO_PROCEDIMENTO_PRINCIPAL
      INNER JOIN tb_procedimento P2 ON P2.CO_PROCEDIMENTO = PC.CO_PROCEDIMENTO_COMPATIVEL
      INNER JOIN vw_grupo_procedimento GP ON GP.CO_PROCEDIMENTO = P2.CO_PROCEDIMENTO
    WHERE 
      P.CO_PROCEDIMENTO = ?
      AND GP.CO_GRUPO_PROCEDIMENTO = '07';`;

  db.query(query, [procedureId], (err, data) => {
    if (err) return res.status(500).json(err);
    res.status(200).json(data);
  });
};
