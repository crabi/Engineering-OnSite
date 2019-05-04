const config = require('config');
const pg = require('pg');
const express = require('express');

const api = express();

api.use(express.json());

const dbConfig = config.get('services.database');

const pool = new pg.Pool(dbConfig);

pool.query('SELECT NOW()').then(() => {
  console.log('Connected to db\n', dbConfig);
});

async function getPolicies(userId) {
  const queryString = `SELECT id, vehicle_id, description FROM policy WHERE vehicle_id = ${userId}`;
  const result = await pool.query(queryString);

  return {
    policies: result.rows,
  };
}

async function postPolicy(userId, vehicleId, data) {   
  const queryString = `INSERT INTO public."policy" (user_id, vehicle_id, description) VALUES (${userId}, ${vehicleId}, '${data.description}')`;
  await pool.query(queryString)
    .catch((error) => {
      console.log('Error on Query\n\n', error);
    });

  console.log(`inserted policy '${data.description}' of user: ${userId}`);
}

api.get('/user/:userId/policy', (req, res) => {
  getPolicies(req.params.userId).then(user => res.send(user));
});

api.get('/policy/:policyId', (req, res) => {
  res.status(200);  
  res.send("ok")
});

api.post('/user/:userId/vehicle/:vehicleId/policy', (req, res) => {  
  postPolicy(req.params.userId, req.params.vehicleId, req.body).then(() => res.send('ok')).catch((error) => {
    res.status(400);
    res.send('error');
    console.log(error);
  });
});

api.post('/policy', (req, res) => {    
});


api.listen(config.api.port);
