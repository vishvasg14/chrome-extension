window.onload = () => {
  // let formData = {};
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "toster") {
      Swal.fire({
        position: "center",
        icon: request.toastType,
        title: request.toastMessage,
        showConfirmButton: false,
        timer: 2500,
      });
    }

    if (request.action === "scanAllFormFields") {
      const formData = {};
      // debugger
      document.querySelectorAll("form").forEach((form) => {
        // document.querySelectorAll("input, select, textarea").forEach((a) => {
        if (!form) {
          console.error("Form not found: ", form);
          return; // Handle form not found case
        }
        // const formDataObject = {};
        // new FormData(a).forEach((value, key) => {
        //   formData[key] = value;
        // });
        form
          .querySelectorAll("input, select, textarea, checkbox, radio")
          .forEach((field) => {
            // Skip hidden fields
            // console.log("field",field);
            if (field.type !== "hidden" && !field.hidden) {
              if (field.type === "checkbox") {
                if (!formData[field.name]) {
                  formData[field.name] = [];
                }

                const checkboxOption = {
                  value: field.value,
                  checked: field.checked,
                };

                formData[field.name].push(checkboxOption);

                // If you want to store only the values of the checked checkboxes separately

                // if (field.checked) {
                //   const key = `${field.name}[${checkboxOption.value}]`;
                //   formData[key] = checkboxOption.value;
                // }
              } else if (field.type === "radio") {
                // Handle radio buttons
                if (field.checked) {
                  formData[field.name] = field.value;
                } else if (!formData[field.name]) {
                  // If none of the radio buttons is checked, use the name
                  formData[field.name] = "";
                }
              } else {
                // Handle input and textarea elements
                const currentValue = field.value;
                if (formData[field.name] !== currentValue) {
                  // Only update if the value has changed
                  formData[field.name] = currentValue;
                }
              }
            }
          });
      });
      const filteredField = Object.fromEntries(
        Object.entries(formData).filter(
          ([key, value]) =>
            key.length <= 32767 && (!value || value.toString().length <= 32767)
        )
      );
      const isDuplicate = this.header?.some((existingField) => {
        // Compare fields, adjust this condition based on your field comparison logic
        return (
          existingField.name === filteredField["name"] &&
          existingField.type === filteredField["type"]
        );
      });

      console.log("formData", filteredField);
      if (!isDuplicate) {
        sendResponse(filteredField);
      } else {
        console.log("same filterdField found");
      }
    }

    if (request.action === "fieldMatching") {
      const getData = request.sendData;
      console.log("getData", getData);

      for (const key in getData) {
        console.log(key);
        if (getData.hasOwnProperty(key)) {
          // Find the HTML element with the corresponding attribute
          const element = document.querySelector(`[name="${key}"]`);
          const chkbx = document.querySelectorAll('[type="checkbox"]');
          const allRadio = document.querySelectorAll('[type="radio"]');
          if (chkbx.length > 0) {
            for (let index = 0; index < chkbx.length; index++) {
              if (chkbx[index].value == getData[key]) {
                chkbx[index].checked = true;
              }
            }
          }
          if (allRadio.length > 0) {
            for (let index = 0; index < allRadio.length; index++) {
              if (allRadio[index].value == getData[key]) {
                allRadio[index].checked = true;
              }
            }
          }

          // Update the value of the HTML element
          if (element) {
            element.value = getData[key];
          }
        }
      }
    }

   

    function updateElementValue(key, value) {
      const element = document.querySelector(`[name="${key}"]`);
      const chkbx = document.querySelectorAll('[type="checkbox"]');
      const allRadio = document.querySelectorAll('[type="radio"]');

      switch (element && element.type) {
        case "checkbox":
          chkbx.forEach((checkbox) => {
            if (checkbox.value == value) {
              checkbox.checked = true;
            }
          });
          break;

        case "radio":
          allRadio.forEach((radio) => {
            if (radio.value == value) {
              radio.checked = true;
            }
          });
          break;

        default:
          if (element) {
            element.value = value;
          }
      }
    }
  });
};


function getTabsID() {
  return new Promise(function (resolve, reject) {
    chrome.runtime.sendMessage({ action: "getTabId" }, function (response) {
      resolve(response?.tabId);
    });
  });
}