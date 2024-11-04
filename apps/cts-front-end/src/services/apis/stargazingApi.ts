import type { Ref } from 'vue';
import type { ApiResponse, NanoIdDto, StargazingListWithPagiDto, SwitchStargazingQueryModeDto } from '@cts-shared';
import type { vueQueryRes } from '@ctsf-src/services/utils/vue-query-client';
import { STALE_TIME, queryClient } from '@ctsf-src/services/utils/vue-query-client';

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

export const singleStargazingDelete = (id: NanoIdDto) => queryClient.deleteStargazingDetail.mutation({
	params: { id },
});
