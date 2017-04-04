import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';

import { SlimLoadingBarService } from 'ng2-slim-loading-bar';

 import { DateFormatPipe } from '../../shared/pipes/date-format.pipe';
import {DatepickerConfig} from 'ng2-bootstrap';
import * as _ from 'lodash';
import { IScheduleDetails } from '../../shared/interfaces';
import { DataService } from '../../shared/services/data.service';
import { ItemsService } from '../../shared/utils/items.service';
import { NotificationService } from '../../shared/utils/notification.service';
import { ConfigService } from '../../shared/utils/config.service';
import { MappingService } from '../../shared/utils/mapping.service';
import { IUser } from '../../shared/IUser';



@Component({
    moduleId: module.id,
    selector: 'app-schedule-edit',
    templateUrl: 'schedule-edit.component.html'
})
export class ScheduleEditComponent implements OnInit {
    mode: string;
    apiHost: string;
    id: number;
    schedule: IScheduleDetails;
    scheduleLoaded = false;
    statuses: string[];
    types: string[];
    private sub: any;
    addingUser = false;
    users: IUser[];
    userid: number;

    constructor(private route: ActivatedRoute,
        private router: Router,
        private dataService: DataService,
        private itemsService: ItemsService,
        private notificationService: NotificationService,
        private configService: ConfigService,
        private mappingService: MappingService,
        private loadingBarService:SlimLoadingBarService) { }

    ngOnInit() {
        // (+) converts string 'id' to a number
	    this.id = +this.route.snapshot.params['id'];
	    this.mode = this.route.snapshot.params['mode'];
        
        this.apiHost = this.configService.getApiHost();
        this.loadScheduleDetails();
    }

    loadScheduleDetails() {
        this.loadingBarService.start();
    
        
        this.dataService.getScheduleDetails(this.id)
            .subscribe((schedule: IScheduleDetails) => {
                this.schedule = this.itemsService.getSerialized<IScheduleDetails>(schedule);
                this.scheduleLoaded = true;
                // Convert date times to readable format
                this.schedule.timeStart = new Date(this.schedule.timeStart.toString()); // new DateFormatPipe().transform(schedule.timeStart, ['local']);
                this.schedule.timeEnd = new Date(this.schedule.timeEnd.toString()); //new DateFormatPipe().transform(schedule.timeEnd, ['local']);
                this.statuses = this.schedule.statuses;
                this.types = this.schedule.types;
                this.users = this.schedule.users;
                this.loadingBarService.complete();
            },
            error => {
                this.loadingBarService.complete();
                this.notificationService.printErrorMessage('Failed to load schedule. ' + error);
            });
    }

    saveSchedule(editScheduleForm: NgForm)
    {
        if(this.mode == 'new'){
            this.createSchedule(editScheduleForm);
        }
        else{
            this.updateSchedule(editScheduleForm);
        }
    }

    updateSchedule(editScheduleForm: NgForm) {
        console.log(editScheduleForm.value);

        var scheduleMapped = this.mappingService.mapScheduleDetailsToSchedule(this.schedule);

        this.loadingBarService.start();
        this.dataService.updateSchedule(scheduleMapped)
            .subscribe(() => {
                this.notificationService.printSuccessMessage('Schedule has been updated');
                this.loadingBarService.complete();
            },
            error => {
                this.loadingBarService.complete();
                this.notificationService.printErrorMessage('Failed to update schedule. ' + error);
            });
    }

    createSchedule(editScheduleForm: NgForm){
        var scheduleMapped = this.mappingService.mapScheduleDetailsToSchedule(this.schedule);
        console.log(scheduleMapped);
        this.loadingBarService.start();
        this.dataService.createSchedule(scheduleMapped).subscribe(() => {
            this.notificationService.printSuccessMessage('Schedule created');
            this.loadingBarService.complete();
        }, (error)=>{
            this.loadingBarService.complete();
            this.notificationService.printErrorMessage('Failed to create schedule. ' + error);
        }
        );
    }

    removeAttendee(attendee: IUser) {
        this.notificationService.openConfirmationDialog('Are you sure you want to remove '
            + attendee.name + ' from this schedule?',
            () => {
                this.loadingBarService.start();
                this.dataService.deleteScheduleAttendee(this.schedule.id, attendee.id)
                    .subscribe(() => {
                        this.itemsService.removeItemFromArray<IUser>(this.schedule.attendees, attendee);
                        this.notificationService.printSuccessMessage(attendee.name + ' will not attend the schedule.');
                        this.loadingBarService.complete();
                    },
                    error => {
                        this.loadingBarService.complete();
                        this.notificationService.printErrorMessage('Failed to remove ' + attendee.name + ' ' + error);
                    });
            });
    }

    add(){
        //   this.dataService.getUsers()
        //     .toPromise().then((users: IUser[]) => {
        //         this.users = users;
        //     }).catch(
        //     error => {
        //         this.notificationService.printErrorMessage('Failed to load users. ' + error);
        //     });
    
        this.addingUser = true;

    }

    addAttendee(){

        this.loadingBarService.start();

        let attendee: IUser = this.users.filter(u => u.id == this.userid)[0];
        console.log(_.isEmpty(_.find(this.schedule.attendees, attendee => attendee.id == this.userid)));
        if(!_.isEmpty(_.find(this.schedule.attendees, attendee => attendee.id == this.userid)))
        {
           this.notificationService.printErrorMessage("user already attending the schedule");
        }
        else{
             this.dataService.addScheduleAttendee(this.schedule.id, attendee.id)
                    .subscribe(() => {
                        this.itemsService.addItemToEnd(this.schedule.attendees,attendee);
                        this.notificationService.printSuccessMessage(attendee.name + ' will attend the schedule.');
                        this.loadingBarService.complete();
                    },
                    error => {
                        this.loadingBarService.complete();
                        this.notificationService.printErrorMessage('Failed to add ' + attendee.name + ' ' + error);
                    });

        }
        this.addingUser = false;
        this.userid = 0;
         
    }

    back() {
        this.router.navigate(['/schedules']);
    }

}