import './App.css';
import './css/main.css'
import { Agregar } from './components/Agregar';
import { React, useState, useEffect, useContext } from 'react';
import { Tabla } from './components/Tabla';
import { ContactProvider } from './components/contactContext';



export const App = () => {

  return (
    <ContactProvider>
      <div class="limiter">
        <div className="wrapper">
          <h1>Información de contacto</h1>

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
