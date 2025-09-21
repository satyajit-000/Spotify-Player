import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MusicAnalyticsComponent } from './music-analytics.component';

describe('MusicAnalyticsComponent', () => {
  let component: MusicAnalyticsComponent;
  let fixture: ComponentFixture<MusicAnalyticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MusicAnalyticsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MusicAnalyticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
