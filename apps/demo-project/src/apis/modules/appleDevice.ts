import {
	apiAddItem,
	apiDelItem,
	apiFetchAdList,
	apiFetchAdListByIds,
	apiFetchAdListByPathId,
	apiPatchItem,
	apiPutItem,
} from '@demo-src/apis/instances/appleDevice';
import { useAppleDeviceStore } from '@demo-src/stores/appleDevice';
import type {
	AdItemDetail,
	AdItemUpdate,
	AdListParams,
	BaseAdItem,
} from '@demo-src/types';
import { apiContract } from '@demo-src/apis/contract';

export const getFetchAdList = async () => {
	const { updateList } = useAppleDeviceStore();

	try {
		const res = await apiFetchAdList({
			method: apiContract.getListRes.method,
			url: apiContract.getListRes.path,
		});
		const validation = apiContract.getListRes.responses[200];

		if (res.status === 200 && validation.parse(res.data)) {
			updateList(res.data);
		}
	}
	catch (error: any) {
		throw new Error(error.toString());
	}
};

export const getFetchAdListByQuery = async (query: AdListParams) => {
	const { updateList } = useAppleDeviceStore();

	try {
		const res = await apiFetchAdListByIds(query);
		updateList(res.data);
	}
	catch (error) {
		console.error(error);
	}
};

export const getFetchAdListByPathId = async (id: string) => {
	const { updateList } = useAppleDeviceStore();

	try {
		const res = await apiFetchAdListByPathId(id);
		updateList([res.data]);
	}
	catch (error) {
		console.error(error);
	}
};

export const addItem = async (payload: BaseAdItem) => {
	const { updateLastItem } = useAppleDeviceStore();

	try {
		const res = await apiAddItem(payload);
		const createdDetail: AdItemDetail = res.data;
		if (createdDetail.createdAt && createdDetail.id) {
			updateLastItem(createdDetail);
		}
		else {
			return 'fail';
		}
	}
	catch (error) {
		console.error(error);
		// console.log(error.response.data.error);
		return 'fail';
	}
};

export const putItem = async (id: string, payload: BaseAdItem) => {
	const { updateLastItem } = useAppleDeviceStore();

	try {
		const res = await apiPutItem(id, payload);
		const updateInfo: AdItemUpdate = res.data;
		if (updateInfo.updatedAt && updateInfo.id) {
			updateLastItem(updateInfo);
		}
	}
	catch (error) {
		console.error(error);
		// console.log(error.response.data.error);
		return 'fail';
	}
};

export const patchItem = async (id: string, payload: BaseAdItem) => {
	const { updateLastItem } = useAppleDeviceStore();
	try {
		const res = await apiPatchItem(id, payload);
		const updateInfo: AdItemUpdate = res.data;
		if (updateInfo.updatedAt && updateInfo.id) {
			updateLastItem(updateInfo);
		}
	}
	catch (error) {
		console.error(error);
		// console.log(error.response.data.error);
		return 'fail';
	}
};

export const deleteItem = async (id: string) => {
	try {
		const res = await apiDelItem(id, {
			method: apiContract.delItemRes.method,
			url: apiContract.delItemRes.path,
		});
		const validation = apiContract.delItemRes.responses[200];

		if (res.status === 200 && validation.parse(res.data)) {
			return 'success';
		}
		else {
			return 'failure';
		}
	}
	catch (error: any) {
		const validation = apiContract.delItemRes.responses[404];
		if (error.status === 404 && validation.parse(error.response.data)) {
			// 404 handle
			return 'failure';
		}
		throw new Error(error.toString());
	}
};
