const express = require('express');
const cors = require('cors');
const { uuid, isUuid } = require('uuidv4');

const app = express();
/*
Métodos HTTP



*/ 

const port = 3333;

app.use(cors())
app.use(express.json())

const projects = [];

function logRequests(request, response, next) {
  const { method, url} = request;
  
  const logLabel = `[${method.toUpperCase()}] ${url}`;

  console.log(logLabel)

  return next();
}

function validateProjectId(request, response, next) {
  const { id } = request.params;

  if (!isUuid(id)) {
    return response.status(400).json({ error : "Invalid project ID."})
  }

  return next();
}

app.use(logRequests)
app.use('/:id', validateProjectId);

app.get('/', (request, response) => {

  // const query = request.query ;
  // ou posso fazer a desestruturacao dessa query

  // const { title, owner } = request.query;// Filtros e paginacao

  // console.log(title)
  // console.log(owner)

  const { title } = request.query;

  const result = title
  ? projects.filter(project => project.title.includes(title))
  : projects;

  return response.json(result);
});

app.post('/', (request, response) => {
  const {title, owner} = request.body;// Conteúdo na hora de criar ou
  //editar um recurso (JSON)

  const project = { id: uuid(), title, owner};

  projects.push(project);

  // console.log(title)
  // console.log(owner)


  return response.json(project);
});

app.put('/:id',(request, response) => {

  const { id } = request.params;
  const {title, owner} = request.body;

  const projectIndex = projects.findIndex(project => project.id === id);

  if (projectIndex < 0){
    return response.status(400).json({ error : 'Project not found.'})
  }

  const project = {
    id,
    title,
    owner, 
  }

  projects[projectIndex] = project;

  return response.json(project);

});

app.delete('/:id',(request, response) => {//Identificar recursos (Atualizar/Deletar)
  const {id} = request.params
  
  const projectIndex = projects.findIndex(project => project.id === id);

  if (projectIndex < 0){
    return response.status(400).json({ error : 'Project not found.'})
  }

  projects.splice(projectIndex, 1);

  return response.status(204).send();
});



app.listen(port, () => {
  console.log(`Back-end started on port: ${[port]} 🥕`)
});