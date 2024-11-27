<script setup lang="ts">
import { ref } from 'vue';
import type { Ref } from 'vue';
import { storeToRefs } from 'pinia';
import {
	addItem,
	deleteItem,
	getFetchAdList,
	getFetchAdListByPathId,
	getFetchAdListByQuery,
	patchItem,
	putItem,
} from '@demo-src/services/modules/appleDeviceModule';
import { useAppleDeviceStore } from '@demo-src/stores/appleDevice';

const IDS_LIST = [
	'ff808181923ed5e20192480dc0721570',
	'ff808181923ed5e20192483d7f8b15db',
	'ff808181923ed5e20192484333c215e3',
	'ff808181923ed5e201924844295915e9',
	'ff808181923ed5e201925369c7562b62',
];
const EXAMPLE_SINGLE_DATA = {
	name: 'iphone se 2020444',
	data: {
		'year': 2020,
		'price': 777,
		'CPU model': 'm1',
		'Hard disk size': '512 mb',
	},
};
const appleDeviceStore = useAppleDeviceStore();
const { list, latestItem } = storeToRefs(appleDeviceStore);

// add
const itemName = ref('');
const itemYear: Ref<number | null> = ref(null);
const itemPrice: Ref<number | null> = ref(null);
const itemCpu = ref('');
const itemDisk = ref('');
// put
const putItemName = ref('Apple MacBook Pro 16');
const putItemYear: Ref<number | null> = ref(2019);
const putItemPrice: Ref<number | null> = ref(1849);
const putItemCpu = ref('Intel Core i9');
const putItemDisk = ref('1.111 TB');
// del
const delItemId = ref('');
const delResult = ref('');

const importDefaultData = () => {
	itemName.value = EXAMPLE_SINGLE_DATA.name;
	itemYear.value = EXAMPLE_SINGLE_DATA.data.year;
	itemPrice.value = EXAMPLE_SINGLE_DATA.data.price;
	itemCpu.value = EXAMPLE_SINGLE_DATA.data['CPU model'];
	itemDisk.value = EXAMPLE_SINGLE_DATA.data['Hard disk size'];
};

const getAllListAct = () => getFetchAdList();

const getIdsData = () => getFetchAdListByQuery({
	id: IDS_LIST,
	a: 'aaaa',
	b: 111,
});

const getSingleData = () => getFetchAdListByPathId(IDS_LIST[0]);

const addItemAct = () => {
	addItem({
		name: itemName.value,
		data: {
			'year': itemYear.value,
			'price': itemPrice.value,
			'CPU model': itemCpu.value,
			'Hard disk size': itemDisk.value,
		},
	});
};

const putItemAct = () => {
	putItem(IDS_LIST[0], {
		name: putItemName.value,
		data: {
			'year': putItemYear.value,
			'price': putItemPrice.value,
			'CPU model': putItemCpu.value,
			'Hard disk size': putItemDisk.value,
		},
	});
};

const patchItemAct = () => {
	patchItem(IDS_LIST[0], {
		name: putItemName.value,
		data: {
			year: putItemYear.value,
		},
	});
};

const delItemAct = async () => {
	const isSuccessful = await deleteItem(delItemId.value);
	delResult.value = isSuccessful;
};
</script>

