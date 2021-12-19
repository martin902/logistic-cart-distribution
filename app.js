
const express = require('express');
// const cors = require('cors');
const app = express();
const port = 5101;

app.use(express.json());

app.listen(port, () => {
  console.log(`Backend kalk: logistic-cart-distribution, listening on port ${port}.`);
});

const api = require('./api');
app.get('/trucks', api.getAllTrucks);
app.get('/trucks/:id', api.getTruckById);
app.post('/trucks/', api.addTruck);
app.put('/trucks/:id', api.updateTruck);
app.delete('/trucks/:id', api.deleteTruck);
