import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadphotoPage } from './uploadphoto.page';

describe('UploadphotoPage', () => {
  let component: UploadphotoPage;
  let fixture: ComponentFixture<UploadphotoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadphotoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadphotoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