<template>
	<div class="flex h-full flex-col">
		<!-- title part -->
		<div class="bg-demo-sub p-5">
			<h1>Apple</h1>
			<router-link
				to="/"
				class="text-[#0000ff] underline"
			>
				back to home
			</router-link>
		</div>
		<!-- 取得全列表 (get/list) -->
		<div class="border-b border-black p-5">
			<h3>1. 取得全列表</h3>
			<button
				class="w-20 rounded bg-demo-main py-1 text-white"
				@click="getAllListAct"
			>
				觸發
			</button>
		</div>
		<!-- 取得指定 ids 陣列資料 (get/item_by_ids) -->
		<div class="border-b border-black p-5">
			<h3>2. 取得指定 id 陣列資料</h3>
			id 包含:
			<ul>
				<li
					v-for="id in IDS_LIST"
					:key="id"
					class="text-[0.7rem]"
				>
					{{ id }}
				</li>
			</ul>
			<button
				class="rounded bg-demo-main p-5 py-1 text-white"
				@click="getIdsData"
			>
				取得 ids 資訊
			</button>
		</div>
		<!-- 取得指定 id 資料 (get/item_by_id) -->
		<div class="border-b border-black p-5">
			<h3>3. 取得指定 id 資料</h3>
			<button
				class="rounded bg-demo-main p-5 py-1 text-white"
				@click="getSingleData"
			>
				取得 {{ IDS_LIST[0] }} 資訊
			</button>
		</div>
		<!-- 新增單筆資料 (post/add_item) -->
		<div class="border-b border-black p-5">
			<h3>4. 新增單筆資料</h3>
			<div class="my-4 flex gap-4">
				<input
					v-model="itemName"
					type="text"
					placeholder="商品名稱"
					class="border"
				>
				<input
					v-model="itemYear"
					type="number"
					placeholder="商品年份"
					class="border"
				>
				<input
					v-model="itemPrice"
					type="number"
					placeholder="商品價格"
					class="border"
				>
				<input
					v-model="itemCpu"
					type="text"
					placeholder="CPU 規格"
					class="border"
				>
				<input
					v-model="itemDisk"
					type="text"
					placeholder="硬碟大小"
					class="border"
				>
			</div>
			<div class="flex gap-4">
				<button
					class="rounded bg-black p-5 py-1 text-white"
					@click="importDefaultData"
				>
					帶入預設資料
				</button>
				<button
					class="rounded bg-demo-main p-5 py-1 text-white"
					@click="addItemAct"
				>
					新增資料
				</button>
			</div>
		</div>
		<!-- 更新單筆資料 (put/update_item) -->
		<div class="border-b border-black p-5">
			<h3>5. 更新單筆資料</h3>
			<div class="my-4 flex gap-4">
				<input
					v-model="putItemName"
					type="text"
					placeholder="商品名稱"
					class="border"
				>
				<input
					v-model="putItemYear"
					type="number"
					placeholder="商品年份"
					class="border"
				>
				<input
					v-model="putItemPrice"
					type="number"
					placeholder="商品價格"
					class="border"
				>
				<input
					v-model="putItemCpu"
					type="text"
					placeholder="CPU 規格"
					class="border"
				>
				<input
					v-model="putItemDisk"
					type="text"
					placeholder="硬碟大小"
					class="border"
				>
			</div>
			<div class="flex gap-4">
				<button
					class="rounded bg-demo-main p-5 py-1 text-white"
					@click="putItemAct"
				>
					更新  {{ IDS_LIST[0] }} 資料
				</button>
			</div>
		</div>
		<!-- 更新單筆'屬性'資料 (patch/partially_update_item) -->
		<div class="border-b border-black p-5">
			<h3>6. 更新單筆'屬性'資料</h3>
			<div class="my-4 flex gap-4">
				<input
					v-model="putItemYear"
					type="number"
					placeholder="商品年份"
					class="border"
				>
			</div>
			<div class="flex gap-4">
				<button
					class="rounded bg-demo-main p-5 py-1 text-white"
					@click="patchItemAct"
				>
					更新  {{ IDS_LIST[0] }} 其『年份』
				</button>
			</div>
		</div>
		<!-- 刪除指定 id 資料 (del/delete_item) -->
		<div class="border-b border-black p-5">
			<h3>7. 刪除指定 id 資料</h3>
			<div class="my-4 flex gap-4">
				<input
					v-model="delItemId"
					type="text"
					placeholder="請輸入要刪除的 id"
					class="border"
				>
			</div>
			<div class="flex gap-4">
				<button
					class="rounded bg-[#7e0000] p-5 py-1 text-white"
					@click="delItemAct"
				>
					刪除
				</button>
				<span v-show="delResult">回傳結果: {{ delResult }}</span>
			</div>
		</div>
		<!-- 列表顯示區 -->
		<div class="border-b border-black p-5">
			<h3>8. 列表顯示區 (1,2,3)</h3>
			<ul v-if="list.length">
				<li
					v-for="(info, index) in list"
					:key="index"
				>
					{{ info }}
				</li>
			</ul>
			<p v-else>
				尚未請求
			</p>
		</div>
		<!-- 單筆更新回傳專區 -->
		<div class="grid p-5">
			<h3>9. 單筆更新回傳專區 (4,5,6)</h3>
			<span v-if="latestItem">{{ latestItem }}</span>
			<span v-else>無</span>
		</div>
	</div>
</template>
