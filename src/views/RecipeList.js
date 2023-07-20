import Item from '@enact/sandstone/Item';
import VirtualList from '@enact/sandstone/VirtualList';
import ri from '@enact/ui/resolution';
import PropTypes from 'prop-types';
import {useCallback} from 'react';
import Rangepicker from '@enact/sandstone/RangePicker'
import Checkbox from '@enact/sandstone/Checkbox';
import css from './PatternList.module.less';
import Button from '@enact/ui/Button';

const items = Array.from(new Array(1000)).map((n, i) => `Item  ${('00' + i).slice(-3)}`);

const RecipeList = ({id, onClick, ...rest}) => {
	const renderItem = useCallback(({index, ...restProps}) => (
		<div className='ListItem'>
			<Item {...restProps}>
				{items[index]}
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
			itemSize={ri.scale(144)}
			spotlightId={id}
		/>
	);
};

RecipeList.propTypes = {
	id: PropTypes.string,
	onClick: PropTypes.func
};

export default RecipeList;
export {RecipeList};
