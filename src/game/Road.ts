import constant from '../constant'
import utils from '../utils'

export interface IRoad {
    width: number,
    height: number,
    laneCount: number,
}

const create = () => {
    return {
        width: constant.canvasWidth,
        height: 100000,
        laneCount: 3,
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

    // render lane
    for (let i = 0; i < road.laneCount; i++) {
        ctx.setLineDash([20, 20])
        const laneX = utils.lerp(
            0,
            road.width,
            i / road.laneCount,
        )
        ctx.beginPath()
        ctx.moveTo(laneX, -road.height / 2)
        ctx.lineTo(laneX, road.height / 2)
        ctx.stroke()
    }

    ctx.restore()
}

export default {
    create,
    render,
}
