import { HttpException, HttpStatus } from "@nestjs/common";

interface IResponse<T> {
  message: string;
  data?: T,
  status: number
}

export default class AppResponse {

  /**
   * this method generates the JSEND payload pattern
   * for a response
   * @param message 
   * @param status 
   * @param data 
   * @returns 
   */
  private static constructPayload<T>(message: string, status: number, data: T): IResponse<T> {
    const response: IResponse<T> = {
      message: message,
      status: status,
      data: data
    };
    return response;
  }

  static success<T>(message: string, data: T): IResponse<T> {
    return AppResponse.constructPayload(message, HttpStatus.OK, data);
  }

  static internalServerError<T>(message: string, data?: T) {
    const response: IResponse<T> = AppResponse.constructPayload(message, HttpStatus.INTERNAL_SERVER_ERROR, data);
    throw new HttpException(response, HttpStatus.INTERNAL_SERVER_ERROR);
  }

  static notFound<T>(message: string, data?: T) {
    const response: IResponse<T> = AppResponse.constructPayload(message, HttpStatus.NOT_FOUND, data);
    throw new HttpException(response, HttpStatus.NOT_FOUND);
  }

  static badRequest<T>(message: string, data?: T) {
    const response: IResponse<T> = AppResponse.constructPayload(message, HttpStatus.BAD_REQUEST, data);
    throw new HttpException(response, HttpStatus.BAD_REQUEST);
  }
}