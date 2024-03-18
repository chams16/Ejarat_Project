import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CpanelComponent } from './cpanel.component';

describe('CpanelComponent', () => {
  let component: CpanelComponent;
  let fixture: ComponentFixture<CpanelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CpanelComponent]
    });
    fixture = TestBed.createComponent(CpanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
