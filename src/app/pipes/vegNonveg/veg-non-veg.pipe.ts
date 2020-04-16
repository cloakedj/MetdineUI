import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'vegNonVeg'
})
export class VegNonVegPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    return this.vegNonvegFilter(value);
  }
  vegNonvegFilter(type : boolean):string{
    if (type) return "Veg";
    return "Non Veg";
  }
}
