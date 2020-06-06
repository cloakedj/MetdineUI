import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { SearchService } from 'src/app/services/search-filter/search.service';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-mask',
  templateUrl: './search-mask.component.html',
  styleUrls: ['./search-mask.component.css']
})
export class SearchMaskComponent implements OnInit {
  windowWidth : number;
  queryResults: any[] = [];
  searchBar : FormControl = new FormControl();
  plText = 'Search From our List';
  loading = false;
  searchItem = false;
  @Output() hideSearchMask = new EventEmitter<boolean>();
  constructor(
    private _search : SearchService,
    private router : Router
  ) { }

  ngOnInit() {
    this.windowWidth = window.innerWidth;
    this.searchBar.valueChanges
    .debounceTime(200)
    .distinctUntilChanged()
    .switchMap((query) => {
      this.loading = true;
      if(query == '')
      {
      this.searchBar.reset();
      }
      if (this.searchItem)
      return this._search.searchDish(query)
      return this._search.search(query)
    })
    .subscribe((results : any) => {
      if(results.status === 400) return;
      else{
        this.loading = false;
        if(results.length == 0)
        this.plText = 'No Results Found'
        this.queryResults = results.splice(0,3);
      }
    });
  }
  sellerPage(id : number){
    this.router.navigateByUrl(`/user/(userRouterOutlet:seller-page/${id})`);
    this.hideSearchMask.emit(false);
  }
  getsearchByItemFilter(){
    this.searchItem = !this.searchItem;
  }
}
