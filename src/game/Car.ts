import CarController, {ICarController} from './CarController'
import constant from '../constant'
import Sensor, {ISensor} from './Sensor'

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

const update = (car: ICar) => {
    CarController.update(car.carController)
    Sensor.update(car.sensor, car)
    move(car)
}

const render = (
    ctx: CanvasRenderingContext2D,
    car: ICar,
) => {
    ctx.save()

    ctx.translate(car.x, car.y)
    ctx.rotate(-car.angle)

    ctx.fillStyle = car.color
    ctx.fillRect(
        -car.width / 2,
        -car.height / 2,
        car.width,
        car.height,
    )

    ctx.restore()

    Sensor.render(ctx, car.sensor)
}

export default {
    create,
    update,
    render,
}
