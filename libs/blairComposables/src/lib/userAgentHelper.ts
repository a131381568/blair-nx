export const isMobileDevice = () => {
	const mobileDevice = ['Android', 'webOS', 'iPhone', 'iPad', 'iPod', 'BlackBerry', 'Windows Phone'];
	const isMobileDevice = mobileDevice.some(e => navigator.userAgent.match(e));
	return isMobileDevice;
};
