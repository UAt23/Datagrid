import { Component, OnInit, TemplateRef, ViewChild, OnDestroy } from '@angular/core';
import { TableData } from '../../models/table-data.model';
import { TableService } from '../../services/table.service';
import { faCaretDown, faCaretUp, faFilter } from '@fortawesome/free-solid-svg-icons';
import { Subject, debounceTime, distinctUntilChanged, takeUntil } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DxDataGridComponent } from 'devextreme-angular';
import { ModalService } from '../../shared/services/modal.service';
import { ModalConfig } from '../../shared/models/modal-config.model';
import { NotificationService } from '../../shared/services/notification.service';

@Component({
  selector: 'datagrid',
  templateUrl: './datagrid.component.html',
  styleUrls: ['./datagrid.component.css']
})
export class DatagridComponent implements OnInit, OnDestroy {
  @ViewChild('grid', { static: false }) grid!: DxDataGridComponent;
  tableData: TableData[] = [];
  displayedData: TableData[] = [];

  faFilter = faFilter;
  faUp = faCaretUp;
  faDown = faCaretDown;
  
  searchQuery: string = '';
  currentPageSize: number = 4;
  currentPageIndex: number = 0;

  private destroy$ = new Subject<void>();
  myForm!: FormGroup;
  modalForm!: FormGroup;

  constructor(
    private tableService: TableService,
    private fb: FormBuilder,
    private modalService: ModalService,
    private notificationService: NotificationService,
  ) {
    this.tableData = this.tableService.getTableData();
  }

  ngOnInit() {
    this.initializeForms();
    this.updateDisplayedData();
    this.setupSearchSubscription();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  initializeForms() {
    this.myForm = this.fb.group({
      searchText: ['']
    });

    this.modalForm = this.fb.group({
      link: ['', Validators.required],
      name: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  setupSearchSubscription() {
    this.myForm.get('searchText')?.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      takeUntil(this.destroy$)
    ).subscribe((textValue: string) => {
      this.searchTableByText(textValue);
    });
  }

  searchTableByText(input: string) {
    this.displayedData = this.tableData.filter(row =>
      Object.values(row).some(value =>
        value.toString().toLowerCase().includes(input.toLowerCase())
      )
    );
  }

  openModal(contentTemplate: TemplateRef<any>) {
    const modalConfig: ModalConfig = {
      form: this.modalForm,
      contentTemplate,
      title: '',
      closeButton: 'Vazgeç',
      openButton: 'Kaydet',
      width: '488px',
      height: '406px',
      closeOnBackdropClick: false
    };
    
    this.modalService.submit$.subscribe(() => {
      this.onSubmit();
    });
    
    this.modalService.openModal(modalConfig);
  }

  onSubmit() {
    if (this.modalForm.valid) {
      this.addRow();
    } else {
      this.notificationService.showNotification('Lütfen tüm alanları doldurup tekrar deneyin.', 'error')
    }
  }

  addRow() {
    const newRow: TableData = {
      'Sosyal Medya Linki': this.modalForm.value['link'],
      'Sosyal Medya Adı': this.modalForm.value['name'],
      'Açıklama': this.modalForm.value['description']
    };
    this.tableData = [...this.tableData, newRow];
    this.currentPageIndex = this.totalNumberOfPages - 1;
    this.notificationService.showNotification('Yeni medya tabloya eklendi', 'success');
    this.modalService.closeModal(this.modalForm);
    this.updateDisplayedData();
  }

  updateDisplayedData() {
    this.displayedData = [...this.tableData];
  }

  // * PAGINATION ----------------------------------------------------------------
  get totalNumberOfPages() {
    return Math.ceil(this.tableData.length / this.currentPageSize);
  }

  increasePageSize() {
    this.currentPageSize++;
    if((this.totalNumberOfPages - 1) < this.currentPageIndex) {
      console.log('Increasing page size')
      this.currentPageIndex = this.totalNumberOfPages - 1
    };
  }

  decreasePageSize() {
    if (this.currentPageSize > 4) {
      this.currentPageSize--;
    }
  }

  setCurrentPage(event: any) {
    event.data && (this.currentPageIndex = event.data - 1);
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
}
