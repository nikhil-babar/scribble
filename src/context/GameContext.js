import { createContext, useCallback, useEffect, useState } from "react"
import socket from "../socket"

export const GameContext = createContext()

const GameProvider = ({ children }) => {
    const [gameId, setGameId] = useState(null)
    const [players, setPlayers] = useState([])
    const [currPlayer, setCurrPlayer] = useState(null)
    const [isCurrPlayer, setIsCurrPlayer] = useState(false)

    const handleNewUser = useCallback((players) => {
        setPlayers(players)

        console.log("New player join: ", players)
    }, [setPlayers])

    const handleUserLeft = useCallback((players) => {
        setPlayers(players)

        console.log("Player left: ", players)
    }, [setPlayers])

    const handleTurnOver = useCallback((player) => {
        setCurrPlayer(null)

        console.log(player.id + " is over")
    }, [setCurrPlayer])

    const handleTurnStart = useCallback((player) => {
        setCurrPlayer(player)

        if(socket.id === player.id){
            console.log("currPlayer =>")
            setIsCurrPlayer(true)
        } else {
            setIsCurrPlayer(false)
        }

        console.log(player.id + " is over")
    }, [setCurrPlayer])

    const handleGameJoin = useCallback((game) => {
        console.log(game)
        
        setGameId(game.id)
    }, [setGameId])

    const handleGameEnd = useCallback(() => {
        setGameId(null)

        console.log("Game ended")
    }, [setGameId])

    useEffect(() => {
        socket.on('game-join', handleGameJoin)
        socket.on('turn-start', handleTurnStart)
        socket.on('turn-over', handleTurnOver)
        socket.on('game-over', handleGameEnd)
        socket.on('new-user', handleNewUser)
        socket.on('user-left', handleUserLeft)

        return () => {
            socket.off('game-join', handleGameJoin)
            socket.off('turn-start', handleTurnStart)
            socket.off('turn-over', handleTurnOver)
            socket.off('game-over', handleGameEnd)
            socket.off('new-user', handleNewUser)
            socket.off('user-left', handleUserLeft)
        }
    }, [
        handleGameEnd,
        handleGameJoin,
        handleNewUser,
        handleTurnOver,
        handleTurnStart,
        handleUserLeft
    ])

    return (
        <GameContext.Provider value={{ currPlayer, players, gameId, isCurrPlayer }}>
            {children}
        </GameContext.Provider>
    )
}

export default GameProvider
