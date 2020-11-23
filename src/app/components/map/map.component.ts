import { Component, OnInit, Input, ViewChild, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements AfterViewInit {
  @Input() vehiclesList: Array<any>;
  private map;
  
  constructor() { }

  ngAfterViewInit() {
    this.loadMap();   
  }

  loadMap(){
    this.map = L.map('mapContainer', {
      center: [ 49.8175, 15.4730 ],
      zoom: 6
    });
    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });
    tiles.addTo(this.map);
    this.loadVehicles();
  }

  loadVehicles(){
    const filteredVehicles = this.vehiclesList.filter((vehicle: any) => vehicle.lng != 0 || vehicle.lat != 0);
    filteredVehicles.forEach((vehicle: Object) => {
      this.addVehicleMarker(vehicle);
    })
  }

  addVehicleMarker(vehicle){
    L.marker([vehicle.lat, vehicle.lng])
    .addTo(this.map)
    .bindPopup(`
    <div class="pop-wrapper">
    <span> Vehicle ID: ${vehicle.id} </span> 
    <span> Vehicle Type: ${vehicle.vehicle_type} </span>
    <span> Capacity: ${vehicle.capacity} </span>
    </div>
    `)
    .openPopup()
  }

}
