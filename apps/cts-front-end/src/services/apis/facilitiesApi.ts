import type { ApiResponse, GetFacilitiesListBaseWithNanoIdDto, NanoIdDto } from '@cts-shared';
import type { vueQueryRes } from '@ctsf-src/services/utils/vue-query-client';
import { queryClient } from '@ctsf-src/services/utils/vue-query-client';

export const facilitiesQuery = () => queryClient.getFacilitiesList.useQuery<
	vueQueryRes<ApiResponse<GetFacilitiesListBaseWithNanoIdDto>>
>(['getFacilitiesList'], () => ({}),	{
	staleTime: Infinity,
});

export const facilityDelete = (nanoId: NanoIdDto) => queryClient.deleteFacilityItem.mutation({
	params: { id: nanoId },
});
