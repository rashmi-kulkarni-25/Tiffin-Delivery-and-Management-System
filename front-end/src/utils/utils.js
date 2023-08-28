import { constants, constant } from './constants'

export function createUrl(path) {
    return constants.serverUrl + path
}

export function createaUrl(path) {
    return constant.serverUrl + path
}

export function log(message) {
    console.log(message)
}