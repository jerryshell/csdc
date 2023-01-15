import './App.css'
import MyCanvas from './MyCanvas'
import Road from './game/Road'
import Car from './game/Car'
import constant from './constant'

function App() {
    const road = Road.create()
    const car = Car.create(
        Road.getLaneCenterX(road, 1),
        200,
        60,
        80,
        '#FCFCFC',
        3,
    )

    const render = (ctx: CanvasRenderingContext2D) => {
        if (ctx === null) {
            return
        }

        Car.update(car)

        ctx.translate(0, -car.y + constant.canvasHeight / 2)

        Road.render(ctx, road)
        Car.render(ctx, car)
    }
    return (
        <>
            <MyCanvas externalRender={render}/>
        </>
    )
}

export default App
