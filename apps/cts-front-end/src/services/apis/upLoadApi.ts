import type { ApiResponse } from '@cts-shared';
import type { vueQueryRes } from '@ctsf-src/services/utils/vue-query-client';
import { queryClient } from '@ctsf-src/services/utils/vue-query-client';

export const uploadImage = async (imageFile: File): Promise<vueQueryRes<ApiResponse<string>>> => {
	const formData = new FormData();
	formData.append('file', imageFile);

	return queryClient.uploadFile.mutation({
		body: formData,
		extraHeaders: {
			'Content-Type': 'multipart/form-data',
			'Accept': 'multipart/form-data',
		},
	}) as Promise<vueQueryRes<ApiResponse<string>>>;

	// # only use axios
	// const response = await apiWithFormData({
	// 	url: fileContract.uploadFile.path,
	// 	method: fileContract.uploadFile.method,
	// 	data: formData,
	// });
};
