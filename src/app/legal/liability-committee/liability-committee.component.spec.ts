import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LiabilityCommitteeComponent } from './liability-committee.component';

describe('LiabilityCommitteeComponent', () => {
  let component: LiabilityCommitteeComponent;
  let fixture: ComponentFixture<LiabilityCommitteeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LiabilityCommitteeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LiabilityCommitteeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
