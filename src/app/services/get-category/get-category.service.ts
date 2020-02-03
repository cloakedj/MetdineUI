import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GetCategoryService {
  categories = [
    {name:'Indian',time:'30 minutes'},
    {name:'Western',time:'60 minutes'},
    {name:'Asian',time:'90 minutes'},
    {name:'Mediterranian',time:'120 minutes'},
  ]
  constructor() { }
  returnCategory(id: number){
    return this.categories[id].name;
  }
  returnTime(id){
    return this.categories[id].time;
  }
}
