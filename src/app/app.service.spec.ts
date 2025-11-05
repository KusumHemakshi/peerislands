import { TestBed } from '@angular/core/testing';
import { AppService } from './app.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { IRegistration } from '../assets/model/registration.interface';

describe('AppService', () => {
  let service: AppService;
  let http: HttpTestingController;

  const mockRegistrationData: IRegistration = {
    title: 'Test Registration Form',
    fields: [
      {
        label: 'Full Name',
        name: 'fullName',
        type: 'text',
        required: true,
      },
      {
        label: 'Email',
        name: 'email',
        type: 'text',
        required: true,
        validation: {
          pattern: '^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$',
          message: 'Invalid email address',
        },
      },
    ],
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AppService],
    });
    service = TestBed.inject(AppService);
    http = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch registration form data', (done) => {
    service.getRegistrationData().subscribe({
      next: (data) => {
        expect(data).toBeTruthy();
        expect(data.title).toBe('Test Registration Form');
        expect(data.fields.length).toBe(2);
        expect(data.fields[0].name).toBe('fullName');
        expect(data.fields[1].validation?.pattern).toBe('^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$');
        done();
      },
      error: done.fail,
    });

    const req = http.expectOne('assets/mock-data/registration-data.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockRegistrationData);
  });

  it('should handle error when fetching registration data fails', (done) => {
    service.getRegistrationData().subscribe({
      next: () => {
        done.fail('Should have failed with 404 error');
      },
      error: (error) => {
        expect(error.status).toBe(404);
        expect(error.statusText).toBe('Not Found');
        done();
      },
    });

    const req = http.expectOne('assets/mock-data/registration-data.json');
    req.flush('Not found', {
      status: 404,
      statusText: 'Not Found',
    });
  });

  it('should make GET request to correct URL', () => {
    service.getRegistrationData().subscribe();

    const req = http.expectOne('assets/mock-data/registration-data.json');
    expect(req.request.method).toBe('GET');
    expect(req.request.url).toBe('assets/mock-data/registration-data.json');
    req.flush(mockRegistrationData);
  });

  it('should return registration data with correct field structure', (done) => {
    service.getRegistrationData().subscribe({
      next: (data) => {
        // Check data structure
        expect(data.title).toBeDefined();
        expect(data.fields).toBeDefined();
        expect(Array.isArray(data.fields)).toBe(true);

        // Check field structure
        const field = data.fields[0];
        expect(field.label).toBeDefined();
        expect(field.name).toBeDefined();
        expect(field.type).toBeDefined();

        // Check types
        expect(typeof data.title).toBe('string');
        expect(typeof field.label).toBe('string');
        expect(typeof field.name).toBe('string');
        expect(typeof field.type).toBe('string');
        done();
      },
      error: done.fail,
    });

    const req = http.expectOne('assets/mock-data/registration-data.json');
    req.flush(mockRegistrationData);
  });
});
