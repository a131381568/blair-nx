import type { ApiResponse, MutationPageItemDto, PageListDto } from '@cts-shared';
import { queryClient } from '@ctsf-src/services/utils/vue-query-client';
import type { vueQueryRes } from '@ctsf-src/services/utils/vue-query-client';

export const pageQuery = () => queryClient.getPageInfoList.useQuery<
	vueQueryRes<ApiResponse<PageListDto>>
>(['getPageInfoList'], () => ({}),	{
	staleTime: Infinity,
	enabled: false,
});

export const pageMutation = (
	{ pageTitle, subPageTitle, pageRoute, pageNanoId }: MutationPageItemDto) => queryClient.updatePageItem.mutation({
	body: { pageTitle, subPageTitle, pageRoute },
	params: { id: pageNanoId },
});
