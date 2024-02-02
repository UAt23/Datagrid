import { Component } from '@angular/core';
import { TableData } from '../../models/table-data.model';
import { TableService } from '../../services/table.service';

@Component({
  selector: 'datagrid',
  templateUrl: './datagrid.component.html',
  styleUrl: './datagrid.component.css'
})
export class DatagridComponent {
  tableData: TableData[] = [];

  constructor(service: TableService) {
    this.tableData = service.getTableData();
  }
}
