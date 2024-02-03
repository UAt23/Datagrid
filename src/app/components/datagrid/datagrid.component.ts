import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { TableData } from '../../models/table-data.model';
import { TableService } from '../../services/table.service';
import { faCaretDown, faCaretUp, faFilter } from '@fortawesome/free-solid-svg-icons';
import { Subject, debounceTime, distinctUntilChanged, takeUntil } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DxDataGridComponent } from 'devextreme-angular';
import { ModalComponent } from '../../shared/components/modal/modal.component';
import { ModalService } from '../../shared/services/modal.service';
import { ModalConfig } from '../../shared/models/modal-config.model';
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


  constructor(
    private tableService: TableService,
    private fb: FormBuilder,
    private modalService: ModalService,
  ) {
    this.tableData = this.tableService.getTableData();
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
    if (this.currentPageSize > 4) {
      this.currentPageSize--;
    }
  }

  setCurrentPage(event: any) {
    event.data && (this.currentPageIndex = event.data - 1)
  }

  previousPage() {
    if (this.currentPageIndex > 0) {
      this.currentPageIndex--;
    }
  }

  nextPage() {
    if (this.currentPageIndex < (this.totalNumberOfPages - 1)) {
      this.currentPageIndex++;
    }
  }

  openModal(contentTemplate: TemplateRef<any>) {
    const modalConfig: ModalConfig = {
      contentTemplate,
      title: '',
      closeButton: 'Vazgeç',
      openButton: 'Kaydet',
      width: '488px',
      height: '406px',
    };
    this.modalService.openModal(modalConfig);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
