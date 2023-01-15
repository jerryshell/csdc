import CarController, {ICarController} from './CarController'

export interface ICar {
    x: number,
    y: number,
    width: number,
    height: number,
    color: string,
    carController: ICarController,
}

const create = (
    x: number,
    y: number,
    width: number,
    height: number,
    color: string,
) => {
    return {
        x,
        y,
        width,
        height,
        color,
        carController: CarController.create(),
    } as ICar
}

const update = (car: ICar) => {
    CarController.update(car.carController)
    if (car.carController.forward) {
        car.y -= 5
    }
    if (car.carController.reverse) {
        car.y += 5
    }
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
