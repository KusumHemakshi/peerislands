import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  input,
  OnChanges,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { IField, IKeyValue, IUserDetail } from '../../assets/model/registration.interface';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IDropdownSettings, NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

@Component({
  selector: 'app-registration-form',
  imports: [ReactiveFormsModule, CommonModule, NgMultiSelectDropDownModule],
  templateUrl: './registration-form.component.html',
  styleUrl: './registration-form.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegistrationFormComponent implements OnInit, OnChanges, OnDestroy {
  title = input<string>('');
  formField = input<IField[]>([]);
  userInfo: FormGroup = new FormGroup({});
  isSubmitted: boolean = false;
  dropdownSettings: IDropdownSettings = {};
  concernOptions: IKeyValue[] = [
    { key: true, value: 'Yes' },
    { key: false, value: 'No' },
  ];
  private changeDetectorRef = inject(ChangeDetectorRef);
  maxDate: string = '';

  ngOnInit(): void {
    const today: Date = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, '0'); // Month is 0-indexed
    const day = today.getDate().toString().padStart(2, '0');
    this.maxDate = `${year}-${month}-${day}`;
  }

  ngOnChanges(): void {
    this.initializeUserInfoForm();
  }

  initializeUserInfoForm(): void {
    const formControls: any = {};
    this.formField()?.forEach((field: IField) => {
      formControls[field.name] = new FormControl(
        '',
        this.setValidators(field?.required, field?.validation || {})
      );
    });
    this.userInfo = new FormGroup(formControls);
    this.changeDetectorRef.detectChanges();
  }

  setValidators(
    requiredValidator: boolean = false,
    validatorsObj: { [key: string]: string }
  ): ValidatorFn[] {
    const validatorFns: ValidatorFn[] = [];
    if (!validatorsObj) return validatorFns;
    if (requiredValidator) validatorFns.push(Validators.required);
    if (validatorsObj?.['pattern']) validatorFns.push(Validators.pattern(validatorsObj['pattern']));
    return validatorFns;
  }

  showDetails(): void {
    this.isSubmitted = true;
    console.log(this.userInfo.value as IUserDetail);
  }

  getInputBoxClass(fieldName: string): string {
    const invalidClass = 'is-invalid';
    const validClass = 'is-valid';
    if (this.isSubmitted) {
      if (this.userInfo.controls[fieldName].valid && this.userInfo.controls[fieldName].value) {
        return validClass;
      } else if (this.userInfo.controls[fieldName].invalid) {
        return invalidClass;
      }
    }
    return '';
  }

  getWarningMessageClass(fieldName: string): string {
    const invalidClass = 'invalid-feedback';
    const hideClass = 'd-none';
    return this.isSubmitted && this.userInfo.controls[fieldName].invalid ? invalidClass : hideClass;
  }

  getDropdownSettings(dropDownType: string): IDropdownSettings {
    this.dropdownSettings =
      dropDownType == 'dropdown'
        ? {
            singleSelection: true,
          }
        : {
            singleSelection: false,
            selectAllText: 'Select All',
            unSelectAllText: 'UnSelect All',
            allowSearchFilter: true,
          };
    return this.dropdownSettings;
  }

  resetForm(): void {
    this.isSubmitted = false;
    this.userInfo.reset();
  }

  ngOnDestroy(): void {
    this.resetForm();
  }
}
