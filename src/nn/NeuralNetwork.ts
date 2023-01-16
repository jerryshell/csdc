import NeuralNetworkLayer, {INeuralNetworkLayer} from './NeuralNetworkLayer'

export interface INeuralNetwork {
    layerList: INeuralNetworkLayer[],
}

// layerTopology [4, 10, 5]
const create = (layerTopology: number[]) => {
    const layerList = [] as INeuralNetworkLayer[]

    for (let i = 0; i < layerTopology.length - 1; i++) {
        const layer = NeuralNetworkLayer.create(
            layerTopology[i],
            layerTopology[i + 1],
        )
        layerList.push(layer)
    }

    return {
        layerList,
    } as INeuralNetwork
}

const feed = (nn: INeuralNetwork, inputList: number[]) => {
    let output = NeuralNetworkLayer.feed(nn.layerList[0], inputList)
    for (let i = 1; i < nn.layerList.length; i++) {
        output = NeuralNetworkLayer.feed(nn.layerList[i], inputList)
    }
    return output
}

export default {
    create,
    feed,
}
