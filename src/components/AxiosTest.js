import { Cell, Row } from "@enact/ui/Layout";
import { useCallback, useEffect, useState } from "react";
import Button from "@enact/ui/Button";
import clientApi from "../api/axios";
/* eslint-disable */
var bridge = new WebOSServiceBridge();
const AxiosTest = ({ cities, selectedCountry, ...rest }) => {
  const [test, setTest] = useState();
  const getTest = () => {
    console.log("getTest");
    clientApi
      .get("/GetMappingTest")
      .then((Response) => {
        console.log(Response.data);
        setTest(Response.data);
      })
      .catch((Error) => {
        console.log(Error);
      });
  };

  var config = {
    headers: {
      "Content-Type": "text/plain",
    },
    responseType: "text",
  };
  const postTest = () => {
    console.log("postTest");
    clientApi
      .post("/PostMappingTest", { text: "hi" }, config)
      .then((Response) => {
        console.log(Response.data);
        setTest(Response.data);
      })
      .catch((Error) => {
        console.log(Error);
      });
  };

  function callMyService() {
    console.log("call my service");
    const url = "luna://com.test.webapp.service/hello";
    const params = {};
    bridge.onservicecallback = (msg) => {
      console.log(msg);
      let res = JSON.parse(msg);
      document.getElementById("txt_msg").innerHTML = res.Response;
    };
    bridge.call(url, JSON.stringify(params));
  }

  function pythonProcess() {
    const url = "luna://com.test.webapp.service/python_process";
    const params = {};
    document.getElementById("txt_msg").innerHTML = "AI Start!";
    bridge.onservicecallback = (msg) => {
      let res = JSON.parse(msg);
      document.getElementById("txt_msg").innerHTML = res.Response;
    };
    bridge.call(url, JSON.stringify(params));
  }

  const monitorOn = () => {
    const url = "luna://com.test.webapp.service/monitorOn";
    const params = {};
    document.getElementById("txt_msg").innerHTML = "monitorOn";
    bridge.onservicecallback = (msg) => {
      let res = JSON.parse(msg);
      document.getElementById("txt_msg").innerHTML = res.Response;
    };
    bridge.call(url, JSON.stringify(params));
  };
  return (
    <Row {...rest}>
      <Cell>
        <h1 id="txt_msg">Hello, Web Application!!</h1>
        <br />
        <Button onClick={getTest}>11{test}</Button>
        <br />
        <Button onClick={monitorOn}>압력센서 테스트</Button>
        <br />
        <Button onClick={callMyService}>루나버스 테스트</Button>
        <br />
        <Button onClick={pythonProcess}>ai 테스트</Button>
        <br />
      </Cell>
    </Row>
  );
};

export default AxiosTest;
