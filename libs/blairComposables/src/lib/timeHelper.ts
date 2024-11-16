/**
 * 處理時區問題 - 把傳進來的時間 +8hr
 * @param date - 傳入 Date() 可以接受的參數
 * @returns YYYY-MM-DDTHH:mm:ss.sssZ - The timezone is always UTC
 */
export const handleTimezoneOffset = (date: string | Date): string => {
	const result = new Date(+new Date(date) + 8 * 3600 * 1000).toISOString();
	return result;
};

export const getTimeToMinuteFormat = (dateObject: string | Date): string => {
	const localTime = handleTimezoneOffset(dateObject);
	return localTime.replace('T', ' ').slice(0, 19);
};

export const getCurrentDateString = ({ dayOffset = 0, monthOffset = 0 } = {}) => {
	const currentDate = new Date();
	if (monthOffset !== 0) {
		currentDate.setMonth(currentDate.getMonth() + monthOffset);
	}
	if (dayOffset !== 0) {
		currentDate.setDate(currentDate.getDate() + dayOffset);
	}
	// Convert to ISO 8601 format string (UTC) with millisecond precision
	let dateString = currentDate.toISOString();
	// Append additional zeros for microsecond precision
	dateString = `${dateString.slice(0, -1)}000` + `Z`;
	return dateString;
};

/**
 * 將日期物件轉換為格式化的字串。
 * @param {Date} date - 要格式化的日期物件。
 * @returns {string} 格式化後的日期字串，格式為 "YYYY-MM-DD"。
 */
export const formateDateToString = (date: string | Date): string => {
	const originDate = date ? new Date(date) : null;
	const formattedDate = originDate ? originDate.toISOString().split('T')[0] : '';

	return formattedDate;
};
