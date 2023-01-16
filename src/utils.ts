import ILine from './2d/ILine'

const getRandomByRange = (min: number, max: number) => {
    return min + (max - min) * Math.random()
}

const lerp = (a: number, b: number, t: number) => {
    return a + (b - a) * t
}

// 获得两条线段的交点
const getIntersection = (
    line1: ILine,
    line2: ILine,
): {
    x: number,
    y: number,
    t: number,
} | null => {
    const tTop = (line2.endPoint.x - line2.startPoint.x) * (line1.startPoint.y - line2.startPoint.y) - (line2.endPoint.y - line2.startPoint.y) * (line1.startPoint.x - line2.startPoint.x)

    const uTop = (line2.startPoint.y - line1.startPoint.y) * (line1.startPoint.x - line1.endPoint.x) - (line2.startPoint.x - line1.startPoint.x) * (line1.startPoint.y - line1.endPoint.y)

    const bottom = (line2.endPoint.y - line2.startPoint.y) * (line1.endPoint.x - line1.startPoint.x) - (line2.endPoint.x - line2.startPoint.x) * (line1.endPoint.y - line1.startPoint.y)

    if (bottom === 0) {
        return null
    }

    const t = tTop / bottom
    const u = uTop / bottom
    if (t >= 0 && t <= 1 && u >= 0 && u <= 1) {
        return {
            x: lerp(line1.startPoint.x, line1.endPoint.x, t),
            y: lerp(line1.startPoint.y, line1.endPoint.y, t),
            t,
        }
    }

    return null
}

export default {
    getRandomByRange,
    lerp,
    getIntersection,
}
