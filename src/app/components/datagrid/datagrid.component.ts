import { Component, OnInit, ViewChild } from '@angular/core';
import { TableData } from '../../models/table-data.model';
import { TableService } from '../../services/table.service';
import { faCaretDown, faCaretUp, faFilter } from '@fortawesome/free-solid-svg-icons';
import { Subject, debounceTime, distinctUntilChanged, takeUntil } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DxDataGridComponent } from 'devextreme-angular';
@Component({
  selector: 'datagrid',
  templateUrl: './datagrid.component.html',
  styleUrl: './datagrid.component.css'
})
export class DatagridComponent implements OnInit {
  @ViewChild('grid', { static: false }) grid!: DxDataGridComponent;
  tableData: TableData[] = [];
  displayedData: TableData[] = [];

  faFilter = faFilter;
  faUp = faCaretUp;
  faDown = faCaretDown;

  searchQuery: string = '';
  currentPageSize: number = 4;
  currentPageIndex: number = 0;
  get totalNumberOfPages() {
    return Math.ceil(this.tableData.length / this.currentPageSize);
  }

  private destroy$ = new Subject<void>();
  myForm!: FormGroup;
  

  constructor(service: TableService, private fb: FormBuilder) {
    this.tableData = service.getTableData();
    this.myForm = this.fb.group({
      searchText: ['']
    });
  }

  ngOnInit() {
    this.displayedData = [...this.tableData];
    this.myForm.get('searchText')?.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      takeUntil(this.destroy$)
    ).subscribe((textValue: string) => {
      const searchQuery = textValue
      this.searchTableByText(searchQuery)
    });
  }

  searchTableByText(input: string) {
    this.displayedData = this.tableData.filter(row =>
      Object.values(row).some(value =>
        value.toString().toLowerCase().includes(input.toLowerCase())
      )
    );
  }
  

  increasePageSize() {
    this.currentPageSize++;
  }

  decreasePageSize() {
    if(this.currentPageSize > 4) {
      this.currentPageSize--;
    }
  }

  setCurrentPage(event: any) {
    event.data && (this.currentPageIndex = event.data - 1)
  }

  previousPage() {
    if(this.currentPageIndex > 0) {
      this.currentPageIndex--;
    }
  }

  nextPage() {    
    if(this.currentPageIndex < (this.totalNumberOfPages - 1)) {
      this.currentPageIndex++;
    }
  }

  openModal() {

  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
