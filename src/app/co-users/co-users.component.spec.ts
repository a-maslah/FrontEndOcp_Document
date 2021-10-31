import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoUsersComponent } from './co-users.component';

describe('CoUsersComponent', () => {
  let component: CoUsersComponent;
  let fixture: ComponentFixture<CoUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoUsersComponent ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
