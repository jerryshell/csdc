import './App.css'
import MyCanvas from './MyCanvas'
import Road from './game/Road'

function App() {
    const road = Road.create()

    const render = (ctx: CanvasRenderingContext2D) => {
        if (ctx === null) {
            return
        }
        Road.render(ctx, road)
    }
    return (
        <>
            <MyCanvas externalRender={render}/>
        </>
    )
}

export default App
