
import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';

@Injectable()
export class CustomValidationPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    console.log("my custom validation pipe : ",value);
 //   if (typeof value == 'string' && value.length > 10) {
        return value;
   // }
  }
}
