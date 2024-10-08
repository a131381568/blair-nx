export const generateResult = (
	success: boolean,
	payload: any,
	message: string,
) => {
	return {
		success,
		payload,
		message,
	};
};
