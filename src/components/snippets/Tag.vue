<script>
export default {
	name: 'tag',

	props: {
		color: {
			required: false
		}
	},

	computed: {

		_classes () {
			const classes = {}

			if (this.color) {
				classes[this.color] = true
			}

			return classes
		}

	}

}
</script>

<template>
	<span :class="classes"><slot /></span>
</template>

<style lang="scss">

.c-tag {
	@include inline-block;
	@include radius-tight;
	@include pad-tight-horizontal;
	@include type-small;
	@include type-uppercase;
	@include border-box;
	@include type-strong;
	@include align-center;
}

.c-tag-green {
	border-width: 1px;
	color: $color-green;
	border-color: $color-green;
}

.c-tag-yellow {
	border-width: 1px;
	color: $color-yellow;
	border-color: $color-yellow;
}

.c-tag-red {
	color: $color-white;
	background-color: $color-red;
}

</style>
