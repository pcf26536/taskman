import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  // views
  private allTasks = new BehaviorSubject(true);
  sharedAllTasks = this.allTasks.asObservable();

  private todayView = new BehaviorSubject(false);
  sharedTodayView = this.todayView.asObservable();

  private calenderView = new BehaviorSubject(false);
  sharedCalenderView = this.calenderView.asObservable();

  private trashView = new BehaviorSubject(false);
  sharedTrashView = this.trashView.asObservable();
  
  private searchResults = new BehaviorSubject(false);
  sharedSearchResults = this.searchResults.asObservable();

  private createTaskField = new BehaviorSubject(true);
  sharedCreateTaskField = this.createTaskField.asObservable();

  private trashBar = new BehaviorSubject(false);
  sharedTrashBar = this.trashBar.asObservable();

  currentView:number = 1;

  constructor() { }

  nextAllTasksStatus(allTasks: boolean) {
    this.allTasks.next(allTasks);
  }

  nextTodayViewStatus(todayView: boolean) {
    this.todayView.next(todayView);
  }

  nextCalenderViewStatus(calenderView: boolean) {
    this.calenderView.next(calenderView);
  }

  nextTrashViewStatus(trashView: boolean) {
    this.trashView.next(trashView);
  }

  nextSearchResultsStatus(searchResults: boolean) {
    this.searchResults.next(searchResults);
  }

  nextCreateTaskFieldStatus(createTaskField: boolean) {
    this.createTaskField.next(createTaskField);
  }

  nextTrashBarStatus(trashBar: boolean) {
    this.trashBar.next(trashBar);
  }

  switchView(selectedViewNo: number) {
    /*
    View 1: All task
    view 2: today view
    view 3: calendar view
    view 4: trash
    view 5: search
    */
    
    if (selectedViewNo == this.currentView) return;

    switch(selectedViewNo) { 
      case 1: { 
        // activate
         this.allTasks.next(true);
         this.createTaskField.next(true);
         // deactivate
         this.todayView.next(false);
         this.calenderView.next(false);
         this.trashView.next(false);
         this.trashBar.next(false);
         this.searchResults.next(false);
         // update current view
         this.currentView = 1;
         break; 
      } 
      case 2: { 
        // activate
        this.createTaskField.next(true);
        this.todayView.next(true);
        // deactivate
        this.allTasks.next(false);
        this.calenderView.next(false);
        this.trashView.next(false);
        this.trashBar.next(false);
        this.searchResults.next(false);
        // update current view
        this.currentView = 2;
         break; 
      } 
      case 3: {
        // activate/show
        this.calenderView.next(true);
        // deactive/hide
        this.createTaskField.next(false);
        this.allTasks.next(false);
        this.todayView.next(false);
        this.trashView.next(false);
        this.trashBar.next(false);
        this.searchResults.next(false);
        // update current view
         this.currentView = 3;
         break;    
      } 
      case 4: {
        // activate
        this.trashView.next(true);
        this.trashBar.next(true); 
        // deactivate
        this.allTasks.next(false);
        this.createTaskField.next(false);
        this.todayView.next(false);
        this.calenderView.next(false);
        this.searchResults.next(false);
        // update current view
        this.currentView = 4; 
         break; 
      }
      case 5: {
        // activate
        this.searchResults.next(true); 
        // deactivate  
        this.allTasks.next(false);
        this.createTaskField.next(false);
        this.todayView.next(false);
        this.calenderView.next(false);
        this.trashView.next(false);
        this.trashBar.next(false);
        // update current view
         this.currentView = 5;
         break;              
      } 
   }

  }

}
