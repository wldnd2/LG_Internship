import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from '@enact/sandstone/Button';
import { Panel, Header } from '@enact/sandstone/Panels';
import AddList from './AddList';
import RemoveList from './RemoveList';
import SelectingPopup from '../components/SelectingPopup';
import './ListEditPage.css';

const ListEditPage = ({ onNavigate, title, ...rest }) => {
  const [showPopup, setShowPopup] = useState(false);

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  return (
    <div className='ListEditPage'>
      <Panel {...rest}>
        <div className='Title'>
          <Header title='Ingredient List' />
        </div>
        <div className='Base'>
          <div className='AddListBase'>
            <h2 className='AddListName'>Add List</h2>
            <AddList />
            <div>
              <Button onClick={togglePopup}>Edit</Button>
            </div>
          </div>
          <div className='RemoveListBase'>
            <h2 className='RemoveListName'>Remove List</h2>
            <RemoveList />
            <div>
              <Button onClick={togglePopup}>Edit</Button>
            </div>
          </div>
        </div>
        <Button onClick={() => onNavigate({ path: 'main' })}>Accept</Button>
      </Panel>

      <SelectingPopup open={showPopup} onClose={togglePopup} />
    </div>
  );
};

ListEditPage.propTypes = {
  onNavigate: PropTypes.func.isRequired,
};

export default ListEditPage;