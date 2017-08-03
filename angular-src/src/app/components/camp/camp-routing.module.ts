import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DetailsComponent } from './details/details.component';
import { NewComponent } from './new/new.component';
import { CampComponent } from './camp.component';
const routes: Routes = [{
    path: 'camp-all',
    component: CampComponent
  },
  {
    path: 'camp-details/:id',
    component: DetailsComponent
  },
  {
    path: 'camp-new',
    component: NewComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CampRoutingModule {}
