export class HttpException extends Error {
  public status: number
  public errCode: string
  public message: string
  constructor(error: { status: number; errCode: string; message: string }) {
    super(error.message)
    this.status = error.status
    this.errCode = error.errCode
    this.message = error.message
  }
}
