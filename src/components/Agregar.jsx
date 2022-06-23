import React from 'react'
import { useState, useEffect, useContext } from 'react';
import Form from 'react-bootstrap/Form'
import { Button } from 'react-bootstrap';
import { contactContext } from './contactContext';

export const Agregar = () => {

    const { contactos, setContactos} = useContext(contactContext)

    //Hooks para agregar un contacto
    const [nombre, setNombre] = useState('');
    const [apellido1, setApellido1] = useState('');
    const [apellido2, setApellido2] = useState('');
    const [email, setEmail] = useState('');
    const [numero, setNumero] = useState('');

    const handleSubmit = (e) =>{
        e.preventDefault();
        let cont = {
            nombre: nombre,
            apellido1: apellido1,
            apellido2: apellido2,
            email: email,
            numero: numero
        };
        setContactos([...contactos, cont]);
        setNombre('');
        setApellido1('');
        setApellido2('');
        setEmail('');
        setNumero('');
    }

    useEffect(() => {
        localStorage.setItem('contacto', JSON.stringify(contactos))
    }, [contactos]);

    return (
        <div>
            <h2>Agregar contactos </h2>
            <Form onSubmit={handleSubmit} role="form" >
                <Form.Group className="mb-3" controlId="formName">
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control type="text" placeholder="Ingresar nombre" required onChange={(e) => setNombre(e.target.value)} value={nombre} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formApellido1">
                    <Form.Label>Primer Apellido</Form.Label>
                    <Form.Control type="text" placeholder="Ingresar primer apellido"  required onChange={(e) => setApellido1(e.target.value)} value={apellido1}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formApellido2">
                    <Form.Label>Segundo Apellido</Form.Label>
                    <Form.Control type="text" placeholder="Ingresar segundo apellido" required onChange={(e) => setApellido2(e.target.value)} value={apellido2} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" placeholder="Ingresar email" required onChange={(e) => setEmail(e.target.value)} value={email} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Numero</Form.Label>
                    <Form.Control type="numero" placeholder="Ingresar numero" required onChange={(e) => setNumero(e.target.value)} value={numero} />
                </Form.Group>
                <Button variant="primary" type='submit'>
                    Agregar
                </Button>
            </Form>
        </div>
    )
}
