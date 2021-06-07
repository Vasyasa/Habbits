import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HabbitsComponent } from './habbits.component';

describe('HabbitsComponent', () => {
  let component: HabbitsComponent;
  let fixture: ComponentFixture<HabbitsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HabbitsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HabbitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
