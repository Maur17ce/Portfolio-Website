import { FormControl } from '@angular/forms';

export interface Portfolio {
  id: number;
  company: string;
  job: string;
  description: string;
  datefrom: Date;
  dateto: Date;
}

export interface PortfolioForm {
  id: FormControl<number | null>;
  company: FormControl<string | null>;
  job: FormControl<string | null>;
  description: FormControl<string | null>;
  datefrom: FormControl<Date | null>;
  dateto: FormControl<Date | null>;
}
