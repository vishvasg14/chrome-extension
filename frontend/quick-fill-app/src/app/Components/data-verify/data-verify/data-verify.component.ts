import { Component, OnInit } from '@angular/core';
import { ChromeServiceService } from '../../../chrome-service.service';
import { Router } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';



declare var chrome: any;
@Component({
  selector: 'app-data-verify',
  templateUrl: './data-verify.component.html',
  styleUrl: './data-verify.component.css'
})
export class DataVerifyComponent implements OnInit {
  public newUpdatedData: any[] = [];
  public selectedCheckboxValues: string[] = [];


  constructor(private router: Router, private cdr: ChangeDetectorRef, public chromeServiceService: ChromeServiceService) { }
  ngOnInit(): void {
    this.getData()
  }

  // updateSelectedValues(checkboxValue: string): void {
    
  //   this.selectedCheckboxValues = this.newUpdatedData.value
  //     .filter((checkbox:any) => checkbox.checked)
  //     .map((checkbox:any) => checkbox.value);
  // }
  


  public isObject(value: any): boolean {
    return value && typeof value === 'object' && value.length !== undefined;
  }

  getDataCounter: any = 0;
  getData() {

    this.newUpdatedData = this.getObjectProperties(this.chromeServiceService.header || []);
    console.log("this.newUpdatedData", this.newUpdatedData);

    this.getDataCounter++;

    if (this.getDataCounter >= 2) {
      this.chromeServiceService.getTabsID().then((tabs: any) => {
        chrome.tabs.sendMessage(tabs, { action: "toster", toastType: "info", toastMessage: "All Data is Reset !!!" });
      });
    }

  }
  getObjectProperties(obj: any): any[] {
    return Object.entries(obj[0]).map(([key, value]) => ({ id: key, label: key, value: value }));
  }


  updatedData(): any {
    if (this.newUpdatedData.length === 0) {
      this.chromeServiceService.getTabsID().then((tabs: any) => {
        chrome.tabs.sendMessage(tabs, { action: "toster", toastType: "error", toastMessage: "Field Not Available !!!" });
      });
    } else {
      this.chromeServiceService.updatedFieldData = this.newUpdatedData
      console.log("Updated Data", this.newUpdatedData);
      this.chromeServiceService.getTabsID().then((tabs: any) => {
        chrome.tabs.sendMessage(tabs, { action: "toster", toastType: "success", toastMessage: "Data Updated Successfully !!!" });
      });
    }
  }



  locateField(getFieldID: any) {
    function locate(getIndex: any, json: any) {
      var data = document.querySelectorAll('[name="' + json[getIndex].id + '"],[id="' + json[getIndex].id + '"]')[0] as HTMLElement

      // Assuming you want to use the value input element
      console.log(data);
      if (data != null) {
        var border_of_ele = data.style.border;
        data.scrollIntoView({
          behavior: 'smooth',
          block: 'center'
        });
        data.style.border = '2px solid blue';
        // Remove the border after 2 seconds
        setTimeout(function () {
          data.style.border = border_of_ele;
        }, 2000);
      }
    }
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs: any[]) => {
      chrome.scripting
        .executeScript({
          target: { tabId: tabs[0].id },
          func: locate,
          args: [getFieldID, this.newUpdatedData],
        })
        .then(() => console.log("injected a function"));

    })

  }

  deleteField(index: number): void {
    // Remove the field at the specified index
    this.newUpdatedData.splice(index, 1);
  }



  back() {
    this.router.navigateByUrl('/' + "start");
  }
}
