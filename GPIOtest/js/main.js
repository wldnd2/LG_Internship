window.onload = function() {
    let bridge = new WebOSServiceBridge();

    const peripheralURI = 'luna://com.webos.service.peripheralmanager';
    const gpio_open ="/gpio/open";
    const gpio_close = "/gpio/close";
    const gpio_setDirection = "/gpio/setDirection";
    const gpio_setValue = "/gpio/setValue";
    const gpio_getValue = "/gpio/getValue";
    const gpio_pNum = "gpio17";

    const gpio_status = document.getElementById("js-peripheral-open-btn");
    gpio_status.addEventListener('click', change_gpio_status);

    const gpio_status_2 = document.getElementById("js-peripheral-close-btn");
    gpio_status_2.addEventListener('click', change_gpio_status_2);

    bridge.onservicecallback = init_state;
    bridge.call(peripheralURI+gpio_getValue, '{"pin":"' +gpio_pNum+ '"}');

    // bridge.onservicecallback = open_callback;
    // bridge.call(peripheralURI+gpio_open,'{"pin" :"' + gpio_pNum+'"}');
    function init_state(msg){
        let arg = JSON.parse(msg);
        display_log("vlaue : "+arg.value +" subscribed : "+ arg.subscribed +" returnValue : "+ arg.returnValue);
    }

    function change_gpio_status(msg){
        if (gpio_status.dataset.flag == "closed") {
            console.log (peripheralURI+gpio_open+' {"pin":"' + gpio_pNum +'"}');
            // calling open method to open the pin
            bridge.onservicecallback = open_callback;
            bridge.call(peripheralURI+gpio_open, '{"pin":"' + gpio_pNum +'"}');
        } else {
            console.log (peripheralURI+gpio_close+' {"pin":"' + gpio_pNum +'"}');
        }

    }

    function change_gpio_status_2(msg){
        if (gpio_status_2.dataset.flag == "open") {
            console.log (peripheralURI+gpio_close+' {"pin":"' + gpio_pNum +'"}');
            // calling close method to open the pin
            bridge.onservicecallback = close_callback;
            bridge.call(peripheralURI+gpio_close, '{"pin":"' + gpio_pNum +'"}');
        } else {
            console.log (peripheralURI+gpio_open+' {"pin":"' + gpio_pNum +'"}'); 
        }

    }

    function open_callback(msg){
        let arg = JSON.parse(msg);
        if(arg.returnValue){
            display_log("[GPIO] open " + arg.returnValue);  
            bridge.onservicecallback = setDirection_callback;
            bridge.call(peripheralURI+gpio_setDirection,'{"pin":"' + gpio_pNum +'", "direction" : "in"}');         
        }
        else{
            display_log("[GPIO] open error");
            console.error("[GPIO] open error" + arg.errorText);
        }
    }

    function close_callback(msg){
        let arg = JSON.parse(msg);
        if(arg.returnValue){
            display_log("[GPIO] close " + arg.returnValue);       
        }
        else{
            display_log("[GPIO] close error");
            console.error("[GPIO] close error" + arg.errorText);
        }
    }
    
    function setDirection_callback(msg){
        let arg = JSON.parse(msg);
        if(arg.returnValue){
            display_log("[GPIO] setValue success");
            bridge.onservicecallback = getValue_callback;
            bridge.call(peripheralURI+gpio_getValue,'{"pin":"' +gpio_pNum+ '"}') 
        }
        else{
            console.error("[GPIO] setDirection error" + arg.errorText);
        }

    }

    function getValue_callback(msg){
        let arg = JSON.parse(msg);
        display_log(arg.returnValue)
        if(arg.returnValue){
            display_log("[GPIO] getValue success");
            if(arg.value == 'low'){
                display_log("[Press Sensor : off]")
            }
            else{
                display_log("[Press Sensor : on]")
            }
        }
        else{
            display_log("[GPIO] getValue fail");
            console.error("[GPIO] getValue error");
        }
    }

    function display_log(msg) {
        let responseWindow = document.getElementById('response-window');
        responseWindow.innerHTML = msg + '<br>' + responseWindow.innerHTML;
    }
}