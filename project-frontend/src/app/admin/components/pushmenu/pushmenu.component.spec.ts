import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PushmenuComponent } from './pushmenu.component';

describe('PushmenuComponent', () => {
  let component: PushmenuComponent;
  let fixture: ComponentFixture<PushmenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PushmenuComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PushmenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
