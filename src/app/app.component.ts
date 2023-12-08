import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { AssetModule } from './modules/asset-module/asset/asset.module';
import { StageOfLifeModule } from './modules/stage-of-life-module/stage-of-life/stage-of-life.module';
import { ShareModule } from './modules/share-module/share.module';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    AssetModule,
    StageOfLifeModule,
    ShareModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'financial-freedom-point-calculator';
}
