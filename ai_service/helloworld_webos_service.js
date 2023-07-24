// eslint-disable-next-line import/no-unresolved
const pkgInfo = require("./package.json");
const Service = require("webos-service");
const fs = require("fs");
const spawn = require("child_process").spawn;

const service = new Service(pkgInfo.name); // Create service by service name on package.json
const logHeader = "[" + pkgInfo.name + "]";

let flag = 0;
let doInitGPIO = true;
let doInitGPIO2 = true;

// 등록되고 다른 어플리케이션에서 실행하는 예제
service.register("hello", (message) => {
  const name = message.payload.name ? message.payload.name : "jiwoong";
  console.log(name);
  message.respond({
    returnValue: true,
    Response: "Hello, " + name + "!",
  });
});

service.register("python_process", function (message) {
  console.log("call python_process");
  LEDon();
  const net1 = spawn("python3", ["CAM.py"]);
  net1.stdout.on("data", function (data) {
    const result = data.toString();
    console.log(`python 1result: ${result.toString()}`);
    const net2 = spawn("python3", ["YOLO3.py"]);
    net2.stdout.on("data", function (data) {
      const result = data.toString();
      console.log(`python 2result: ${result.toString()}`);
      message.respond({
        returnValue: true,
        Response: result,
      });
    });
  });
  LEDoff();
});

//Toast function
function creatToast_open() {
  let url = "luna://com.webos.notification/createToast";
  let params = {
    message: "Refrigerators Open~!",
  };

  service.call(url, params, (m2) => {
    console.log(logHeader, "SERVICE_METHOD_CALLED:com.webos.notification/createToast");
  });
}

function creatToast_close() {
  let url = "luna://com.webos.notification/createToast";
  let params = {
    message: "Refrigerators Close!",
  };

  service.call(url, params, (m2) => {
    console.log(logHeader, "SERVICE_METHOD_CALLED:com.webos.notification/createToast");
  });
}

//GPIO function
function readPin17() {
  let url = "luna://com.webos.service.peripheralmanager/gpio/getValue";
  let params = {
    pin: "gpio17",
  };

  service.call(url, params, (m2) => {
    console.log(logHeader, m2);
    if (m2.payload.value === "low" && flag == 0) {
      creatToast_open();
      flag = 1;
    } else if (m2.payload.value === "high" && flag == 1) {
      creatToast_close();
      let url = "luna://com.test.webapp.service/python_process";
      service.call(url, {}, (m2) => {
        console.log(logHeader, m2);
      });

      flag = 0;
    }
  });
}

//regist service
service.register("monitorOn", (msg) => {
  console.log(logHeader, msg);

  //GPIO 설정
  if (doInitGPIO) {
    let url = "luna://com.webos.service.peripheralmanager/gpio/open";
    let params = {
      pin: "gpio17",
    };

    service.call(url, params, (m2) => {
      console.log(logHeader, m2);
    });

    url = "luna://com.webos.service.peripheralmanager/gpio/setDirection";
    params = {
      pin: "gpio17",
      direction: "in",
    };

    service.call(url, params, (m2) => {
      console.log(logHeader, m2);
    });

    doInitGPIO = false;
  }

  if (doInitGPIO2) {
    let url = "luna://com.webos.service.peripheralmanager/gpio/open";
    let params = {
      pin: "gpio4",
    };

    service.call(url, params, (m2) => {
      console.log(logHeader, m2);
    });

    url = "luna://com.webos.service.peripheralmanager/gpio/setDirection";
    params = {
      pin: "gpio4",
      direction: "outLow",
    };

    service.call(url, params, (m2) => {
      console.log(logHeader, m2);
    });

    doInitGPIO2 = false;
  }

  //heartbeat
  const sub = service.subscribe("luna://com.test.webapp.service/heartbeat", { subscribe: true });
  const max = 120;
  let count = 0;
  sub.addListener("response", function (msg) {
    console.log(JSON.stringify(msg.payload));
    readPin17();
    if (++count >= max) {
      sub.cancel();
      setTimeout(function () {
        console.log(max + " response recived, exiting...");
        process.exit(0);
      }, 1000);
    }
  });
  //heartbeat end

  msg.respond({
    returnValue: true,
    Response: "Press-monitor-interval creat",
  });
});

//handle subscription requests
const subscriptions = {};
let heartbeatinterval;
let x = 1;
function createHeartBeatInterval() {
  if (heartbeatinterval) {
    return;
  }
  console.log(logHeader, "create_heartbeatinterval");
  heartbeatinterval = setInterval(function () {
    sendResponses();
  }, 1000);
}

// send responses to each subscribed client
function sendResponses() {
  console.log(logHeader, "send_response");
  console.log("Sending responses, subscription count=" + Object.keys(subscriptions).length);
  for (const i in subscriptions) {
    if (Object.prototype.hasOwnProperty.call(subscriptions, i)) {
      const s = subscriptions[i];
      s.respond({
        returnValue: true,
        event: "beat " + x,
      });
    }
  }
  x++;
}

var heartbeat = service.register("heartbeat");
heartbeat.on("request", function (message) {
  console.log(logHeader, "SERVICE_METHOD_CALLED:/heartbeat");
  message.respond({ event: "beat" }); // initial response
  if (message.isSubscription) {
    subscriptions[message.uniqueToken] = message; //add message to "subscriptions"
    if (!heartbeatinterval) {
      createHeartBeatInterval();
    }
  }
});
heartbeat.on("cancel", function (message) {
  delete subscriptions[message.uniqueToken]; // remove message from "subscriptions"
  var keys = Object.keys(subscriptions);
  if (keys.length === 0) {
    // count the remaining subscriptions
    console.log("no more subscriptions, canceling interval");
    clearInterval(heartbeatinterval);
    heartbeatinterval = undefined;
  }
});

//LED 키기
function LEDon() {
  let url = "luna://com.webos.service.peripheralmanager/gpio/setValue";
  let params = {
    pin: "gpio4",
    value: "high",
  };
  service.call(url, params, (m2) => {
    console.log(logHeader, m2);
  });
  // LED 끄기
  function LEDoff() {
    let url = "luna://com.webos.service.peripheralmanager/gpio/setValue";
    let params = {
      pin: "gpio4",
      value: "low",
    };
    service.call(url, params, (m2) => {
      console.log(logHeader, m2);
    });
  }
}
