<script setup lang="ts">
import { ref, watchEffect } from 'vue';
import { get, mapValues } from 'radash';
import EditIcon from '@ctsf-src/components/svg/EditIcon.vue';
import DeleteIcon from '@ctsf-src/components/svg/DeleteIcon.vue';
import Footer from '@ctsf-src/components/Footer.vue';
import type { NanoIdDto, ObservatoriesListDto } from '@cts-shared';
import { observatoriesQuery, observatoryDelete } from '@ctsf-src/services/apis/observatoriesApi';
import { useConfirmModal, useMessageModal } from '@blair-nx-ui';

const { data: observatoriesListAPI, refetch: observatoriesRefetch } = observatoriesQuery();
const { showMsg } = useMessageModal();
const { showConfirm } = useConfirmModal();

const observatoriesLit = ref<ObservatoriesListDto>([]);

const setConfirmModal = async (id: NanoIdDto) => {
	const DEL_MODEL_TITLE = '刪除訊息';
	const checkDel =	await showConfirm({
		title: DEL_MODEL_TITLE,
		content: '確定刪除該天文台 ?',
	});
	if (!checkDel)
		return;

	const delResult = await observatoryDelete(id);
	const isSuccess = delResult.status === 200;
	if (isSuccess)
		await observatoriesRefetch();

	showMsg(
		isSuccess ? 'success' : 'error',
		get(delResult.body, isSuccess ? 'data' : 'message', ''),
		DEL_MODEL_TITLE,
	);
};

watchEffect(() => {
	if (observatoriesListAPI.value?.status === 200) {
		observatoriesLit.value = observatoriesListAPI.value.body.data.map((item) => {
			return mapValues(item, value => value || '');
		});
	}
});
</script>

<template>
	<div class="relative left-7 w-full flex-wrap content-start items-start justify-center px-8 pb-52 mobile:left-11 mobile:w-admin-m-content mobile:pt-32 h-table:flex h-table:px-6 h-table:pt-32 laptop:left-0 laptop:w-4/5 middle-pc:px-20 middle-pc:pt-36">
		<div class="mb-20 flex w-9/12 justify-between mobile:mx-auto mobile:mb-9 mobile:block mobile:w-11/12">
			<h1 class="relative -left-2 -top-2 w-3/4 text-white mobile:w-full mobile:text-5xl">
				天文台管理
			</h1>
			<router-link
				to="/board/observatories/add"
				class="btn draw meet btn flex h-12 w-2/12 items-center justify-center p-0 text-center text-lg mobile:mt-6 mobile:w-full"
			>
				新增
			</router-link>
		</div>
		<div class="table-container w-9/12 mobile:m-auto mobile:w-11/12">
			<table
				v-if="observatoriesLit.length"
				id="responsive-table"
			>
				<thead class="hidden  w-table:table-header-group">
					<tr>
						<th>天文台分類</th>
						<th>分類 ID</th>
						<th class="w-20 text-right">
							編輯
						</th>
						<th class="w-20 text-right">
							刪除
						</th>
					</tr>
				</thead>
				<tbody>
					<tr
						v-for="(val, key) in observatoriesLit"
						:key="key"
					>
						<td data-title="分類">
							{{ val.observatoryCategoryName }}
						</td>
						<td data-title="ID">
							{{ val.observatoryCategoryId }}
						</td>
						<td data-title="編輯">
							<router-link :to="`/board/observatories/edit/${val.observatoryNanoId}`">
								<EditIcon class="group inline-block h-auto w-[28px] fill-main-color-light" />
							</router-link>
						</td>
						<td data-title="刪除">
							<DeleteIcon
								class="inline-block h-auto w-[29px] fill-main-color-light hover:fill-sub-color-dark"
								@click.prevent="setConfirmModal(val.observatoryNanoId)"
							/>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
		<Footer class="absolute bottom-0 mobile:left-0" />
	</div>
</template>
