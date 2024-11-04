import type { ComputedRef } from 'vue';
import type { Router } from 'vue-router';
import type { ApiResponse, CreateFacilityItemDto, FacilityItemBaseDto, FacilityItemWithNanoIdDto, GetFacilitiesListBaseWithNanoIdDto, NanoIdDto } from '@cts-shared';
import type { vueQueryRes } from '@ctsf-src/services/utils/vue-query-client';
import { STALE_TIME, queryClient } from '@ctsf-src/services/utils/vue-query-client';
import { linkNotFoundPage } from '@ctsf-src/helper/customCtsRoute';

export const facilitiesQuery = () => queryClient.getFacilitiesList.useQuery<
	vueQueryRes<ApiResponse<GetFacilitiesListBaseWithNanoIdDto>>
>(['getFacilitiesList'], () => ({}),	{
	staleTime: Infinity,
});

export const facilityQuery = (oid: ComputedRef<NanoIdDto>, router: Router) => queryClient.getFacilityItem.useQuery<
	vueQueryRes<ApiResponse<FacilityItemBaseDto>>
>(['getPostCategory', oid], () => ({
	params: { id: oid.value },
}),	{
	staleTime: STALE_TIME,
	retry: false,
	onError: (err) => {
		if (err.status >= 400)
			linkNotFoundPage(router);
	},
});

export const facilityCreate = ({
	facilitiesTitle,
	facilitiesDescription,
	facilitiesImage,
	facilitiesLink,
}: CreateFacilityItemDto) => queryClient.createFacilityItem.mutation({
	body: {
		facilitiesTitle,
		facilitiesDescription,
		facilitiesImage,
		facilitiesLink,
	},
});

export const facilityEdit = ({
	facilitiesTitle,
	facilitiesDescription,
	facilitiesImage,
	facilitiesLink,
	facilitiesNanoId,
}: FacilityItemWithNanoIdDto) => queryClient.updateFacilityItem.mutation({
	body: {
		facilitiesTitle,
		facilitiesDescription,
		facilitiesImage,
		facilitiesLink,
	},
	params: { id: facilitiesNanoId },
});

export const facilityDelete = (nanoId: NanoIdDto) => queryClient.deleteFacilityItem.mutation({
	params: { id: nanoId },
});
