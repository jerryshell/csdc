import {useEffect, useRef, useState} from 'react'

const MyCanvas = () => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null)

    const [canvasCtx, setCanvasCtx] = useState<CanvasRenderingContext2D | null>(null)

    useEffect(() => {
        const ctx = canvasRef.current!.getContext('2d')
        setCanvasCtx(ctx)
    }, [])

    useEffect(() => {
        canvasCtx?.fillRect(100, 100, 100, 100)
    }, [canvasCtx])

    return (
        <canvas ref={canvasRef}/>
    )
}

export default MyCanvas
