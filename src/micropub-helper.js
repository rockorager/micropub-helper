const qs = require("querystring");
const axios = require("axios");

module.exports = async function (event, tokenUrl) {
	
	let jsonData = {};

	// Look for query stuff first
	if (event.multiValueHeaders["Content-Type"][0] === "application/json") {
		// Just return the JSON, it's already an mf2 object
		jsonData = JSON.parse(event.body);
	} else {
		jsonData = {
			type: [],
			properties: {}
		};
	}

	let formData = qs.parse(event.body);

	// Auth
	if (
		!event.headers.hasOwnProperty("authorization") &&
		!formData.hasOwnProperty("access_token")
	) {
		return {
			statusCode: 401,
			body: "No access token provided",
		};
	}
	const token = event.headers.authorization || "Bearer " + data.access_token;
	let res = {};
	try {
		res = await axios.get("https://tokens.indieauth.com/token", {
			headers: {
				Accept: "application/json",
				Authorization: token,
			},
		});
	} catch {
		return {
			statusCode: 403,
			body: "Bad token",
		};
	}

	// TODO Check for scopes

	// Look for query string stuff
	if (event.queryStringParameters.hasOwnProperty("q")) {
		switch (event.queryStringParameters.q) {
			case "config":
				return {
					statusCode: 200,
					body: {},
					query: 'config'
				};
			case "source":
				// return properties of source
				return {
					statusCode: 200,
					body: {},
					query: 'source',
					source: 'PUT THE URL HERE'
				};
			case "syndicate-to":
				//return syndication targets
				return {
					statusCode: 200,
					body: {},
					query: 'syndicate-to'
				};
		}
	}

	// Look for query stuff first
	if (event.multiValueHeaders["Content-Type"][0] === "application/json") {
		// Just return the JSON, it's already an mf2 object
		return JSON.parse(event.body);
	}

	let keys = Object.keys(formData);
	keys.forEach(function (key) {
		if (key === "h") {
			jsonData.type = ["h-" + formData[key]];
		} else if (key === "access_token") {
			//Do nothing
		} else {
			jsonData.properties[key] = formData[key];
		}
	});

	if (jsonData.properties.hasOwnProperty("category[]")) {
		jsonData.properties.category = jsonData.properties["category[]"];
		delete jsonData.properties["category[]"];
	}

	return jsonData;
};
