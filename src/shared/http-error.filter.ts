import { Catch, ExceptionFilter, ArgumentsHost, HttpException, Logger } from '@nestjs/common';

@Catch()

export class HttpErrorFilte implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const request = ctx.getRequest();
        const reponse = ctx.getResponse();
        const status = exception.getStatus();

        const errorReponse = {
            code: status,
            timestamp: new Date().toLocaleTimeString(),
            path: request.url,
            method: request.method,
            message:  exception.message.error || exception.message || null,
        };

        Logger.error(
            `${request.method} ${request.url}`,
            JSON.stringify(errorReponse),
            'ExceptionFilter',
        );

        reponse.status(404).json(errorReponse);
    }
}
