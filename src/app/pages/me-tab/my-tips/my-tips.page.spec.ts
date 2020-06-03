import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MyTipsPage } from './my-tips.page';

describe('MyTipsPage', () => {
  let component: MyTipsPage;
  let fixture: ComponentFixture<MyTipsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyTipsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MyTipsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
