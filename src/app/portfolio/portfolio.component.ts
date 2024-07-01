import { Component } from '@angular/core';
import { MatCard, MatCardContent, MatCardHeader, MatCardImage, MatCardTitle } from '@angular/material/card';
import { MatDivider } from '@angular/material/divider';
import { MatChip } from '@angular/material/chips';
import { PortfolioService } from '@services/portfolio.service';
import { Portfolio } from '@interfaces/portfolio';
import { map, Observable } from 'rxjs';
import { AsyncPipe, DatePipe } from '@angular/common';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

@Component({
  selector: 'mdf-portfolio',
  standalone: true,
  imports: [
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatCardContent,
    MatCardImage,
    MatDivider,
    MatChip,
    AsyncPipe,
    DatePipe,
    MatProgressSpinner,
  ],
  templateUrl: './portfolio.component.html',
  styleUrl: './portfolio.component.scss',
})
export class PortfolioComponent {
  public data$: Observable<Portfolio[]>;

  public constructor(private readonly portfolioSrv: PortfolioService) {
    this.data$ = portfolioSrv.getAllEntries().pipe(
      map((res) => {
        return res.data;
      }),
    );
  }
}
