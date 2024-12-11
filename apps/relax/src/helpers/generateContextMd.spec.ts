import fs from 'node:fs/promises';
import type { Dirent, PathLike } from 'node:fs';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { generateContextMd } from './generateContextMd';

vi.mock('fs/promises', () => ({
	default: {
		readdir: vi.fn(),
		readFile: vi.fn(),
		writeFile: vi.fn(),
	},
}));

describe('generateContextMd', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	afterEach(() => {
		vi.resetAllMocks();
	});

	it('should handle empty directory', async () => {
		vi.mocked(fs.readdir).mockResolvedValueOnce([] as Dirent[]);

		await generateContextMd('./source', './output.md');

		expect(fs.writeFile).toHaveBeenCalledWith(
			'./output.md',
			'',
			'utf-8',
		);
	});

	it('should ignore node_modules and hidden files', async () => {
		const mockDirents = [
			{ name: 'node_modules', isDirectory: () => true },
			{ name: '.git', isDirectory: () => true },
			{ name: 'validFile.ts', isDirectory: () => false },
		].map(item => ({
			...item,
			isFile: () => !item.isDirectory(),
			isBlockDevice: () => false,
			isCharacterDevice: () => false,
			isFIFO: () => false,
			isSocket: () => false,
			isSymbolicLink: () => false,
		})) as Dirent[];

		vi.mocked(fs.readdir).mockResolvedValueOnce(mockDirents);
		vi.mocked(fs.readFile).mockResolvedValueOnce('file content');

		await generateContextMd('source', './output.md');

		expect(fs.readFile).toHaveBeenCalledTimes(1);
		expect(fs.readFile).toHaveBeenCalledWith(
			'source/validFile.ts',
			'utf-8',
		);
	});

	it('should correctly format different file types', async () => {
		const mockDirents = [
			{ name: 'script.js', isDirectory: () => false },
			{ name: 'style.css', isDirectory: () => false },
			{ name: 'types.ts', isDirectory: () => false },
		].map(item => ({
			...item,
			isFile: () => !item.isDirectory(),
			isBlockDevice: () => false,
			isCharacterDevice: () => false,
			isFIFO: () => false,
			isSocket: () => false,
			isSymbolicLink: () => false,
		})) as Dirent[];

		vi.mocked(fs.readdir).mockResolvedValueOnce(mockDirents);
		vi.mocked(fs.readFile).mockResolvedValue('file content');

		await generateContextMd('source', './output.md');

		const writeFileCalls = vi.mocked(fs.writeFile).mock.calls;
		const writtenContent = writeFileCalls[0]?.[1] as string;

		expect(writtenContent).toContain('```javascript');
		expect(writtenContent).toContain('```css');
		expect(writtenContent).toContain('```typescript');
	});

	it('should handle nested directories', async () => {
		const createMockDirent = (name: string, isDir: boolean): Dirent => ({
			name,
			isDirectory: () => isDir,
			isFile: () => !isDir,
			isBlockDevice: () => false,
			isCharacterDevice: () => false,
			isFIFO: () => false,
			isSocket: () => false,
			isSymbolicLink: () => false,
		} as Dirent);

		const rootMockDirents = [
			createMockDirent('src', true),
			createMockDirent('index.ts', false),
		];

		const srcMockDirents = [
			createMockDirent('components', true),
			createMockDirent('index.ts', false),
		];

		const componentsMockDirents = [
			createMockDirent('Button.tsx', false),
		];

		const mockReaddir = vi.mocked(fs.readdir);
		mockReaddir.mockResolvedValueOnce(rootMockDirents);
		mockReaddir.mockResolvedValueOnce(srcMockDirents);
		mockReaddir.mockResolvedValueOnce(componentsMockDirents);

		vi.mocked(fs.readFile).mockResolvedValue('file content');

		await generateContextMd('source', './output.md');

		expect(fs.readFile).toHaveBeenCalledWith(
			'source/index.ts',
			'utf-8',
		);
		expect(fs.readFile).toHaveBeenCalledWith(
			'source/src/index.ts',
			'utf-8',
		);
		expect(fs.readFile).toHaveBeenCalledWith(
			'source/src/components/Button.tsx',
			'utf-8',
		);
	});

	it('should handle file read errors', async () => {
		const mockDirents = [{
			name: 'error.js',
			isDirectory: () => false,
			isFile: () => true,
			isBlockDevice: () => false,
			isCharacterDevice: () => false,
			isFIFO: () => false,
			isSocket: () => false,
			isSymbolicLink: () => false,
		}] as Dirent[];

		vi.mocked(fs.readdir).mockResolvedValueOnce(mockDirents);
		vi.mocked(fs.readFile).mockRejectedValueOnce(new Error('File read error'));

		const consoleSpy = vi.spyOn(console, 'error');

		await generateContextMd('source', './output.md');

		expect(consoleSpy).toHaveBeenCalledWith(
			expect.stringContaining('Error reading file'),
			expect.any(Error),
		);
	});

	it('should handle write file errors', async () => {
		const mockDirents = [{
			name: 'test.js',
			isDirectory: () => false,
			isFile: () => true,
			isBlockDevice: () => false,
			isCharacterDevice: () => false,
			isFIFO: () => false,
			isSocket: () => false,
			isSymbolicLink: () => false,
		}] as Dirent[];

		vi.mocked(fs.readdir).mockResolvedValueOnce(mockDirents);
		vi.mocked(fs.readFile).mockResolvedValueOnce('file content');
		vi.mocked(fs.writeFile).mockRejectedValueOnce(new Error('Write file error'));

		const consoleSpy = vi.spyOn(console, 'error');

		await generateContextMd('source', './output.md');

		expect(consoleSpy).toHaveBeenCalledWith(
			'處理過程發生錯誤:',
			expect.any(Error),
		);
	});

	it('should sort directories first, then files', async () => {
		// Mock directory entries
		const mockDirents = [
			{ name: 'script.js', isDirectory: () => false },
			{ name: 'components', isDirectory: () => true },
			{ name: 'index.ts', isDirectory: () => false },
			{ name: 'assets', isDirectory: () => true },
		].map(item => ({
			...item,
			isFile: () => !item.isDirectory(),
			isBlockDevice: () => false,
			isCharacterDevice: () => false,
			isFIFO: () => false,
			isSocket: () => false,
			isSymbolicLink: () => false,
		})) as Dirent[];

		// Setup mocks
		vi.mocked(fs.readdir)
			.mockImplementation((path: PathLike) => {
				const pathStr = path.toString();
				if (pathStr === 'source') {
					return Promise.resolve(mockDirents);
				}
				if (pathStr === 'source/components' || pathStr === 'source/assets') {
					return Promise.resolve([]);
				}
				return Promise.resolve([]);
			});

		vi.mocked(fs.readFile).mockImplementation((path: PathLike | fs.FileHandle) => {
			const pathStr = path.toString();
			if (pathStr === 'source/script.js') {
				return Promise.resolve('console.log("Hello");');
			}
			if (pathStr === 'source/index.ts') {
				return Promise.resolve('export const hello = "world";');
			}
			return Promise.resolve('');
		});

		const writeFileMock = vi.mocked(fs.writeFile);

		// Execute the function
		await generateContextMd('source', './output.md');

		// 確認 writeFile 被調用
		expect(writeFileMock).toHaveBeenCalled();

		// 取得寫入的內容
		const writeFileCall = writeFileMock.mock.calls[0];
		expect(writeFileCall).toBeDefined();

		const writtenContent = writeFileCall?.[1] as string;
		expect(typeof writtenContent).toBe('string');

		// 分析內容行找到各部分的位置
		const lines = writtenContent.split('\n');
		const folderLines = lines.filter(line =>
			line.includes('source/assets') || line.includes('source/components'),
		);
		const fileLines = lines.filter(line =>
			line.includes('source/script.js') || line.includes('source/index.ts'),
		);

		// 確保資料夾在前，檔案在後
		const lastFolderIndex = lines.indexOf(folderLines[folderLines.length - 1]);
		const firstFileIndex = lines.indexOf(fileLines[0]);

		expect(lastFolderIndex).toBeLessThan(firstFileIndex);

		// 確認檔案內容也被正確包含
		expect(writtenContent).toContain('console.log("Hello");');
		expect(writtenContent).toContain('export const hello = "world";');
	});
});
