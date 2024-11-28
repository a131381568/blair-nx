<script setup lang="ts">
import { staticData } from '@demo-src/constants/static-data';
import CountInfo from '@demo-src/components/CountInfo.vue';
import { BlairTable } from '@blair-nx-ui';

const MOCK_HEADER_DATA = [
	{ field: 'community_name', label: '社區名稱', fixed: false, sortable: false, width: '20%', minWidth: '15rem' },
	{ field: 'district', label: '區域', fixed: false, sortable: false, width: '10%', minWidth: '6.375rem' },
	{ field: 'age', label: '屋齡', fixed: false, sortable: false, width: '10%', minWidth: '6.375rem' },
	{ field: 'household', label: '戶數', fixed: false, sortable: false, width: '8%', minWidth: '6.375rem' },
	{ field: 'floor', label: '總樓層', fixed: false, sortable: false, width: '10%', minWidth: '6.375rem' },
	{ field: 'public_ratio', label: '公設比', fixed: false, sortable: false, width: '10%', minWidth: '6.375rem' },
	{ field: 'building_type', label: '型態', fixed: false, sortable: false, width: '10%', minWidth: '6.375rem' },
	{ field: 'price', label: '近一年成交價', fixed: false, sortable: false, width: '14%', minWidth: '7.875rem' },
	{ field: 'sale_count', label: '待售中', fixed: false, sortable: false, width: '8%', minWidth: '6.375rem' },
];
const MOCK_TABLE_DATA = [
	{ age: '4', sale_count: '0', id: 'L8091014111bc63', community_name: '彩葉山漆莖', district: '文山區', household: '36戶', floor: '7F~15F', public_ratio: '0.00%', building_type: '大樓', price: '99.99萬', community_state: 'new' },
	{ age: '25', sale_count: '1', id: 'L72d347582161', community_name: '仁愛新城己區', district: '中正區', household: '132戶', floor: '10F~16F', public_ratio: '0.00%', building_type: '大樓', price: '99.98萬', community_state: '' },
	{ age: '47', sale_count: '0', id: 'L96a387c9d5f', community_name: '香苑大廈', district: '大安區', household: '96戶', floor: '12F', public_ratio: '0.00%', building_type: '大樓', price: '99.98萬', community_state: '' },
	{ age: '35', sale_count: '0', id: 'L4e62142b05bf', community_name: '師大名園', district: '大安區', household: '22戶', floor: '12F', public_ratio: '0.00%', building_type: '大樓', price: '99.96萬', community_state: '' },
	{ age: '21', sale_count: '0', id: 'L5c144287f453', community_name: '將捷金鑽捷運大樓/U-PARTY', district: '文山區', household: '40戶', floor: '10F', public_ratio: '0.00%', building_type: '大樓', price: '99.66萬', community_state: '' },
	{ age: '45', sale_count: '1', id: 'L058801960654b', community_name: '健康華廈', district: '大安區', household: '77戶', floor: '7F', public_ratio: '14.80%-15.20%', building_type: '大樓', price: '99.65萬', community_state: '' },
	{ age: '8', sale_count: '99', id: 'L0e499350d2108', community_name: '敦年博愛凱旋', district: '中正區', household: '54戶', floor: '15F', public_ratio: '0.00%', building_type: '大樓', price: '99.62萬', community_state: '' },
	{ age: '34', sale_count: '3', id: 'Le3b51029b75dd', community_name: '松福大樓', district: '中正區', household: '16戶', floor: '12F', public_ratio: '0.00%', building_type: '大樓', price: '99.58萬', community_state: '' },
	{ age: '38', sale_count: '0', id: 'L8c4582241acf6', community_name: '金品大樓', district: '松山區', household: '49戶', floor: '12F', public_ratio: '0.00%', building_type: '商辦', price: '99.55萬', community_state: '' },
	{ age: '35', sale_count: '0', id: 'L7b62240203a5', community_name: '敦化林園', district: '松山區', household: '71戶', floor: '17F', public_ratio: '10.30%-11.40%', building_type: '大樓', price: '99.54萬', community_state: '' },
	{ age: '7', sale_count: '77', id: 'L2ee101469c5a0d', community_name: '威堡今綻', district: '中山區', household: '39戶', floor: '12F', public_ratio: '0.00%', building_type: '大樓', price: '99.5萬', community_state: '' },
	{ age: '29', sale_count: '9', id: 'L3e027631fbe8', community_name: '凱廈社區大樓', district: '信義區', household: '297戶', floor: '23F', public_ratio: '0.00%', building_type: '大樓', price: '99.5萬', community_state: '' },
	{ age: '5', sale_count: '99', id: 'Lba595939170a', community_name: '巨流河/翠堤灣', district: '中正區', household: '27戶', floor: '15F', public_ratio: '35.00%-36.00%', building_type: '大樓', price: '99.49萬', community_state: 'new' },
	{ age: '10', sale_count: '49', id: 'Lf459383703a19', community_name: '威尼斯商人', district: '信義區', household: '37戶', floor: '9F', public_ratio: '0.00%', building_type: '大樓', price: '99.48萬', community_state: '' },
	{ age: '11', sale_count: '3', id: 'Le6387838cc845', community_name: '正隆晶鑽', district: '南港區', household: '71戶', floor: '11F', public_ratio: '0.00%', building_type: '大樓', price: '99.45萬', community_state: '' },
	{ age: '30', sale_count: '2', id: 'Lfd82655dc766', community_name: '典藏大直', district: '中山區', household: '101戶', floor: '13F', public_ratio: '0.00%', building_type: '大樓', price: '99.38萬', community_state: '' },
	{ age: '7', sale_count: '3', id: 'L90410144593a3b', community_name: '興富發雙美館/双美舘', district: '南港區', household: '130戶', floor: '22F~24F', public_ratio: '32.00%-33.00%', building_type: '大樓', price: '99.34萬', community_state: '' },
	{ age: '18', sale_count: '36', id: 'Le6a48646d0a1', community_name: '歐夏蕾', district: '中山區', household: '242戶', floor: '14F', public_ratio: '0.00%', building_type: '大樓', price: '99.3萬', community_state: '' },
	{ age: '-1', sale_count: '0', id: 'L2961367993c90d', community_name: '南海1號苑', district: '中正區', household: '12戶', floor: '7F', public_ratio: '0.00%', building_type: '大樓', price: '99.2萬', community_state: 'pre' },
	{ age: '18', sale_count: '30', id: 'L839498316997', community_name: '花漾社區', district: '萬華區', household: '223戶', floor: '11F', public_ratio: '0.00%', building_type: '大樓', price: '99.19萬', community_state: '' },
];

const routerList = [
	'welcome',
	'apple',
];
</script>

<template>
	<h1>
		Home
	</h1>
	staticData: {{ staticData }}
	<h1>大標題一二三四五</h1>
	<h2>大標題一二三四五</h2>
	<h3>大標題一二三四五</h3>
	<h4>大標題一二三四五</h4>
	<h5>
		大標題一二三四五
	</h5>
	<hr>
	<ul>
		<li
			v-for="path in routerList"
			:key="path"
		>
			<router-link
				:to="`/${path}`"
				class="text-[#0000ff] underline"
			>
				Go to {{ path }}
			</router-link>
		</li>
	</ul>
	<hr>
	<CountInfo />
	<hr>
	<h2>BlairTable</h2>
	<BlairTable
		:header-data="MOCK_HEADER_DATA"
		:page-count="20"
		pagi-mode="classic"
		:table-data="MOCK_TABLE_DATA"
		:total-count="10392"
		:current-pagi="1"
	/>
</template>
