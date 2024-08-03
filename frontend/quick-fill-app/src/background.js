chrome.action.onClicked.addListener((tab) => {

    function injectPopup() {
        if(document.querySelectorAll('#QuickFillApp_main_iframe')?.length==0){
        

            var iframe = document.createElement('iframe');
            iframe.setAttribute('id', "QuickFillApp")
            var main_iframe = document.createElement('iframe_drag_ele');
            main_iframe.setAttribute('id', "QuickFillApp_main_iframe")
            main_iframe.setAttribute('style', `
               position: absolute;
                top: 2%;
                width:400px;
                min-height:455px;
                top: 5rem;
                left: 72%;
                z-index: 99999;
                border-radius: 16px;
                overflow: hidden;
                box-shadow: 0px 0px 20px 4px rgba(0, 0, 0, 0.15);
            `);
            iframe.setAttribute('style', `
                height: 100%;
                width: 100%;
                cursor: move; 
                border: none;
            `);
            iframe.src = chrome.runtime.getURL('index.html');
            document.body.appendChild(main_iframe);
            main_iframe.appendChild(iframe);   
            


            //--------------Make plugin draggable----------------//
            // The current position of mouse
            let x = 0;
            let y = 0;

            // Handle the mousedown event
            // that's triggered when user drags the element
            const mouseDownHandler = function (e) {
                // Get the current mouse position
                x = e.clientX;
                y = e.clientY;

                // Attach the listeners to `document`
                document.addEventListener('mousemove', mouseMoveHandler);
                document.addEventListener('mouseup', mouseUpHandler);
            };

            const mouseMoveHandler = function (e) {
                // How far the mouse has been moved
                const dx = e.clientX - x;
                const dy = e.clientY - y;

                // Set the position of element
                main_iframe.style.top = `${main_iframe.offsetTop + dy}px`;
                main_iframe.style.left = `${main_iframe.offsetLeft + dx}px`;

                // Reassign the position of mouse
                x = e.clientX;
                y = e.clientY;
            };

            const mouseUpHandler = function () {
                // Remove the handlers of `mousemove` and `mouseup`
                document.removeEventListener('mousemove', mouseMoveHandler);
                document.removeEventListener('mouseup', mouseUpHandler);
            };
            //END--------------Make plugin draggable----------------//
            main_iframe.addEventListener('mousedown', mouseDownHandler);


            // Create a button inside the main_iframe
            // var button = document.createElement('button');
            // button.textContent = 'Make Draggable';
            // button.addEventListener('click', makeDraggable);

            // // Append the button and main_iframe to the document
            // main_iframe.appendChild(button);
            // document.body.appendChild(main_iframe);
        } else {
            // if(document.getElementById("QuickFillApp").style.display == "block"){
            //     document.getElementById("QuickFillApp").style.display = "none";
            // }else if(document.getElementById("QuickFillApp").style.display == "none"){
            //     document.getElementById("QuickFillApp").style.display = "block";
            // }
            document.getElementById('QuickFillApp_main_iframe').style.display == 'block' ? document.getElementById('QuickFillApp_main_iframe').style.display = 'none' : document.getElementById('QuickFillApp_main_iframe').style.display = 'block';
        }
    }

    chrome.scripting.executeScript(
        {
            target: { tabId: tab.id },
            func: injectPopup,
        });
});


