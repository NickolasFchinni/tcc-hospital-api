# API do Sistema Hospitalar

## 📌 Sobre
Esta API foi desenvolvida para o **TCC** e tem como objetivo fornecer um serviço para busca direta no banco de dados do sistema do hospital. A API foi construída utilizando **Node.js** e **Express**, com autenticação baseada em **JWT** e **bcrypt** para segurança das credenciais.

---

## 🚀 Tecnologias Utilizadas
- **Node.js** - Ambiente de execução JavaScript
- **Express.js** - Framework para criação de APIs
- **MySQL** - Banco de dados relacional
- **bcrypt** - Hashing de senhas para segurança
- **JWT (Json Web Token)** - Autenticação e controle de acesso
- **Dotenv** - Gerenciamento de variáveis de ambiente

---

## ⚙️ Instalação e Configuração
### 1️⃣ Pré-requisitos
Antes de iniciar, certifique-se de ter instalado:
- **Node.js** (versão 14 ou superior)
- **MySQL**
- **Git**

### 2️⃣ Clonar o repositório
```bash
git clone https://github.com/NickolasFchinni/tcc-hospital-api.git
cd tcc-hospital-api
```

### 3️⃣ Instalar as dependências
```bash
npm install
```

### 4️⃣ Configurar as variáveis de ambiente
Crie um arquivo **.env** na raiz do projeto e adicione:
```
DB_HOST=seu_host
DB_USER=seu_usuario
DB_PASSWORD=sua_senha
DB_NAME=seu_banco_de_dados
JWT_SECRET=sua_chave_secreta
```

### 5️⃣ Rodar a aplicação
```bash
npm start
```

A API estará rodando em **http://localhost:3000**.

---

## 🔒 Segurança
- Senhas armazenadas com **bcrypt**
- Tokens de autenticação gerenciados com **JWT**
- Proteção de rotas privadas

---

## 📜 Licença
Este projeto é de uso acadêmico e não deve ser utilizado para fins comerciais sem autorização prévia.

📩 **Contato:** caso tenha dúvidas ou sugestões, entre em contato através do GitHub!

