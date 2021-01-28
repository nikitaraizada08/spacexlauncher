import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { HttpClientModule} from '@angular/common/http';
import { RouterModule, Router } from '@angular/router';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,LandingPageComponent
      ],
      imports:[HttpClientModule , RouterModule],
      providers: [{ provide: Router, useClass: class { navigate = jasmine.createSpy("navigate"); } }]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'spaceX-program'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('spaceX-program');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    //expect(compiled.querySelector('.content span').textContent).toContain('spaceX-program app is running!');
  });
});
