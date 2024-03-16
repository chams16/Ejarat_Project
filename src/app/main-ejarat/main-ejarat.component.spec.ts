import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainEjaratComponent } from './main-ejarat.component';

describe('MainEjaratComponent', () => {
  let component: MainEjaratComponent;
  let fixture: ComponentFixture<MainEjaratComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MainEjaratComponent]
    });
    fixture = TestBed.createComponent(MainEjaratComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
