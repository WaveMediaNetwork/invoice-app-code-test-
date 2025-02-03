import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';

@Injectable()
export class PaginationPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    const page = parseInt(value.page, 10);
    const limit = parseInt(value.limit, 10);

    if (isNaN(page) || page < 1) {
      throw new BadRequestException('Page must be a positive integer');
    }
    if (isNaN(limit) || limit < 1) {
      throw new BadRequestException('Limit must be a positive integer');
    }

    return { page, limit };
  }
}
