import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoDocumentsComponent } from './co-documents.component';

describe('CoDocumentsComponent', () => {
  let component: CoDocumentsComponent;
  let fixture: ComponentFixture<CoDocumentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoDocumentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoDocumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
