import { db } from "../db.js";

export const getProcedimento = (req, res) => {
  const sexo = req.query.sexo; 
  const q = `
    SELECT DISTINCT 
      P.CO_PROCEDIMENTO,
      P.NO_PROCEDIMENTO,
      CASE 
        WHEN P.TP_SEXO = 'M' THEN 'MASCULINO'
        WHEN P.TP_SEXO = 'F' THEN 'FEMININO'
        WHEN P.TP_SEXO = 'I' THEN 'AMBOS'
        WHEN P.TP_SEXO = 'N' THEN 'NAO SE APLICA'
        ELSE ''
      END TP_SEXO
    FROM		
      tb_procedimento P
    INNER JOIN 
      vw_grupo_procedimento GP ON GP.CO_PROCEDIMENTO = P.CO_PROCEDIMENTO
    WHERE 
      GP.NO_GRUPO_PROCEDIMENTO IN ('PROCEDIMENTOS CIRURGICOS', 'TRANSPLANTE DE ORGAOS, TECIDOS E CELULAS')
      AND (P.TP_SEXO = 'I' OR P.TP_SEXO = 'N' OR P.TP_SEXO = ?)
    ORDER BY 
      P.NO_PROCEDIMENTO;
  `;
  db.query(q, [sexo], (err, data) => {
    if (err) return res.json(err);

    return res.status(200).json(data);
  });
};
