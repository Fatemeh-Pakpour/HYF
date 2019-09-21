const express = require("express");
const app = express();
const router = express.Router();

const port = process.env.PORT || 5000;
// For week4 no need to look into this!
/* const path = require("path"); */
/* // Serve the built client html
const buildPath = path.join(__dirname, "../../dist");
app.use(express.static(buildPath)); */

const mealsRouter = require("./api/meals");
const addMealIdRouter = require("./api/add-meal-id");
const getMealIdRouter = require("./api/get-meal-id");
const changeMealIdRouter = require("./api/change-meal-id");
const deleteMealIdRouter = require("./api/delete-meal-id");

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({ extended: true }));
// Parse JSON bodies (as sent by API clients)
app.use(express.json());

//router.use("/meals", mealsRouter);

app.use("/api", router);

// For week4 no need to look into this!
/* // Ensures that the client router works on reload aswell.
// Sends all requests back to index.html where the routing lib takes over
app.get("/*", function(req, res) {
  res.sendFile(path.join(__dirname, "./../../dist/index.html"), function(err) {
    if (err) {
      res.status(500).send(err);
    }
  });
}); */

app.get("/", (req, res)=> {
  res.send('ok')
});

app.route("/api/meals")
  .get(mealsRouter)
  .post(addMealIdRouter);
app.route("/api/meals/:id")
  .get(getMealIdRouter)
  .put(changeMealIdRouter)
  .delete(deleteMealIdRouter);

// app.get("/api/meals", mealsRouter);
// app.post("/api/meals", addMealIdRouter);
// app.get("/api/meals/:id", getMealIdRouter);
// app.put("/api/meals/:id", changeMealIdRouter);
// app.delete("/api/meals/:id", deleteMealIdRouter);

app.listen(port, () => console.log(`Server listening on port ${port}!`));
