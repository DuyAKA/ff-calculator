import { Component } from '@angular/core';
import { ResponsiveService } from '../../../services/responsive/responsive.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  constructor(public responsiveService: ResponsiveService) {}
}
