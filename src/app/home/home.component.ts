import { Component } from '@angular/core';
import { MatCard, MatCardContent } from '@angular/material/card';
import { MatAnchor, MatButton, MatFabAnchor } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { NgOptimizedImage } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { GetAgePipe } from '@pipes/get-age.pipe';

@Component({
  selector: 'mdf-home',
  standalone: true,
  imports: [
    MatCard,
    MatCardContent,
    MatButton,
    MatIcon,
    MatAnchor,
    RouterLink,
    NgOptimizedImage,
    MatFabAnchor,
    TranslateModule,
    GetAgePipe,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}
