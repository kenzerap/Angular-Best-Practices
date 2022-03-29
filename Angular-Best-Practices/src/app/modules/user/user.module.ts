import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './user-routing.module';
import { UserListComponent } from './components/user-list/user-list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { StoreModule } from '@ngrx/store';
import * as fromUser from './store/reducers';
import { EffectsModule } from '@ngrx/effects';
import { UserEffects } from './store/effects/user.effects';
import { UserCreateEditComponent } from './components/user-create-edit/user-create-edit.component';

@NgModule({
  imports: [
    CommonModule,
    UserRoutingModule,
    SharedModule,
    StoreModule.forFeature(fromUser.featureKey, fromUser.reducers),
    EffectsModule.forFeature([
      UserEffects
    ]),
  ],
  declarations: [UserListComponent, UserCreateEditComponent],
})
export class UserModule { }
