import CarController, {ICarController} from './CarController'
import constant from '../constant'
import Sensor, {ISensor} from './Sensor'
import ILine from '../2d/ILine'
import IPoint from '../2d/IPoint'

export interface ICar {
    x: number,
    y: number,
    width: number,
    height: number,
    color: string,
    carController: ICarController,
    speed: number,
    maxSpeed: number,
    angle: number,
    sensor: ISensor,
    polygonList: IPoint[],
}

const create = (
    x: number,
    y: number,
    width: number,
    height: number,
    color: string,
    maxSpeed: number,
) => {
    return {
        x,
        y,
        width,
        height,
        color,
        carController: CarController.create(),
        speed: 0,
        maxSpeed,
        angle: 0,
        sensor: Sensor.create(),
        polygonList: [],
    } as ICar
}

const move = (car: ICar) => {
    if (car.carController.forward) {
        car.speed += constant.carAcceleration
    }
    if (car.carController.reverse) {
        car.speed -= constant.carAcceleration
    }
    if (car.speed > car.maxSpeed) {
        car.speed = car.maxSpeed
    }
    if (car.speed < -car.maxSpeed) {
        car.speed = -car.maxSpeed
    }
    if (car.speed > 0) {
        car.speed -= constant.carFriction
    }
    if (car.speed < 0) {
        car.speed += constant.carFriction
    }
    if (Math.abs(car.speed) <= constant.carFriction) {
        car.speed = 0
    }
    if (car.speed !== 0) {
        const flip = car.speed > 0 ? 1 : -1
        if (car.carController.left) {
            car.angle += constant.carAngleSpeed * flip
        }
        if (car.carController.right) {
            car.angle -= constant.carAngleSpeed * flip
        }
    }
    car.x -= Math.sin(car.angle) * car.speed
    car.y -= Math.cos(car.angle) * car.speed
}

const update = (
    car: ICar,
    roadBorderList: ILine[],
) => {
    CarController.update(car.carController)
    Sensor.update(car.sensor, car, roadBorderList)
    updatePolygonList(car)
    move(car)
}

const updatePolygonList = (car: ICar) => {
    const polygonList = [] as IPoint[]

    const rad = Math.hypot(car.width, car.height) / 2
    const alpha = Math.atan2(car.height, car.width)
    polygonList.push({
        x: car.x - rad * Math.cos(alpha - car.angle),
        y: car.y - rad * Math.sin(alpha - car.angle),
    })
    polygonList.push({
        x: car.x + rad * Math.cos(alpha + car.angle),
        y: car.y - rad * Math.sin(alpha + car.angle),
    })
    polygonList.push({
        x: car.x + rad * Math.cos(alpha - car.angle),
        y: car.y + rad * Math.sin(alpha - car.angle),
    })
    polygonList.push({
        x: car.x - rad * Math.cos(alpha + car.angle),
        y: car.y + rad * Math.sin(alpha + car.angle),
    })

    car.polygonList = polygonList
}

const render = (
    ctx: CanvasRenderingContext2D,
    car: ICar,
) => {
    ctx.save()

    ctx.fillStyle = car.color
    ctx.beginPath()
    ctx.moveTo(car.polygonList[0].x, car.polygonList[0].y)
    for (let i = 1; i < car.polygonList.length; i++) {
        ctx.lineTo(car.polygonList[i].x, car.polygonList[i].y)
    }
    ctx.fill()

    ctx.restore()

    Sensor.render(ctx, car.sensor)
}

export default {
    create,
    update,
    render,
}
