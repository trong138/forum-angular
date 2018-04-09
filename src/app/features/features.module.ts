import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeaturesComponent } from './features.component';
import { RouterModule } from '@angular/router';
import { featureRoutes } from './features.routes';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(featureRoutes),
    SharedModule
  ],
  declarations: [
    FeaturesComponent,
  ]
})
export class FeaturesModule { }
