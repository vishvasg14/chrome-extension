import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';
// import { Subject } from 'rxjs';

declare var chrome: any;
declare var $: any;

@Injectable({
  providedIn: 'root'
})
export class ChromeServiceService {
  public header: any;
  public collectedFieldData: any[] = [];
  public updatedFieldData: any[] = [];

  public dataFromSheet: any

  public dataToStore: any = {};


  constructor() { }

  getData() {
    this.getTabsID().then((tabs: any) => {
      chrome.tabs.sendMessage(tabs, { action: 'fieldMatching', sendData: this.dataToStore })
    })
  }

  // _________________________________________ To Get Current Tab ID  _____________________________________ 
  getTabsID() {
    return new Promise(function (resolve, reject) {
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs: any) {
        // tabs is an array of tab objects for the current window
        if (tabs && tabs.length > 0) {
          const currentTabId = tabs[0].id;
          // console.log("Current Tab ID:", currentTabId);
          resolve(currentTabId);
        } else {
          console.error("Unable to get current tab information.");
        }
      });
    })

  }
  // ________________________________________________________________________________________________________
  getCurrentTab() {

    return new Promise(function (resolve, reject) {
      chrome.tabs.getCurrent((tab:any) => {
        resolve(tab);
      });
    });
  }
 

pluginSize() {
    let pluginHeight =  $('head').height() + $('body').height()+ 50 + 'px';
    pluginHeight = pluginHeight < '523.7px' ? pluginHeight : '573.7px';
    this.getCurrentTab().then((tab) => {
      function pluginSize(pluginHeight1: any) {
        const element = document.getElementById("QuickFillApp_main_iframe");
        if (element !== null) {
          // return element.style.height = 'min(90%, ' + pluginHeight1 + ')';
          return element.style.height = pluginHeight1;
        }
        return;
      }
      chrome.scripting.executeScript({
        target: { tabId: (tab as any).id },
        func: pluginSize,
        args: [pluginHeight],
      }, function (selection: any) { });
    });
  }

  
  processPluginSize() {
    setTimeout(() => { this.pluginSize(); }, 200);
    setTimeout(() => { this.pluginSize(); }, 1000);
    setTimeout(() => { this.pluginSize(); }, 3500);
  }

  // ________________________________scanning all fields and data________________________________________
  async scanFormFields(): Promise<any> {
    // Check if this.header is already set
    // let newField:any
    new Promise((resolve) => {
      this.getTabsID().then(async (tabs: any) => {
        chrome.tabs.sendMessage(tabs, { action: 'scanAllFormFields' }, (field: any) => {
          console.log(tabs);

          console.log("field get from content.js:", field);
          if (field) {
            this.header = [];

            // -----------------Push to Header for sending to verification----------------------------------------
            this.header.push(field);
   
            resolve(field);
          } else {
            resolve(field)
            this.getTabsID().then((tabs: any) => {
              chrome.tabs.sendMessage(tabs,
                { action: "toster", toastType: "error", toastMessage: "No Form Found to Scan !!!" });
            })

            console.error("No form fields found.");
          }
        })
      });
    })
  }

  //______________________________________________________________________________________________________________________


  //________________________________ object to key:value pair  __________________________________________
  getObjectProperties(obj: any): any[] {
    return Object.entries(obj[0]).map(([key, value]) => ({ id: key, label: key, value: value }));
  }

  //____________________________________________________________________________________________________________


  //________________________________________ download excel sheet ____________________________________________________
  downloadFormDataExcel(fileName: string): void {
    // const newupdatedFieldData = this.updatedFieldData.filter(item => typeof item.value === 'string');

    const newupdatedFieldData = this.updatedFieldData;

    // console.log("this.updatedFieldData faevihvarvaioryhvaowrhy", dcsdnewupdatedFieldData);

    // Check if this.header is not empty
    if (newupdatedFieldData && newupdatedFieldData.length > 0) {
      const ids = newupdatedFieldData.map(newid => newid.id);
      const labels = newupdatedFieldData.map(newid => newid.label);
      const values = newupdatedFieldData.map(data => data.value);

      const checkbox = Object.values(newupdatedFieldData)

      const listOfChecked = checkbox.reduce((acc, key) => {
        if (key.value instanceof Object) {
          const checkedValues = Object.values(key.value)
            .filter((item: any) => item.checked)
            .map((value: any) => {
              return {
                id: value.value,
                label: key.label,
                value: value.value
              };
            });

          acc.push(...checkedValues);
        }
        return acc;
      }, []);

      console.log("listOfChecked", listOfChecked);
      const checkboxids = listOfChecked.map((chkbxid: { value: any; }) => chkbxid.value);
      const checkboxlabels = listOfChecked.map((chkbxid: { label: any; }) => chkbxid.label);
      const checkboxvalues = listOfChecked.map((chkbxid: { value: any; }) => chkbxid.value);



      // Truncate keys longer than 100 characters
      const truncatedIds = ids.map(key => (key.length > 100 ? key.substring(0, 97) + '...' : key));

      // Combine truncated keys and values into a 2D array
      truncatedIds.unshift("id");
      labels.unshift("Labels");
      values.unshift("Values");
      truncatedIds.push(...checkboxids);
      labels.push(...checkboxlabels);
      values.push(...checkboxvalues);

      const excelData = [truncatedIds, labels, values];
      console.log("excelData",excelData);

      // Create a workbook
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet(excelData));

      // Convert the workbook to an ArrayBuffer
      const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });

      // Create a Blob from the ArrayBuffer
      const blob = new Blob([excelBuffer], { type: "application/octet-stream" });

      // Generate a download link
      const downloadLink = document.createElement("a");
      downloadLink.href = URL.createObjectURL(blob);
      downloadLink.download = `${fileName}.xlsx`;

      // Trigger the download after a short delay
      document.body.appendChild(downloadLink);
      setTimeout(() => {
        downloadLink.click();
      }, 200);

      // Show toast after the delay
      this.getTabsID().then((tabs: any) => {
        chrome.tabs.sendMessage(tabs,
          { action: "toster", toastType: "success", toastMessage: "Download is started !!!" });
      });

      // Clean up
      document.body.removeChild(downloadLink);
    } else {

      this.getTabsID().then((tabs: any) => {
        chrome.tabs.sendMessage(tabs,
          { action: "toster", toastType: "error", toastMessage: "Please Provide us Excel File !!!" });
      });
      console.error("No form fields to download.");
    }
  }

  //____________________________________________________________________________________________________________

  set_time_out(ms: any) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }


  runProcess(tabformFields: any): void {

    let allcheckboxValues: Record<string, string> = {};
    if (!tabformFields) {
      this.getTabsID().then((tabs: any) => {
        chrome.tabs.sendMessage(tabs,
          { action: "toster", toastType: "error", toastMessage: "No file provided to Compare !!!" });
      })
      console.error('No file data provided');
      return;
    }

    const keysWithArrays = Object.values(tabformFields).filter(value => Array.isArray(value)) as unknown[][];

    for (let i = 0; i < keysWithArrays.length; i++) {
      for (let j = 0; j < keysWithArrays[i].length; j++) {
        const element = keysWithArrays[i][j] as object & Record<"value", unknown>;
        if (typeof element === 'object' && element !== null && 'value' in element) {
          allcheckboxValues[element.value as string] = '';
        }
      }
    }
    const scannedAllFields={...tabformFields, ...allcheckboxValues }

    // console.log("allcheckboxValues________", allcheckboxValues);

    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    const selectedFile = fileInput.files?.[0];

    if (!selectedFile) {
      this.getTabsID().then((tabs: any) => {
        chrome.tabs.sendMessage(tabs,
          { action: "toster", toastType: "error", toastMessage: "Please Provide us Excel File !!!" });
      });
      console.error('No file selected');
      return;
    }

    const reader = new FileReader();
    reader.readAsBinaryString(selectedFile);

    reader.onload = (event) => {
      const binaryString = event.target?.result as string;

      // Handle the file content
      this.handleFileContent(binaryString);
      if (scannedAllFields) {
        this.set_time_out(5000).then(() => {
          this.findMatchingValue(scannedAllFields, this.dataFromSheet);
          this.getTabsID().then((tabs: any) => {
            chrome.tabs.sendMessage(tabs,
              { action: "toster", toastType: "success", toastMessage: "Go For AutoFill !!!" });
          });
        })
      } else {
        this.getTabsID().then((tabs: any) => {
          chrome.tabs.sendMessage(tabs,
            { action: "toster", toastType: "error", toastMessage: "Please Provide us Excel File !!!" });
        });
      }

    };
    // Read the content of the selected file as binary

  }



  handleFileContent(binaryString: string): void {
    const workbook = XLSX.read(binaryString, { type: 'binary' });
    const firstSheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[firstSheetName];
    const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
    // console.log("jsonData", jsonData);

    this.dataFromSheet = this.dataExtraction(jsonData)
    console.log("dataFromSheet", this.dataFromSheet);



  }
  dataExtraction(obj: any): any[] {
    const headerRow = obj[0];
    const labelsRow = obj[1];
    const valuesRow = obj[2];

    return headerRow.map((id: any, index: string | number) => ({
      id,
      label: labelsRow[index],
      value: valuesRow[index]
    }));
  }

  async findMatchingValue(jsonData1: any, jsonData2: any[]): Promise<void> {
    console.log("jsonData1, jsonData2", jsonData1, jsonData2);


    for (const key1 in jsonData1) {
      if (Object.prototype.hasOwnProperty.call(jsonData1, key1)) {
        // console.log("key1 form jasonDAta1", key1);

        const matchingItem = jsonData2.find(item2 => item2.id === key1);
        // console.log("matchingItem", matchingItem);

        if (matchingItem) {
          const key = matchingItem.id;
          // const valueFromJson1 = jsonData1[key1];
          const valueFromJson2 = matchingItem.value;
          // console.log("key,valueFromJson2",valueFromJson2);
          

          console.log(`Matching key: ${key}, Value from JSON 2: ${valueFromJson2}`);

          this.dataToStore[key] = valueFromJson2;
        }
      }
    }
    console.log("Stored data in Chrome storage:", this.dataToStore);
    console.log("this.dataToStore",this.dataToStore);
    
  }






}
