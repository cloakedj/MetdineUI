import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'contentLength'
})
export class ContentLengthPipe implements PipeTransform {

  transform(value: string, length?: number): any {
    return value.slice(0, length);
  }

}
