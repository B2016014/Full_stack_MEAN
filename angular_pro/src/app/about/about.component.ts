import { Component, OnInit, Inject } from '@angular/core';
import { leader } from '../shared/leader';
import {LeadersService} from '../services/leaders.service';
import { flyInOut, expand } from '../animations/app.animations';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  // tslint:disable-next-line:use-host-property-decorator
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
  },
  animations: [
    flyInOut(),
    expand()
  ]
})
export class AboutComponent implements OnInit {

  leaders: leader[];
  errMess: string;

  constructor(private leaderservice: LeadersService,
    @Inject('baseURL') public baseURL:string) { }

  ngOnInit() {
    this.leaderservice.getLeaders()
      .subscribe({
        next:leaders => this.leaders = leaders,
        error:errmess => this.errMess = <any>errmess});
  }

}
