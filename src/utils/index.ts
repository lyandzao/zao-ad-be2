import { HttpException, HttpStatus } from '@nestjs/common';

export const throwException = (
  error?: string,
  statusCode?: HttpStatus,
  message?: string,
) => {
  const _error = error ? error : '错误请求,请重试';
  const _message = message ? message : _error;
  const _statusCode = statusCode ? statusCode : HttpStatus.BAD_REQUEST;
  throw new HttpException({ error: _error, message: _message }, _statusCode);
};
