<script setup lang="ts">
import { STALE_TIME, queryClient } from '@ctsf-src/services/utils/vue-query-client';
import type { vueQueryRes } from '@ctsf-src/services/utils/vue-query-client';
import type { ApiResponse, UserBaseFitDto } from '@cts-shared';

const { data: usersAPI } = queryClient.getUserList.useQuery<
	vueQueryRes<ApiResponse<UserBaseFitDto[]>>
>(['getUserList'], () => ({}),	{
	staleTime: STALE_TIME,
});
</script>

<template>
	<h1>管理者列表</h1>
	<ul>
		<li
			v-for="(item, index) in usersAPI?.body.data"
			:key="index"
		>
			{{ item }}
		</li>
	</ul>
</template>
