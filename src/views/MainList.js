import Item from "@enact/sandstone/Item";
import VirtualList from "@enact/sandstone/VirtualList";
import ri from "@enact/ui/resolution";
import PropTypes from "prop-types";
import { useCallback } from "react";
import Rangepicker from "@enact/sandstone/RangePicker";
import Checkbox from "@enact/sandstone/Checkbox";
import css from "./PatternList.module.less";

const items = Array.from(new Array(16)).map((n, i) => `Item  ${("00" + i).slice(-3)}`);

const PatternList = ({ id, onClick, ...rest }) => {
  const renderItem = useCallback(
    ({ index, ...restProps }) => (
      <div
        className={css.ListItem}
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <Checkbox style={{ marginLeft: "5px" }}></Checkbox>
        <Item {...restProps} role={null} style={{ width: "250px" }}>
          {items[index]}
        </Item>
        <div
          className="Count"
          style={{
            marginLeft: "5%",
            marginRight: "10%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          0
        </div>
        <div
          className="Duration"
          style={{
            marginLeft: "10%",
            marginRight: "10%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          0
        </div>
      </div>
    ),
    [onClick]
  );

  return (
    <VirtualList {...rest} className={css.list} dataSize={items.length} id={id} itemRenderer={renderItem} itemSize={ri.scale(150)} spotlightId={id} />
  );
};

PatternList.propTypes = {
  id: PropTypes.string,
  onClick: PropTypes.func,
};

export default PatternList;
export { PatternList };
