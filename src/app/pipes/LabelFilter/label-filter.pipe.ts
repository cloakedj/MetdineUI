import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'labelFilter'
})
export class LabelFilterPipe implements PipeTransform {
  categories = [
    {name:'Indian',time:'30 minutes'},
    {name:'Western',time:'60 minutes'},
    {name:'Asian',time:'90 minutes'},
    {name:'Mediterranian',time:'120 minutes'},
  ];
  orderStatusFilter = [
    { key: 1, value: 'Cooking' },
    { key: 2, value: 'Ready' },
    { key: 3, value: 'On The Way' },
    { key: 4, value: 'Completed' }
  ];
  transform(value: any, type ?: string): any {
    if(type == "category")
    return this.getCategory(value);
    else if(type =="status")
    return this.getOrderStatus(value);
    return this.getTime(value);
  }
  getCategory(id: any){
    return id !== 'No meals yet' ? this.categories[id-1].name : 'No meals yet';
  }
  getTime(id : any){
    return this.categories[id-1].time;
  }
  getOrderStatus(id: number): any {
    let status;
    this.orderStatusFilter.forEach((kvp) => {
      if (id == kvp.key) status = kvp.value;
    });
    return status;
  }

}
