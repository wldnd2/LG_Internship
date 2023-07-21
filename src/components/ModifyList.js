import Item from '@enact/sandstone/Item';
import VirtualList from '@enact/sandstone/VirtualList';
import ri from '@enact/ui/resolution';
import PropTypes from 'prop-types';
import {useCallback} from 'react';
import Rangepicker from '@enact/sandstone/RangePicker'
import css from '../views/PatternList.module.less';

const items = Array.from(new Array(1000)).map((n, i) => `Item  ${('00' + i).slice(-3)}`);

const ModifyList = ({id, onClick, ...rest}) => {
	const renderItem = useCallback(({index, ...restProps}) => (
		<div className='ListItem'>
			<Item {...restProps}>
				{items[index]}
				<Rangepicker defaultValue={0} min={0} max={100}/>
			</Item>
		</div>
		
	), [onClick]);

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

ModifyList.propTypes = {
	id: PropTypes.string,
	onClick: PropTypes.func
};

export default ModifyList;
export {ModifyList};
