import { Component, OnDestroy } from '@angular/core';
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
import { Portfolio, PortfolioForm } from '@interfaces/portfolio';
import { map, Subject, takeUntil, tap } from 'rxjs';
import { AsyncPipe, DatePipe, NgClass } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDatepicker, MatDatepickerInput, MatDatepickerToggle } from '@angular/material/datepicker';
import { PortfolioService } from '@services/portfolio.service';
import { ListDetailComponent } from '@components/list-detail/list-detail.component';
import { ListDetailAbstract } from '@abstract/list-detail.abstract';

@Component({
  selector: 'mdf-portfolio-management',
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
    ListDetailComponent,
  ],
  templateUrl: './portfolio-management.component.html',
  styleUrl: './portfolio-management.component.scss',
})
export class PortfolioManagementComponent extends ListDetailAbstract<Portfolio, PortfolioForm> implements OnDestroy {
  private readonly destroy$: Subject<void> = new Subject<void>();

  public constructor(private readonly portfolioSrv: PortfolioService) {
    super();
    this.newButtonKey = 'New Portfolio-Entry';
    this.data$ = this.getPortfoliodata();
    this.formGroup = new FormGroup<PortfolioForm>({
      id: new FormControl(null),
      company: new FormControl(null, Validators.required),
      job: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required),
      datefrom: new FormControl(null, Validators.required),
      dateto: new FormControl(null, Validators.required),
    });
    this.mockData = {
      id: null as unknown as number,
      description: '',
      job: '',
      company: '',
      dateto: new Date(),
      datefrom: new Date(),
    };
  }

  public getAllEntries() {
    return this.portfolioSrv.getAllEntries();
  }

  public updateEntry() {
    if (this.formGroup.valid) {
      this.portfolioSrv
        .updateEntry(this.formGroup.value as Portfolio)
        .pipe(
          tap((res) => {
            if (res.statusCode === 'OK') {
              this.data$ = this.getPortfoliodata();
            }
          }),
          takeUntil(this.destroy$),
        )
        .subscribe();
    }
  }

  public insertEntry() {
    if (this.formGroup.valid) {
      this.portfolioSrv
        .insertEntry(this.formGroup.value as Portfolio)
        .pipe(
          tap((res) => {
            if (res.statusCode === 'OK') {
              this.currentEditObject = [res.data];
              this.data$ = this.getPortfoliodata();
            }
          }),
          takeUntil(this.destroy$),
        )
        .subscribe();
    }
  }

  public deleteEntry() {
    this.portfolioSrv
      .deleteEntry(this.formGroup.value as Portfolio)
      .pipe(
        tap((res) => {
          if (res.statusCode === 'OK') {
            this.currentEditObject = null;
            this.data$ = this.getPortfoliodata();
          }
        }),
        takeUntil(this.destroy$),
      )
      .subscribe();
  }

  public ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private getPortfoliodata() {
    return this.getAllEntries().pipe(
      map((res) => {
        //sort data by todate
        res.data = res.data.sort((obj1, obj2) => {
          const date1 = new Date(obj1.datefrom);
          const date2 = new Date(obj2.datefrom);
          return date2.getTime() - date1.getTime(); // Ascending order (earlier dates first)
        });
        return res.data;
      }),
    );
  }
}
