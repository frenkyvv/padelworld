'use client'

import '../app/styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import TablaTodosJugadores from "../app/componentes/TablaTodosJugadores"; // Importar el componente correcto

export default function Home() {
  return (
    <div className="topcontainer">
      <div className="titulo">Padel Score Americanas</div>
      
       <div className="tablaTotal">
        <TablaTodosJugadores />
        </div> 
      </div>
  );
}
