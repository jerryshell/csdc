import ILine from '../2d/ILine'
import {ICar} from './Car'
import utils from '../utils'

export interface ISensor {
    rayCount: number,
    rayLength: number,
    rayAngleRange: number,
    rayList: ILine[],
    readingList: number[],
}

const create = () => {
    return {
        rayCount: 5,
        rayLength: 200,
        rayAngleRange: Math.PI / 2,
        rayList: [],
        readingList: [],
    } as ISensor
}

const update = (
    sensor: ISensor,
    car: ICar,
    roadBorderList: ILine[],
) => {
    updateRayList(sensor, car)
    updateReadingList(sensor, roadBorderList)
}

const updateReadingList = (
    sensor: ISensor,
    roadBorderList: ILine[],
) => {
    const readingList = [] as number[]

    for (let ray of sensor.rayList) {
        const rayReadingList = [] as number[]

        // 与道路边界线的交点判断
        for (let roadBorder of roadBorderList) {
            const intersection = utils.getIntersection(
                {
                    startPoint: ray.startPoint,
                    endPoint: ray.endPoint,
                },
                {
                    startPoint: roadBorder.startPoint,
                    endPoint: roadBorder.endPoint,
                },
            )
            if (intersection) {
                rayReadingList.push(intersection.t)
            } else {
                rayReadingList.push(1)
            }
        }

        readingList.push(Math.min(...rayReadingList))
    }

    // console.table(readingList)
    sensor.readingList = readingList
}

const updateRayList = (
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
