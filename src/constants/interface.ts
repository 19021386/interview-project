/* eslint-disable prettier/prettier */

export interface IResponse<T> {
    status: string
    error?: {
        errCode: string
        message: string
    }
    data?: T
}

export interface Error {
    status?: number,
    errCode: string,
    message: string
}