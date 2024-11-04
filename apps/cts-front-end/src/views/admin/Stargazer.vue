<script setup lang="ts">
import { ref, watchEffect } from 'vue';
import AdminSidebar from '@ctsf-src/components/AdminSidebar.vue';
import Footer from '@ctsf-src/components/Footer.vue';
import Pagination from '@ctsf-src/components/Pagination.vue';
import EditIcon from '@ctsf-src/components/svg/EditIcon.vue';
import DeleteIcon from '@ctsf-src/components/svg/DeleteIcon.vue';
import { singleStargazingDelete, stargazingListQuery } from '@ctsf-src/services/apis/stargazingApi';
import { useConfirmModal, useMessageModal } from '@blair-nx-ui';

const stargazingList = ref<SingleStargazingDetailDto[]>([]);
const currentPage = ref(1);

const { data: stargazingListAPI, refetch: stargazingListRefetch } = stargazingListQuery({
	activePage: currentPage,
	queryMode: 'list',
});
const { showMsg } = useMessageModal();
const { showConfirm } = useConfirmModal();

const chagePagi = (pagi: number) => {
	currentPage.value = pagi;
	const el = document.querySelector('body') as HTMLBodyElement;
	el.scrollTo({ top: 0, behavior: 'smooth' });
};

const deleteStargazer = async (id: NanoIdDto) => {
	const DEL_MODEL_TITLE = '刪除訊息';
	const checkDel =	await showConfirm({
		title: DEL_MODEL_TITLE,
		content: '確定刪除該地點 ?',
	});
	if (!checkDel)
		return;

	const delResult = await singleStargazingDelete(id);
	const isSuccess = delResult.status === 200;
	if (isSuccess)
		await stargazingListRefetch();

	showMsg(
		isSuccess ? 'success' : 'error',
		get(delResult.body, isSuccess ? 'data' : 'message', ''),
		DEL_MODEL_TITLE,
	);
};

watchEffect(() => {
	if (stargazingListAPI.value?.status === 200)
		stargazingList.value = stargazingListAPI.value.body.data.list;
});
</script>

<template>
	<div class="flex items-stretch">
		<AdminSidebar />
		<div class="relative left-7 w-full flex-wrap content-start items-start justify-center px-8 pb-52 mobile:left-11 mobile:w-admin-m-content mobile:pt-32 h-table:flex h-table:px-6 h-table:pt-32 laptop:left-0 laptop:w-4/5 middle-pc:px-20 middle-pc:pt-36">
			<div class="mb-20 flex w-9/12 justify-between mobile:mx-auto mobile:mb-9 mobile:block mobile:w-11/12">
				<h1 class="relative -left-2 -top-2 w-3/4 text-white mobile:w-full mobile:text-5xl">
					觀星地點列表
				</h1>
				<router-link
					to="/board/stargazer/add"
					class="btn draw meet btn flex h-12 w-2/12 items-center justify-center p-0 text-center text-lg mobile:mt-6 mobile:w-full"
				>
					新增
				</router-link>
			</div>
			<div class="table-container w-9/12 mobile:m-auto mobile:w-11/12">
				<table
					v-if="stargazingList.length"
					id="responsive-table"
					class="animate__animated animate__fadeIn"
				>
					<thead class="hidden  w-table:table-header-group">
						<tr>
							<th>地點名稱</th>
							<th>地址說明</th>
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
							v-for="(val, key) in stargazingList"
							:key="key"
						>
							<td data-title="名稱">
								{{ val.stargazingTitle }}
							</td>
							<td data-title="說明">
								{{ val.stargazingAddress }}
							</td>
							<td data-title="編輯">
								<router-link :to="`/board/stargazer/edit/${val.stargazingNanoId}`">
									<EditIcon class="group inline-block h-auto w-[28px] fill-main-color-light" />
								</router-link>
							</td>
							<td data-title="刪除">
								<DeleteIcon
									class="inline-block h-auto w-[29px] fill-main-color-light hover:fill-sub-color-dark"
									@click.prevent="deleteStargazer(val.stargazingNanoId || '')"
								/>
							</td>
						</tr>
					</tbody>
				</table>
				<Pagination
					v-if="stargazingListAPI?.body.data.meta && (stargazingListAPI?.body.data.meta.pageCount > 1)"
					:has-next-page="Boolean(stargazingListAPI?.body.data.meta.nextPage)"
					:has-previous-page="Boolean(stargazingListAPI?.body.data.meta.previousPage)"
					:total-pagi="stargazingListAPI?.body.data.meta.pageCount"
					:action-page="currentPage"
					@select-pagi="chagePagi"
				/>
			</div>
			<Footer class="absolute bottom-0 mobile:left-0" />
		</div>
	</div>
</template>
