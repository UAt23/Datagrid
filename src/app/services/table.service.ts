import { Injectable } from '@angular/core';
import { TableData } from '../models/table-data.model';
import { TABLEDATA } from '../constants/table-data';

@Injectable({
  providedIn: 'root'
})
export class TableService {

  private readonly dataKey = 'mediaData';

  constructor() { }

  getTableData(): TableData[] {
    const storedData = JSON.parse(localStorage.getItem(this.dataKey)!);
    if (storedData?.length) {
      return storedData
    }
    return TABLEDATA;
  }

  getMockData(): any[] {
    const storedData = localStorage.getItem(this.dataKey);
    return storedData ? JSON.parse(storedData) : [];
  }

  updateMockData(newData: any[]): void {
    localStorage.setItem(this.dataKey, JSON.stringify(newData));
  }
}
