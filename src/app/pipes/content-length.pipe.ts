import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'contentLength'
})
export class ContentLengthPipe implements PipeTransform {

  transform(value: string, length?: number, getNums ?: boolean): any {
    if(getNums)
    return value.replace(/[^0-9]+/,"");
    return value.slice(0, length) + '...';
  }

}
