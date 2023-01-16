import './App.css'
import MyCanvas from './MyCanvas'
import Road from './game/Road'
import Car from './game/Car'
import constant from './constant'

function App() {
    const road = Road.create()

    const traffic = [
        Car.create(
            Road.getLaneCenterX(road, 1),
            -100,
            60,
            80,
            '#FCFCFC',
            2,
            'dummy',
        ),
    ]

    const car = Car.create(
        Road.getLaneCenterX(road, 1),
        200,
        60,
        80,
        '#FCFCFC',
        3,
        'keyboard',
    )

    const render = (ctx: CanvasRenderingContext2D) => {
        if (ctx === null) {
            return
        }

        for (let trafficCar of traffic) {
            Car.update(trafficCar, road.roadBorderList, [])
        }
        Car.update(car, road.roadBorderList, traffic.map(item => item.polygonList))

        ctx.translate(0, -car.y + constant.canvasHeight / 2)

        Road.render(ctx, road)
        for (let trafficCar of traffic) {
            Car.render(ctx, trafficCar)
        }
        Car.render(ctx, car)
    }
    return (
        <>
            <MyCanvas externalRender={render}/>
        </>
    )
}

export default App
