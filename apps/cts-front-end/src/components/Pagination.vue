<script setup lang="ts">
import PreviousIcon from '@ctsf-src/components/svg/PreviousIcon.vue';
import NextIcon from '@ctsf-src/components/svg/NextIcon.vue';

const props = defineProps({
	hasNextPage: {
		type: Boolean,
		default: false,
	},
	hasPreviousPage: {
		type: Boolean,
		default: false,
	},
	totalPagi: {
		type: Number,
		default: 1,
	},
	actionPage: {
		type: Number,
		default: 1,
	},
	limitCount: {
		type: Number,
		default: 7,
	},
});
const emit = defineEmits<{ (e: 'selectPagi', pagi: number): number }>();

const actionPreviousPagi = () => {
	if (props.actionPage)
		emit('selectPagi', props.actionPage - 1);
};

const actionNextPagi = () => {
	if (props.actionPage)
		emit('selectPagi', props.actionPage + 1);
};

const actionSelectPagi = (pagi: number) => {
	emit('selectPagi', pagi);
};
</script>

<template>
	<div class="-ml-2 mt-14 w-10/12 mobile:m-auto">
		<nav aria-label="Page navigation">
			<ul class="inline-flex items-center -space-x-px">
				<li
					:class="{ 'pointer-events-none opacity-50': !hasPreviousPage }"
					@click="actionPreviousPagi"
				>
					<a class="ml-0 mt-1 block cursor-pointer py-0 pr-3 text-main-color-light">
						<span class="sr-only">Previous</span>
						<PreviousIcon />
					</a>
				</li>
				<li
					v-for="index in totalPagi"
					:key="index"
					:class="{ 'pointer-events-none': actionPage === index }"
					@click="actionSelectPagi(index)"
				>
					<a
						class="mx-1 inline-flex size-6 cursor-pointer items-center justify-center rounded-full pb-[2px]
          pl-[2px] text-middle font-semibold text-main-color-light transition-all duration-700 hover:bg-main-color-light hover:text-main-color-dark"
						:class="{ 'bg-main-color-light !text-main-color-dark': actionPage === index }"
					>
						{{ index }}</a>
				</li>
				<li
					:class="{ 'pointer-events-none opacity-50': !hasNextPage }"
					@click="actionNextPagi"
				>
					<a class="mt-1 block cursor-pointer px-3 py-0 text-main-color-light">
						<span class="sr-only">Next</span>
						<NextIcon />
					</a>
				</li>
			</ul>
		</nav>
	</div>
</template>
