import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { RouterOutletStubComponent } from 'src/testing';
import { UserService } from './core/user.service';

describe('AppComponent', () => {
  let userService: jasmine.SpyObj<UserService>;

  beforeEach(async(() => {
    userService = jasmine.createSpyObj('UserService', ['query']);
    TestBed.configureTestingModule({
      declarations: [AppComponent, RouterOutletStubComponent],
      providers: [{ provide: UserService, useValue: userService }],
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
