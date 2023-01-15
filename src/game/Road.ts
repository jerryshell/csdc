import constant from '../constant'

export interface IRoad {
    width: number,
    height: number,
}

const create = () => {
    return {
        width: constant.canvasWidth,
        height: 100000,
    }
}

const render = (ctx: CanvasRenderingContext2D, road: IRoad) => {
    ctx.save()

    ctx.strokeStyle = '#06F663'
    ctx.lineWidth = 5

    ctx.beginPath()
    ctx.moveTo(0, -road.height / 2)
    ctx.lineTo(0, road.height / 2)
    ctx.stroke()

    ctx.beginPath()
    ctx.moveTo(road.width, -road.height / 2)
    ctx.lineTo(road.width, road.height / 2)
    ctx.stroke()

    ctx.restore()
}

export default {
    create,
    render,
}
