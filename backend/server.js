const express = require("express");
const { Pool } = require("pg");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const client = new Pool({
  host: "localhost",
  user: "postgres",
  port: 5432,
  password: "postgres",
  database: "carpool",
});

app.post("/signup", (req, res) => {
  console.log(req.body);
  // console.log(value)
  const query = `SELECT COUNT(*) FROM signup WHERE email = $1`;
  const value = [req.body.email[0]];

  client.query(query, value, (err, data) => {
    if (err) {
      console.error(err);
    } else {
      const rowCount = data.rows[0].count;
      console.log(data);
      console.log(`Number of rows: ${rowCount}`);

      if (rowCount == 0) {
        const sql = `INSERT INTO signup(name, email, password) VALUES($1, $2, $3)`;
        const values = [
          req.body.name[0],
          req.body.email[0],
          req.body.password[0],
        ];
        client.query(sql, values, (err, data) => {
          if (err) {
            return res.json(err.message);
          }
          return res.json(data);
        });
      } else {
        return res.status(409).json({ error: "Email already exists" });
      }
    }
  });
});

app.post("/login", (req, res) => {
  console.log(req.body);

  const sql = `SELECT * from signup where email = $1 and password = $2`;
  const values = [req.body.email[0], req.body.password[0]];
  client.query(sql, values, (err, data) => {
    if (err) {
      return res.json(err.message);
    }
    return res.json(data.rows);
  });
});

app.post("/poolform", (req, res) => {
  const sql = `INSERT INTO "Pools"("poolBy", "poolFrom", "poolTo", "poolDate", "poolTime", "poolSeats", "availableSeats", "members","poolById") VALUES($1, $2, $3, $4, $5, $6, $7, $8,$9)`;
  const values = [
    req.body.name[0],
    req.body.start[0],
    req.body.end[0],
    req.body.date[0],
    req.body.time[0],
    req.body.seats[0],
    req.body.seats[0],
    [req.body.poolById],
    req.body.poolById,
  ];
  client.query(sql, values, (err, data) => {
    if (err) {
      console.log(err.message);
    }
    return res.json(data);
  });
});

app.post("/checkin", (req, res) => {
  const query = `UPDATE "Pools" SET "members" = array_append("members", $1) WHERE "poolId" = $2`;
  const values = [req.body.loginid, req.body.poolid];
  console.log(req.body.loginid, req.body.poolid);
  client.query(query, values, (err, data) => {
    if (err) {
      console.log( err.message);
    }
    // else{
    //   return res.json(data)
    // }
  });
  const sql = `UPDATE "Pools" SET "availableSeats" = "availableSeats"-1 WHERE "poolId" = $1`;

  const sqlvalues = [req.body.poolid];
  console.log(req.body.poolid);
  client.query(sql, sqlvalues, (err, data) => {
    if (err) {
      console.log(err.message);
    }
    else {
      return res.json(data)
    }
  });
});

app.post("/leavepool", (req, res) => {
  const query = `UPDATE "Pools" SET "availableSeats" = "availableSeats"+1,"members"= array_remove("members", $1) WHERE "poolId" = $2`;
  const values = [req.body.loginid, req.body.poolid];
  client.query(query, values, (err, data) => {
    if (err) {
      console.log(err.message);
      
    }
    else{
      return res.json(data);
    }
  });
});

app.post("/deletepool", (req, res) => {
  const query = `DELETE FROM "Pools" WHERE "poolId" = $1`;
  const values = [req.body.poolid];
  client.query(query, values, (err, data) => {
    if (err) {
      console.log(err.message);
    }else{
      return res.json(data);
    }
  });
});

app.get("/allpool", (req, res) => {
  client.query('SELECT * FROM "Pools" ORDER BY "availableSeats" DESC', (error, results) => {
    if (error) {
      throw error;
    }
    res.json(results.rows);
  });
});

app.listen(8081, () => {
   console.log("listening on port");
});
