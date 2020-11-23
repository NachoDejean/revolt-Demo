import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';

const baseUrl = 'https://dev.revolt.city';

@Injectable({
  providedIn: 'root'
})
export class MapActionsService { 

  constructor( private http: HttpClient) { }

  getVehicles(){
    return this.http.get(`${baseUrl}/api/vehicles-fast`);
  }

}
