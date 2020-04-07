import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NewordersPage } from './neworders.page';

describe('NewordersPage', () => {
  let component: NewordersPage;
  let fixture: ComponentFixture<NewordersPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewordersPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NewordersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
