import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject, debounceTime, distinctUntilChanged, takeUntil } from 'rxjs';
import { TableData } from '../../models/table-data.model';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import { ModelOpenEvent } from '../../models/modalOpenEvent.model';

@Component({
  selector: 'table-functions',
  templateUrl: './table-functions.component.html',
  styleUrl: './table-functions.component.css'
})
export class TableFunctionsComponent implements OnDestroy, OnInit {
  @Input() tableData!: TableData[];
  @Output() displayedData = new EventEmitter<TableData[]>();
  @Output() openModalClicked = new EventEmitter<ModelOpenEvent>();

  faFilter = faFilter;

  searchBoxForm!: FormGroup;
  modalForm!: FormGroup;


  private destroy$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
  ) { }

  ngOnInit() {
    this.initializeForms();
    this.setupSearchSubscription();
  }

  initializeForms() {
    this.searchBoxForm = this.fb.group({
      searchText: ['']
    });
    this.modalForm = this.fb.group({
      link: ['', Validators.required],
      name: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  setupSearchSubscription() {
    this.searchBoxForm.get('searchText')?.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      takeUntil(this.destroy$)
    ).subscribe((textValue: string) => {
      this.searchTableByText(textValue);
    });
  }

  searchTableByText(input: string) {
    const displayedData = this.tableData.filter(row =>
      Object.values(row).some(value =>
        value.toString().toLowerCase().includes(input.toLowerCase())
      )
    );
    this.displayedData.emit(displayedData)
  }

  openModal(contentTemplate: TemplateRef<any>) {
    const modalOpenEvent: ModelOpenEvent = {
      contentTemplate,
      modalForm: this.modalForm
    }
    this.openModalClicked.emit(modalOpenEvent);
  }
  
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
