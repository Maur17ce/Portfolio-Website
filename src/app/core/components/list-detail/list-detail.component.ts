import { Component, ContentChild, EventEmitter, Input, Output, TemplateRef } from '@angular/core';
import { Observable } from 'rxjs';
import {
  MatList,
  MatListItem,
  MatListItemIcon,
  MatListItemLine,
  MatListItemMeta,
  MatListItemTitle,
  MatListOption,
  MatSelectionList,
} from '@angular/material/list';
import { MatIcon } from '@angular/material/icon';
import { MatDivider } from '@angular/material/divider';
import { MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardTitle } from '@angular/material/card';
import { MatButton } from '@angular/material/button';
import { MatFormField, MatLabel, MatSuffix } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { AsyncPipe, DatePipe, NgClass, NgTemplateOutlet } from '@angular/common';
import { AbstractControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDatepicker, MatDatepickerInput, MatDatepickerToggle } from '@angular/material/datepicker';

@Component({
  selector: 'mdf-list-detail',
  standalone: true,
  imports: [
    MatList,
    MatListItem,
    MatListItemTitle,
    MatListItemLine,
    MatListItemMeta,
    MatListItemIcon,
    MatIcon,
    MatDivider,
    MatCard,
    MatCardTitle,
    MatCardHeader,
    MatCardContent,
    MatCardActions,
    MatSelectionList,
    MatListOption,
    MatButton,
    MatFormField,
    MatLabel,
    MatInput,
    CdkTextareaAutosize,
    AsyncPipe,
    DatePipe,
    FormsModule,
    ReactiveFormsModule,
    NgClass,
    MatDatepicker,
    MatDatepickerToggle,
    MatDatepickerInput,
    MatSuffix,
    NgTemplateOutlet,
  ],
  templateUrl: './list-detail.component.html',
  styleUrl: './list-detail.component.scss',
})
export class ListDetailComponent<T, F extends { [K in keyof F]: AbstractControl<unknown, unknown> }> {
  @Input() public data$: Observable<T[]> = new Observable<T[]>();
  @Input() public mockValue: T = {} as T;
  @Input() public idColumnName: keyof T = '' as keyof T;
  @Input() public formGroup: FormGroup<F> = new FormGroup<F>({} as F);
  @Input() public newButtonKey = '';
  @Output() public entryDeleted = new EventEmitter<T[] | null>();
  @Output() public entryUpdated = new EventEmitter<T[] | null>();
  @Output() public entryInserted = new EventEmitter<T[] | null>();
  @ContentChild('listItemIcon') public listItemIcon: TemplateRef<never> | null = null;
  @ContentChild('listItemTitle') public listItemTitle: TemplateRef<never> | null = null;
  @ContentChild('listItemLine') public listItemLine: TemplateRef<never> | null = null;
  @ContentChild('listItemMeta') public listItemMeta: TemplateRef<never> | null = null;

  private _currentEditObject: T[] | null = null;

  public get currentEditObject(): T[] | null {
    return this._currentEditObject;
  }

  @Input()
  public set currentEditObject(value: T[] | null) {
    this._currentEditObject = value;
    if (value) {
      this.formGroup.patchValue(value[0] as never);
    } else {
      this.formGroup.reset();
    }
  }

  public deleteEntry() {
    this.entryDeleted.emit(this.currentEditObject);
  }

  public updateEntry() {
    this.entryUpdated.emit(this.currentEditObject);
  }

  public insertEntry() {
    this.entryInserted.emit(this.currentEditObject);
  }

  public mockNewObject() {
    this.currentEditObject = [this.mockValue];
  }
}
