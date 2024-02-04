import { Component, OnInit, ViewChild } from '@angular/core';
import { TableData } from '../../models/table-data.model';
import { TableService } from '../../services/table.service';
import { FormGroup } from '@angular/forms';
import { DxDataGridComponent } from 'devextreme-angular';
import { ModalService } from '../../shared/services/modal.service';
import { ModalConfig } from '../../shared/models/modal-config.model';
import { NotificationService } from '../../shared/services/notification.service';
import { ModelOpenEvent } from '../../models/modalOpenEvent.model';
import { PaginationDataModel } from '../../models/pagination-data.modal';

@Component({
  selector: 'datagrid',
  templateUrl: './datagrid.component.html',
  styleUrls: ['./datagrid.component.css']
})
export class DatagridComponent implements OnInit {
  @ViewChild('grid', { static: false }) grid!: DxDataGridComponent;
  tableData: TableData[] = [];
  displayedData: TableData[] = [];

  currentPageSize: number = 4;
  currentPageIndex: number = 0;
  totalNumberOfPages: number = 1;

  constructor(
    private tableService: TableService,
    private modalService: ModalService,
    private notificationService: NotificationService,
  ) {
    this.tableData = this.tableService.getTableData();
  }

  ngOnInit() {
    this.updateDisplayedData();
  }

  onSearch(displayedData: TableData[]) {
    this.displayedData = [...displayedData]
  }

  openModal(event: ModelOpenEvent) {
    const modalConfig: ModalConfig = {
      form: event.modalForm,
      contentTemplate: event.contentTemplate,
      title: '',
      closeButton: 'Vazgeç',
      openButton: 'Kaydet',
      width: '488px',
      height: '406px',
      closeOnBackdropClick: false
    };
    
    this.modalService.submit$.subscribe(() => {
      this.onSubmit(event.modalForm);
    });
    
    this.modalService.openModal(modalConfig);
  }

  onSubmit(form: FormGroup) {
    if (form.valid) {
      this.addRow(form);
    } else {
      this.notificationService.showNotification('Lütfen tüm alanları doldurup tekrar deneyin.', 'error')
    }
  }

  addRow(form: FormGroup) {
    const newRow: TableData = {
      'Sosyal Medya Linki': form.value['link'],
      'Sosyal Medya Adı': form.value['name'],
      'Açıklama': form.value['description']
    };
    this.tableData = [...this.tableData, newRow];
    this.tableService.updateMockData(this.tableData);
    this.currentPageIndex = this.totalNumberOfPages - 1;
    this.notificationService.showNotification('Yeni medya tabloya eklendi', 'success');
    this.modalService.closeModal(form);
    this.updateDisplayedData();
  }

  updateDisplayedData() {
    this.displayedData = [...this.tableData];
  }

  updatePaginationData(event: PaginationDataModel) {
    this.currentPageIndex = event.currentPageIndex;
    this.currentPageSize = event.currentPageSize;
    this.totalNumberOfPages = event.totalNumberOfPages;
  }

}
