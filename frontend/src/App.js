import React from 'react';
import {Header} from './components/Header'




export function App() {
  const projects = ["Diamante", "Netherite"];

  function handleAddProject() {
    projects.push(`Novo projeto ${Date.now()}`);

    console.log(projects)
  }
return(
  <>
    <Header title="Picaretas"/>

    <ul>
      {projects.map(project => <li key={project}>{project}</li>)}
    </ul>

    <button type="button" onClick={handleAddProject}>Adicionar Projeto</button>
    </>
  )
}
