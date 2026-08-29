const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const cars = [
  {
    id: 1,
    name: "Camry",
    make: "Toyota",
    model: "2020",
    price: 24000,
  },
  {
    id: 2,
    name: "Civic",
    make: "Honda",
    model: "2019",
    price: 22000,
  },
  {
    id: 3,
    name: "Mustang",
    make: "Ford",
    model: "2021",
    price: 35000,
  },
  {
    id: 4,
    name: "Model 3",
    make: "Tesla",
    model: "2021",
    price: 39999,
  },
  {
    id: 5,
    name: "Accord",
    make: "Honda",
    model: "2020",
    price: 25000,
  },
  {
    id: 6,
    name: "Corolla",
    make: "Toyota",
    model: "2018",
    price: 18000,
  },
];

app.get("/cars", (req, res) => {
  const { search, make, model, price } = req.query;

  let filteredCars = cars;

  // Search
  if (search) {
    filteredCars = filteredCars.filter(
      (car) =>
        car.name.toLowerCase().includes(search.toLowerCase()) ||
        car.model.toLowerCase().includes(search.toLowerCase())
    );
  }

  // Make
  if (make) {
    filteredCars = filteredCars.filter(
      (car) => car.make === make
    );
  }

  // Model
  if (model) {
    filteredCars = filteredCars.filter(
      (car) => car.model === model
    );
  }

  // Max Price
  if (price) {
    filteredCars = filteredCars.filter(
      (car) => car.price <= Number(price)
    );
  }

  res.json(filteredCars);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});