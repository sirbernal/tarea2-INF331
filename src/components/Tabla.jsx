import { React, useContext, useState, useEffect } from 'react'
import { Button } from 'react-bootstrap';
import { contactContext } from './contactContext';
import { Editar } from './Editar';

export const Tabla = () => {

    const { contactos, borrado, openEdit, setOpenEdit } = useContext(contactContext);



    const [idEdit, setIdEdit] = useState("");

    const activateEditar = (id) => {
        setOpenEdit(true);
        setIdEdit(id);
    }

    return (
        <>
            {contactos.length > 0 && <>
                <div className='table-responsive'>
                    <h2>Contactos</h2>
                    <table className='table' id='tablacontactos'>
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Primer apellido</th>
                                <th>Segundo apellido</th>
                                <th>Email</th>
                                <th>Número</th>
                            </tr>
                        </thead>
                        <tbody>
                            {contactos.map((con, i) => {
                                return (
                                    <tr key={i}>
                                        <td>{con.nombre}</td>
                                        <td>{con.apellido1}</td>
                                        <td>{con.apellido2}</td>
                                        <td>{con.email}</td>
                                        <td>{con.numero}</td>
                                        <td>
                                            <Button variant="success" size="sm" onClick={() => activateEditar(i)} >
                                                Editar
                                            </Button>
                                        </td>
                                        <td>
                                            <Button variant="danger" size="sm" onClick={() => borrado(i)} >
                                                Borrar
                                            </Button>
                                        </td>
                                        {(openEdit && idEdit === i) && <Editar id={idEdit}></Editar>}
                                    </tr>

                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </>}
            {contactos.length < 1 && <div>No hay contactos agregados</div>}
        </>
    )
}
