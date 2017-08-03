import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// modules

import { CampRoutingModule } from './camp-routing.module';
import { DetailsComponent } from './details/details.component';
import { NewComponent } from './new/new.component';
import { CampComponent } from './camp.component';
import { CommentComponent } from './comment/comment.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    CampRoutingModule
  ],
  declarations: [CampComponent, DetailsComponent, NewComponent, CommentComponent]
})
export class CampModule {}
