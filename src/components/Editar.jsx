import { React, useState, useContext } from 'react';

import { Button, Modal, Form } from 'react-bootstrap';
import { contactContext } from './contactContext';



export const Editar = ({ id }) => {
    const [show, setShow] = useState(true);
    const { contactos, setContactos, setOpenEdit } = useContext(contactContext);

    const handleClose = () => {
        setShow(false);
        setOpenEdit(false);

    };

    const contacto = contactos[id];

    const [nombre, setNombre] = useState(contacto.nombre);
    const [apellido1, setApellido1] = useState(contacto.apellido1);
    const [apellido2, setApellido2] = useState(contacto.apellido2);
    const [email, setEmail] = useState(contacto.email);
    const [numero, setNumero] = useState(contacto.numero);

    const handleEdit = (e) => {

        e.preventDefault();
        let cont = {
            nombre: nombre,
            apellido1: apellido1,
            apellido2: apellido2,
            email: email,
            numero: numero
        };
        let temp_contactos = contactos;
        temp_contactos[id] = cont;

        setContactos(temp_contactos);
        localStorage.setItem('contacto', JSON.stringify(temp_contactos))
        handleClose();

    }

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Editar contacto</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleEdit}>
                        <Form.Group className="mb-3" controlId="formModal">
                            <Form.Label>Nombre</Form.Label>
                            <Form.Control data-testid="nombre-modal" type="text" placeholder="Ingresar nombre" required defaultValue={contacto.nombre} onChange={(e) => setNombre(e.target.value)}/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formApellido1">
                            <Form.Label>Primer Apellido</Form.Label>
                            <Form.Control data-testid="ape1-modal" type="text" placeholder="Ingresar primer apellido" required defaultValue={contacto.apellido1} onChange={(e) => setApellido1(e.target.value)}/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formApellido2">
                            <Form.Label>Segundo Apellido</Form.Label>
                            <Form.Control data-testid="ape2-modal" type="text" placeholder="Ingresar segundo apellido" required defaultValue={contacto.apellido2} onChange={(e) => setApellido2(e.target.value)}/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control data-testid="email-modal" type="email" placeholder="Ingresar email" required defaultValue={contacto.email} onChange={(e) => setEmail(e.target.value)}/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Numero</Form.Label>
                            <Form.Control data-testid="numero-modal" type="numero" placeholder="Ingresar numero" required defaultValue={contacto.numero} onChange={(e) => setNumero(e.target.value)}/>
                        </Form.Group>
                        <Button variant="primary" type='submit'>
                            Editar
                        </Button>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cerrar
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
/*
export const Editar = ({contact}) => {


    return (
        <>
            <Modal show={true}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="name@example.com"
                                autoFocus
                            />
                        </Form.Group>
                        <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlTextarea1"
                        >
                            <Form.Label>Example textarea</Form.Label>
                            <Form.Control as="textarea" rows={3} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary">
                        Close
                    </Button>
                    <Button variant="primary">
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

                    <Button variant="primary" type='submit' form='formModal' >
                        Modificar
                    </Button>
*/