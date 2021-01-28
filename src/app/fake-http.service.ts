import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
@Injectable({
    providedIn: 'root'
})
export class FakeHttpService {
    constructor(private http: HttpClient) {
    }
    getResponse(): Observable<any> {
        return of(mockData)
    }
}

const mockData = [
    {
        "flight_number": 1,
        "mission_name": "FalconSat",
        "mission_id": [],
        "launch_year": "2006",
        "launch_success": false,
        "links":
        {
            "mission_patch": "https://images2.imgbox.com/40/e3/GypSkayF_o.png",
            "mission_patch_small": "https://images2.imgbox.com/3c/0e/T8iJcSN3_o.png"
        },
        "rocket": {
            "rocket_id": "falcon1", "rocket_name": "Falcon 1",
            "first_stage":
            {
                "cores": [
                    {
                        "core_serial": "Merlin1A",
                        "flight": 1,
                        "land_success": true
                    }
                ]
            }
        }
    },
    {
        "flight_number": 2,
        "mission_name": "FalconSat",
        "mission_id": [],
        "launch_year": "2007",
        "launch_success": true,
        "links":
        {
            "mission_patch": "https://images2.imgbox.com/40/e3/GypSkayF_o.png",
            "mission_patch_small": "https://images2.imgbox.com/3c/0e/T8iJcSN3_o.png"
        },
        "rocket": {
            "rocket_id": "falcon1", "rocket_name": "Falcon 1",
            "first_stage":
            {
                "cores": [
                    {
                        "core_serial": "Merlin1A",
                        "flight": 1,
                        "land_success": false
                    }
                ]
            }
        }
    },
    {
        "flight_number": 1,
        "mission_name": "FalconSat",
        "mission_id": [],
        "launch_year": "2008",
        "launch_success": true,
        "links":
        {
            "mission_patch": "https://images2.imgbox.com/40/e3/GypSkayF_o.png",
            "mission_patch_small": "https://images2.imgbox.com/3c/0e/T8iJcSN3_o.png"
        },
        "rocket": {
            "rocket_id": "falcon1", "rocket_name": "Falcon 1",
            "first_stage":
            {
                "cores": [
                    {
                        "core_serial": "Merlin1A",
                        "flight": 1,
                        "land_success": false
                    }
                ]
            }
        }
    }
]   