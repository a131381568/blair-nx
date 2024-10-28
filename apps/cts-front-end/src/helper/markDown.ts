export const stripMarkdown = (markdown: string) => {
	return markdown
		.replace(/<[^>]+(>|$)/g, '') // 移除 HTML 標籤
		.replace(/^#+\s(.+)/gm, '$1') // 移除標題
		.replace(/(\*\*|__)(.*?)\1/g, '$2')
		.replace(/(\*|_)(.*?)\1/g, '$2') // 移除粗體和斜體
		.replace(/\[(.*?)\]\(.*?\)/g, '$1') // 移除超連結
		.replace(/!\[(.*?)\]\(.*?\)/g, '$1') // 移除圖片
		.replace(/```[\s\S]*?```/g, '') // 移除程式碼區塊
		.replace(/`(.*?)`/g, '$1') // 移除行內程式碼
		.replace(/^>\s(.+)/gm, '$1') // 移除區塊引言
		.replace(/^(\*|-|\d+\.)\s+/gm, '') // 移除列表項目
		.replace(/\\n\\n|\n\n/g, ' ') // 移除多重換行符和轉義換行符
		.replace(/^\s+|\s+$/g, ''); // 移除多餘的空白
};
