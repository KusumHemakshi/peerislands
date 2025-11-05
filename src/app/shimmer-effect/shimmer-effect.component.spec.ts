import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ShimmerEffectComponent } from './shimmer-effect.component';

describe('ShimmerEffectComponent', () => {
  let component: ShimmerEffectComponent;
  let fixture: ComponentFixture<ShimmerEffectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShimmerEffectComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ShimmerEffectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
