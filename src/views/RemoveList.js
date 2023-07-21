import Item from '@enact/sandstone/Item';
import VirtualList from '@enact/sandstone/VirtualList';
import ri from '@enact/ui/resolution';
import PropTypes from 'prop-types';
import { useCallback } from 'react';
import RangePicker from '@enact/sandstone/RangePicker';
import css from './PatternList.module.less';
import Button from '@enact/sandstone/Button';

const items = Array.from(new Array(1000)).map((_, i) => `Item  ${('00' + i).slice(-3)}`);

const RemoveList = ({ id, ...rest }) => {
  const renderItem = useCallback(({ index, ...restProps }) => (
    <div className={css.ListItem}>
      <Button size="small">X</Button>
      <Item {...restProps} role={null} style={{ width: '250px' }}>
        {items[index]}
      </Item>
      <RangePicker defaultValue={0} min={0} max={100} />
    </div>
  ), []);

  return (
    <VirtualList
      {...rest}
      className={css.list}
      dataSize={items.length}
      id={id}
      itemRenderer={renderItem}
      itemSize={ri.scale(150)}
      spotlightId={id}
    />
  );
};

RemoveList.propTypes = {
  id: PropTypes.string,
};

export default RemoveList;
export { RemoveList };
