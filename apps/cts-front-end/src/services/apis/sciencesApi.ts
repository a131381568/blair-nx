import type { ComputedRef, Ref } from 'vue';
import type { Router } from 'vue-router';
import type { ApiResponse, CreateScienceDto, MutationScienceDto, NanoIdDto, ScienceItemDto, ScienceListWithPagiDto, StrIdDto, switchQueryModeDto } from '@cts-shared';
import type { vueQueryRes } from '@ctsf-src/services/utils/vue-query-client';
import { STALE_TIME, queryClient } from '@ctsf-src/services/utils/vue-query-client';
import { linkNotFoundPage } from '@ctsf-src/helper/customCtsRoute';

export const sciencesQuery = ({
	activePage,
	selectCategory,
	queryMode,
}: {
	activePage: Ref<number>;
	selectCategory: Ref<StrIdDto>;
	queryMode: switchQueryModeDto;
}) => queryClient.getScienceList.useQuery<
	vueQueryRes<ApiResponse<ScienceListWithPagiDto>>
>(['getScienceList', activePage, selectCategory], () => ({
	query: {
		page: String(activePage.value),
		category: selectCategory.value,
		mode: queryMode,
	},
}),	{
	staleTime: STALE_TIME,
});

export const singleScienceQuery = (getpid: ComputedRef<NanoIdDto>, router: Router) => queryClient.getScienceDetail.useQuery<
	vueQueryRes<ApiResponse<ScienceItemDto>>
>(['getScienceDetail', getpid], () => ({
	params: { id: getpid.value },
}),	{
	staleTime: STALE_TIME,
	retry: false,
	onError: (err) => {
		if (err.status >= 400)
			linkNotFoundPage(router);
	},
});

export const scienceCreate = ({
	title,
	content,
	image,
	postCategoryNanoId,
}: CreateScienceDto) => queryClient.createScienceDetail.mutation({
	body: {
		title,
		content,
		image,
		postCategoryNanoId,
	},
});

export const scienceEdit = ({
	title,
	content,
	image,
	postCategoryNanoId,
	postNanoId,
}: MutationScienceDto) => queryClient.updateScienceDetail.mutation({
	body: {
		title,
		content,
		image,
		postCategoryNanoId,
	},
	params: { id: postNanoId },
});

export const scienceDelete = (postId: NanoIdDto) => queryClient.deleteScienceDetail.mutation({
	params: { id: postId },
});
