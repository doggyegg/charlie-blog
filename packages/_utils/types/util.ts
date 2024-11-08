export interface ITreeItem {
	id: number;
	pid: number | undefined;
	children: Array<ITreeItem> | null;
	[key: string]: unknown;
}
