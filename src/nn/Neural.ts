import utils from '../utils'

export interface INeural {
    bias: number,
    weightList: number[],
}

const create = (weightCount: number) => {
    const weightList = [] as number[]
    for (let i = 0; i < weightCount; i++) {
        weightList.push(utils.getRandomByRange(-1, 1))
    }
    return {
        bias: utils.getRandomByRange(-1, 1),
        weightList,
    }
}

const feed = (neural: INeural, inputList: number[]) => {
    const sum = inputList
        .map((value, index) => {
            return value * neural.weightList[index]
        })
        .reduce((pv, cv) => pv + cv)
    return sum + neural.bias
}

export default {
    create,
    feed,
}
