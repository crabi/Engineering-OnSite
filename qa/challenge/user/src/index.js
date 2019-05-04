const config = require('config');
const pg = require('pg');
const request = require('request-promise');
const express = require('express');

const api = express();

api.use(express.json());

const dbConfig = config.get('services.database');

const pool = new pg.Pool(dbConfig);

pool.query('SELECT NOW()').then(() => {
  console.log('Connected to db\n', dbConfig);
});

const vProtocol = config.services.vehicle.protocol;
const vHost = config.services.vehicle.host;
const vPort = config.services.vehicle.port;

async function getUser(userId) {
  const queryString = `SELECT * FROM public."user" WHERE id = ${userId}`;
  const result = await pool.query(queryString);
  const response = await request.get(`${vProtocol}://${vHost}:${vPort}/user/${userId}/vehicle`);
  const vehicles = JSON.parse(response).vehicles;
  return {
    id: result.rows[0].id,
    name: result.rows[0].name,
    vehicles,
  };
}

async function postUser(data) {
  const queryString = `INSERT INTO public."user" (name) VALUES ('${data.user.name}')`;
  const userId = await pool.query(queryString).then(() => pool.query('SELECT currval(\'user_id_seq\');').then(resultQuery => resultQuery.rows[0].currval))
    .catch((error) => {
      console.log('Error on Query\n\n', error);
    });

  console.log(`inserted user '${data.user.name}' with id: ${userId}`);
  const promises = data.user.vehicles.map(vehicle => request.post(`${vProtocol}://${vHost}:${vPort}/user/${userId}/vehicle`,
    { json: vehicle }));
  return Promise.all(promises);
}

api.get('/user/:userId', (req, res) => {
  getUser(req.params.userId).then(user => res.send(user));
});

api.post('/user', (req, res) => {
  postUser(req.body).then(() => res.send('ok')).catch((error) => {
    res.status(400);
    res.send('error');
    console.log(error);
  });
});

api.listen(config.api.port);
