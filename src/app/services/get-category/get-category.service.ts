import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GetCategoryService {
  categories = [
    {name:'Indian'},
    {name:'Western'},
    {name:'Asian'},
    {name:'Mediterranian'},
  ]
  constructor() { }
  returnCategory(id: number){
    return this.categories[id].name;
  }
}
