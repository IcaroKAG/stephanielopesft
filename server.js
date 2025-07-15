// ==============================
// FOTOGRAFIA PRO - BACKEND
// Node.js + Express + SQLite
// ==============================

const express = require("express");
const cors = require("cors");
const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

// Banco de Dados SQLite
const db = new sqlite3.Database("fotografia.db", (err) => {
  if (err) return console.error(err.message);
  console.log("🗃️ Banco conectado com sucesso.");
});

// Criação da Tabela (caso não exista)
db.run(`CREATE TABLE IF NOT EXISTS contatos (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nome TEXT NOT NULL,
  email TEXT NOT NULL,
  whatsapp TEXT,
  mensagem TEXT NOT NULL,
  data_envio DATETIME DEFAULT CURRENT_TIMESTAMP
)`);

// Rota de Teste
app.get("/", (req, res) => {
  res.send("API da Fotografia Pro está online! 📸");
});

// Rota de Contato (recebe formulário)
app.post("/api/contato", (req, res) => {
  const { nome, email, whatsapp, mensagem } = req.body;

  if (!nome || !email || !mensagem) {
    return res.status(400).json({ erro: "Campos obrigatórios não preenchidos." });
  }

  const sql = `INSERT INTO contatos (nome, email, whatsapp, mensagem) VALUES (?, ?, ?, ?)`;
  const params = [nome, email, whatsapp || "", mensagem];

  db.run(sql, params, function (err) {
    if (err) {
      console.error("Erro ao inserir:", err.message);
      return res.status(500).json({ erro: "Erro ao salvar no banco." });
    }
    res.status(201).json({ sucesso: true, id: this.lastID });
  });
});

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});

// Rota GET para listar todos os contatos
app.get("/api/contatos", (req, res) => {
  db.all("SELECT * FROM contatos ORDER BY data_envio DESC", [], (err, rows) => {
    if (err) {
      console.error("Erro ao buscar contatos:", err.message);
      return res.status(500).json({ erro: "Erro ao consultar o banco." });
    }
    res.json(rows);
  });
});
