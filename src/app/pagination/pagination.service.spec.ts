import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClientModule } from '@angular/common/http';
import { PaginationService } from './pagination.service';


describe('PaginationService', () => {
  let httpMock: HttpTestingController;
  let paginationService: PaginationService;
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule,],
    providers: [PaginationService]
  }));

  it('should be created', () => {
    const service: PaginationService = TestBed.get(PaginationService);
    expect(service).toBeTruthy();
  });
  it('should have getPager function', () => {
    const service: PaginationService = TestBed.get(PaginationService);
    expect(service.getPager).toBeDefined();
  });
});
