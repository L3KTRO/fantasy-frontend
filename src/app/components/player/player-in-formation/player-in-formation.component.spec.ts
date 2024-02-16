import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerInFormationComponent } from './player-in-formation.component';

describe('PlayerComponent', () => {
  let component: PlayerInFormationComponent;
  let fixture: ComponentFixture<PlayerInFormationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlayerInFormationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlayerInFormationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
