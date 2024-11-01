import type { ComputedRef } from 'vue';
import type { Router } from 'vue-router';
import type { ApiResponse, CreateCategoryDto, MutationCategoryDto, NanoIdDto, PostCategoriesDto, PostCategoryDto } from '@cts-shared';
import type { vueQueryRes } from '@ctsf-src/services/utils/vue-query-client';
import { STALE_TIME, queryClient } from '@ctsf-src/services/utils/vue-query-client';
import { linkNotFoundPage } from '@ctsf-src/helper/customCtsRoute';

export const categoriesQuery = () => queryClient.getPostCategories.useQuery<
	vueQueryRes<ApiResponse<PostCategoriesDto>>
>(['getPostCategories'], () => ({}),	{
	staleTime: STALE_TIME,
});

export const categoryQuery = (getCid: ComputedRef<NanoIdDto>, router: Router) => queryClient.getPostCategory.useQuery<
	vueQueryRes<ApiResponse<PostCategoryDto>>
>(['getPostCategory', getCid], () => ({
	params: { id: getCid.value },
}),	{
	staleTime: STALE_TIME,
	retry: false,
	onError: (err) => {
		if (err.status >= 400)
			linkNotFoundPage(router);
	},
});

export const categoryAdd = ({
	postCategoryId,
	postCategoryName,
}: CreateCategoryDto) => queryClient.createPostCategory.mutation({
	body: {
		postCategoryId,
		postCategoryName,
	},
});

export const categoryEdit = ({
	postCategoryNanoId,
	postCategoryId,
	postCategoryName,
}: MutationCategoryDto) => queryClient.updatePostCategory.mutation({
	body: {
		postCategoryId,
		postCategoryName,
	},
	params: { id: postCategoryNanoId },
});

export const categoryDelete = (pageNanoId: NanoIdDto) => queryClient.deletePostCategory.mutation({
	params: { id: pageNanoId },
});
