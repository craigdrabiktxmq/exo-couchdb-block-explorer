import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrphanedBlocksComponent } from './orphaned-blocks.component';

describe('OrphanedBlocksComponent', () => {
  let component: OrphanedBlocksComponent;
  let fixture: ComponentFixture<OrphanedBlocksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrphanedBlocksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrphanedBlocksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
