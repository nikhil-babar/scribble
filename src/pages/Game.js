import useGame from '../hooks/useGame'
import LocalCanvas from '../components/LocalCanvas'
import RemoteCanvas from '../components/RemoteCanvas'
import { useCallback, useEffect, useState } from 'react'
import socket from '../socket'
import { Button, Container, ListGroup } from 'react-bootstrap'
import Players from '../components/Players'
import GuessBar from '../components/GuessBar'

const Game = () => {
    const { gameId, isCurrPlayer } = useGame()
    const [words, setWords] = useState([])

    const handleSelectWord = useCallback((words) => {
        setWords(words)
    }, [setWords])

    const sendSelectedWord = useCallback((e) => {
        setWords([])

        console.log("sending word: " + e.target.value, gameId)

        socket.emit('word-select', { word: e.target.value, gameId })
    }, [setWords, gameId])

    useEffect(() => {
        socket.on('word-select', handleSelectWord)

        return () => {
            socket.off('word-select', handleSelectWord)
        }
    }, [handleSelectWord])

    if (!gameId) {
        return <h1>Game ended</h1>
    }

    return (
        <main className='text-light bg-dark p-5' style={{ height: '100vh' }}>
            <Container className='d-flex justify-content-between'>
                <Players />

                {
                    isCurrPlayer ? <LocalCanvas /> : <RemoteCanvas />
                }

            </Container>

            <ListGroup className='d-flex' style={{ width: '100%' }}>
                {
                    words.map(word => <ListGroup.Item><Button onClick={sendSelectedWord} value={word}>{word}</Button></ListGroup.Item>)
                }
            </ListGroup>

            {
                !isCurrPlayer ? <GuessBar /> : null
            }
        </main>
    )
}

export default Game
