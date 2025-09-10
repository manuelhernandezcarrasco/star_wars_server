import { Catch, ExceptionFilter } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { BadRequestError } from '@shared/errors';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaClientExceptionFilter implements ExceptionFilter {
  catch(exception: Prisma.PrismaClientKnownRequestError) {
    const errorMessage = exception.meta ? exception.meta.cause : exception.message;

    throw new BadRequestError(String(errorMessage));
  }
}
