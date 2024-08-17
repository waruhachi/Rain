import { Plugin, registerPlugin } from 'enmity/managers/plugins';
import { React } from 'enmity/metro/common';
import { getByProps } from 'enmity/metro';
import { create } from 'enmity/patcher';
import manifest from '../manifest.json';

import Settings from './components/Settings';
import { Text } from 'enmity/components';
import { findInReactTree } from 'enmity/utilities';

const Stickers = getByProps('Stickers');
const Patcher = create('Rain');

console.log('Rain', Stickers);

const Rain: Plugin = {
	...manifest,

	onStart() {
		// Patcher.after(Text.type, 'render', (self, args, res) => {
		// 	const user = findInReactTree(
		// 		res,
		// 		(r) => r.props?.children[0][1].type.name == 'FriendPresence'
		// 	);
		// });
	},

	onStop() {
		Patcher.unpatchAll();
	},

	getSettingsPanel({ settings }) {
		return <Settings settings={settings} />;
	},
};

registerPlugin(Rain);
