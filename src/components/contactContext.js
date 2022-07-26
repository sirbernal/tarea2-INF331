import {React, createContext, useState, useEffect} from 'react'
import { getDatafromLS } from './functions';


export const contactContext = createContext()

let { Provider } = contactContext 

export function ContactProvider({ children }) {

    const [contactos, setContactos] = useState(getDatafromLS());
    const [openEdit, setOpenEdit]  = useState(false);

    const borrado = (index) => {
        const new_contactos = contactos.filter(
            item => item !== contactos[index]
        );
        setContactos(new_contactos);
    }

    useEffect(() => {
        localStorage.setItem('contacto', JSON.stringify(contactos))
      }, [contactos]);

    return <Provider value={{contactos, setContactos, borrado, openEdit, setOpenEdit}}>
        {children}</Provider>;

}