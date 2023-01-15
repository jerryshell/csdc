import CarController, {ICarController} from './CarController'
import constant from '../constant'

export interface ICar {
    x: number,
    y: number,
    width: number,
    height: number,
    color: string,
    carController: ICarController,
    speed: number,
    maxSpeed: number,
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
    } as ICar
}

const update = (car: ICar) => {
    CarController.update(car.carController)
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
    if (car.carController.left) {
        car.x -= 5
    }
    if (car.carController.right) {
        car.x += 5
    }
    car.y -= car.speed
}

const render = (
    ctx: CanvasRenderingContext2D,
    car: ICar,
) => {
    ctx.save()

    ctx.fillStyle = car.color
    ctx.fillRect(
        car.x - car.width / 2,
        car.y - car.height / 2,
        car.width,
        car.height,
    )

    ctx.restore()
}

export default {
    create,
    update,
    render,
}
