<script>
import { isEmpty, sortBy, values } from 'lodash'

import netlify from '@services/netlify'

export default {
	name: 'page-sites',

	computed: {

		allDeploys () {
			return netlify.deploys
		},

		allSites () {
			return netlify.sites
		},

		deploys () {
			return sortBy(values(this.allDeploys), 'created_at').reverse().slice(0, 50)
		},

		sites () {
			return sortBy(values(this.allSites), 'updated_at').reverse()
		},

		isLoading () {
			return netlify.isLoading
		},

		isEmpty () {
			return isEmpty(this.allDeploys) || isEmpty(this.allSites)
		}

	}

}
</script>

<template>
	<div :class="classes" :limit="null">

		<fade>
			<div v-if="isEmpty && isLoading" class="c-page-sites-spinner">
				<spinner />
			</div>
		</fade>

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

	</div>
</template>

<style lang="scss">

.c-page-sites {
	@include buffer-relative-bottom;
}

.c-page-sites-spinner {
	@include keep-full-center;
	@include fixed;
	@include pad-horizontal;
	@include radius-round;
	z-index: 10;
	width: 3em;
	height: 3em;
	color: $color-netlify;
}

.c-page-sites-cell {
	@include flex-item-fixed;
}

.c-page-sites-deploys {

	.c-page-sites-cell {
		@include buffer-horizontal;
		@include push-vertical;
	}

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

</style>

