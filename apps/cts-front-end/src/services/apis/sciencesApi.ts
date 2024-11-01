import type { Ref } from 'vue';
import type { ApiResponse, NanoIdDto, ScienceListWithPagiDto, StrIdDto, switchQueryModeDto } from '@cts-shared';
import type { vueQueryRes } from '@ctsf-src/services/utils/vue-query-client';
import { STALE_TIME, queryClient } from '@ctsf-src/services/utils/vue-query-client';

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

export const scienceDelete = (postId: NanoIdDto) => queryClient.deleteScienceDetail.mutation({
	params: { id: postId },
});
