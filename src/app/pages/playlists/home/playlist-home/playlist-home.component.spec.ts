import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaylistHomeComponent } from './playlist-home.component';

describe('PlaylistHomeComponent', () => {
  let component: PlaylistHomeComponent;
  let fixture: ComponentFixture<PlaylistHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlaylistHomeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlaylistHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
