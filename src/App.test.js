import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

//Objeto que se usara para el Mock del LocalStorage
export const localStorageMock = (function () {
  let store = {}

  return {
    getItem: function (key) {
      return store[key] || null
    },
    setItem: function (key, value) {
      store[key] = value.toString()
    },
    removeItem: function (key) {
      delete store[key]
    },
    clear: function () {
      store = {}
    }
  }
})()

//Hacemos que el objeto localStorageMock se vuelva nuestro LS
Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

const contacto = [{
  nombre: "Nombre",
  apellido1: "Apellido1",
  apellido2: "Apellido2",
  email: "Email@email.com",
  numero: "123456"
}]

test('renders app', () => {
  render(<App />);
  const linkElement = screen.getByText(/Información de contacto/i);
  const contactForm = screen.getByRole("form")
  const defaultMessage = screen.getByText(/No hay contactos agregados/i);
  expect(linkElement).toBeInTheDocument();
  expect(contactForm).toBeInTheDocument();
  expect(defaultMessage).toBeInTheDocument();
});


describe('pruebas mock localstorage', () => {

  it('guarda un elemento', () => {
    localStorage.setItem('contacto', JSON.stringify(contacto));
    let response = JSON.parse(localStorage.getItem('contacto'))
    expect(response).toEqual(contacto);
  });

  it('elimina un elemento', () => {
    localStorage.setItem('contacto', JSON.stringify(contacto));
    localStorage.removeItem('contacto')
    expect(localStorage.getItem('contacto')).toBeNull();
  });
});


describe('pruebas de visualizado (tabla)', () => {
  const contacto1 = [{
    nombre: "Nombre",
    apellido1: "Apellido1",
    apellido2: "Apellido2",
    email: "Email@email.com",
    numero: "123456"
  }]

  test('no se muestra la tabla si no hay contactos', () => {
    render(<App />);
    const defaultMessage = screen.getByText(/No hay contactos agregados/i);
    expect(defaultMessage).toBeInTheDocument();
  });

  test('se muestra la tabla si hay contactos', () => {
    //Agregado de contacto a LS
    localStorage.setItem('contacto', JSON.stringify(contacto1));
    render(<App />);

    //Se busca la tabla
    const tabla = screen.getByRole('table')
    //Se busca la fila con los elementos del contacto agregado
    const nombre = screen.getByRole('cell', { name: contacto1[0].nombre})
    const apellido1 = screen.getByRole('cell', { name: contacto1[0].apellido1})
    const apellido2 = screen.getByRole('cell', { name: contacto1[0].apellido2})
    const email = screen.getByRole('cell', { name: contacto1[0].email})
    const numero = screen.getByRole('cell', { name: contacto1[0].numero})

    //Se verifica que los elementos buscados anteriormente esten presentes
    expect(nombre).toBeInTheDocument();
    expect(apellido1).toBeInTheDocument();
    expect(apellido2).toBeInTheDocument();
    expect(email).toBeInTheDocument();
    expect(numero).toBeInTheDocument();
    expect(tabla).toBeInTheDocument();
  });


});


