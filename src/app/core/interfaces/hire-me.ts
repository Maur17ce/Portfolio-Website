import { FormControl } from '@angular/forms';

export interface HireMe {
  id: number;
  company_name: string | null;
  email: string;
  message: string;
}

export interface HireMeForm {
  id: FormControl<number | null>;
  company_name: FormControl<string | null>;
  email: FormControl<string | null>;
  message: FormControl<string | null>;
}
