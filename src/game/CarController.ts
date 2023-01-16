import NeuralNetwork, {INeuralNetwork} from '../nn/NeuralNetwork'

let keyWDown = false
let keyADown = false
let keyDDown = false
let KeySDown = false

document.onkeydown = e => {
    switch (e.key) {
        case 'w':
            keyWDown = true
            break
        case 'a':
            keyADown = true
            break
        case 'd':
            keyDDown = true
            break
        case 's':
            KeySDown = true
            break
    }
}

document.onkeyup = e => {
    switch (e.key) {
        case 'w':
            keyWDown = false
            break
        case 'a':
            keyADown = false
            break
        case 'd':
            keyDDown = false
            break
        case 's':
            KeySDown = false
            break
    }
}

export interface ICarController {
    forward: boolean,
    left: boolean,
    right: boolean,
    reverse: boolean,
    controlType: string,
    ai: INeuralNetwork | null,
}

const create = (
    controlType: string,
) => {
    return {
        forward: false,
        left: false,
        right: false,
        reverse: false,
        controlType,
        ai: controlType === 'ai' ? NeuralNetwork.create([5, 10, 4]) : null,
    } as ICarController
}

const update = (
    cc: ICarController,
    sensorReadingList: number[] | null,
) => {
    switch (cc.controlType) {
        case 'keyboard':
            cc.forward = keyWDown
            cc.left = keyADown
            cc.right = keyDDown
            cc.reverse = KeySDown
            break
        case 'dummy':
            cc.forward = true
            break
        case 'ai':
            if (!cc.ai || !sensorReadingList) {
                return
            }
            const outputList = NeuralNetwork.feed(cc.ai, sensorReadingList)
            cc.forward = outputList[0] > 0
            cc.left = outputList[1] > 0
            cc.right = outputList[2] > 0
            cc.reverse = outputList[3] > 0
            break
    }
}

export default {
    create,
    update,
}
