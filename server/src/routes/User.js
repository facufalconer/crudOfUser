const express = require("express");
const router = express.Router();
const app = express();
const { User } = require("../models/User");
router.get("/api/user", async (req, res) => {
  const user = await User.find();
  console.log(JSON.stringify(User)) 
  res.send(user);
});
// router.get("/reserve", async (req, res) => {
//   console.log(req.query);
//   // const task = await Task.find();
//   res.send({ result: "Ok" });
// });
router.post("/api/user", async (req, res, next) => {
  try {
    const {
      name,
      surname,
      salary,
     
    } = req.body;
    console.log(req.body)
    const user = new User({
      name,
      surname,
      salary,
     
    });
    let newUser = await user.save();
    res.status(200).send(newUser);

  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send({ mensaje: "Error desconcido, Contactarse con soporte" });
  }
});

router.put("/api/user/:id", async (req, res) => {
  try {
    console.log("put ___",req.params)
    const id = req.params.id;
    
    const {
      name,
      surname,
      salary,
   
    } = req.body;

    let user = await User.findById(id);

    if (!user) {
      res.status(404).send({ mensaje: "La usuario con id = ${id}" });
      return;
    }

    if (name) {
      user.name = name;
    }
    if (surname){
      user.surname = surname;
    }
    if (salary) {
      user.salary = salary;
    }
   
    user.save();

    res.status(201).send(user);
  } catch (err) {
    console.error(err);
    res.status(500).send({ mensaje: "Error desconocido" });
  }
});
router.delete("/api/user/:id", async (req, res) => {
  try {
    console.log("identificador--",req.params)
    const id = req.params.id;
    let user = await User.deleteOne({ _id: id });

    if (!user) {
      res.status(404).send({ mensaje: "La veterinaria  con id = ${id}" });
      return;
    }
    res.status(200).send(user);
  } catch (err) {
    console.error(err);
    res.status(500).send({ mensaje: "Error desconocido" });
  }
});

module.exports = router;
