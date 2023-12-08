import { Component } from '@angular/core';
import { SCREEN_SIZE } from '../../../services/size-detector/screen-size.enum';
import { ResizeService } from '../../../services/size-detector/resize.service';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  size!: SCREEN_SIZE;

  constructor(private resizeSvc: ResizeService) {
    this.resizeSvc.onResize$.pipe(delay(0)).subscribe((x) => {
      this.size = x;
    });
  }
}
