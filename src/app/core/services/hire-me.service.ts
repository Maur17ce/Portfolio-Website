import { Injectable } from '@angular/core';
import { WebService } from '@services/web.service';
import { HireMe } from '@interfaces/hire-me';

@Injectable({
  providedIn: 'root',
})
export class HireMeService {
  public constructor(private readonly web: WebService) {}

  public getAll() {
    return this.web.get<HireMe[]>('admin/hire-me/getAll', undefined, 'ERROR');
  }

  public insertItem(value: HireMe) {
    return this.web.post<HireMe>('hire-me/insertItem', value, undefined, 'ALL');
  }

  public deleteItem(value: HireMe) {
    return this.web.post('hire-me/deleteItem', value, undefined, 'ALL');
  }
}
