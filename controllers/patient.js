import { db } from "../db.js";

export const getUsers = (_, res) => {
  const q = "SELECT * FROM PACIENTE";

  db.query(q, (err, data) => {
    if (err) return res.json(err);

    return res.status(200).json(data);
  });
};



export const addUser = async (req, res) => {
  console.log("Dados recebidos para adicionar paciente:", req.body);

  const { nr_cpf, nr_telefone, nr_cns } = req.body;

  const checkQuery = "SELECT * FROM PACIENTE WHERE nr_cpf = ? OR nr_telefone = ? OR nr_cns = ?";
  db.query(checkQuery, [nr_cpf, nr_telefone, nr_cns], async (checkErr, checkResult) => {
    if (checkErr) {
      console.error('Erro ao verificar paciente existente:', checkErr);
      return res.status(500).json({ error: 'Erro ao verificar paciente existente.' });
    }

    if (checkResult.length > 0) {
      return res.status(400).json({ error: 'CPF, telefone ou CNS já cadastrados.' });
    }

    const insertQuery =
      "INSERT INTO PACIENTE(`nm_paciente`, `nm_mae`, `ds_cep`, `dt_nascimento`, `nr_cpf`, `tp_estado_civil`, `nr_cns`, `nr_telefone`, `tp_sexo`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";

    const values = [
      req.body.nm_paciente,
      req.body.nm_mae,
      req.body.ds_cep,
      req.body.dt_nascimento,
      req.body.nr_cpf,
      req.body.tp_estado_civil,
      req.body.nr_cns,
      req.body.nr_telefone,
      req.body.tp_sexo
    ];

    db.query(insertQuery, values, (err) => {
      if (err) {
        console.error('Erro ao inserir paciente:', err);
        return res.status(500).json({ error: 'Erro ao inserir paciente.' });
      }

      return res.status(200).json("Paciente criado com sucesso.");
    });
  });
};

export const updateUser = (req, res) => {

  const q =
    "UPDATE PACIENTE SET `nm_paciente` = ?, `nm_mae` = ?, `ds_cep` = ?, `dt_nascimento` = ?, `nr_cpf` = ?, `tp_estado_civil` = ?, `nr_cns` = ?, `nr_telefone` = ? WHERE `id_paciente` = ?";

  const values = [
    req.body.nm_paciente,
    req.body.nm_mae,
    req.body.ds_cep,
    req.body.dt_nascimento,
    req.body.nr_cpf,
    req.body.tp_estado_civil,
    req.body.nr_cns,
    req.body.nr_telefone
  ];

  db.query(q, [...values, req.params.id], (err) => {
    if (err) return res.json(err);

    return res.status(200).json("Paciente atualizado com sucesso.");
  });
};

export const deleteUser = (req, res) => {

  console.log("Dados recebidos para remover paciente:", req.params.id);
  const q = "DELETE FROM PACIENTE WHERE `id_paciente` = ?";

  db.query(q, [req.params.id], (err) => {
    if (err) return res.json(err);

    return res.status(200).json("Paciente deletado com sucesso.");
  });
};
