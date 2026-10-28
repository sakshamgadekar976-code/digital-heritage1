import express from "express";
import cors from "cors";
import db from "./db.js";

const app = express();

app.use(cors());
app.use(express.json());


// ===============================
// HOME
// ===============================

app.get("/", (req, res) => {
  res.send("Digital Heritage Backend is Running!");
});


// ===============================
// TEST DATABASE
// ===============================

app.get("/test-db", async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT 1 AS connected"
    );

    res.json({
      message: "MySQL Connected Successfully!",
      result: rows
    });

  } catch (error) {
    console.error("Database Error:", error);

    res.status(500).json({
      message: "MySQL Connection Failed"
    });
  }
});


// ===============================
// ADMIN DASHBOARD STATISTICS
// ===============================

app.get("/api/admin/stats", async (req, res) => {
  try {

    const [[museumCount]] = await db.query(
      "SELECT COUNT(*) AS total FROM museums"
    );

    const [[placeCount]] = await db.query(
      "SELECT COUNT(*) AS total FROM historic_places"
    );

    const [[artifactCount]] = await db.query(
      "SELECT COUNT(*) AS total FROM artifacts"
    );

    const [[userCount]] = await db.query(
      "SELECT COUNT(*) AS total FROM users"
    );

    const [[feedbackCount]] = await db.query(
      "SELECT COUNT(*) AS total FROM feedback"
    );

    res.json({
      museums: museumCount.total,
      historicPlaces: placeCount.total,
      artifacts: artifactCount.total,
      users: userCount.total,
      feedback: feedbackCount.total
    });

  } catch (error) {

    console.error(
      "Admin Stats API Error:",
      error
    );

    res.status(500).json({
      message: "Failed to fetch admin statistics"
    });
  }
});


// ===============================
// MUSEUMS
// ===============================

app.get("/api/museums", async (req, res) => {
  try {

    const [rows] = await db.query(
      "SELECT * FROM museums ORDER BY id"
    );

    res.json(rows);

  } catch (error) {

    console.error(
      "Museum API Error:",
      error
    );

    res.status(500).json({
      message: "Failed to fetch museums"
    });
  }
});


// ===============================
// HISTORIC PLACES
// ===============================

app.get(
  "/api/historic-places",
  async (req, res) => {

    try {

      const [rows] = await db.query(
        "SELECT * FROM historic_places ORDER BY id"
      );

      res.json(rows);

    } catch (error) {

      console.error(
        "Historic Places API Error:",
        error
      );

      res.status(500).json({
        message: "Failed to fetch historic places"
      });
    }
  }
);


// ===============================
// INSTRUMENTS
// ===============================

app.get("/api/instruments", async (req, res) => {
  try {

    const [rows] = await db.query(
      "SELECT * FROM instruments ORDER BY id"
    );

    res.json(rows);

  } catch (error) {

    console.error(
      "Instruments API Error:",
      error
    );

    res.status(500).json({
      message: "Failed to fetch instruments"
    });
  }
});


// ===============================
// MUSEUM ARTIFACTS
// ===============================

app.get(
  "/api/museums/:museumId/artifacts",
  async (req, res) => {

    try {

      const { museumId } = req.params;

      const [rows] = await db.query(
        `SELECT *
         FROM artifacts
         WHERE museum_id = ?
         ORDER BY id`,
        [museumId]
      );

      res.json(rows);

    } catch (error) {

      console.error(
        "Artifacts API Error:",
        error
      );

      res.status(500).json({
        message: "Failed to fetch artifacts"
      });
    }
  }
);


// ===============================
// MUSEUM COLLECTIONS
// ===============================

app.get(
  "/api/museums/:museumId/collections",
  async (req, res) => {

    try {

      const { museumId } = req.params;

      const [rows] = await db.query(
        `SELECT *
         FROM museum_collections
         WHERE museum_id = ?
         ORDER BY category, id`,
        [museumId]
      );

      res.json(rows);

    } catch (error) {

      console.error(
        "Museum Collections API Error:",
        error
      );

      res.status(500).json({
        message: "Failed to fetch museum collections"
      });
    }
  }
);


// ===============================
// FEEDBACK - POST
// ===============================

app.post(
  "/api/feedback",
  async (req, res) => {

    try {

      const {
        user_id,
        subject,
        message
      } = req.body;

      if (!user_id) {

        return res.status(400).json({
          message: "User ID is required"
        });
      }

      if (!message || !message.trim()) {

        return res.status(400).json({
          message: "Feedback message is required"
        });
      }

      const [result] = await db.query(
        `INSERT INTO feedback
        (user_id, subject, message)
        VALUES (?, ?, ?)`,
        [
          user_id,
          subject || null,
          message.trim()
        ]
      );

      res.status(201).json({

        message:
          "Feedback submitted successfully",

        feedbackId:
          result.insertId
      });

    } catch (error) {

      console.error(
        "Feedback API Error:",
        error
      );

      res.status(500).json({
        message: "Failed to submit feedback"
      });
    }
  }
);


// ===============================
// GET ALL FEEDBACK
// ===============================

app.get(
  "/api/feedback",
  async (req, res) => {

    try {

      const [rows] = await db.query(
        `SELECT
          feedback.id,
          feedback.subject,
          feedback.message,
          feedback.created_at,
          users.name,
          users.email
         FROM feedback
         JOIN users
         ON feedback.user_id = users.id
         ORDER BY feedback.id DESC`
      );

      res.json(rows);

    } catch (error) {

      console.error(
        "Get Feedback API Error:",
        error
      );

      res.status(500).json({
        message: "Failed to fetch feedback"
      });
    }
  }
);


// ===============================
// SERVER
// ===============================

const PORT = 5000;

app.listen(PORT, () => {

  console.log(
    `Server running on http://localhost:${PORT}`
  );

});