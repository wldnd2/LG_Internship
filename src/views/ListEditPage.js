import { useState } from 'react';
import PropTypes from 'prop-types';
import Button from '@enact/sandstone/Button';
import { Panel, Header } from '@enact/sandstone/Panels';
import AddList from './AddList';
import RemoveList from './RemoveList';
import SelectingPopup from '../components/SelectingPopup';
import './ListEditPage.css';

const ListEditPage = ({ onNavigate, ...rest }) => {
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
          <div
            className='AddListBase'
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}
          >
            <h2 className='AddListName'>Add List</h2>
            <AddList />
            <Button onClick={togglePopup} size='small'>
              Edit
            </Button>
          </div>
          <div
            className='RemoveListBase'
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}
          >
            <h2 className='RemoveListName'>Remove List</h2>
            <RemoveList />
            <Button onClick={togglePopup} size='small'>
              Edit
            </Button>
          </div>
        </div>
        <Button
          onClick={() => onNavigate({ path: 'main' })}
          style={{ marginTop: '30px' }}
        >
          Accept
        </Button>
      </Panel>
      <SelectingPopup open={showPopup} onClose={togglePopup} />
    </div>
  );
};


ListEditPage.propTypes = {
  onNavigate: PropTypes.func.isRequired,
};

export default ListEditPage;