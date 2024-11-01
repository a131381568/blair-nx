import { useModal } from 'vue-final-modal';
import MessageModal from '../../lib/modal/MessageModal.vue';

export default function useMessageModal() {
	/**
	 * @param {object} params - customConfirm 參數物件
	 * @param {string} params.isSuccessful - 是否成功
	 * @param {object} params.msgConfig.message - 要顯示的內容
	 */

	const showMsg = (
		type: string,
		message: string,
		title?: string,
		ms?: number | null,
	) => {
		let timeout: ReturnType<typeof setTimeout> | null = null;

		const { open, close } = useModal({
			component: MessageModal,
			attrs: {
				type,
				title,
				content: message,
			},
			slots: {
				default: message,
			},
		});

		// open modal and close modal after 2500ms
		open().then(() => {
			if (timeout)
				clearTimeout(timeout);
			timeout = setTimeout(() => close(), ms || 2000);
		});
	};

	return { showMsg };
}
