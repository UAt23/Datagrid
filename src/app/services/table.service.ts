import { Injectable } from '@angular/core';
import { TableData } from '../models/table-data.model';
import { TABLEDATA } from '../constants/table-data';

@Injectable({
  providedIn: 'root'
})
export class TableService {

  constructor() { }

  getTableData(): TableData[] {
    return TABLEDATA;
}
}
