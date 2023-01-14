import {useEffect, useRef, useState} from 'react'

const MyCanvas = (
    {
        externalRender,
    }: {
        externalRender: (ctx: CanvasRenderingContext2D) => void,
    },
) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null)

    const [canvasCtx, setCanvasCtx] = useState<CanvasRenderingContext2D | null>(null)

    useEffect(() => {
        const ctx = canvasRef.current!.getContext('2d')
        setCanvasCtx(ctx)
    }, [])

    useEffect(() => {
        requestAnimationFrame(render)
    }, [canvasCtx])

    const render = () => {
        externalRender(canvasCtx!)
        requestAnimationFrame(render)
    }

    return (
        <canvas ref={canvasRef}/>
    )
}

export default MyCanvas
