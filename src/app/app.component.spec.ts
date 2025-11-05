import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AppService } from './app.service';
import { RegistrationFormComponent } from './registration-form/registration-form.component';
import { of, throwError } from 'rxjs';
import { IRegistration } from '../assets/model/registration.interface';
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let appService: jasmine.SpyObj<AppService>;
  let changeDetectorRef: jasmine.SpyObj<ChangeDetectorRef>;

  const mockRegistrationData: IRegistration = {
    title: 'Test Form',
    fields: [
      {
        label: 'Name',
        name: 'name',
        type: 'text',
        required: true,
      },
    ],
  };

  beforeEach(async () => {
    const appServiceSpy = jasmine.createSpyObj('AppService', ['getRegistrationData']);
    const changeDetectorSpy = jasmine.createSpyObj('ChangeDetectorRef', ['detectChanges']);

    await TestBed.configureTestingModule({
      imports: [AppComponent, HttpClientTestingModule, CommonModule],
      providers: [
        { provide: AppService, useValue: appServiceSpy },
        { provide: ChangeDetectorRef, useValue: changeDetectorSpy },
      ],
    }).compileComponents();

    appService = TestBed.inject(AppService) as jasmine.SpyObj<AppService>;
    changeDetectorRef = TestBed.inject(ChangeDetectorRef) as jasmine.SpyObj<ChangeDetectorRef>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with empty registration data', () => {
    expect(component.registrationData).toEqual({} as IRegistration);
  });

  it('should show shimmer effect when data is not loaded', () => {
    appService.getRegistrationData.and.returnValue(of({} as IRegistration));
    fixture.detectChanges();

    const shimmerElement = fixture.nativeElement.querySelector('app-shimmer-effect');
    const formElement = fixture.nativeElement.querySelector('app-registration-form');

    expect(shimmerElement).toBeTruthy();
    expect(formElement).toBeFalsy();
  });

  it('should load registration data on init', fakeAsync(() => {
    appService.getRegistrationData.and.returnValue(of(mockRegistrationData));

    component.ngOnInit();
    tick(1000); // Wait for setTimeout

    expect(component.registrationData).toEqual(mockRegistrationData);
  }));

  it('should show registration form when data is loaded', fakeAsync(() => {
    appService.getRegistrationData.and.returnValue(of(mockRegistrationData));

    component.ngOnInit();
    tick(1000);
    fixture.detectChanges();

    const shimmerElement = fixture.nativeElement.querySelector('app-shimmer-effect');
    const formElement = fixture.nativeElement.querySelector('app-registration-form');

    expect(shimmerElement).toBeFalsy();
    expect(formElement).toBeTruthy();
  }));

  it('should unsubscribe on destroy', () => {
    const unsubscribeSpy = spyOn(component.subscription, 'unsubscribe');

    component.ngOnDestroy();

    expect(unsubscribeSpy).toHaveBeenCalled();
  });

  it('should pass correct props to registration form', fakeAsync(() => {
    appService.getRegistrationData.and.returnValue(of(mockRegistrationData));

    component.ngOnInit();
    tick(1000);
    fixture.detectChanges();

    const formElement = fixture.debugElement.query(By.directive(RegistrationFormComponent));
    expect(formElement.componentInstance.title()).toBe(mockRegistrationData.title);
    expect(formElement.componentInstance.formField()).toEqual(mockRegistrationData.fields);
  }));

  it('should handle render shimmer effect', fakeAsync(() => {
    appService.getRegistrationData.and.returnValue(of(mockRegistrationData));

    component.ngOnInit();
    tick(1);
    fixture.detectChanges();

    expect(component.registrationData).toEqual({} as IRegistration);
    const shimmerElement = fixture.nativeElement.querySelector('app-shimmer-effect');
    expect(shimmerElement).toBeTruthy();
  }));
});
