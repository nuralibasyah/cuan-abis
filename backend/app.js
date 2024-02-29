const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql2/promise");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const app = express();
app.use(bodyParser.json());
app.use(cors());

const pool = mysql.createPool({
  host: "localhost",
  //user: "cuan-user",
  //password: "02gQqg[-p0kxQBW-",
  user: "root",
  password: "",
  database: "cuan-abis",
});

// POST METHOD REGISTRASI
app.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const [rows] = await pool.query("SELECT * FROM user WHERE email = ?", [
      email,
    ]);
    if (rows.length > 0) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await pool.query(
      "INSERT INTO user (username, email, password) VALUES (?, ?, ?)",
      [username, email, hashedPassword]
    );

    return res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error registering user:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// POST METHOD LOGIN
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const [rows] = await pool.query("SELECT * FROM user WHERE email = ?", [
      email,
    ]);
    if (rows.length === 0) {
      return res.status(400).json({ message: "User not found" });
    }

    const user = rows[0];
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const token = jwt.sign({ id: user.id }, "your_secret_key", {
      expiresIn: "1h",
    });

    return res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    console.error("Error logging in:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// VERIFY TOKEN FOR PROTECTED ROUTE
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, "your_secret_key");
    req.userId = decoded.id;
    next();
  } catch (error) {
    console.error("Error verifying token:", error);
    return res.status(401).json({ message: "Unauthorized" });
  }
};

// POST METHOD ADD_INCOME
app.post("/:id/add_income", verifyToken, async (req, res) => {
  const { jumlah, kategori, tanggal, note } = req.body;
  const userId = req.params.id;

  try {
    // Check if the user exists and is the owner of the income
    const [user] = await pool.query("SELECT * FROM user WHERE id = ?", [
      userId,
    ]);
    if (!user || user.id !== req.userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Insert the income into the 'income' table
    await pool.query(
      "INSERT INTO pemasukan (id_user, jumlah_masuk, kategori_masuk, tanggal_masuk, note_masuk) VALUES (?, ?, ?, ?)",
      [userId, jumlah, kategori, tanggal, note]
    );

    return res.status(201).json({ message: "Income added successfully" });
  } catch (error) {
    console.error("Error adding income:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// POST METHOD ADD_EXPENSE
app.post("/:id/add_expense", verifyToken, async (req, res) => {
  const { jumlah, kategori, pembayaran, tanggal, note } = req.body;
  const userId = req.params.id;

  try {
    // Check if the user exists and is the owner of the income
    const [user] = await pool.query("SELECT * FROM user WHERE id = ?", [
      userId,
    ]);
    if (!user || user.id !== req.userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Insert the income into the 'income' table
    await pool.query(
      "INSERT INTO pengeluaran (d_user, jumlah_keluar, kategori_keluar, kategori_bayar, tanggal_keluar, note) VALUES (?, ?, ?, ?, ?)",
      [userId, jumlah, kategori, pembayaran, tanggal, note]
    );

    return res.status(201).json({ message: "Expense added successfully" });
  } catch (error) {
    console.error("Error adding income:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// GET METHOD SUM_INCOME
app.get('/:id/income_sum/:month', async (req, res) => {
  const userId = req.params.id;
  const month = req.params.month;

  try {
      const [rows] = await pool.execute(
          `SELECT SUM(jumlah_masuk) AS total_income 
           FROM pemasukan 
           WHERE id_user = ? 
           AND MONTH(timestamp) = ? 
           GROUP BY MONTH(timestamp)`,
          [userId, month]
      );

      if (rows.length > 0) {
          res.json({ totalIncome: rows[0].total_income });
      } else {
          res.status(404).json({ error: 'No data found' });
      }

  } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
  }
});

// GET METHOD SUM EXPENSE
app.get('/:id/expense_sum/:month', async (req, res) => {
  const userId = req.params.id;
  const month = req.params.month;

  try {
      const [rows] = await pool.execute(
          `SELECT SUM(jumlah_keluar) AS total_expense 
           FROM pengeluaran 
           WHERE id_user = ? 
           AND MONTH(timestamp) = ? 
           GROUP BY MONTH(timestamp)`,
          [userId, month]
      );

      if (rows.length > 0) {
          res.json({ totalExpense: rows[0].total_expense });
      } else {
          res.status(404).json({ error: 'No data found' });
      }

  } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(3000, () => {
  console.log("Express server listening on port 3000");
});
