export const convertImageUrlToBlob = async (imgUrl: string): Promise<Blob | null> => {
	try {
		const imageRes = await fetch(imgUrl);
		if (!imageRes.ok) {
			throw new Error(`HTTP error! Status: ${imageRes.status}`);
		}
		return await imageRes.blob();
	}
	catch (error) {
		console.error(error);
		return null; // 如果有錯誤，返回 null
	}
};

export const base64ToFile = (data: string) => {
	const arr = data.split(',');
	const match = arr[0].match(/:(.*?);/);

	// 檢查 match 是否為 null
	if (!match || match.length < 2) {
		throw new Error('Invalid base64 string: MIME type could not be determined');
	}

	const mime = match[1]; // 現在這裡的 mime 是安全的
	const bstr = atob(arr[1]);
	let n = bstr.length;
	const u8arr = new Uint8Array(n);
	while (n--) {
		u8arr[n] = bstr.charCodeAt(n);
	}
	return new File([u8arr], '', { type: mime });
};

export const getFileWidthHeight = (fileRaw: File) => {
	return new Promise((resolve, reject) => {
		const _URL = window.URL || window.webkitURL;
		const img = new Image();
		img.onload = () => resolve({ height: img.height, width: img.width });
		img.onerror = reject;
		img.src = _URL.createObjectURL(fileRaw);
	});
};

export const checkFileType = ({ fileName, includeGif }: { fileName: string;includeGif: boolean }) => {
	const relatedList = ['.png', '.jpg', '.jpeg', '.heic'];
	if (includeGif) {
		relatedList.push('.gif');
	}
	return relatedList.some(suffix => fileName.endsWith(suffix));
};
