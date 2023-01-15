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
}

const create = () => {
    return {
        forward: false,
        left: false,
        right: false,
        reverse: false,
    } as ICarController
}

const update = (
    cc: ICarController,
) => {
    cc.forward = keyWDown
    cc.left = keyADown
    cc.right = keyDDown
    cc.reverse = KeySDown
}

export default {
    create,
    update,
}
