<script>
import { format } from 'date-fns'
import { isString } from 'lodash'

export default {
	name: 'date-time',

	props: {

		date: {
			type: [String, Date],
			required: true
		}

	},

	computed: {

		dateObject () {
			return isString(this.date) ? new Date(this.date) : this.date
		},

		dateTimeString () {
			return format(this.date, 'd MMMM YYYY hh:mm')
		}

	},

	created () {
		console.log('datetime', this.date)
	}

}
</script>

<template>
	<span :class="classes">{{ dateTimeString }}</span>
</template>

<style lang="scss">
// .c-date-time {}
</style>
