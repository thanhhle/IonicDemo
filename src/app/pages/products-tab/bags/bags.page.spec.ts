import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BagsPage } from './bags.page';

describe('BagsPage', () => {
  let component: BagsPage;
  let fixture: ComponentFixture<BagsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BagsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BagsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
