import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserreviewPage } from './userreview.page';

describe('UserreviewPage', () => {
  let component: UserreviewPage;
  let fixture: ComponentFixture<UserreviewPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(UserreviewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
