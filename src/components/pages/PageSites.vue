<script>
import { isEmpty, sortBy, values } from 'lodash'

import netlify from '@services/netlify'

export default {
	name: 'page-sites',

	computed: {

		// isLoading () {
		// 	return netlify.isLoading
		// },

		allSites () {
			return netlify.sites
		},

		sites () {
			return sortBy(values(this.allSites), 'updated_at').reverse()
		},

		allDeploys () {
			return netlify.deploys
		},

		deploys () {
			return sortBy(values(this.allDeploys), 'created_at').reverse().slice(0, 50)
		},

		isEmpty () {
			return isEmpty(this.sites) || isEmpty(this.deploys) ? true : false
		}

	}

}
</script>

<template>
	<div :class="classes" :limit="null">

		<!-- <fade>
			<div v-if="isLoading" class="c-page-sites-spinner">
				<spinner />
			</div>
		</fade> -->

		<div v-if="!isEmpty" class="c-page-sites-sites">
			<div
				class="c-page-sites-cell"
				v-for="site in sites"
				:key="site.id">
				<site :site="site" />
			</div>
		</div>

		<div v-if="!isEmpty" class="c-page-sites-deploys">
			<div
				class="c-page-sites-cell"
				v-for="deploy in deploys"
				:key="deploy.id">
				<deploy :deploy="deploy" />
			</div>
		</div>

		<!-- <dump v-if="dump" :value="dump" /> -->

	</div>
</template>

<style lang="scss">

.c-page-sites {
	// color: $color-white;
	// background-color: $color-black;
	@include buffer-relative-bottom;
}

.c-page-sites-spinner {
	@include absolute;
	@include pad-horizontal;
	@include radius-round;
	z-index: 10;
	top: 1em;
	left: 1em;
	width: 1em;
	height: 1em;
}

.c-page-sites-cell {
	@include flex-item-fixed;
}

.c-page-sites-sites {
	@include flex;
	@include overflow-horizontal;
	@include buffer-vertical-even;
	width: 100%;

	.c-page-sites-cell {
		@include buffer-right;
		width: 11em;

		&:first-child {
			@include buffer-left;
		}

	}

}

.c-page-sites-deploys {

	.c-page-sites-cell {
		@include buffer-horizontal;
		@include push-vertical;
	}

}

</style>

