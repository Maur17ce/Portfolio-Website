import { Component } from '@angular/core';
import { ListDetailAbstract } from '@abstract/list-detail.abstract';
import { HireMe, HireMeForm } from '@interfaces/hire-me';
import { HireMeService } from '@services/hire-me.service';
import { map } from 'rxjs';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { DatePipe } from '@angular/common';
import { ListDetailComponent } from '@components/list-detail/list-detail.component';
import { MatDatepicker, MatDatepickerInput, MatDatepickerToggle } from '@angular/material/datepicker';
import { MatFormField, MatLabel, MatPrefix, MatSuffix } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';

@Component({
  selector: 'mdf-messages',
  standalone: true,
  imports: [
    CdkTextareaAutosize,
    DatePipe,
    ListDetailComponent,
    MatDatepicker,
    MatDatepickerInput,
    MatDatepickerToggle,
    MatFormField,
    MatIcon,
    MatInput,
    MatLabel,
    MatSuffix,
    ReactiveFormsModule,
    MatPrefix,
  ],
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.scss',
})
export class MessagesComponent extends ListDetailAbstract<HireMe, HireMeForm> {
  public constructor(private readonly hireMeSrv: HireMeService) {
    super();
    this.newButtonKey = 'New Message';
    this.data$ = this.hireMeSrv.getAll().pipe(
      map((res) => {
        return res.data;
      }),
    );
    this.mockData = {
      id: null as never,
      message: '',
      company_name: null,
      email: '',
    };
    this.formGroup = new FormGroup<HireMeForm>({
      id: new FormControl(null),
      message: new FormControl(null, Validators.required),
      company_name: new FormControl(null),
      email: new FormControl(null, Validators.required),
    });
  }
}
