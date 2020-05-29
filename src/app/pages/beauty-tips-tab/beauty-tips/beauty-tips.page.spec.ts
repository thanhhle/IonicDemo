import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BeautyTipsPage } from './beauty-tips.page';

describe('BeautyTipsPage', () => {
  let component: BeautyTipsPage;
  let fixture: ComponentFixture<BeautyTipsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BeautyTipsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BeautyTipsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
