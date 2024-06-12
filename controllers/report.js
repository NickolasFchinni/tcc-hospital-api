import { db } from "../db.js";

export const getFirstReport = (req, res) => {
  const q = `
    SELECT 
	P.id_paciente
  , P.nm_paciente
  , TO_CHAR (P.dt_nascimento, 'dd/mm/yyyy') AS DT_NASCIMENTO
  , P.nr_cpf 
  , CASE 
  		WHEN P.tp_sexo = 'M' THEN 'MASCULINO'
  		ELSE 'FEMININO'
    END AS TP_SEXO
  , TO_CHAR (AC.dt_agendamento, 'dd/mm/yyyy') AS DT_AGENDAMENTO
  , TP.NO_PROCEDIMENTO 
  , CA.tp_lateralidade
  , PRE.nm_prestador AS MEDICO
  , SC.nm_sala_cirurgica
FROM 
	AVISO_CIRURGIA AC
INNER JOIN 
	PACIENTE P ON P.id_paciente = AC.id_paciente 
INNER JOIN 
	PRESTADOR PRE ON PRE.id_prestador = AC.id_prestador
INNER JOIN 
	CIRURGIA_AVISO CA ON CA.id_aviso_cirurgia = AC.id_aviso_cirurgia
INNER JOIN 
	tb_procedimento TP ON TP.CO_PROCEDIMENTO = CA.id_procedimento
INNER JOIN 
	SALA_CIRURGICA SC ON SC.id_sala_cirurgica = AC.id_sala_cirurgica;
  `;
  db.query(q, (err, data) => {
    if (err) return res.json(err);

    return res.status(200).json(data);
  });
};

export const getSecondReport = (req, res) => {
  const { startDate, endDate } = req.query;
  const q2 = `
    SELECT 
	P.id_paciente
  , P.nm_paciente
  , TO_CHAR (P.dt_nascimento, 'dd/mm/yyyy') AS DT_NASCIMENTO
  , P.nr_cpf 
  , CASE 
  		WHEN P.tp_sexo = 'M' THEN 'MASCULINO'
  		ELSE 'FEMININO'
    END AS TP_SEXO
  , TO_CHAR (AC.dt_agendamento, 'dd/mm/yyyy') AS DT_AGENDAMENTO
  , TP.NO_PROCEDIMENTO 
  , CA.tp_lateralidade
  , PRE.nm_prestador AS MEDICO
  , SC.nm_sala_cirurgica
FROM 
	AVISO_CIRURGIA AC
INNER JOIN 
	PACIENTE P ON P.id_paciente = AC.id_paciente 
INNER JOIN 
	PRESTADOR PRE ON PRE.id_prestador = AC.id_prestador
INNER JOIN 
	CIRURGIA_AVISO CA ON CA.id_aviso_cirurgia = AC.id_aviso_cirurgia
INNER JOIN 
	tb_procedimento TP ON TP.CO_PROCEDIMENTO = CA.id_procedimento
INNER JOIN 
	SALA_CIRURGICA SC ON SC.id_sala_cirurgica = AC.id_sala_cirurgica
WHERE 
	(AC.dt_agendamento) BETWEEN (?) AND (?) ;
  `;
  db.query(q2, [startDate, endDate ], (err, data) => {
    if (err) return res.json(err);

    return res.status(200).json(data);
  });
};

export const getThirdReport = (req, res) => {
  const { startDate, endDate } = req.query;
  const q3 = `
    SELECT 
	 AC.id_aviso_cirurgia
  , TO_CHAR (AC.dt_agendamento, 'dd/mm/yyyy') AS DT_AGENDADO
  , P.nm_paciente
  , PRE.nm_prestador
  , TB.NO_PROCEDIMENTO
  , AC.ds_justificativa
FROM 
	AVISO_CIRURGIA AC
INNER JOIN 
	PACIENTE P ON P.id_paciente = AC.id_paciente 
INNER JOIN 
	PRESTADOR PRE ON PRE.id_prestador = AC.id_prestador 
INNER JOIN 
	CIRURGIA_AVISO CA ON CA.id_aviso_cirurgia = AC.id_aviso_cirurgia
INNER JOIN 
	tb_procedimento TB ON TB.CO_PROCEDIMENTO = CA.id_procedimento
WHERE 
	AC.ds_justificativa IS NOT NULL
AND 
	(AC.dt_agendamento) BETWEEN (?) AND (?) ;
  `;
  db.query(q3, [startDate, endDate ], (err, data) => {
    if (err) return res.json(err);

    return res.status(200).json(data);
  });
};

export const getFourthReport = (req, res) => {
  const { startDate, endDate } = req.query;
  const q4 = `
    SELECT 
	AC.id_aviso_cirurgia AS AVISO_CIRURGIA
 , TO_CHAR (AC.dt_agendamento, 'dd/mm/yyyy') AS DT_AGENDADO
 , PAC.nm_paciente AS PACIENTE
 , PRE.nm_prestador AS MEDICO
 , P.CO_PROCEDIMENTO AS COD_PROCEDIMENTO
 , P.NO_PROCEDIMENTO AS NOME_PROCEDIMENTO
 , CONCAT('R$ ', REPLACE(FORMAT(P.VL_SH / 100, 2), ',', '.')) AS VALOR_CIRURGIA
FROM 
	AVISO_CIRURGIA AC 
INNER JOIN 
	PACIENTE PAC ON PAC.id_paciente = AC.id_paciente
INNER JOIN 
	PRESTADOR PRE ON PRE.id_prestador = AC.id_prestador
INNER JOIN 
	CIRURGIA_AVISO CA ON CA.id_aviso_cirurgia = AC.id_aviso_cirurgia
INNER JOIN 
	tb_procedimento P ON P.CO_PROCEDIMENTO = CA.id_procedimento
WHERE 
	(AC.dt_agendamento) BETWEEN (?) AND (?) ;
  `;
  db.query(q4, [startDate, endDate ], (err, data) => {
    if (err) return res.json(err);

    return res.status(200).json(data);
  });
};
