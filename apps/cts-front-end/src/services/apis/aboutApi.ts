import { STALE_TIME, queryClient } from '@ctsf-src/services/utils/vue-query-client';
import type { vueQueryRes } from '@ctsf-src/services/utils/vue-query-client';
import type { ApiResponse, GetAboutInfoBaseDto } from '@cts-shared';

export const aboutQuery = () => {
	return queryClient.getAboutInfo.useQuery<
		vueQueryRes<ApiResponse<GetAboutInfoBaseDto>>
	>(['getAboutInfo'], () => ({}),	{
		staleTime: STALE_TIME,
	});
};
