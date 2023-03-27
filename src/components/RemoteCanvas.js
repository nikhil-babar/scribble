import { useRef, useEffect, useCallback } from "react"
import socket from "../socket"

const RemoteCanvas = () => {
    const canvasRef = useRef(null)
    const contextRef = useRef(null)

    const handleCanvasStream = useCallback((stream) => {
        const image = new Image(window.innerWidth, window.innerHeight)

        image.onload = () => {
            contextRef.current.drawImage(image, 0, 0)
        }

        image.src = stream
    }, [])

    useEffect(() => {
        const ctx = canvasRef.current.getContext('2d')
        ctx.canvas.width = window.innerWidth
        ctx.canvas.height = window.innerHeight
        contextRef.current = ctx

        socket.on('canvas-stream', handleCanvasStream)

        return () => {
            socket.off('canvas-stream', handleCanvasStream)
        }
    }, [handleCanvasStream])

    return (
        <>
            <canvas
                ref={canvasRef}
                style={{ width: '50%', backgroundColor: 'lime' }}
                id="remote-canvas"
            ></canvas>
        </>
    )
}

export default RemoteCanvas
