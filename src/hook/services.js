// class WebOSServiceBridge {
//   constructor() {
//     this.webOSBridge = typeof window !== "undefined" && "WebOSServiceBridge" in window ? new window.WebOSServiceBridge() : {};
//   }

//   call = (url, params, callback) => {
//     if (typeof this.webOSBridge.call === "function") {
//       this.webOSBridge.call(url, JSON.stringify(params), (response) => {
//         callback(JSON.parse(response));
//       });
//     } else {
//       console.error("WebOSServiceBridge.call is not a function.");
//     }
//   };
// }

// // export default WebOSServiceBridge;
import LS2Request from "@enact/webos/LS2Request";
let webOSBridge = new LS2Request();

// const creatToast = () => {
//     var parms = {
//        "message": "This is Toast Alarm"
//     }

//     var lsRequest = {
//        "service":"luna://com.webos.notification",
//        "method":"createToast",
//        "parameters": parms,
//        "onSuccess": onToastSuccess,
//        "onFailure": onToastFailure
//     };
//     webOSBridge.send(lsRequest);
//  }
export function CallMyService() {
  console.log("call my service");
  const url = "luna://com.test.webapp.service/hello";
  const params = {};
  webOSBridge.onservicecallback = (msg) => {
    console.log(msg);
    let res = JSON.parse(msg);
    document.getElementById("txt_msg").innerHTML = res.Response;
  };
  webOSBridge.call(url, JSON.stringify(params));
}

export function PythonProcess() {
  const url = "luna://com.test.webapp.service/python_process";
  const params = {};
  document.getElementById("txt_msg").innerHTML = "AI Start!";
  webOSBridge.onservicecallback = (msg) => {
    let res = JSON.parse(msg);
    document.getElementById("txt_msg").innerHTML = res.Response;
  };
  webOSBridge.call(url, JSON.stringify(params));
}

// export function MonitorOn() {
//   const url = "luna://com.test.webapp.service/monitorOn";
//   const params = {};
//   document.getElementById("txt_msg").innerHTML = "monitorOn";
//   webOSBridge.onservicecallback = (msg) => {
//     let res = JSON.parse(msg);
//     document.getElementById("txt_msg").innerHTML = res.Response;
//   };
//   webOSBridge.(url, JSON.stringify(params));
// }

export function MonitorOn() {
  var parms = {
    message: "monitorOn",
  };

  var lsRequest = {
    service: "luna://com.test.webapp.service/monitorOn",
    method: "MonitorOn",
    parameters: parms,
    onSuccess: onToastSuccess,
    onFailure: onToastFailure,
  };
  const onToastSuccess = (msg) => {
    console.log(msg);
  };

  const onToastFailure = (msg) => {
    console.log(msg);
  };
  webOSBridge.send(lsRequest);
}
