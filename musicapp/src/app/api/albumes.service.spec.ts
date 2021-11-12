import { TestBed } from '@angular/core/testing';

import { AlbumesService } from './albumes.service';

describe('AlbumesService', () => {
  let service: AlbumesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlbumesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
