import { Plugin, registerPlugin } from 'enmity/managers/plugins';
import { React } from 'enmity/metro/common';
import { getByProps } from 'enmity/metro';
import { create } from 'enmity/patcher';
import manifest from '../manifest.json';

import Settings from './components/Settings';
import { on } from 'events';

const Patcher = create(manifest.name);
const ScrollView = getByProps('ScrollView').ScrollView;
const FlatList = getByProps('ScrollView').FlatList;
const SegmentedControlItem = getByProps(
	'SegmentedControlItem'
).SegmentedControlItem;

const Rain: Plugin = {
	...manifest,

	onStart() {
		Patcher.before(ScrollView, 'render', (_, args, res) => {
			console.log(args);
			const key = args?.[0]?.children?.key;
			if (key === '3') {
				const parentView = args?.[0]?.children.props.children;

				const RainSegmentedControlItem = React.createElement(
					SegmentedControlItem,
					{
						style: {
							minWidth: '25%',
							marginStart: -4,
							marginEnd: 4,
						},
						index: 3,
						key: 'Rain',
						label: 'Rain',
						state: parentView[1][2].props.state,
						pressed: parentView[1][2].props.pressed,
						selected: false,
						onPress: parentView[1][2].props.onPress,
						onPressIn: parentView[1][2].props.onPressIn,
						onPressOut: parentView[1][2].props.onPressOut,
						icon: null,
						variant: 'experimental_Small',
					}
				);

				const newChild = {
					...parentView[0].props.children[2],
					key: 'Rain',
				};

				parentView[1].push(RainSegmentedControlItem);
				parentView[0].props.children.push(newChild);
				parentView[1].map((item) => {
					item.props.style.minWidth = '25%';
					item.props.state.items = [
						{ id: 'Emoji', label: 'Emoji', page: null },
						{ id: 'GIFs', label: 'GIFs', page: null },
						{ id: 'Stickers', label: 'Stickers', page: null },
						{ id: 'Rain', label: 'Rain', page: null },
					];
				});
			}
		});
	},

	onStop() {
		Patcher.unpatchAll();
	},

	getSettingsPanel({ settings }) {
		return <Settings settings={settings} />;
	},
};

registerPlugin(Rain);
