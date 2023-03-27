import React, { useCallback, useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import socket from '../socket'

const Home = () => {
    const [name, setName] = useState(null)
    const navigate = useNavigate()

    const onSubmit = useCallback((e) => {
        e.preventDefault()

        if (!name || name.length < 0) return
        
        socket.emit('join-game', { name, peerId: '1' })

        navigate('/play')
    }, [name, navigate])

    return (
        <>
            <div className='d-flex justify-content-center align-items-center bg-dark' style={{ height: '100vh', margin: '0px' }}>
                <Form onSubmit={onSubmit}>
                    <Form.Group className="mb-3 text-light" controlId="formBasicPassword">
                        <Form.Label>Enter your name</Form.Label>
                        <Form.Control type="text" placeholder="Name" onChange={(e) => setName(e.target.value)} />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </div>
        </>
    )
}

export default Home
