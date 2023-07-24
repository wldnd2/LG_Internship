import Button from "@enact/sandstone/Button";
import kind from "@enact/core/kind";
import { Panel, Header } from "@enact/sandstone/Panels";
import "./MainPage.css";
import MainList from "./MainList";
import PropTypes from "prop-types";
import ModifyListPopup from "../components/ModifyListPopup";
import React, { useState } from "react";
import CheckBox from "@enact/sandstone/Checkbox";
import RecipeList from "./RecipeList";
import AxiosTest from "../components/AxiosTest";
import useListStore from "../store/useListStore";

const MainPage = ({ title, onClick, ...rest }) => {
  const [showPopup, setShowPopup] = useState(false);

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  const { count, IngredientList, setIngredientList, inc } = useListStore();
  console.log("count", count);
  return (
    <div className="MainPage">
      <Panel {...rest}>
        <div className="Title">
          <Header title="Ingredient List" />
        </div>
        <AxiosTest />
        <div className="Base">
          <div className="MainListBase" style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
            <h2 className="MainListName">Main Ingredient List</h2>
            <div
              className="ListCatalog"
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <CheckBox style={{ marginLeft: "4px" }}></CheckBox>
              <div
                style={{
                  margin: "20px",
                  width: "200px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                Name
              </div>
              <div
                style={{
                  margin: "20px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                Count
              </div>
              <div
                style={{
                  margin: "20px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                Duration
              </div>
            </div>
            <MainList id={title} index={rest["data-index"]} onClick={onClick} />
            <div>
              <Button
                onClick={togglePopup}
                size="small"
                style={{
                  marginTop: "5%",
                }}
              >
                Edit
              </Button>
            </div>
          </div>
          <div className="RecipeListBase" style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
            <h2 className="RecipeListName">Recipe List</h2>
            <RecipeList id={title} index={rest["data-index"]} onClick={onClick} />
          </div>
        </div>
      </Panel>
      <ModifyListPopup open={showPopup} onClose={togglePopup} />
    </div>
  );
};

MainPage.propTypes = {
  onClick: PropTypes.func,
  title: PropTypes.string,
};

export default MainPage;
