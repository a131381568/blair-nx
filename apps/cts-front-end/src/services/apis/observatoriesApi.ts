import type { ApiResponse, NanoIdDto, ObservatoriesListDto, UpdateObservatoryItemDto } from '@cts-shared';
import type { vueQueryRes } from '@ctsf-src/services/utils/vue-query-client';
import { queryClient } from '@ctsf-src/services/utils/vue-query-client';

export const observatoriesQuery = () => queryClient.getObservatoriesList.useQuery<
	vueQueryRes<ApiResponse<ObservatoriesListDto>>
>(['getObservatoriesList'], () => ({}),	{
	staleTime: Infinity,
});

export const observatoryCreate = ({
	observatoryCategoryName,
	observatoryCategoryId,
	observatoryPostContent,
}: UpdateObservatoryItemDto) => queryClient.createObservatoryItem.mutation({
	body: {
		observatoryCategoryName,
		observatoryCategoryId,
		observatoryPostContent,
	},
});

export const observatoryDelete = (nanoId: NanoIdDto) => queryClient.deleteObservatoryItem.mutation({
	params: { id: nanoId },
});
