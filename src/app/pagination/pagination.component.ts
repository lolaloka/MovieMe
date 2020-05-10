import { Component, OnInit, Input, Output, EventEmitter, OnChanges, OnDestroy } from '@angular/core';


/*
  totalCount / pageSize == pages array page no.1, page no.2, page.3, page.4 ...etc
  How to calculate the totalCount from backend
*/
@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit, OnChanges, OnDestroy {
  @Input()
  pages: number;

  @Output()
  onPageChange = new EventEmitter();

  activePage = 1;
  constructor() { }

  ngOnChanges() {
    const arr = [];
    for (let i = 0; i < this.pages; i++) {
      arr.push(i + 1);
    }
    this.pagesArray = arr;
  }
  pagesArray = [];
  ngOnInit(): void {

  }

  ngOnDestroy() {
    console.log('destoryeed')
  }

}
