const Pool = require('pg').Pool;
const pool = new Pool({
  user: 'martin',
  host: 'localhost',
  database: 'martin',
  password: 'kristina',
  port: 5432
});

const getAllTrucks = async (request, response) => {
  pool.query('SELECT * FROM trucks ORDER BY id ASC', (error, results) => {
    response
        .set('Access-Control-Allow-Origin', '*')
        .status(200)
        .json(results.rows);
  });
};

const getTruckById = (request, response) => {
  const id = parseInt(request.params.id);
  pool.query('SELECT * FROM trucks WHERE id = $1', [id], (error, results) => {
    response.status(200).json(results.rows);
  });
};

const addTruck = async (request, response) => {
  const { name, rating } = request.body;
  pool.query('INSERT INTO trucks (name, rating) VALUES ($1, $2)', [name, rating], (error, results) => {
    response.status(201).send(`Horror added successfully.`);
  });
};

const updateTruck = (request, response) => {
  const id = parseInt(request.params.id);
  const { name, rating } = request.body;
  pool.query(
    'UPDATE trucks SET name = $1, rating = $2 WHERE id = $3', [name, rating, id], (error, results) => {
      response.status(200).send(`Horror with id ${id} modified.`);
    }
  );
};

const deleteTruck = (request, response) => {
  const id = parseInt(request.params.id);
  pool.query('DELETE FROM horrors WHERE id = $1', [id], (error, results) => {
    response.status(200).send(`Horror with id ${id} deleted.`);
  });
};

module.exports = {
  getAllTrucks,
  getTruckById,
  addTruck,
  updateTruck,
  deleteTruck
};