import './App.css'
import MyCanvas from './MyCanvas'
import constant from './constant'

function App() {
    const render = (ctx: CanvasRenderingContext2D) => {
        if (ctx === null) {
            return
        }
        ctx.fillRect(0, 0, constant.canvasWidth, constant.canvasHeight)
    }
    return (
        <>
            <MyCanvas externalRender={render}/>
        </>
    )
}

export default App
