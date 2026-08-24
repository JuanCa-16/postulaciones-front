import { TestBed } from '@angular/core/testing';
import { PostulacionService } from './postulacionService';

describe('Postulacion', () => {
  let service: PostulacionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PostulacionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
