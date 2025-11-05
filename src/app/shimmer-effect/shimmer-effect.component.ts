import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-shimmer-effect',
  templateUrl: './shimmer-effect.component.html',
  styleUrl: './shimmer-effect.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShimmerEffectComponent {}
