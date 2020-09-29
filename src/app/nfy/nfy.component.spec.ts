import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NfyComponent } from './nfy.component';

describe('NtyComponent', () => {
  let component: NfyComponent;
  let fixture: ComponentFixture<NfyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NfyComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NfyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
