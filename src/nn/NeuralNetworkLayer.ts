import Neural, {INeural} from './Neural'

export interface INeuralNetworkLayer {
    neuralList: INeural[],
}

const create = (
    inputCountPreNeural: number,
    neuralCount: number,
) => {
    const neuralList = [] as INeural[]

    for (let i = 0; i < neuralCount; i++) {
        neuralList.push(
            Neural.create(inputCountPreNeural),
        )
    }

    return {
        neuralList,
    } as INeuralNetworkLayer
}

const ReLU = (n: number) => Math.max(n, 0)

const feed = (
    nnl: INeuralNetworkLayer,
    inputList: number[],
) => {
    const outputList = [] as number[]

    for (let neural of nnl.neuralList) {
        const output = Neural.feed(neural, inputList)
        outputList.push(ReLU(output))
    }

    return outputList
}

export default {
    create,
    feed,
}
