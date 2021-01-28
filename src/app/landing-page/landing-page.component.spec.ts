import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingPageComponent } from './landing-page.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Router } from '@angular/router';
import { HttpService } from '../http.service';
import { FakeHttpService } from '../fake-http.service';

describe('LandingPageComponent', () => {
  let component: LandingPageComponent;
  let fixture: ComponentFixture<LandingPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LandingPageComponent ],
      imports:[HttpClientModule, RouterModule],
      providers: [{ provide: Router, useClass: class { navigate = jasmine.createSpy("navigate");}},
                  { provide: HttpService, useClass: FakeHttpService}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LandingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should call navigate for filter selectedyear only', () => {
    component.islandedTrue='';
    component.selectedYear=2006;
    component.islaunchTrue='';
    let service = fixture.debugElement.injector.get(HttpService)
    spyOn(service,'getResponse')
    component.navigate();
    expect(component.selectedYear).toEqual(component.spaceXData[0].launch_year)
  });

  it('should call navigate for filter year, launch_success', () => {
    component.selectedYear=2007;
    component.islaunchTrue='yes';
    component.islandedTrue='';
    component.islaunchSuccessful = true;
    let service = fixture.debugElement.injector.get(HttpService)
    spyOn(service,'getResponse')
    component.navigate();
    expect(component.selectedYear).toEqual(component.spaceXData[0].launch_year)
    expect(component.spaceXData[0].launch_success).toEqual(component.islaunchSuccessful);
  });
  it('should call navigate for filter year, launch_success=FALSE', () => {
    component.selectedYear=2006;
    component.islaunchTrue='no';
    component.islandedTrue='';
    component.islaunchSuccessful = false;
    let service = fixture.debugElement.injector.get(HttpService)
    spyOn(service,'getResponse')
    component.navigate();
    expect(component.selectedYear).toEqual(component.spaceXData[0].launch_year)
    expect(component.spaceXData[0].launch_success).toEqual(component.islaunchSuccessful);;
  });
  it('should call navigate for filter year, land_success', () => {
    component.selectedYear=2006;
    component.islaunchTrue='';
    component.islandedTrue='yes';
    component.islandedSuccessful = true;
    let service = fixture.debugElement.injector.get(HttpService)
    spyOn(service,'getResponse')
    component.navigate();
    expect(component.selectedYear).toEqual(component.spaceXData[0].launch_year)
    expect(component.spaceXData[0].rocket.first_stage.cores[0].land_success).toEqual(component.islandedSuccessful);
  });
  it('should call navigate for filter year, land_success,launch_success', () => {
    component.selectedYear=2007;
    component.islaunchTrue='yes';
    component.islandedTrue='yes';
    component.islandedSuccessful = false;
    component.islaunchSuccessful = true;
    let service = fixture.debugElement.injector.get(HttpService)
    spyOn(service,'getResponse')
    component.navigate();
    expect(component.selectedYear).toEqual(component.spaceXData[0].launch_year)
    expect(component.spaceXData[0].rocket.first_stage.cores[0].land_success).toEqual(component.islandedSuccessful)
    expect(component.spaceXData[0].launch_success).toEqual(component.islaunchSuccessful);
  });
  it('should call navigate for filter launch success only', () => {
    component.selectedYear=0;
    component.islaunchTrue='yes';
    component.islandedTrue='';
    component.islaunchSuccessful=true;
    let service = fixture.debugElement.injector.get(HttpService)
    spyOn(service,'getResponse')
    component.navigate();
    expect(component.spaceXData[0].launch_success).toEqual(component.islaunchSuccessful);
  });
  it('should call navigate for filter land success only', () => {
    component.selectedYear=0;
    component.islaunchTrue='';
    component.islandedTrue='yes';
    component.islandedSuccessful=true;
    let service = fixture.debugElement.injector.get(HttpService)
    spyOn(service,'getResponse')
    component.navigate();
    expect(component.spaceXData[0].rocket.first_stage.cores[0].land_success).toEqual(component.islandedSuccessful);
  });
  it('should call navigate for filter land success and launch success', () => {
    component.selectedYear=0;
    component.islaunchTrue='yes';
    component.islandedTrue='yes';
    component.islaunchSuccessful = true;
    component.islandedSuccessful = false;
    let service = fixture.debugElement.injector.get(HttpService)
    spyOn(service,'getResponse')
    component.navigate();
    expect(component.spaceXData[0].launch_success).toEqual(component.islaunchSuccessful);
    expect(component.spaceXData[0].rocket.first_stage.cores[0].land_success).toEqual(component.islandedSuccessful);
  });
  
});
