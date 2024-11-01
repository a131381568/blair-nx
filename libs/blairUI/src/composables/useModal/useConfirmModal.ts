import { useModal } from 'vue-final-modal';
import ConfirmModal from '../../lib/modal/ConfirmModal.vue';

type EventFunction = () => void;

// 定義 ConfirmModal 的 props 型別
interface ConfirmModalProps {
	content: string;
	confirmText?: string;
	cancelText?: string;
	title?: string;
	singleBtn?: boolean;
	showCloseBtn?: boolean;
	onConfirm?: () => void;
	onCancel?: () => void;
	onClosed?: () => void;
}

// showConfirm 的參數型別
interface ShowConfirmOptions {
	content: string;
	confirmText?: string;
	cancelText?: string;
	title?: string;
	singleBtn?: boolean;
	showCloseBtn?: boolean;
	confirmEvent?: EventFunction;
	cancelEvent?: EventFunction;
	closeEvent?: EventFunction;
}

export default function useConfirmModal() {
	const showConfirm = ({
		content,
		confirmText,
		cancelText,
		title,
		singleBtn,
		showCloseBtn,
		confirmEvent,
		cancelEvent,
		closeEvent,
	}: ShowConfirmOptions) => {
		return new Promise((resolve) => {
			let result = false;
			let hasBtnClicked = false;
			const { open, close } = useModal<typeof ConfirmModal>({
				component: ConfirmModal,
				attrs: {
					content,
					confirmText,
					cancelText,
					title,
					singleBtn,
					showCloseBtn,
					onConfirm() {
						if (confirmEvent)
							confirmEvent();
						result = true;
						hasBtnClicked = true;
						close();
					},
					onCancel() {
						if (cancelEvent)
							cancelEvent();
						result = false;
						hasBtnClicked = true;
						close();
					},
					onClosed() {
						if (closeEvent && !hasBtnClicked)
							closeEvent();
						resolve(result);
					},
				} as ConfirmModalProps,
				slots: {
					default: content,
				},
			});

			open();
		});
	};

	return { showConfirm };
}
