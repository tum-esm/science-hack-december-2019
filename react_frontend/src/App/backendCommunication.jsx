
export function BackendGET(url, params) {

	return new Promise((resolve, reject) => {

		let xmlhttp;

		if (window.XMLHttpRequest) {
			// code for modern browsers
			xmlhttp = new XMLHttpRequest();

			xmlhttp.onreadystatechange = function () {

				/*
				https://www.w3schools.com/xml/ajax_xmlhttprequest_response.asp
				https://malcoded.com/posts/react-http-requests-axios/
				*/

				/*
				this.readyState = 0: request not initialized
								  1: server connection established
								  2: request received
								  3: processing request
								  4: request finished and response is ready
				*/

				if (this.readyState === 4) {
					if (this.status === 200) {
						resolve(this.responseText);
					} else {
						reject(this.responseText);
					}
				}
			};

			let query_string = "?";

			for (let key in params) {
				// noinspection JSUnfilteredForInLoop
				if (params[key] !== null) {
						// noinspection JSUnfilteredForInLoop
						query_string += key + "=" + params[key].toString();
					}
				query_string += "&";
			}

			console.log(query_string);

			xmlhttp.open("GET", url + query_string, true);
			// xmlhttp.send(JSON.stringify(params))
			xmlhttp.send(JSON.stringify(params))

		}

	});

}

export const BACKEND_URL = "https://science-hack-2019.herokuapp.com/backend/collection";
// export const BACKEND_URL = "http://127.0.0.1:5000/backend/collection";