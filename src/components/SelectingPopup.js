import PropTypes from 'prop-types';
import Popup from '@enact/sandstone/Popup';
import ImageItem from '@enact/sandstone/ImageItem';
import Button from '@enact/ui/Button';
import css from './MainView.module.less';

const SelectingPopup = ({ open, onClose }) => {
  const ingredients = [...Array(16).keys()].map((i) => i + 1);

  return (
    <Popup open={open} onClose={onClose}>
      <div className={css.content}>
        <h2 className={css.heading}>
          Ingredient Selection
        </h2>
        <div className={css.list}>
          {ingredients.map((ingredient, index) => (
            <ImageItem key={index} className={css.item}>
              {ingredient}
            </ImageItem>
          ))}
        </div>
      </div>
      <Button onClick={onClose} style={{
        margin : '10px',
        marginTop : '20px',
      }}>OK</Button>
    </Popup>
  );
};

SelectingPopup.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
};

export default SelectingPopup;
