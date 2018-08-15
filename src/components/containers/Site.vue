<script>
import netlify from '@services/netlify'

export default {
	name: 'site',

	props: {

		site: {
			required: true
		}

	},

	computed: {

		deploy () {
			return netlify.data.deploys[this.site.deploy_id]
		}

	}

}
</script>

<template>
	<div :class="classes">

		<bitmap class="c-site-image" :src="site.screenshot_url" />

		<div class="c-site-name">{{ site.name }}</div>

		<div class="c-site-state" :class="'c-site-state-' + site.state">
			{{ deploy ? deploy.state : site.state }}
		</div>

	</div>
</template>

<style lang="scss">

.c-site-image {
	@include block;
	@include radius;
}

.c-site-state {
	@include inline-block;
	@include radius-tight;
	@include pad-tight;
	@include type-small;
	@include type-uppercase;
	background-color: color-translucent($color-white, 0.25);
}

</style>

