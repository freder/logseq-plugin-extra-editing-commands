import type {
	SettingSchemaDesc,
	SimpleCommandKeybinding
} from '@logseq/libs/dist/LSPlugin';

import '@logseq/libs';


const settingsKeyInsertAbove = 'insertNewBlockAbove';
const settingsLabelInsertAbove = 'Insert new block above';

const settings: SettingSchemaDesc[] = [
	{
		key: settingsKeyInsertAbove,
		title: settingsLabelInsertAbove,
		description: 'Insert a new block above the current one',
		default: 'shift+mod+enter',
		type: 'string',
	},
];


const main = async () => {
	if (!logseq) {
		console.error('`logseq` object not available');
		return;
	}

	logseq.useSettingsSchema(settings);

	logseq.App.registerCommandShortcut(
		{
			// mode: 'editing', // 'global' | 'non-editing'
			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			binding: logseq.settings![settingsKeyInsertAbove],
		},
		async () => {
			const current = await logseq.Editor.getCurrentBlock();
			if (!current) {
				return;
			}
			logseq.Editor.insertBlock(current.uuid, '', {
				before: true,
				sibling: true,
				focus: true,
			});
		}
	);
};


logseq.ready(main).catch(console.error);
