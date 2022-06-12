import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScreenPageComponent } from './screen-page.component';

describe('ScreenPageComponent', () => {
  let component: ScreenPageComponent;
  let fixture: ComponentFixture<ScreenPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScreenPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScreenPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
