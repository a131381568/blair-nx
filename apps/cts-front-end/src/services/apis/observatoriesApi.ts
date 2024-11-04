import type { ComputedRef } from 'vue';
import type { Router } from 'vue-router';
import type { ApiResponse, NanoIdDto, ObservatoriesListDto, ObservatoryItemDto, ObservatoryItemWithNanoIdDto, UpdateObservatoryItemDto } from '@cts-shared';
import type { vueQueryRes } from '@ctsf-src/services/utils/vue-query-client';
import { STALE_TIME, queryClient } from '@ctsf-src/services/utils/vue-query-client';
import { linkNotFoundPage } from '@ctsf-src/helper/customCtsRoute';

export const observatoriesQuery = () => queryClient.getObservatoriesList.useQuery<
	vueQueryRes<ApiResponse<ObservatoriesListDto>>
>(['getObservatoriesList'], () => ({}),	{
	staleTime: Infinity,
});

export const observatoryQuery = (mid: ComputedRef<NanoIdDto>, router: Router) => queryClient.getObservatoryItem.useQuery<
	vueQueryRes<ApiResponse<ObservatoryItemDto>>
>(['getObservatoryItem', mid], () => ({
	params: { id: mid.value },
}),	{
	staleTime: STALE_TIME,
	retry: false,
	onError: (err) => {
		if (err.status >= 400)
			linkNotFoundPage(router);
	},
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

export const observatoryEdit = ({
	observatoryCategoryName,
	observatoryCategoryId,
	observatoryPostContent,
	observatoryNanoId,
}: ObservatoryItemWithNanoIdDto) => queryClient.updateObservatoryItem.mutation({
	body: {
		observatoryCategoryName: String(observatoryCategoryName),
		observatoryCategoryId: String(observatoryCategoryId),
		observatoryPostContent: String(observatoryPostContent),
	},
	params: { id: observatoryNanoId },
});

export const observatoryDelete = (nanoId: NanoIdDto) => queryClient.deleteObservatoryItem.mutation({
	params: { id: nanoId },
});
