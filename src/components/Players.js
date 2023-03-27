import React from 'react'
import { ListGroup } from 'react-bootstrap'
import useGame from '../hooks/useGame'

const Players = () => {
    const { players, currPlayer } = useGame()

    return (
        <>
            <ListGroup style={{ width : '100px'}}>
                {
                    players.map(player => {
                        return (currPlayer?.id === player.id) ?
                        <ListGroup.Item className='bg-success text-light' key={player.id}>{player.name}</ListGroup.Item>
                        :
                        <ListGroup.Item key={player.id}>{player.name}</ListGroup.Item>
                    })
                }
            </ListGroup>
        </>
    )
}

export default Players
