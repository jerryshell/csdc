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

const mutate = (neural: INeural, mutateRate: number) => {
    const biasMutateFlag = Math.random() >= (1 - mutateRate)
    if (biasMutateFlag) {
        neural.bias = utils.getRandomByRange(-1, 1)
    }
    for (let i = 0; i < neural.weightList.length; i++) {
        const weightMutateFlag = Math.random() >= (1 - mutateRate)
        if (weightMutateFlag) {
            neural.weightList[i] = utils.getRandomByRange(-1, 1)
        }
    }
}

export default {
    create,
    feed,
    mutate,
}
