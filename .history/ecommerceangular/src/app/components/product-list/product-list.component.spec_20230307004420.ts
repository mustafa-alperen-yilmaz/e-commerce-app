import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcudListComponent } from './procud-list.component';

describe('ProcudListComponent', () => {
  let component: ProductListComponent;
  let fixture: ComponentFixture<ProcudListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProcudListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProcudListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
