# Netlify radiator

## Requirements

1. Clone repo
2. `npm install`
3. Generate a personal access token on [app.netlify.com/account/applications](https://app.netlify.com/account/applications)

With the access token, this radiator can access your sites via Netlify's API. It doesn't support anything but read operations currently, although the API does support a lot of functionality as [defined in the documentation](https://www.netlify.com/docs/api/).

**Protip:** for increased robustness, use [nvm](https://github.com/creationix/nvm) to ensure you're using the recommended version of Node.

## Deploying to Netlify

1. Deploy your fork as a new Netlify site. You can choose a cryptic name if you don't want people to find your radiator easily.
2. Add the access token you generated as a [build environment variable](https://app.netlify.com/sites/bellevue/settings/deploys) with the key `ACCESS_TOKEN`
3. Optional: add an environment variable `SITES` with a comma-separated list of the site names you want to show (`name` is the page title you see for each site on Netlify). If you don't do this, all your sites will be shown.
4. Trigger a deploy manually after editing the environment variables for good measure

Your radiator should now show the status of your sites.

## Running locally

You need to start up a couple of node scripts in your terminal, inserting the same options as above as environment variables:

1. Run `ACCESS_TOKEN=abcdefgthisismyaccesstoken1234 npm run lambda:dev` to start the backend server
2. Run `npm run dev` to start the client

The backend will start up on port `9000` by default. On the client-side this is configured in `config/dev/paths.js`.
