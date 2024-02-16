import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchFieldComponent } from './match-field.component';

describe('MatchFieldComponent', () => {
  let component: MatchFieldComponent;
  let fixture: ComponentFixture<MatchFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatchFieldComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MatchFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
