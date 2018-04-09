import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-features',
  templateUrl: './features.component.html',
  styleUrls: ['./features.component.css']
})
export class FeaturesComponent implements OnInit {
  private iduser;
  constructor(private route: ActivatedRoute,
    private Router: Router) {
    this.route.params
      .map(params => params['iduser'])
      .subscribe((id) => {
        console.log("[DetailComponent:ngOnInit] onroute", id);
        this.iduser = id;
      });
  }
  ngOnInit() {
  }

}
