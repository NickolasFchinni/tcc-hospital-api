import { db } from "../db.js";
import bcrypt from '../node_modules/bcryptjs';

export const getUser = (_, res) => {
  const q = `SELECT 
  u.id_usuario,
  u.id_prestador,
  u.Dt_cadastro,
  u.Sn_ativo,
  u.ds_mail,
  p.nm_prestador AS nome_prestador
  FROM USUARIOS u
  INNER JOIN PRESTADOR p ON u.id_prestador = p.id_prestador`;

  db.query(q, (err, data) => {
    if (err) return res.json(err);

    return res.status(200).json(data);
  });
};

export const addUser = (req, res) => {
  // Verifica se o email já existe
  const checkEmailQuery = "SELECT COUNT(*) AS count FROM USUARIOS WHERE ds_mail = ?";
  db.query(checkEmailQuery, [req.body.ds_mail], (err, results) => {
    if (err) {
      console.error("Erro ao verificar email:", err);
      return res.status(500).json({ error: "Erro ao verificar email." });
    }

    if (results[0].count > 0) {
      return res.status(400).json({ error: "Email já cadastrado." });
    }

    const checkProviderQuery = "SELECT COUNT(*) AS count FROM USUARIOS WHERE id_prestador = ?";
    db.query(checkProviderQuery, [req.body.id_prestador], (err, results) => {
      if (err) {
        console.error("Erro ao verificar prestador:", err);
        return res.status(500).json({ error: "Erro ao verificar prestador." });
      }

      if (results[0].count > 0) {
        return res.status(400).json({ error: "Prestador já cadastrado para outro usuário." });
      }

      // Hash da senha antes de inserir no banco de dados
      bcrypt.hash(req.body.ds_senha, 10, (err, hashedPassword) => {
        if (err) {
          console.error("Erro ao hash de senha:", err);
          return res.status(500).json({ error: "Erro ao criar usuário." });
        }

        const q = "INSERT INTO USUARIOS(`id_prestador`, `Dt_cadastro`, `Sn_ativo`, `ds_mail`, `ds_senha`) VALUES (?, ?, ?, ?, ?)";
        const values = [
          req.body.id_prestador,
          req.body.Dt_cadastro,
          req.body.Sn_ativo,
          req.body.ds_mail,
          hashedPassword, // Use a senha hashada
        ];

        db.query(q, values, (err) => {
          if (err) {
            console.error("Erro ao inserir usuário:", err);
            return res.status(500).json({ error: "Erro ao inserir usuário." });
          }

          return res.status(200).json("Usuário criado com sucesso.");
        });
      });
    });
  });
};

export const deleteUser = (req, res) => {
  const q = "DELETE FROM USUARIOS WHERE `id_usuario` = ?";

  db.query(q, [req.params.id], (err) => {
    if (err) return res.json(err);

    return res.status(200).json("Usuário deletado com sucesso.");
  });
};

export const updateUser = (req, res) => {
  // Hash da senha antes de atualizar no banco de dados (opcional: somente se a senha estiver sendo alterada)
  if (req.body.ds_senha) {
    bcrypt.hash(req.body.ds_senha, 10, (err, hashedPassword) => {
      if (err) {
        console.error("Erro ao hash de senha:", err);
        return res.status(500).json({ error: "Erro ao atualizar usuário." });
      }

      updateWithHashedPassword(hashedPassword);
    });
  } else {
    updateWithHashedPassword(null); // Atualização sem alterar a senha
  }

  function updateWithHashedPassword(hashedPassword) {
    const q =
      "UPDATE USUARIOS SET `id_prestador` = ?, `Dt_cadastro` = ?, `Sn_ativo` = ?, `ds_mail` = ?, `ds_senha` = ? WHERE `id_usuario` = ?";
  
    const values = [
      req.body.id_prestador,
      req.body.Dt_cadastro,
      req.body.Sn_ativo,
      req.body.ds_mail,
      hashedPassword, // Use a senha hashada, ou null se não estiver sendo alterada
      req.params.id,
    ];
  
    db.query(q, values, (err) => {
      if (err) {
        console.error("Erro ao atualizar usuário:", err);
        return res.status(500).json({ error: "Erro ao atualizar usuário." });
      }
      return res.status(200).json("Usuário atualizado com sucesso.");
    });
  }
};
