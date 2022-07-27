import './App.css';
import './css/main.css'
import { Agregar } from './components/Agregar';
import { React } from 'react';
import { Tabla } from './components/Tabla';
import { ContactProvider } from './components/contactContext';



export const App = () => {

  return (
    <ContactProvider>
      <div class="limiter">
        <div className="wrapper">
          <h1>Información de contacto</h1>
          <h1>Título de prueba para video😀</h1>
          <div className='main'>

            <div className='form-container'>
              <Agregar></Agregar>
            </div>

            <div className='view-container'>
              <Tabla></Tabla>
            </div>

          </div>
        </div>
      </div>
    </ContactProvider>


  );
}



export default App;
