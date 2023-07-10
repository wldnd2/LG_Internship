// eslint-disable-next-line import/no-unresolved
const pkgInfo = require('./package.json');
const Service = require('webos-service');
const spawn = require("child_process").spawn;

const service = new Service(pkgInfo.name); // Create service by service name on package.json

// a method that always returns the same value
service.register("hello", function(message) {
    console.log("HI!!!!!!");
    console.log(message);
    const name = message.payload.name ? message.payload.name : "JIWOONG";
    message.respond({
        returnValue: true,
        Response: "Hello, " + name + "!"
    });
});

service.register("python_process", function(message) {
    try{
        const net = spawn("python3", ["YOLO3.py"]);
        console.log("launching python script..");
        net.stdout.on("data", function (data) {
            console.log(data.toString());
            message.respond({
                returnValue: true,
                Response: data.toString()
            })
        });
    }
    catch{
        message.respond({
            returnValue: true,
            Response: "Error Generate!!"
        })
    }
});