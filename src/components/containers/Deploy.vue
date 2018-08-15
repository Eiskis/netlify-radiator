<script>
export default {
	name: 'deploy',

	props: {
		deploy: {
			required: true
		}
	}

}
</script>

<template>
	<div :class="classes">

		<a
			class="c-deploy-main"
			:href="deploy.admin_url"
			target="_blank">

			<div class="c-deploy-state">
				{{ deploy.state }}
			</div>

			<div class="c-deploy-name">
				{{ deploy.name }}
			</div>

			<div
				class="c-deploy-branch"
				:class="{
					'c-deploy-branch-master': deploy.branch === 'master'
				}"
			>
				{{ deploy.branch }}
			</div>

			<!-- <div class="c-deploy-url">
				{{ deploy.url }}
			</div> -->

			<div class="c-deploy-time">
				{{ deploy.published_at ? deploy.published_at : '' }} ({{ deploy.deploy_time }} s)
			</div>

		</a>

		<div v-if="deploy.summary && deploy.summary.length" class="c-deploy-messages">
			<div v-for="(message, i) in deploy.summary.messages" :key="i">
				{{ message.title }}
			</div>
		</div>

		<div v-if="deploy.error_message" class="c-deploy-error">
			{{ deploy.error_message }})
		</div>

	</div>

</template>

<style lang="scss">

.c-deploy-main {
	@include block;
	@include flex;
}

.c-deploy-name {
	@include type-strong;
	color: $color-netlify;
}

.c-deploy-branch {
	@include inline-block;
	@include radius-tight;
	@include pad-tight;
	@include type-small;
	@include type-uppercase;
	color: $color-blue;
}

.c-deploy-branch-master {
	color: $color-white;
	opacity: 0.25;
}

.c-deploy-state {
	@include inline-block;
	@include radius-tight;
	@include pad-tight;
	@include type-small;
	@include type-uppercase;
	background-color: color-translucent($color-white, 0.25);
}

</style>

