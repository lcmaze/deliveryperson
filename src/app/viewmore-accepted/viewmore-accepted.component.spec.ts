import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ViewmoreAcceptedComponent } from './viewmore-accepted.component';

describe('ViewmoreAcceptedComponent', () => {
  let component: ViewmoreAcceptedComponent;
  let fixture: ComponentFixture<ViewmoreAcceptedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewmoreAcceptedComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ViewmoreAcceptedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
