import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardTitle } from '@angular/material/card';
import { MatButton } from '@angular/material/button';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { WebService } from '@services/web.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject, takeUntil } from 'rxjs';
import { Router } from '@angular/router';

interface AdminForm {
  username: FormControl<string | null>;
  password: FormControl<string | null>;
}

@Component({
  selector: 'mdf-admin',
  standalone: true,
  imports: [
    MatCard,
    MatCardHeader,
    MatCardContent,
    MatCardActions,
    MatCardTitle,
    MatButton,
    MatFormField,
    MatInput,
    MatLabel,
    ReactiveFormsModule,
  ],
  templateUrl: './admin-login.component.html',
  styleUrl: './admin-login.component.scss',
})
export class AdminLoginComponent implements OnDestroy, OnInit {
  public adminForm: FormGroup<AdminForm> = new FormGroup<AdminForm>({
    username: new FormControl(null, Validators.required),
    password: new FormControl(null, Validators.required),
  });
  private readonly destroy$: Subject<void> = new Subject<void>();

  public constructor(
    private readonly webSrv: WebService,
    private readonly snackBar: MatSnackBar,
    private readonly router: Router,
  ) {}

  public ngOnInit() {
    sessionStorage.removeItem('app.token');
  }

  public adminLogin() {
    if (this.adminForm.valid) {
      const httpOptions = {
        headers: {
          Authorization:
            'Basic ' +
            window.btoa(this.adminForm.controls.username.value + ':' + this.adminForm.controls.password.value),
        },
      };
      this.webSrv
        .post<string>('admin/auth', null, httpOptions, 'ALL')
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (token) => {
            sessionStorage.setItem('app.token', token.data);
            // const decodedToken = jwtDecode<JwtPayload>(token as never) as never;
            // sessionStorage.setItem('app.roles', decodedToken['scope']);
            void this.router.navigate(['admin']);
          },
          error: () => this.snackBar.open('Falscher Benutzername oder Passwort.', 'OK'),
        });
    }
  }

  public ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
