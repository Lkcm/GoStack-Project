import React, { useState } from 'react';
import {Header} from './components/Header'




export function App() {
  const [projects, setProjects] = useState(["Diamante", "Netherite"]);

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
      {projects.map(project => <li key={project}>{project}</li>)}
    </ul>

    <button type="button" onClick={handleAddProject}>Adicionar Projeto</button>
    </>
  )
}
