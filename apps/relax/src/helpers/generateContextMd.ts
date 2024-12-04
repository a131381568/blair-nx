// apps/relax/src/helpers/generateContextMd.ts
import fs from 'node:fs/promises';
import path from 'node:path';

// 定義圖片檔案的副檔名
const IMAGE_EXTENSIONS = new Set(['.ico', '.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg']);

export async function generateContextMd(directoryPath: string, outputPath: string) {
	try {
		// 建立輸出字串
		let output = '';

		// 取得專案根目錄路徑（用於生成相對路徑）
		const rootDir = process.cwd();

		// 遞迴讀取資料夾函數
		async function processDirectory(dirPath: string, indent = '') {
			// 讀取目錄內容
			const items = await fs.readdir(dirPath, { withFileTypes: true });

			// 排序：資料夾在前，檔案在後
			const sortedItems = items.sort((a, b) => {
				if (a.isDirectory() === b.isDirectory()) {
					return a.name.localeCompare(b.name);
				}
				return b.isDirectory() ? 1 : -1;
			});

			// 處理每個項目
			for (const item of sortedItems) {
				const fullPath = path.join(dirPath, item.name);
				// 生成相對於專案根目錄的路徑
				const projectRelativePath = path.relative(rootDir, fullPath);

				// 忽略 node_modules 和隱藏檔案
				if (item.name === 'node_modules' || item.name.startsWith('.')) {
					continue;
				}

				// 檢查是否為圖片檔案
				const ext = path.extname(item.name).toLowerCase();
				if (IMAGE_EXTENSIONS.has(ext)) {
					continue;
				}

				if (item.isDirectory()) {
					// 如果是資料夾，加入標題並遞迴處理
					output += `\n## ${projectRelativePath}\n`;
					await processDirectory(fullPath, `${indent}  `);
				}
				else {
					try {
						// 如果是檔案，讀取內容並格式化
						const content = await fs.readFile(fullPath, 'utf-8');
						output += `\n## ${projectRelativePath}\n`;
						output += '```';

						// 根據副檔名決定語言標記
						switch (ext) {
							case '.js':
							case '.jsx':
								output += 'javascript';
								break;
							case '.ts':
							case '.tsx':
								output += 'typescript';
								break;
							case '.json':
								output += 'json';
								break;
							case '.md':
								output += 'markdown';
								break;
							case '.css':
								output += 'css';
								break;
							case '.html':
								output += 'html';
								break;
						}

						output += `\n${content}\n\`\`\`\n`;
					}
					catch (error) {
						console.error(`Error reading file ${fullPath}:`, error);
					}
				}
			}
		}

		// 開始處理主資料夾
		await processDirectory(directoryPath);

		// 寫入輸出檔案
		await fs.writeFile(outputPath, output, 'utf-8');
		// console.log(`已成功生成 ${outputPath}`);
	}
	catch (error) {
		console.error('處理過程發生錯誤:', error);
	}
}

// CLI 支援
if (require.main === module) {
	const args = process.argv.slice(2);
	const source = args.find(arg => arg.startsWith('--source='))?.split('=')[1]
		|| args[0]; // 支援位置參數
	const output = args.find(arg => arg.startsWith('--output='))?.split('=')[1]
		|| args[1]; // 支援位置參數

	if (!source || !output) {
		console.error([
			'使用方法:',
			'nx run relax:generateContextMd --source=<來源路徑> --output=<輸出路徑>',
			'或',
			'node generateContextMd.js <來源資料夾路徑> <輸出檔案路徑>',
			'',
			'例如:',
			'nx run relax:generateContextMd --source=apps/relax/src/components/styled --output=apps/relax/src/helpers/context.md',
		].join('\n'));
		process.exit(1);
	}

	generateContextMd(source, output).catch((error) => {
		console.error('執行過程發生錯誤:', error);
		process.exit(1);
	});
}
