const http = require("http");
const fs = require("fs");
const path = require("path");

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
  }
];

const server = http.createServer((req, res) => {

  if (req.method === "GET" && req.url === "/") {
    res.writeHead(200, {"Content-Type":"text/html"});
    res.end("<h1>Welcome to Vehicle Management System</h1>");
  }

  else if (req.method === "GET" && req.url === "/vehicles") {
    res.writeHead(200, {"Content-Type":"application/json"});
    res.end(JSON.stringify(vehicles));
  }

  else if (req.method === "GET" && req.url === "/about") {
    res.writeHead(200, {"Content-Type":"text/html"});
    res.end("<h2>Vehicle Management Application</h2>");
  }

  else if (req.method === "GET" && req.url === "/info") {

    fs.readFile(
      path.join(__dirname, "public", "info.html"),
      (err, data) => {

        if (err) {
          res.writeHead(500, {"Content-Type":"text/plain"});
          return res.end("Error reading file");
        }

        res.writeHead(200, {"Content-Type":"text/html"});
        res.end(data);
      }
    );
  }

  else if (req.method === "POST" && req.url === "/add-vehicle") {

    let body = "";

    req.on("data", chunk => {
      body += chunk;
    });

    req.on("end", () => {

      try {

        const vehicle = JSON.parse(body);

        if (
          !vehicle.id ||
          !vehicle.vehicleName ||
          !vehicle.vehicleNumber ||
          !vehicle.type ||
          !vehicle.price
        ) {
          res.writeHead(400, {"Content-Type":"application/json"});
          return res.end(JSON.stringify({
            message:"Missing required fields"
          }));
        }

        vehicles.push(vehicle);

        res.writeHead(201, {"Content-Type":"application/json"});
        res.end(JSON.stringify({
          message:"Vehicle Added Successfully",
          vehicle
        }));

      } catch(error) {

        res.writeHead(400, {"Content-Type":"application/json"});
        res.end(JSON.stringify({
          message:"Invalid JSON"
        }));
      }

    });

  }

  else {
    res.writeHead(404, {"Content-Type":"text/plain"});
    res.end("Route Not Found");
  }
});

server.listen(3000, () => {
  console.log("HTTP Server running at http://localhost:3000");
});