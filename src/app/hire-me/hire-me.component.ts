import { Component, OnDestroy } from '@angular/core';
import { MatFormField, MatLabel, MatPrefix } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardTitle } from '@angular/material/card';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HireMe, HireMeForm } from '@interfaces/hire-me';
import { HireMeService } from '@services/hire-me.service';
import { Subject, takeUntil, tap } from 'rxjs';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'mdf-hire-me',
  standalone: true,
  imports: [
    MatFormField,
    MatInput,
    MatLabel,
    MatButton,
    MatIcon,
    MatCard,
    MatCardContent,
    MatCardActions,
    MatCardHeader,
    MatCardTitle,
    MatPrefix,
    CdkTextareaAutosize,
    ReactiveFormsModule,
    TranslateModule,
  ],
  templateUrl: './hire-me.component.html',
  styleUrl: './hire-me.component.scss',
})
export class HireMeComponent implements OnDestroy {
  public hireMeForm: FormGroup<HireMeForm> = new FormGroup<HireMeForm>({
    id: new FormControl(null),
    company_name: new FormControl(null),
    email: new FormControl(null, [
      Validators.required,
      Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]'),
    ]),
    message: new FormControl(null, Validators.required),
  });
  private readonly destroy$: Subject<void> = new Subject<void>();

  public constructor(private readonly hireMeSrv: HireMeService) {}

  public sendMessage() {
    if (this.hireMeForm.valid) {
      this.hireMeSrv
        .insertItem(this.hireMeForm.value as HireMe)
        .pipe(
          tap((res) => {
            if (res.statusCode === 'OK') {
              this.hireMeForm.reset();
            }
          }),
          takeUntil(this.destroy$),
        )
        .subscribe();
    }
  }

  public ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
