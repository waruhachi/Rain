import { Plugin, registerPlugin } from 'enmity/managers/plugins';
import { React } from 'enmity/metro/common';
import { getByProps } from 'enmity/metro';
import { create } from 'enmity/patcher';
import manifest from '../manifest.json';

import Settings from './components/Settings';
import { View, Text } from 'enmity/components';

const SegmentedControl = getByProps('SegmentControl');
const Patcher = create('Rain');

const Rain: Plugin = {
	...manifest,

	onStart() {
		Patcher.after(
			SegmentedControl.prototype,
			'render',
			(_, args, returnValue) => {
				const segmentedItems = returnValue.props.children;

				const CustomSegment = (
					<segmentedItems
						key='Rain'
						label='Rain'
					>
						<View style={{ padding: 10 }}>
							<Text>My Custom Segment Content</Text>
						</View>
					</segmentedItems>
				);

				segmentedItems.push(CustomSegment);

				return returnValue;
			}
		);
	},

	onStop() {
		Patcher.unpatchAll();
	},

	getSettingsPanel({ settings }) {
		return <Settings settings={settings} />;
	},
};

registerPlugin(Rain);
