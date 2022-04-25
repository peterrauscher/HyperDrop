// Express configuration
const express = require("express");
const app = express();

// Handlebars configuration
const exphbs = require("express-handlebars");
app.engine("handlebars", exphbs.engine({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Other modules
const http = require("http");

// Logging middleware
app.use((req, res, next) => {
  console.log(
    `[${new Date().toUTCString()}]: ${req.method} ${req.originalUrl} `
  );
  next();
});

// Routing middleware
const configRoutes = require("./routes");
configRoutes(app);

// Bootstrap server
http.get({ host: "api.ipify.org", port: 80, path: "/" }, function (resp) {
  resp.on("data", function (ip) {
    // TODO assign dynamic port number on server start
    //var server =
    // server.address().port = 0
    app.listen(3000, () =>
      console.log(`HyperSync is running at http://${ip}:${3000}`)
    );
  });
});
