const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  // TODO
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  // TODO
  const { title, url, techs} = request.body;
  const repository = {
    id:uuid(),
    title,
    url,
    techs,
    likes:0,
  }

  repositories.push(repository);
  return response.json(repository)

});

app.put("/repositories/:id", (request, response) => {
  // TODO
  const {id} = request.params;
  const idx = repositories.findIndex(repository => repository.id === id);
  const repo2 = repositories.find(repository => repository.id === id);
  
  //console.log(repo2.likes);

  if(idx<0) return response.status(400).json({error:"rep not found"}) 
  //if(!likes) return response.status(400).json({error:"rep not found"})
  
  const { title, url, techs} = request.body;

  const repository = {
    id,
    title, 
    url, 
    techs,
    likes:repo2.likes
  }
  
  repositories[idx] = repository;

  response.json(repository)

});

app.delete("/repositories/:id", (request, response) => {
  // TODO
  const {id} = request.params;
  const idx = repositories.findIndex(repository => repository.id === id);

  if(idx<0) return response.status(400).json({error:"rep not found"})

  repositories.splice(idx,1);

  return response.status(204).send();

});

app.post("/repositories/:id/like", (request, response) => {
  // TODO
  const {id} = request.params;
  const repository = repositories.find(repository => repository.id === id);

  if(!repository) return response.status(400).send();

  repository.likes++;

  return response.json(repository);

});

module.exports = app;
