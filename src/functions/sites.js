const filter = require('lodash').filter
const includes = require('lodash').includes
const keyBy = require('lodash').keyBy
const map = require('lodash').map
const merge = require('lodash').merge
const axios = require('axios')

const accessToken = process.env.ACCESS_TOKEN
const sitesToShow = process.env.SITES

exports.handler = (event, context, callback) => {

	if (!accessToken) {
		throw new Error('You must provide a valid Netlify access token as the environment variable "ACCESS_TOKEN" to access your sites via API. You can generate a personal access token on your Netlify dashboard.')
	}

	console.log('Sending request to Netlify...')

	const baseUrl = 'https://api.netlify.com/api/v1/'
	const query = '?access_token=' + accessToken

	axios.get(baseUrl + 'sites' + query)
		.then((response) => {
			console.log('Fetched sites', response.status)

			// Compose list of sites
			let sites = response.data

			// console.log('Netlify sites', sites)
			console.log('Netlify sites', sites.length)

			if (sitesToShow) {
				let siteList = sitesToShow.split(',')
				siteList = map(siteList, (siteName) => {
					return siteName.trim()
				})

				console.log('Filtering site list', sitesToShow, siteList)

				sites = filter(sites, (site) => {
					return includes(siteList, site.name) || includes(siteList, site.id)
				})

			}

			sites = keyBy(sites, 'id')



			// Each site's deploys
			const promises = []
			let deploys = {}

			for (const siteId in sites) {
				const site = sites[siteId]

				promises.push(
					axios.get(baseUrl + 'sites/' + site.id + '/deploys' + query)
						.then((response2) => {
							console.log('Fetched deploys (' + site.name + ')', response2.status)

							console.log(response2.data)

							deploys = merge(
								{},
								deploys,
								keyBy(response2.data, 'id')
							)

						}).catch((error) => {
							callback(error, null)
						})
				)

			}

			Promise.all(promises).then(() => {

				callback(null, {
					statusCode: 200,
					headers: {
						'Content-Type': 'application/json',
						'Access-Control-Allow-Origin': '*'
					},
					body: JSON.stringify({
						status: 200,
						data: {
							deploys,
							sites
						}
					})
				})

			}).catch((error3) => {
				callback(error3, null)
			})

		}).catch((error) => {
			callback(error, null)
		})

}
