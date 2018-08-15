<script>
import '@styles-global'

export default {
	name: 'app',
	computed: {
		routerKey () {
			return this.$route.name
		}
	}
}
</script>

<template>
	<div :class="classes">
		<fade>
			<router-view :key="routerKey" />
		</fade>
	</div>
</template>

<style lang="scss">

// .c-app {}

</style>
