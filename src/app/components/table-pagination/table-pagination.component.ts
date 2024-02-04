import { Component, EventEmitter, Input, Output } from '@angular/core';
import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons';
import { PaginationDataModel } from '../../models/pagination-data.modal';

@Component({
  selector: 'table-pagination',
  templateUrl: './table-pagination.component.html',
  styleUrl: './table-pagination.component.css'
})
export class TablePaginationComponent {
  @Input() tableLength!: number;
  @Output() emitPaginationData = new EventEmitter<PaginationDataModel>;

  faUp = faCaretUp;
  faDown = faCaretDown;
  
  searchQuery: string = '';

  currentPageSize: number = 4;
  currentPageIndex: number = 0;
  get totalNumberOfPages() {
    return Math.ceil(this.tableLength / this.currentPageSize);
    this.emitCurrentPaginator();
  }

  increasePageSize() {
    this.currentPageSize++;
    if((this.totalNumberOfPages - 1) < this.currentPageIndex) {
      console.log('Increasing page size')
      this.currentPageIndex = this.totalNumberOfPages - 1
    };
    this.emitCurrentPaginator();
  }

  decreasePageSize() {
    if (this.currentPageSize > 4) {
      this.currentPageSize--;
    }
    this.emitCurrentPaginator();
  }

  setCurrentPage(event: any) {
    event.data && (this.currentPageIndex = event.data - 1);
    this.emitCurrentPaginator();
  }

  previousPage() {
    if (this.currentPageIndex > 0) {
      this.currentPageIndex--;
    }
    this.emitCurrentPaginator();
  }

  nextPage() {
    if (this.currentPageIndex < (this.totalNumberOfPages - 1)) {
      this.currentPageIndex++;
    }
    this.emitCurrentPaginator();
  }

  emitCurrentPaginator() {
    const paginatorData: PaginationDataModel = {
      currentPageIndex: this.currentPageIndex,
      currentPageSize: this.currentPageSize,
      totalNumberOfPages: this.totalNumberOfPages
    } 
    this.emitPaginationData.emit(paginatorData);
  }

}
