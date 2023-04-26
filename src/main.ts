import type { SettingSchemaDesc } from '@logseq/libs/dist/LSPlugin';
import '@logseq/libs';


const settingsKeyInsertAbove = 'insertNewBlockAbove';
const settingsKeyInsertBelow = 'insertNewBlockBelow';

const settingsSchema: SettingSchemaDesc[] = [
	{
		key: settingsKeyInsertAbove,
		title: 'Insert new block above',
		description: 'Insert a new block above the current one',
		default: 'shift+mod+enter',
		type: 'string',
	},
	{
		key: settingsKeyInsertBelow,
		title: 'Insert a new block below',
		description: 'Insert a new block below the current one',
		default: 'mod+enter',
		type: 'string',
	},
];


const main = async () => {
	if (!logseq) {
		console.error('`logseq` object not available');
		return;
	}

	logseq.useSettingsSchema(settingsSchema);

	const settings = logseq.settings;
	if (!settings) {
		console.error('`logseq.settings` object not available');
		return;
	}

	logseq.App.registerCommandShortcut(
		{
			// mode: 'editing', // 'global' | 'non-editing'
			binding: settings[settingsKeyInsertAbove],
		},
		async () => {
			const current = await logseq.Editor.getCurrentBlock();
			if (!current) { return; }
			logseq.Editor.insertBlock(current.uuid, '', {
				before: true, sibling: true, focus: true,
			});
		}
	);

	logseq.App.registerCommandShortcut(
		{ binding: settings[settingsKeyInsertBelow] },
		async () => {
			const current = await logseq.Editor.getCurrentBlock();
			if (!current) { return; }
			logseq.Editor.insertBlock(current.uuid, '', {
				before: false, sibling: true, focus: true,
			});
		}
	);
};


logseq.ready(main).catch(console.error);
