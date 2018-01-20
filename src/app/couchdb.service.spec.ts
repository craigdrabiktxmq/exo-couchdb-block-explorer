import { TestBed, inject } from '@angular/core/testing';

import { CouchdbServiceService } from './couchdb-service.service';

describe('CouchdbServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CouchdbServiceService]
    });
  });

  it('should be created', inject([CouchdbServiceService], (service: CouchdbServiceService) => {
    expect(service).toBeTruthy();
  }));
});
