import { TestBed } from '@angular/core/testing';

import { MapActionsService } from './map-actions.service';

describe('MapActionsService', () => {
  let service: MapActionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MapActionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
