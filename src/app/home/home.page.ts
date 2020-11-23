import { Component } from '@angular/core';
import { AuthService } from '../auth/services/auth.service';
import { MapActionsService } from '../services/map-actions.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  vehiclesList: Array<any> = [];
  loadedVehiclesList: boolean = false;

  constructor(private mapService: MapActionsService, private authService: AuthService) { }

  ngOnInit() {
    this.getVehicles();
  }

  getVehicles(){
    this.mapService.getVehicles().subscribe((data: any) => {
      this.vehiclesList = data.vehicles;
      this.loadedVehiclesList = true;
    });
  } 

  logOut(){
    this.authService.logout();
  }

  

}
