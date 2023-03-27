import { useRef, useState, useEffect } from "react"
import useGame from "../hooks/useGame"
import socket from "../socket"

const LocalCanvas = () => {
    const canvasRef = useRef(null)
    const contextRef = useRef(null)
    const [isDrawing, setIsDrawing] = useState(false)
    const { gameId } = useGame()

    useEffect(() => {
        const ctx = canvasRef.current.getContext('2d')
        ctx.canvas.width = window.innerWidth
        ctx.canvas.height = window.innerHeight

        ctx.lineCap = "round"
        ctx.strokeStyle = "red"
        ctx.lineWidth = 5
        contextRef.current = ctx

        const unsubscribe = setInterval(() => {
            socket.emit('canvas-stream', { stream: canvasRef.current.toDataURL(), gameId})
        }, 10)

        return () => clearInterval(unsubscribe)
    }, [gameId])

    const mouseEvent = ({ clientX, clientY }) => {
        const { left, top, width, height } = canvasRef.current.getBoundingClientRect()
        const mouse = { x: 0, y: 0 }

        mouse.x = clientX - left;
        mouse.y = clientY - top;

        mouse.x /= width;
        mouse.y /= height;

        mouse.x *= canvasRef.current.width;
        mouse.y *= canvasRef.current.height;

        return mouse
    }

    const startDrawing = (event) => {
        contextRef.current.beginPath()
        const mouse = mouseEvent(event)

        contextRef.current.moveTo(mouse.x, mouse.y)
        setIsDrawing(true)
    }

    const endDrawing = () => {
        contextRef.current.closePath()
        setIsDrawing(false)
    }

    const continueDrawing = (event) => {
        if (!isDrawing) {
            return
        }

        const mouse = mouseEvent(event)
        contextRef.current.lineTo(mouse.x, mouse.y)
        contextRef.current.stroke()
    }


    return (
        <>
            <canvas
                ref={canvasRef}
                style={{ width: '50%', backgroundColor: 'lime' }}
                onMouseDown={startDrawing}
                onMouseUp={endDrawing}
                onMouseMove={continueDrawing}
                id="canvas"
            ></canvas>
        </>
    )
}

export default LocalCanvas
