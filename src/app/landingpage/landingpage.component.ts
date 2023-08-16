import { Component } from '@angular/core';

@Component({
  selector: 'app-landingpage',
  templateUrl: './landingpage.component.html',
  styleUrls: ['./landingpage.component.css']
})
export class LandingpageComponent {
  isLoaded:boolean=true
  collapse(){
    this.isLoaded=!this.isLoaded
  }
}
