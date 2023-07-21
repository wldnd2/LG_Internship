import { useState, useCallback } from "react";
import kind from "@enact/core/kind";
import { Panels } from "@enact/sandstone/Panels";
import Routable, { Route } from "@enact/ui/Routable";
import ThemeDecorator from "@enact/sandstone/ThemeDecorator";
import ListEditPage from "../views/ListEditPage";
import MainPage from "../views/MainPage";
import "./attachErrorHandler";
import ModifyListPopup from "../components/ModifyListPopup";
import css from "./App.module.less";
import SelectingPopup from "../components/SelectingPopup";

const Views = Routable({ navigate: "onNavigate" }, ({ children }) => (
  <div>{children}</div>
));

const AppBase = kind({
  name: "App",

  styles: {
    css,
    className: "app",
  },

  render: (props) => {
    return (
      <Panels {...props}>
        <Views path={props.path} onNavigate={props.onNavigate}>
          <Route path="list-edit" component={ListEditPage} onNavigate={props.onNavigate}/>
          <Route path="main" component={MainPage} />
		      <Route path="modify" component={ModifyListPopup} onNavigate={props.onNavigate} />
          <Route path="select" component={SelectingPopup} onNavigate={props.onNavigate}/>
        </Views>
      </Panels>
    );
  },
});

const App = (props) => {
  const [path, nav] = useState("list-edit"); // 초기 경로를 설정해 줍니다.
  const handleNavigate = useCallback((ev) => nav(ev.path), [nav]);

  return <AppBase {...props} path={path} onNavigate={handleNavigate} />;
};

export default ThemeDecorator(App);
