// auth.js

import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { db } from '../db.js';
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;
const router = express.Router()

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  console.log('Email fornecido:', email);
  console.log('Senha fornecida:', password);

  const query = `
    SELECT u.id_usuario, u.ds_mail, u.ds_senha, p.ds_tip_presta, p.nm_prestador
    FROM USUARIOS u
    LEFT JOIN PRESTADOR p ON u.id_prestador = p.id_prestador
    WHERE u.ds_mail = ?
  `;
  
  db.query(query, [email], async (err, results) => {
    if (err) {
      console.error('Database query error:', err);
      return res.status(500).json({ message: 'Database error' });
    }

    if (results.length === 0) {
      return res.status(401).json({ message: 'Email or password incorrect' });
    }

    const user = results[0];

    const isMatch = await bcrypt.compare(password, user.ds_senha);

    console.log('Senha armazenada:', user.ds_senha);
    console.log('Comparação de senha:', isMatch);
    console.log('JWT_SECRET:', JWT_SECRET);

    if (!isMatch) {
      return res.status(401).json({ message: 'Email or password incorrect' });
    }

    console.log('ID do usuário:', user.id_usuario);
    console.log('Email do usuário:', user.ds_mail);
    console.log('Tipo de prestador:', user.ds_tip_presta);
    console.log('Nome do prestador:', user.nm_prestador);

    // Gerar um token JWT válido
    const token = jwt.sign({ 
      id: user.id_usuario, 
      email: user.ds_mail, 
      role: user.ds_tip_presta,
      nome_prestador: user.nm_prestador
    }, JWT_SECRET, { expiresIn: '1h' });
    console.log('Token gerado:', token);

    res.status(200).json({ token, user: { 
      id: user.id_usuario, 
      email: user.ds_mail, 
      role: user.ds_tip_presta,
      nome_prestador: user.nm_prestador 
    } });

  });
});

export default router;
