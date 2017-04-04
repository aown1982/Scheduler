import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import './rxjs-operators';

import { PaginationModule  } from 'ng2-bootstrap';
import { DatepickerModule } from 'ng2-bootstrap';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { ModalModule } from 'ng2-bootstrap';
import { ProgressbarModule } from 'ng2-bootstrap';
import { TimepickerModule } from 'ng2-bootstrap';
import { ComponentLoaderFactory } from 'ng2-bootstrap/component-loader';
import { Positioning, PositioningService } from 'ng2-bootstrap/positioning'
import { AppComponent } from './app.component';
import { DateFormatPipe } from './shared/pipes/date-format.pipe';
import { HighlightDirective } from './shared/directives/highlight.directive';
import { HomeComponent } from './home/home.component';
import { MobileHideDirective } from './shared/directives/mobile-hide.directive';
import { appRoutes } from './app.routes';
import { SlimLoadingBarModule } from 'ng2-slim-loading-bar';
 
import { DataService } from './shared/services/data.service';
import { ConfigService } from './shared/utils/config.service';
import { ItemsService } from './shared/utils/items.service';
import { MappingService } from './shared/utils/mapping.service';
import { NotificationService } from './shared/utils/notification.service';
import { ScheduleListComponent } from './schedules/schedule-list/schedule-list.component';
import { ScheduleEditComponent } from './schedules/schedule-edit/schedule-edit.component';
import { UserCardComponent } from './users/user-card/user-card.component';
import { UserListComponent } from './users/user-list/user-list.component';
import { RouterModule } from '@angular/router';
@NgModule({
  declarations: [
    AppComponent,
    DateFormatPipe,
    HighlightDirective,
    MobileHideDirective,
    HomeComponent,
    ScheduleListComponent,
    ScheduleEditComponent,
    UserCardComponent,
    UserListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    Ng2BootstrapModule,
        ModalModule,
        ProgressbarModule,
        PaginationModule.forRoot(),
        TimepickerModule,
    RouterModule.forRoot(appRoutes),
    SlimLoadingBarModule.forRoot() ],
  providers: [
        ConfigService,
        DataService,
        ItemsService,
        MappingService,
        NotificationService,
        ComponentLoaderFactory,
        PositioningService
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
