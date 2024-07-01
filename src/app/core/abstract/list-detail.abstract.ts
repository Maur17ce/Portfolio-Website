import { Observable } from 'rxjs';
import { AbstractControl, FormGroup } from '@angular/forms';

export class ListDetailAbstract<T, F extends { [K in keyof F]: AbstractControl<unknown, unknown> }> {
  public data$: Observable<T[]> = new Observable<T[]>();
  public currentEditObject: T[] | null = null;
  public newButtonKey = '';
  public formGroup: FormGroup<F> = new FormGroup<F>({} as F);
  public mockData: T = {} as T;
}
