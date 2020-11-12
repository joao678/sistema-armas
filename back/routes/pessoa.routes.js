module.exports = app => {
    const pessoas = require("../controllers/pessoa.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Tutorial
    router.post("/", pessoas.create);
  
    // Retrieve all Tutorials
    router.get("/", pessoas.findAll);
  
    // Retrieve a single Tutorial with id
    router.get("/:id", pessoas.findOne);
  
    // Update a Tutorial with id
    router.put("/:id", pessoas.update);
  
    // Delete a Tutorial with id
    router.delete("/:id", pessoas.delete);
  
    // Delete all Tutorials
    router.delete("/", pessoas.deleteAll);
  
    app.use('/api/pessoas', router);
  };