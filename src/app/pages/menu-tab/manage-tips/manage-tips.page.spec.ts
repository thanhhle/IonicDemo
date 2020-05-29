import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ManageTipsPage } from './manage-tips.page';

describe('ManageTipsPage', () => {
  let component: ManageTipsPage;
  let fixture: ComponentFixture<ManageTipsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageTipsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ManageTipsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
