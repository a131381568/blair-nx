import type { ComputedRef, Ref } from 'vue';
import type { Router } from 'vue-router';
import type { ApiResponse, CreateSinleStargazingDto, MutationSinleStargazingDto, NanoIdDto, SingleStargazingDetailDto, StargazingListWithPagiDto, SwitchStargazingQueryModeDto } from '@cts-shared';
import type { vueQueryRes } from '@ctsf-src/services/utils/vue-query-client';
import { STALE_TIME, queryClient } from '@ctsf-src/services/utils/vue-query-client';
import { linkNotFoundPage } from '@ctsf-src/helper/customCtsRoute';

export const stargazingListQuery = ({
	activePage,
	queryMode,
}: {
	activePage: Ref<number>;
	queryMode: SwitchStargazingQueryModeDto;
}) => queryClient.getStargazingQuery.useQuery<
	vueQueryRes<ApiResponse<StargazingListWithPagiDto>>
>(['getStargazingQuery', activePage], () => ({
	query: {
		page: String(activePage.value),
		mode: queryMode,
	},
}),	{
	staleTime: STALE_TIME,
});

export const singleStargazingQuery = (lid: ComputedRef<NanoIdDto>, router: Router) => queryClient.getStargazingDetail.useQuery<
	vueQueryRes<ApiResponse<SingleStargazingDetailDto>>
>(['getStargazingDetail', lid], () => ({
	params: { id: lid.value },
}),	{
	staleTime: STALE_TIME,
	retry: false,
	onError: (err) => {
		if (err.status >= 400)
			linkNotFoundPage(router);
	},
});

export const singleStargazingCreate = ({
	stargazingTitle,
	stargazingAddress,
	stargazingLatitude,
	stargazingLongitude,
	stargazingImage,
	stargazingDescription,
}: CreateSinleStargazingDto) => queryClient.createStargazingDetail.mutation({
	body: {
		stargazingTitle,
		stargazingAddress,
		stargazingLatitude,
		stargazingLongitude,
		stargazingImage,
		stargazingDescription,
	},
});

export const singleStargazingMutation = ({
	stargazingTitle,
	stargazingAddress,
	stargazingLatitude,
	stargazingLongitude,
	stargazingImage,
	stargazingDescription,
	stargazingNanoId,
}: MutationSinleStargazingDto) => queryClient.updateStargazingDetail.mutation({
	body: {
		stargazingTitle: String(stargazingTitle),
		stargazingAddress: String(stargazingAddress),
		stargazingLatitude: String(stargazingLatitude),
		stargazingLongitude: String(stargazingLongitude),
		stargazingImage: String(stargazingImage),
		stargazingDescription: String(stargazingDescription),
	},
	params: { id: stargazingNanoId },
});

export const singleStargazingDelete = (id: NanoIdDto) => queryClient.deleteStargazingDetail.mutation({
	params: { id },
});
