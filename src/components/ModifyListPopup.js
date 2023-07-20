import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from '@enact/sandstone/Button';
import { Panel, Header } from '@enact/sandstone/Panels';
import './ModifyListPopup.css';
import Popup from '@enact/sandstone/Popup';
import ModifyList from './ModifyList';
import SelectingPopup from './SelectingPopup';

const ModifyListPopup = ({ title, onClick, open, onClose, ...rest }) => {
  const [showPopup, setShowPopup] = useState(false);

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  return (
    <Popup open={open} onClose={onClose}>
        <div className='ModifyListPopup'>
            <Panel {...rest}>
            <div className='Title'>
                <Header title='Ingredient List' />
            </div>
            <div className='Base'>
                <div className='ModifyListBase'>
                <h2 className='ModifyListName'>Main Ingredient List</h2>
                <ModifyList
                    id={title}
                    index={rest['data-index']}
                    onClick={onClick}
                />
                <div>
                    <Button onClick={togglePopup}>Edit</Button>
                </div>
                </div>
            </div>
            </Panel>
            <Button onClick={onClose}>OK</Button>
        </div>
      <SelectingPopup open={showPopup} onClose={togglePopup} />
    </Popup>
  );
};

ModifyListPopup.propTypes = {
  onClick: PropTypes.func,
  title: PropTypes.string,
  open: PropTypes.bool,
  onClose: PropTypes.func,
};

export default ModifyListPopup;
