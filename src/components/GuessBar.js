import React, { useCallback, useEffect, useState } from 'react'
import socket from '../socket'
import useGame from '../hooks/useGame'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';


const GuessBar = () => {
    const [guess, setGuess] = useState(null)
    const [hasGuessed, setHasGuessed] = useState(false)
    const { gameId, currPlayer } = useGame()

    const onSubmit = useCallback((e) => {
        e.preventDefault()

        if(!guess) return

        socket.emit('word-guess', { gameId, guess})
    }, [guess])

    const handleWrongGuess = useCallback(() => {
        alert('Wrong guess')
        setGuess(null)
    }, [setGuess, setHasGuessed])

    const handleCorrectGuess = useCallback(() => {
        alert('correct guess')
        setGuess(null)
        setHasGuessed(true)
    }, [setGuess, setHasGuessed])

    useEffect(() => {
        socket.on('wrong-guess', handleWrongGuess)
        socket.on('correct-guess', handleCorrectGuess)

        return () => {
            socket.off('wrong-guess', handleWrongGuess)
            socket.off('correct-guess', handleCorrectGuess)
        }
    }, [handleCorrectGuess, handleWrongGuess])

    useEffect(() => {
        setHasGuessed(false)
    }, [currPlayer?.id])

    return (
        <>
            <Form className = "my-5" onSubmit={onSubmit}>
                <Form.Group className="mb-3">
                    <Form.Control type="text" placeholder="Guess" onChange={(e) => setGuess(e.target.value)}/>
                </Form.Group>
                <Button variant="success" type="submit" disabled = {hasGuessed}>
                    Guess
                </Button>
            </Form>
        </>
    )
}

export default GuessBar
