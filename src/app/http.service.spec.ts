import { TestBed } from '@angular/core/testing';

import { HttpService } from './http.service';
import { HttpClientModule } from '@angular/common/http';

describe('HttService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports:[HttpClientModule]
  }));

  it('should be created', () => {
    const service: HttpService = TestBed.get(HttpService);
    expect(service).toBeTruthy();
  });
});
