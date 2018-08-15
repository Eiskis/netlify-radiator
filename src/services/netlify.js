import axios from 'axios'
import Vue from 'vue'

import paths from '@config/paths'

// Refresh every 10 sec
const intervalDuration = 10 * 1000

export default new Vue({

	data () {
		return {
			interval: null,
			isLoading: false,
			data: {
				deploys: {},
				sites: {}
			}
		}
	},

	computed: {

		hasData () {
			return this.data ? true : false
		},

		sites () {
			if (this.hasData) {
				return this.data.sites
			}
			return null
		},

		deploys () {
			if (this.hasData) {
				return this.data.deploys
			}
			return null
		}

	},

	created () {
		this.getNetlifyData()

		this.interval = setInterval(this.getNetlifyData, intervalDuration)

	},

	methods: {

		getNetlifyData () {
			this.isLoading = true

			axios.get(paths.functions + 'sites').then((response) => {
				this.isLoading = false
				this.data = {
					deploys: {
						...this.data.deploys,
						...response.data.data.deploys
					},
					sites: {
						...this.data.sites,
						...response.data.data.sites
					}
				}

			}).catch((error) => {
				this.isLoading = false
				console.warn(error)
			})

		}

	}

})
