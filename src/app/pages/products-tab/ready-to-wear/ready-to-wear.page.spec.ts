import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ReadyToWearPage } from './ready-to-wear.page';

describe('ReadyToWearPage', () => {
  let component: ReadyToWearPage;
  let fixture: ComponentFixture<ReadyToWearPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReadyToWearPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ReadyToWearPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
