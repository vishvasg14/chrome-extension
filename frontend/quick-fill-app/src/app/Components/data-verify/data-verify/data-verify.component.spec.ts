import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataVerifyComponent } from './data-verify.component';

describe('DataVerifyComponent', () => {
  let component: DataVerifyComponent;
  let fixture: ComponentFixture<DataVerifyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DataVerifyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DataVerifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
