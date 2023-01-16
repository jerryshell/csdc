import './App.css'
import MyCanvas from './MyCanvas'
import Road from './game/Road'
import Car, {ICar} from './game/Car'
import constant from './constant'
import {useState} from 'react'
import NeuralNetwork from './nn/NeuralNetwork'

function App() {
    const road = Road.create()

    const traffic = [
        Car.create(
            Road.getLaneCenterX(road, 1),
            -100,
            60,
            80,
            '#8DCBE6',
            2,
            'dummy',
        ),
    ]

    // const car = Car.create(
    //     Road.getLaneCenterX(road, 1),
    //     200,
    //     60,
    //     80,
    //     '#FCFCFC',
    //     3,
    //     'ai',
    // )
    const carList = Car.createAiCarList(road)

    const render = (ctx: CanvasRenderingContext2D) => {
        if (ctx === null) {
            return
        }

        for (let trafficCar of traffic) {
            Car.update(trafficCar, road.roadBorderList, [])
        }
        for (let car of carList) {
            Car.update(car, road.roadBorderList, traffic.map(item => item.polygonList))
        }

        const minY = Math.min(...carList.map(item => item.y))
        const bestCar = carList.find(item => item.y === minY) || carList[0]
        setBestCar(bestCar)
        ctx.translate(0, -bestCar.y + constant.canvasHeight / 2)

        Road.render(ctx, road)
        for (let trafficCar of traffic) {
            Car.render(ctx, trafficCar, false)
        }
        ctx.globalAlpha = 0.2
        for (let car of carList) {
            Car.render(ctx, car, false)
        }
        ctx.globalAlpha = 1
        Car.render(ctx, bestCar, true)
    }

    const [bestCar, setBestCar] = useState<ICar | null>(null)

    const saveAi = () => {
        if (!bestCar) {
            return
        }
        NeuralNetwork.save(bestCar.carController.ai!)
    }

    const removeAi = () => {
        NeuralNetwork.remove()
    }

    return (
        <>
            <MyCanvas externalRender={render}/>
            <div>
                <button onClick={saveAi}>保存模型</button>
                <button onClick={removeAi}>删除模型</button>
            </div>
        </>
    )
}

export default App
