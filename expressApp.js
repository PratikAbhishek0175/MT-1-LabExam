const express = require("express");

const app = express();

app.use(express.json());

let vehicles = [
  {
    id: 1,
    vehicleName: "Hyundai Creta",
    vehicleNumber: "HR26AB1234",
    type: "SUV",
    price: 1500000
  },
  {
    id: 2,
    vehicleName: "Maruti Swift",
    vehicleNumber: "DL8CAF5030",
    type: "Hatchback",
    price: 750000
  },
  {
    id: 3,
    vehicleName: "Tata Nexon",
    vehicleNumber: "UP16AA2020",
    type: "SUV",
    price: 1200000
  }
];

app.get("/vehicles", (req, res) => {
  res.json(vehicles);
});

app.get("/vehicles/:id", (req, res) => {

  const vehicle = vehicles.find(
    v => v.id == req.params.id
  );

  if (!vehicle)
    return res.status(404).json({
      message: "Vehicle not found"
    });

  res.json(vehicle);
});

app.post("/vehicles", (req, res) => {

  const {
    id,
    vehicleName,
    vehicleNumber,
    type,
    price
  } = req.body;

  if (
    !id ||
    !vehicleName ||
    !vehicleNumber ||
    !type ||
    !price ||
    price <= 0
  ) {
    return res.status(400).json({
      message:"Invalid Data"
    });
  }

  const vehicle = {
    id,
    vehicleName,
    vehicleNumber,
    type,
    price
  };

  vehicles.push(vehicle);

  res.status(201).json({
    message:"Vehicle added successfully",
    vehicle
  });
});

app.put("/vehicles/:id", (req, res) => {

  const index = vehicles.findIndex(
    v => v.id == req.params.id
  );

  if (index === -1)
    return res.status(404).json({
      message:"Vehicle not found"
    });

  vehicles[index] = {
    ...vehicles[index],
    ...req.body
  };

  res.json({
    message:"Vehicle updated",
    vehicle: vehicles[index]
  });
});

app.delete("/vehicles/:id", (req, res) => {

  const index = vehicles.findIndex(
    v => v.id == req.params.id
  );

  if (index === -1)
    return res.status(404).json({
      message:"Vehicle not found"
    });

  const deletedVehicle = vehicles.splice(index,1);

  res.json({
    message:"Vehicle deleted",
    vehicle: deletedVehicle[0]
  });
});

app.listen(4000, () => {
  console.log(
    "Express Server running at http://localhost:4000"
  );
});