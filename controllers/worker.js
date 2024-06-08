import { db } from "../db.js";

export const getWorker = (_, res) => {
  const q = "SELECT * FROM PRESTADOR";

  db.query(q, (err, data) => {
    if (err) return res.json(err);

    return res.status(200).json(data);
  });
};

export const getMedicoWorkers = (_, res) => {
  const q = "SELECT * FROM PRESTADOR WHERE ds_tip_presta = 'MEDICO'";
  db.query(q, (err, data) => {
    if (err) return res.status(500).json({ error: "Erro ao buscar médicos.", details: err });
    return res.status(200).json(data);
  });
};

export const addWorker = (req, res) => {

  const { nr_cpf } = req.body;

  const checkQuery = "SELECT * FROM PRESTADOR WHERE nr_cpf = ?";
  db.query(checkQuery, [nr_cpf], async (checkErr, checkResult) => {
    if (checkErr) {
      console.error('Erro ao verificar prestador existente:', checkErr);
      return res.status(500).json({ error: 'Erro ao verificar prestador existente.' });
    }

    if (checkResult.length > 0) {
      return res.status(400).json({ error: 'CPF já cadastrado.' });
    }

  const q =
    "INSERT INTO PRESTADOR(`nm_prestador`, `ds_tip_presta`, `ds_codigo_conselho`, `ds_cep` , `nr_cpf`, `id_especialidade`, `dt_nascimento`) VALUES(?)";

  const values = [
    req.body.nm_prestador,
    req.body.ds_tip_presta,
    req.body.ds_codigo_conselho,
    req.body.ds_cep,
    req.body.nr_cpf,
    req.body.id_especialidade,
    req.body.dt_nascimento
  ];

  db.query(q, [values], (err) => {
    if (err) {
      console.error("Erro ao inserir prestador:", err);
      return res.status(500).json({ error: "Erro ao inser inprestador." });
    }

    return res.status(200).json("Prestador criado com sucesso.");
  });
});
};

export const updateWorker = (req, res) => {
  const q =
    "UPDATE PRESTADOR SET `nm_prestador` = ?, `ds_tip_presta` = ?, `ds_codigo_conselho` = ?, `ds_cep` = ?, `nr_cpf` = ?, `id_especialidade` = ?, `dt_nascimento` = ? WHERE `id_prestador` = ?";

  const values = [
    req.body.nm_prestador,
    req.body.ds_tip_presta,
    req.body.ds_codigo_conselho,
    req.body.ds_cep,
    req.body.nr_cpf,
    req.body.id_especialidade,
    req.body.dt_nascimento
  ];

  db.query(q, [...values, req.params.id], (err) => {
    if (err) return res.json(err);

    return res.status(200).json("prestador atualizado com sucesso.");
  });
};

export const deleteWorker = (req, res) => {
  const q = "DELETE FROM PRESTADOR WHERE `id_prestador` = ?";

  db.query(q, [req.params.id], (err) => {
    if (err) return res.json(err);

    return res.status(200).json("prestador deletado com sucesso.");
  });
};
