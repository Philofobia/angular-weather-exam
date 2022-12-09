import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

interface inputs {
  latitude: string;
  longitude: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  jsonIn: inputs = {
    latitude: '',
    longitude: '',
  };

  constructor(private router: Router) {}

  ngOnInit(): void {}

  goToDetails() {
    this.router.navigateByUrl(
      '/details/' + this.jsonIn.latitude + '/' + this.jsonIn.longitude
    );
  }
}
