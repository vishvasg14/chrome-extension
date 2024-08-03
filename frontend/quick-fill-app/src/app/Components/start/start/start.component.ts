import { Component, OnInit } from '@angular/core';
import { ChromeServiceService } from '../../../chrome-service.service';
import { Router } from '@angular/router';




declare var chrome: any
declare var $: any

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrl: './start.component.css'
})
export class StartComponent implements OnInit {



  constructor(public chromeServiceService: ChromeServiceService, private router: Router) { }

  public currentTabFields: any
  public fileName: string = '';
  public websiteUrl: string = '';
  public dateCreated: any

  getCurrentTabUrlAndDate(): any {
    chrome.tabs.query({ currentWindow: true, active: true }, (tabs: any) => {
      const getWebsite = tabs[0].url;
      this.websiteUrl = this.extractDomain(getWebsite);
      this.dateCreated = new Date().toLocaleDateString();
      // console.log("dateCreated",dateCreated);

    });
  }
  extractDomain(url: string): string {
    const parsedUrl = new URL(url);
    const hostname = parsedUrl.hostname;

    // Extract domain up to ".com"
    const dotComIndex = hostname.lastIndexOf('.com');
    if (dotComIndex !== -1) {
      return hostname.substring(0, dotComIndex + 4);
    } else {
      return hostname;
    }
  }

  onScan() {
    this.chromeServiceService.scanFormFields().then(() => {
      this.chromeServiceService.getTabsID().then((tabs: any) => {
        chrome.tabs.sendMessage(tabs, { action: "toster", toastType: "info", toastMessage: "All Fields Scanned !!!" });
      });
    });
  }



  onRun() {
    this.chromeServiceService.getTabsID().then(async (tabs: any) => {
      chrome.tabs.sendMessage(tabs, { action: 'scanAllFormFields' }, (field: any) => {
        // console.log("field",field);

        // await Promise.resolve();
        this.currentTabFields = field;
        this.chromeServiceService.getTabsID().then((tabs: any) => {
          chrome.tabs.sendMessage(tabs, { action: "toster", toastType: "info", toastMessage: "Wait for Scanning !!!" });
        });


        this.chromeServiceService.runProcess(this.currentTabFields);
        // this.chromeServiceService.getTabsID().then((tabs: any) => {
        //   chrome.tabs.sendMessage(tabs, { action: "toster", toastType: "info", toastMessage: "Go For AutoFill !!!" });
        // })

      });
    });
  }

  goToDashboard(){
    this.router.navigate(['dashboard']);
  }


  onAutoFill() {
    this.chromeServiceService.getData();
    this.chromeServiceService.getTabsID().then((tabs: any) => {
      chrome.tabs.sendMessage(tabs, { action: "toster", toastType: "success", toastMessage: "Form Filling Done !!!" });
    });
  }


  displayFileName(event: Event | undefined) {
    if (!event) {
      console.error("Event is undefined");
      return;
    }
    const inputElement = event.target as HTMLInputElement | null;
    if (!inputElement) {
      console.error("Target element is null");
      return;
    }
    const file = inputElement.files?.[0];
    console.log(file);

    if (file) {
       this.fileName = file.name;
      if (!this.fileName.toLowerCase().endsWith('.xlsx')) {
        this.fileName = ""
        this.chromeServiceService.getTabsID().then((tabs: any) => {
          chrome.tabs.sendMessage(tabs, { action: "toster", toastType: "error", toastMessage: "We Only Support Excel File !!!" });
        });
      }
      console.log("this.fileName", this.fileName);
    }
  }


  verifyFormFields() {
    this.router.navigate(['data-verification']);
    // this.router.navigateByUrl('data-verification');
  }


  DownloadExcel() {
    const fileNameInput = document.getElementById('fileNameInput') as HTMLInputElement;
    const yourfileName = fileNameInput.value || 'Your Form';
    // this.chromeServiceService.downloadFormDataCSV(yourfileName);
    this.chromeServiceService.downloadFormDataExcel(yourfileName);

  }
  


  ngOnInit(): void {
    this.chromeServiceService.processPluginSize();
    // this.processPluginSize();
    // this.pluginSize();
    this.getCurrentTabUrlAndDate();
  }
  title = 'quickFillApp';

  processPluginSize() {
    // setTimeout(() => { this.pluginSize(); }, 100);
    // setTimeout(() => { this.pluginSize(); }, 200);
    setTimeout(() => { this.pluginSize(); }, 1500);
  }


  pluginSize() {
    let pluginHeight = $('body').height();
    chrome.tabs.getCurrent((tabs: any) => {
      function pluginSize(pluginHeight1: any) {
        return (<HTMLElement>document.getElementById("QuickFillApp_main_iframe")).style.height = pluginHeight1 + 50 + 'px';
      }
      chrome.scripting.executeScript({
        target: { tabId: tabs.id },
        func: pluginSize,
        args: [pluginHeight],
      }, function () { });
    });
  }

  closePopup() {
    chrome.tabs.getCurrent((tabs: any) => {
      function pluginSize() {
        return (<HTMLElement>document.getElementById("QuickFillApp_main_iframe")).style.display = 'none';
      }
      chrome.scripting.executeScript({
        target: { tabId: tabs.id },
        func: pluginSize,
      }, function () { });
    });
  }
}
