import type { ApiResponse, ObservatoriesListDto } from '@cts-shared';
import type { vueQueryRes } from '@ctsf-src/services/utils/vue-query-client';
import { queryClient } from '@ctsf-src/services/utils/vue-query-client';

export const observatoriesQuery = () => queryClient.getObservatoriesList.useQuery<
	vueQueryRes<ApiResponse<ObservatoriesListDto>>
>(['getObservatoriesList'], () => ({}),	{
	staleTime: Infinity,
});
