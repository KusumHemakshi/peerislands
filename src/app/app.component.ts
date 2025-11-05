import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { RegistrationFormComponent } from './registration-form/registration-form.component';
import { AppService } from './app.service';
import { IRegistration } from '../assets/model/registration.interface';
import { Subscription } from 'rxjs';
import { ShimmerEffectComponent } from './shimmer-effect/shimmer-effect.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [ShimmerEffectComponent, RegistrationFormComponent, CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit, OnDestroy {
  registrationData: IRegistration = {} as IRegistration;
  subscription: Subscription = new Subscription();
  private appService = inject(AppService);
  private changeDetectorRef = inject(ChangeDetectorRef);

  ngOnInit() {
    this.subscription.add(
      this.appService.getRegistrationData().subscribe((data) => {
        setTimeout(() => {
          this.registrationData = data;
          this.changeDetectorRef.detectChanges();
        }, 1000);
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
