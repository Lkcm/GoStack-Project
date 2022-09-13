import React, { useState, useEffect  } from 'react';
import api from './services/api'

import './App.css'
import {Header} from './components/Header'
// import { response } from 'express';




export function App() {
  const [projects, setProjects] = useState([]);

  useEffect(()=> {
    api.get('/').then(response => {
      console.log(response.data[0]);
      setProjects(response.data);
    });
  }, []);

  // useState retorna um array com 2 posicoes
  //
  //1.  Variável com o seu valor inicial
  //2. Funcao para atualizarmos esse valor

  function handleAddProject() {
    // projects.push(`Novo projeto ${Date.now()}`);

    setProjects([...projects, `Novo projeto ${(Date.now())}`])

    console.log(projects)
  }
return(
  <>
    <Header title="Picaretas"/>

    <ul>
      {projects.map(project => <li key={project.id}>{project.title}</li>)}
    </ul>

    <button type="button" onClick={handleAddProject}>Adicionar Projeto</button>
    </>
  )
}
