import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { UserListComponent } from './users/user-list/user-list.component';
import { ScheduleListComponent } from './schedules/schedule-list/schedule-list.component';
import { ScheduleEditComponent } from './schedules/schedule-edit/schedule-edit.component';

export const appRoutes: Routes = [
    { path: 'users', component: UserListComponent },
    { path: 'schedules', component: ScheduleListComponent },
    { path: 'schedules/:id/:mode', component: ScheduleEditComponent },
    { path: '', component: HomeComponent }
];
