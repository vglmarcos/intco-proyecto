import { Component, OnInit, Input } from '@angular/core';
import { Location } from "@angular/common";
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  //https://stackoverflow.com/questions/63101535/change-css-variables-dynamically-in-angular

  @Input('title')
  public title: string = '';

  constructor(
    private location: Location,
    private router: Router
  ) { }

  ngOnInit(): void { }

}
