export interface ICar {
    x: number,
    y: number,
    width: number,
    height: number,
    color: string,
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
    } as ICar
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
    render,
}