describe('pruebas de CRUD', () => {
  beforeAll(() => {
    //Aseguramos de no tener elementos guardados para los test
    localStorage.removeItem('contacto')
  });

  test('se agrega contacto, se almacena en LS y se ve en la tabla', () => {
    render(<App />)

    //Buscamos los elementos del FORM
    const btnAgregar = screen.getByRole('button', { name: 'Agregar' });
    const inpNombre = screen.getByRole('textbox', { name: 'Nombre' });
    const inpApe1 = screen.getByRole('textbox', { name: 'Primer Apellido' });
    const inpApe2 = screen.getByRole('textbox', { name: 'Segundo Apellido' });
    const inpEmail = screen.getByRole('textbox', { name: 'Email' });
    const inpNumero = screen.getByRole('textbox', { name: 'Numero' });

    //Verificamos si los encontramos
    expect(btnAgregar).toBeInTheDocument();
    expect(inpNombre).toBeInTheDocument();
    expect(inpApe1).toBeInTheDocument();
    expect(inpApe2).toBeInTheDocument();
    expect(inpEmail).toBeInTheDocument();
    expect(inpNumero).toBeInTheDocument();

    //Agregamos valores a los inputs
    fireEvent.change(inpNombre, { target: { value: contacto[0].nombre } })
    fireEvent.change(inpApe1, { target: { value: contacto[0].apellido1 } })
    fireEvent.change(inpApe2, { target: { value: contacto[0].apellido2 } })
    fireEvent.change(inpEmail, { target: { value: contacto[0].email } })
    fireEvent.change(inpNumero, { target: { value: contacto[0].numero } })

    //Generamos el click para el submit
    fireEvent.click(btnAgregar)

    //Consultamos en LS y verificamos que el contacto se agregó
    let response = JSON.parse(window.localStorage.getItem('contacto'))
    expect(response).toEqual(contacto);

    //Verificamos si se muestra la tabla
    const tabla = screen.getByRole('table')
    expect(tabla).toBeInTheDocument()

    //Verificamos si existe la fila 
    const row = screen.getByRole('cell', { name: contacto[0].nombre }).closest('tr')
    expect(row).toBeInTheDocument()
    //screen.debug()

  });


  test('editar un contacto ya agregado', () => {
    //Valores que agregaremos al modificar el contacto presente en LS
    const newContacto = {
      nombre: "Cristian",
      apellido1: "bernal",
      apellido2: "bernal",
      email: "cristian@bernal.com",
      numero: "23451789"
    }

    render(<App />)

    //Buscamos el boton de editar del contacto
    const btnEdit = screen.getByRole('button', { name: 'Editar' });

    //Verificamos que lo encontramos
    expect(btnEdit).toBeInTheDocument();

    //Hacemos el click del boton
    fireEvent.click(btnEdit);

    //Buscamos cada uno de los inputs mostrados en el modal del modificado
    const btnMod = screen.queryAllByRole('button', { name: 'Editar' })[1];
    const inpNombre = screen.getByTestId('nombre-modal');
    const inpApe1 = screen.getByTestId('ape1-modal');
    const inpApe2 = screen.getByTestId('ape2-modal');
    const inpEmail = screen.getByTestId('email-modal');
    const inpNumero = screen.getByTestId('numero-modal');

    //Verificamos su presencia
    expect(btnMod).toBeInTheDocument();
    expect(inpNombre).toBeInTheDocument();
    expect(inpApe1).toBeInTheDocument();
    expect(inpApe2).toBeInTheDocument();
    expect(inpEmail).toBeInTheDocument();
    expect(inpNumero).toBeInTheDocument();

    //Agregamos los valores del nuevo contacto a cada input
    fireEvent.change(inpNombre, { target: { value: newContacto.nombre } })
    fireEvent.change(inpApe1, { target: { value: newContacto.apellido1 } })
    fireEvent.change(inpApe2, { target: { value: newContacto.apellido2 } })
    fireEvent.change(inpEmail, { target: { value: newContacto.email } })
    fireEvent.change(inpNumero, { target: { value: newContacto.numero } })

    //verificamos que si se realizo el cambio en los inputs
    expect(inpNombre).toHaveValue(newContacto.nombre);
    expect(inpApe1).toHaveValue(newContacto.apellido1);
    expect(inpApe2).toHaveValue(newContacto.apellido2);
    expect(inpEmail).toHaveValue(newContacto.email);
    expect(inpNumero).toHaveValue(newContacto.numero);

    //se hace el click para modificar
    fireEvent.click(btnMod);

    //Obtenemos lo presente en LS
    let response = JSON.parse(window.localStorage.getItem('contacto'))
    //Verificamos que tenemos el contacto modificado
    expect(response).toEqual([newContacto])
  });

  test('se elimina contacto agregado y se verifica el LS vacio y que la tabla no se muestra', () => {
    render(<App />)

    //Buscamos el boton de borrado del contacto
    const btnBorrar = screen.getByRole('button', { name: 'Borrar' });

    //Verificamos que lo encontramos
    expect(btnBorrar).toBeInTheDocument();

    //Hacemos el click del boton
    fireEvent.click(btnBorrar);

    //Obtenemos lo presente en LS
    let response = JSON.parse(window.localStorage.getItem('contacto'))
    //Verificamos que no existan contactos, ya que borramos el unico presente
    expect(response).toHaveLength(0);

    //Verificamos que la tabla no esta presente
    const table = screen.queryByRole('table')
    expect(table).not.toBeInTheDocument();
  });

});