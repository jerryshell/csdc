import ILine from '../2d/ILine'
import {ICar} from './Car'
import utils from '../utils'

export interface ISensor {
    rayCount: number,
    rayLength: number,
    rayAngleRange: number,
    rayList: ILine[],
}

const create = () => {
    return {
        rayCount: 5,
        rayLength: 200,
        rayAngleRange: Math.PI / 2,
        rayList: [],
    } as ISensor
}

const update = (
    sensor: ISensor,
    car: ICar,
) => {
    const rayList = [] as ILine[]
    for (let i = 0; i < sensor.rayCount; i++) {
        const startPoint = {
            x: car.x,
            y: car.y,
        }
        const rayAngle = utils.lerp(
            sensor.rayAngleRange / 2,
            -sensor.rayAngleRange / 2,
            i / (sensor.rayCount - 1),
        ) + car.angle
        const endPoint = {
            x: car.x - Math.sin(rayAngle) * sensor.rayLength,
            y: car.y - Math.cos(rayAngle) * sensor.rayLength,
        }
        rayList.push({
            startPoint,
            endPoint,
        })
    }
    sensor.rayList = rayList
}

const render = (
    ctx: CanvasRenderingContext2D,
    sensor: ISensor,
) => {
    ctx.save()

    for (let i = 0; i < sensor.rayList.length; i++) {
        const ray = sensor.rayList[i]
        ctx.strokeStyle = '#FCFCFC'
        ctx.lineWidth = 2
        ctx.beginPath()
        ctx.moveTo(ray.startPoint.x, ray.startPoint.y)
        ctx.lineTo(ray.endPoint.x, ray.endPoint.y)
        ctx.stroke()
    }

    ctx.restore()
}

export default {
    create,
    update,
    render,
}
