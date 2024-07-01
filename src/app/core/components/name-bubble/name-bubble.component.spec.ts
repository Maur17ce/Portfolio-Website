import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NameBubbleComponent } from './name-bubble.component';

describe('NameBubbleComponent', () => {
  let component: NameBubbleComponent;
  let fixture: ComponentFixture<NameBubbleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NameBubbleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NameBubbleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
