import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YfnComponent } from './yfn.component';

describe('YtnComponent', () => {
  let component: YfnComponent;
  let fixture: ComponentFixture<YfnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [YfnComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(YfnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
