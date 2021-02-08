import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { Subject } from 'rxjs';
import {​​ Location }​​ from '@angular/common';

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
  public launchYears: Array<{year:number; checked:boolean}>;
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

  public previousLandedValue: string;

  public previousLaunchValue: string;
  public previousSelectedValue: number;

  constructor(private httpservice: HttpService, private location: Location) { 
      this.launchYears = [];
    }

  ngOnInit() {
    for(let i = 0 ; i < 15; i++ ) {
      this.launchYears.push({year: i + 2006 , checked: false })
    }
    this.islaunchTrue = "";
    this.islandedTrue = "";
    this.previousLaunchValue = "";
    this.previousLandedValue = "";
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
  navigate(year?: {year:number,checked:boolean}) {
    if (year.year) {
      console.log('ifYEar' +year.year + year.checked);
    this.launchYears.filter((data) => {
      if(data.year !== year.year) {
        data.checked = false;
      }
    })
    year.checked = !year.checked;
    this.location.replaceState(String(year.year));
    console.log('year'+ year.year);
    console.log('checked'+ year.checked);
  }
  const selectedyear= this.selectedYear ? this.selectedYear : '';
    if (this.selectedYear || (year.year && year.checked )) {
      console.log('if'+ year);
      if (this.islaunchTrue === "" && this.islandedTrue === "") {
        console.log('1'+ year.year);
        console.log('1.1'+ this.selectedYear);
        this.spaceXData = this.fetchedData.filter((data) => {
          return data.launch_year === String(year.year) || this.selectedYear;
        });
      } else if (this.islaunchTrue === "") {
        console.log('2'+ year.year);
        console.log('2.1'+ this.selectedYear);
        this.spaceXData = this.fetchedData.filter((data) => {
          return data.launch_year === (String(year.year) || this.selectedYear) && data.rocket.first_stage.cores[0].land_success === this.islandedSuccessful;
        });
      } else if (this.islandedTrue === "") {
        console.log('3'+ year.year);
        console.log('3.1'+ this.selectedYear);
        this.spaceXData = this.fetchedData.filter((data) => {
          return data.launch_year === (String(year.year) || this.selectedYear) && data.launch_success === this.islaunchSuccessful;
        });
      } else {
        console.log('4'+ year.year);
        console.log('4.1'+ this.selectedYear);
        this.spaceXData = this.fetchedData.filter((data) => {
          return data.launch_year === (String(year.year) || this.selectedYear) && data.launch_success === this.islaunchSuccessful && data.rocket.first_stage.cores[0].land_success === this.islandedSuccessful;
        });
      }
    }
     else {
      console.log('islandedTrue'+ this.islandedTrue);
      console.log('islaunchTrue'+ this.islaunchTrue);
        console.log('selected' + this.selectedYear);
        console.log('year' + year.year);
        console.log('checked' + year.checked);
      if(this.islandedTrue === '' && this.islaunchTrue === '') {
        console.log('all');
        console.log('selected' + this.selectedYear);
        console.log('year' + year.year);
        console.log('checked' + year.checked);
        this.spaceXData = this.fetchedData;
      } 
       else if (this.islaunchTrue === "") {
        this.spaceXData = this.fetchedData.filter((data) => {
          console.log('isLand');
          this.location.replaceState(selectedyear+'/'+ this.islandedSuccessful);
          return data.rocket.first_stage.cores[0].land_success === this.islandedSuccessful;
        });
      } else if (this.islandedTrue === "") {
        this.spaceXData = this.fetchedData.filter((data) => {
          console.log('isLaunch');
          this.location.replaceState(selectedyear+'/'+ this.islaunchSuccessful);
          return data.launch_success === this.islaunchSuccessful;
        });
      } else {
        this.spaceXData = this.fetchedData.filter((data) => {
          console.log('isLandisLaunch');
          this.location.replaceState(selectedyear+'/'+this.islandedTrue+'/'+ this.islaunchSuccessful);
          return data.launch_success === this.islaunchSuccessful && data.rocket.first_stage.cores[0].land_success === this.islandedSuccessful;
        });
      }
    }
  }

  filterYears(year) {
    // this.launchYears.filter((data) => {
    //   if(data.year !== year.year) {
    //     data.checked = false;
    //   }
    // })
    // year.checked = !year.checked;
    // this.location.replaceState(year.year);
    // this.spaceXData =  this.fetchedData.filter((data) => {
    //   if(year.checked) {
    //     return data.launch_year === String(year.year);
    //   } else {
    //     return this.fetchedData;
    //   }
    // })

    this.navigate(year);
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
