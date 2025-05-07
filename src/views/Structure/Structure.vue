<template>
	<div class="structure">
		<!--<Sidebar/>
		<div class="structure__page">
			<Header v-if="isWeb" @handleWebSidebar="handleWebSidebar" />
            -->
			<div
				id="structure__holder"
				class="structure__holder"
			>
				<router-view></router-view>
			</div>
	</div>
</template>

<script>
import { mapActions } from 'pinia';

//import Header from '@/components/shared/Header/Header.vue';
//import Sidebar from '@/components/shared/Sidebar/Sidebar.vue';

export default {
	name: 'Structure',
	components: { /*Header, Sidebar*/ },
	data: () => ({
	}),
	watch: {
		
	},
    created() {
  	},
	mounted() {
		
	},
	beforeUnmount() {
	
	},
	methods: {
		
	},
};
</script>
<style lang="scss">
@use 'Structure.scss';
</style>
