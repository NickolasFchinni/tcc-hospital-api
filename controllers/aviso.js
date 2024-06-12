import { db } from "../db.js";

export const getAvisos = (_, res) => {
  const q = "SELECT * FROM AVISO_CIRURGIA";

  db.query(q, (err, data) => {
    if (err) return res.json(err);

    return res.status(200).json(data);
  });
};

export const addAviso = (req, res) => {
  const q =
    "INSERT INTO AVISO_CIRURGIA(`id_paciente`, `tp_aviso`, `dt_cadastro`, `dt_agendamento`, `dt_tempo_previsto`, `id_prestador`, `tp_anestesia`, `sn_reserva_cti`, `sn_biopsia`, `sn_reserva_hemocomponentes`, `ds_justificativa`, `id_usuario`, `id_sala_cirurgica`) VALUES(?)";

  const values = [
    req.body.id_paciente,
    req.body.tp_aviso,
    req.body.dt_cadastro,
    req.body.dt_agendamento,
    req.body.dt_tempo_previsto,
    req.body.id_prestador,
    req.body.tp_anestesia,
    req.body.sn_reserva_cti,
    req.body.sn_biopsia,
    req.body.sn_reserva_hemocomponentes,
    req.body.ds_justificativa,
    req.body.id_usuario,
    req.body.id_sala_cirurgica
  ];

  db.query(q, [values], (err, result) => {
    if (err) return res.json(err);

    const insertedId = result.insertId;
    return res.status(200).json({ id_aviso_cirurgia: insertedId });

    return res.status(200).json("Aviso criado com sucesso.");
  });
};

export const deleteAviso = (req, res) => {
  const q = "DELETE FROM AVISO_CIRURGIA WHERE `id_aviso_cirurgia` = ?";

  db.query(q, [req.params.id], (err) => {
    if (err) return res.json(err);

    return res.status(200).json("Aviso deletado com sucesso.");
  });
};
