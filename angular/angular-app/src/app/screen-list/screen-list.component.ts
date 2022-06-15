import { Component, OnInit } from '@angular/core';
import { Observable, from  } from 'rxjs';

import { ApiService, SERVER_URL } from '../api.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Screen } from '../screen';

@Component({
  selector: 'screen-list-page',
  templateUrl: './screen-list.component.html',
  styleUrls: ['./screen-list.component.css']
})
export class ScreenListComponent implements OnInit {
  screens$!: Observable<Screen[]>
  loading: Boolean = true

  constructor(private apiService: ApiService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.getScreens();
  }

  public getScreens() {
    this.apiService.getScreens().subscribe((res: any) => {
      this.loading = false;
      this.screens$ = from(Array(res.screens.map((screen: Screen) => ({...screen, routerLink: "/cast/" + screen.cast_id})))) as Observable<Screen[]>;
    });
  }
}
