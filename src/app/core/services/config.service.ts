import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';
import { MdfConfig } from '@interfaces/config';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  public config: MdfConfig | null = null;

  public constructor(private readonly http: HttpClient) {}

  public getConfig() {
    return this.http.get<MdfConfig>('config.json').pipe(
      tap((res) => {
        this.config = res;
      }),
    );
  }
}
