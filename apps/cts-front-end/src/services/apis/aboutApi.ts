import { STALE_TIME, queryClient } from '@ctsf-src/services/utils/vue-query-client';
import type { vueQueryRes } from '@ctsf-src/services/utils/vue-query-client';
import type { ApiResponse, GetAboutInfoBaseDto, UpdateAboutInfoDto } from '@cts-shared';

export const aboutQuery = () => {
	return queryClient.getAboutInfo.useQuery<
		vueQueryRes<ApiResponse<GetAboutInfoBaseDto>>
	>(['getAboutInfo'], () => ({}),	{
		staleTime: STALE_TIME,
	});
};

export const aboutMutation = (
	{ visual, slogan, philosophy, quote, epilogue }: UpdateAboutInfoDto) => queryClient.updateAboutInfo.mutation({
	body: { visual, slogan, philosophy, quote, epilogue },
});
