import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleBlockComponent } from './single-block.component';

describe('SingleBlockComponent', () => {
  let component: SingleBlockComponent;
  let fixture: ComponentFixture<SingleBlockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SingleBlockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
