import Button from '@enact/sandstone/Button';
import kind from '@enact/core/kind';
import { Panel, Header } from '@enact/sandstone/Panels';
import './MainPage.css';
import Popup from '@enact/sandstone/Popup';
import PatternList from './PatternList';
import PropTypes from 'prop-types';
import ModifyListPopup from '../components/ModifyListPopup';
import React, { useState } from 'react';
import CheckBox from '@enact/sandstone/Checkbox';
import RecipeList from './RecipeList';

const MainPage = ({ title, onClick, ...rest }) => {
  const [showPopup, setShowPopup] = useState(false);

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  return (
    <div className="MainPage">
		<Panel {...rest}>
			<div className="Title">
			<Header title="Ingredient List" />
			</div>
			<div className="Base">
			<div className="MainListBase">
				<h2 className="MainListName">Main Ingredient List</h2>
				<div className="ListCatalog">
				<CheckBox></CheckBox>
				<div>|| Name |</div>
				<div>| Count |</div>
				<div>| Duration ||</div>
				</div>
				<PatternList id={title} index={rest['data-index']} onClick={onClick} />
				<div>
				<Button onClick={togglePopup}>Edit</Button>
				</div>
			</div>
			<div className="RecipeListBase">
				<h2 className="RecipeListName">Recipe List</h2>
				<RecipeList id={title} index={rest['data-index']} onClick={onClick} />
			</div>
			</div>
		</Panel>
      <ModifyListPopup open={showPopup} onClose={togglePopup} />
    </div>
  );
};

MainPage.propTypes = {
	onClick: PropTypes.func,
	title: PropTypes.string
};

export default MainPage;
