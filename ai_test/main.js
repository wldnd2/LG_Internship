var bridge = new WebOSServiceBridge();

function callMyService() {
    console.log("call my service");
    const url = 'luna://com.ai.test.app.service/hello';
    const params = {};
    bridge.onservicecallback = (msg) => {
        console.log(msg);
        let res = JSON.parse(msg);
        document.getElementById("txt_msg").innerHTML = res.Response;
    };
    bridge.call(url, JSON.stringify(params));
}

function pythonProcess() {
    console.log("call python process");
    const url = 'luna://com.ai.test.app.service/python_process';
    const params = {};
    bridge.onservicecallback = (msg) => {
        console.log(msg);
        let res = JSON.parse(msg);
        document.getElementById("txt_msg").innerHTML = res.Response;
    };
    bridge.call(url, JSON.stringify(params));
}