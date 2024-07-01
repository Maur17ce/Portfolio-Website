import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { MatAnchor, MatButton, MatIconButton } from '@angular/material/button';
import { NameBubbleComponent } from '@components/name-bubble/name-bubble.component';
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu';
import { MatIcon } from '@angular/material/icon';
import { MatTooltip } from '@angular/material/tooltip';
import { MatToolbar } from '@angular/material/toolbar';
import { MatDivider } from '@angular/material/divider';
import 'moment/locale/de';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'mdf-root',
  standalone: true,
  imports: [
    RouterOutlet,
    AsyncPipe,
    JsonPipe,
    MatButton,
    NameBubbleComponent,
    MatAnchor,
    RouterLink,
    RouterLinkActive,
    MatMenu,
    MatMenuItem,
    MatIcon,
    MatIconButton,
    MatMenuTrigger,
    MatTooltip,
    MatToolbar,
    MatDivider,
    TranslateModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {}
