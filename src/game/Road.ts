import constant from '../constant'
import utils from '../utils'
import ILine from '../2d/ILine'

export interface IRoad {
    width: number,
    height: number,
    laneCount: number,
    roadBorderList: ILine[],
}

const create = () => {
    const width = constant.canvasWidth
    const height = 100000
    return {
        width,
        height,
        laneCount: 3,
        roadBorderList: [
            {
                startPoint: {
                    x: 0,
                    y: -height / 2,
                },
                endPoint: {
                    x: 0,
                    y: height / 2,
                },
            },
            {
                startPoint: {
                    x: width,
                    y: -height / 2,
                },
                endPoint: {
                    x: width,
                    y: height / 2,
                },
            },
        ],
    } as IRoad
}

const getLaneCenterX = (road: IRoad, laneIndex: number) => {
    laneIndex = Math.min(laneIndex, road.laneCount - 1)
    const laneWidth = road.width / road.laneCount
    return laneIndex * laneWidth + laneWidth / 2
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
    getLaneCenterX,
}
