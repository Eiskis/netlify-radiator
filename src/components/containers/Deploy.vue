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
				<tag
					:color="
						deploy.state === 'error'
							? 'red'
							: deploy.state === 'building'
								? 'yellow'
								: 'green'
					"
				>
					{{ deploy.state }}
				</tag>
			</div>

			<div
				class="c-deploy-branch"
				:class="{
					'c-deploy-branch-master': deploy.branch === 'master'
				}"
			>
				<tag>{{ deploy.branch }}</tag>
			</div>

			<div class="c-deploy-name">
				{{ deploy.name }}
			</div>

			<!-- <div class="c-deploy-url">
				{{ deploy.url }}
			</div> -->

			<div v-if="deploy.published_at" class="c-deploy-time">
				<date-time :date="deploy.published_at" />
				({{ deploy.deploy_time }} s)
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

.c-deploy-state,
.c-deploy-branch,
.c-deploy-name,
.c-deploy-time {
	@include pad-tight;
}

.c-deploy-state,
.c-deploy-branch,
.c-deploy-time {
	@include flex-item-fixed;
}

.c-deploy-state {
	.c-tag {
		width: 8em;
	}
}

.c-deploy-name {
	@include flex-item-fluid;
	@include type-strong;
	color: $color-netlify;
}

// .c-deploy-branch {
	// 	color: $color-blue;
// }

.c-deploy-branch-master {
	color: $color-blue;
	// opacity: 0.25;
}

// .c-deploy-state {
// 	.c-tag {
// 		background-color: color-translucent($color-white, 0.25);
// 	}
// }

</style>

