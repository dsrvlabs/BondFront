import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NteComponent } from './nte.component';

describe('NteComponent', () => {
  let component: NteComponent;
  let fixture: ComponentFixture<NteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
