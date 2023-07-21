import Item from "@enact/sandstone/Item";
import VirtualList from "@enact/sandstone/VirtualList";
import ri from "@enact/ui/resolution";
import PropTypes from "prop-types";
import { useCallback } from "react";
import Rangepicker from "@enact/sandstone/RangePicker";
import css from "../views/PatternList.module.less";
import Button from "@enact/ui/Button";

const items = Array.from(new Array(16)).map((n, i) => `Item  ${("00" + i).slice(-3)}`);

const ModifyList = ({ id, onClick, ...rest }) => {
  const renderItem = useCallback(
    ({ index, ...restProps }) => (
      <div className={css.ListItem}
        style={{
          alignItems:"center",
        }}>
        <Button size="small">X</Button>
        <Item {...restProps} role={null} 
          style={{ 
            width: '250px' }}>
          {items[index]}  
        </Item>
        <Rangepicker defaultValue={0} min={0} max={100}></Rangepicker>
      </div>
    ),
    [onClick]
  );

  return (
    <VirtualList {...rest} className={css.list} dataSize={items.length} id={id} itemRenderer={renderItem} itemSize={ri.scale(150)} spotlightId={id} />
  );
};

ModifyList.propTypes = {
  id: PropTypes.string,
  onClick: PropTypes.func,
};

export default ModifyList;
export { ModifyList };
