import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoProcessusComponent } from './co-processus.component';

describe('CoProcessusComponent', () => {
  let component: CoProcessusComponent;
  let fixture: ComponentFixture<CoProcessusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoProcessusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoProcessusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
