import type { ApiResponse, NanoIdDto, PostCategoriesDto } from '@cts-shared';
import type { vueQueryRes } from '@ctsf-src/services/utils/vue-query-client';
import { STALE_TIME, queryClient } from '@ctsf-src/services/utils/vue-query-client';

export const categoriesQuery = () => queryClient.getPostCategories.useQuery<
	vueQueryRes<ApiResponse<PostCategoriesDto>>
>(['getPostCategories'], () => ({}),	{
	staleTime: STALE_TIME,
});

export const categoriesDelete = (pageNanoId: NanoIdDto) => queryClient.deletePostCategory.mutation({
	params: { id: pageNanoId },
});
