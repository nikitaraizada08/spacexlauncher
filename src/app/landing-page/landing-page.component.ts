import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';


@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {
  private ngUnsubscribe: Subject<void> = new Subject<void>();
  /**
    * Variable storing Space X Launcher data
    */
  public spaceXData: any;
  /**
   * Data fetched from Server side
   */
  public fetchedData: any;
  /**
   * Array storing launch years starting from 2006 to 2020 
   */
  public launchYears: Array<number>;
  /**
   * Stores launch value
   */
  public islaunchTrue: string;
  /**
   * Stores landing value
   */
  public islandedTrue: string;
  /**
   * Stores boolean value of launched successfully
   */
  public islaunchSuccessful: boolean;
  /**
   * Stores boolean value of landed successfully
   */
  public islandedSuccessful: boolean;
  /**
   * Stores a copy of spaceXData for filtering
   */
  public allSpaceXData: any;
  /**
   * Year selected from the filter
   */
  public selectedYear: number;

  constructor(private httpservice: HttpService, private router: Router) { }

  ngOnInit() {
    this.launchYears = [...Array(15).keys()].map(a => a + 2006 );
    this.islaunchTrue = "";
    this.islandedTrue = "";
    this.islaunchSuccessful=false;
    this.islandedSuccessful=false;
    this.getspaceXInfo();
  }
  getspaceXInfo(): void {
    this.httpservice.getResponse().subscribe((data) => {
      this.fetchedData = data;
      this.spaceXData = this.fetchedData;
    });
  }
  navigate() {
    if (this.selectedYear) {
      if (this.islaunchTrue === "" && this.islandedTrue === "") {
        this.spaceXData = this.fetchedData.filter((data) => {
          return data.launch_year === this.selectedYear.toString();
        });
      } else if (this.islaunchTrue === "") {
        this.spaceXData = this.fetchedData.filter((data) => {
          return data.launch_year === this.selectedYear.toString() && data.rocket.first_stage.cores[0].land_success === this.islandedSuccessful;
        });
      } else if (this.islandedTrue === "") {
        this.spaceXData = this.fetchedData.filter((data) => {
          return data.launch_year === this.selectedYear.toString() && data.launch_success === this.islaunchSuccessful;
        });
      } else {
        this.spaceXData = this.fetchedData.filter((data) => {
          return data.launch_year === this.selectedYear.toString() && data.launch_success === this.islaunchSuccessful && data.rocket.first_stage.cores[0].land_success === this.islandedSuccessful;
        });
      }
    }
    else {
      if (this.islaunchTrue === "") {
        this.spaceXData = this.fetchedData.filter((data) => {
          return data.rocket.first_stage.cores[0].land_success === this.islandedSuccessful;
        });
      } else if (this.islandedTrue === "") {
        this.spaceXData = this.fetchedData.filter((data) => {
          return data.launch_success === this.islaunchSuccessful;
        });
      } else {
        this.spaceXData = this.fetchedData.filter((data) => {
          return data.launch_success === this.islaunchSuccessful && data.rocket.first_stage.cores[0].land_success === this.islandedSuccessful;
        });
      }
    }
  }

  // debouncing
  waitForSomeTime<Params extends any[]>(fn: (...args: Params) => any, delay: number) {
    let timer;
    return function (this, ...args) {
      let context = this;
      console.log("arg", args);
      clearTimeout(timer);
      timer = setTimeout(() => {
        this.navigate.apply(context, args)
      }, delay)
    }
  }
  debounced = this.waitForSomeTime(this.navigate, 300);

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
