
import React, { Fragment, useState, useEffect } from 'react';
import Formulario from './Components/Formulario';
import Cancion from './Components/Cancion';
import Info from './Components/Info';
import axios from 'axios';

function App() {
  // Definir el State
  const [busquedaLetra, guardarBusquedaLetra] = useState({});
  const [letra, guardarLetra] = useState('');
  const [info, guardarInfo] = useState({});
  // eslint-disable-next-line no-unused-expressions
  useEffect(() => {
    if (Object.keys(busquedaLetra).length === 0) return;

    const consultarApiLetra = async () => {
      const { artista, cancion } = busquedaLetra;
      const url = `https://api.lyrics.ovh/v1/${artista}/${cancion}`;
      const url2 = `https://www.theaudiodb.com/api/v1/json/2/search.php?s=${artista}`;

      const [letra, informacion] = await Promise.all([
        axios.get(url),
        axios.get(url2)
      ]);

      guardarLetra(letra.data.lyrics);
      guardarInfo(informacion.data.artists[0]);
      guardarBusquedaLetra({});
      // guardarLetra(resultado.data.lyrics);
    }

    consultarApiLetra();
  }, [busquedaLetra, info]);

  return (
    <Fragment>
      < Formulario guardarBusquedaLetra={guardarBusquedaLetra} />
      <div className="container mt-5 ">
        <div className="row">
          <div className="col-md-6">
            <Info info={info}></Info>
          </div>
          <div className="col-md-6">
            <Cancion letra={letra}></Cancion>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
