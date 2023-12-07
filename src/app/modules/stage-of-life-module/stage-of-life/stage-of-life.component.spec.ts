import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StageOfLifeComponent } from './stage-of-life.component';

describe('StageOfLifeComponent', () => {
  let component: StageOfLifeComponent;
  let fixture: ComponentFixture<StageOfLifeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StageOfLifeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StageOfLifeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
