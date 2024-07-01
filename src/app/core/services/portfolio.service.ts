import { Injectable } from '@angular/core';
import { WebService } from '@services/web.service';
import { Portfolio } from '@interfaces/portfolio';

@Injectable({
  providedIn: 'root',
})
export class PortfolioService {
  public constructor(private readonly web: WebService) {}

  public getAllEntries() {
    return this.web.get<Portfolio[]>('portfolio/getAll', undefined, 'ERROR');
  }

  public updateEntry(value: Portfolio) {
    return this.web.post<Portfolio>('admin/portfolio/updateItem', value, undefined, 'ALL');
  }

  public insertEntry(value: Portfolio) {
    return this.web.post<Portfolio>('admin/portfolio/insertItem', value, undefined, 'ALL');
  }

  public deleteEntry(value: Portfolio) {
    return this.web.post<Portfolio>('admin/portfolio/deleteItem', value, undefined, 'ALL');
  }
}
