import React from 'react';
import PropTypes from 'prop-types';
import Popup from '@enact/sandstone/Popup';
import ImageItem from '@enact/sandstone/ImageItem';
import Button from '@enact/ui/Button';
import css from './MainView.module.less';

const SelectingPopup = ({ open, onClose }) => {
  const ingredients = [...Array(10).keys()].map((i) => i + 1);

  return (
    <Popup open={open} onClose={onClose}>
      <h1>Select Ingredient</h1>
        <div className={css.content}>
          <div className={css.list}>
            {ingredients.map((ingredient, index) => (
            <ImageItem key={index}>{ingredient}</ImageItem>
          ))}
          </div>
        </div>
        <Button onClick={onClose}>OK</Button>
    </Popup>
  );
};

SelectingPopup.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
};

export default SelectingPopup;
