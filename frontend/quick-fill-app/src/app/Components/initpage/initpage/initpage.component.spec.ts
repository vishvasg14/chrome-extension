import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InitpageComponent } from './initpage.component';

describe('InitpageComponent', () => {
  let component: InitpageComponent;
  let fixture: ComponentFixture<InitpageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InitpageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InitpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
