function getUserInfo(userId) {
	return new Promise((resolve, reject) => {
		const request = new XMLHttpRequest();
		request.open('GET', `https://api.github.com/users/${userId}`);
		request.addEventListener("load", (event) => {
			if (event.target.status != 200) {
				console.error(`${event.target.status}: ${event.target.statusText}`);
				return;
			}
			// console.log(event.target.status);
			// console.log(event.target.responseText);
			const userInfo = JSON.parse(event.target.responseText);
			const view = createView(userInfo);

			displayView(view);
			resolve(); // 完了
		});
		request.addEventListener("error", () => {
			console.error("Network Error!");
			reject();
		});
		request.send();
	});
}

function createView(userInfo) {
    return escapeHTML`
        <h4>${userInfo.name} (@${userInfo.login})</h4>
        <img src="${userInfo.avatar_url}" alt="${userInfo.login}" height="100">
        <dl>
            <dt>Location</dt>
            <dd>${userInfo.location}</dd>
            <dt>Repositories</dt>
            <dd>${userInfo.public_repos}</dd>
        </dl>
        `;
}

function displayView(view) {
	const result = document.getElementById("result");
	result.innerHTML = view;
}

function escapeSpecialChars(str) {
	return str
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/"/g, "&quot;")
		.replace(/'/g, "&#039;")
}

function escapeHTML(strings, ...values) {
	return strings.reduce((result, string, i) => {
		const value = values[i - 1];
		if (typeof value === 'string') {
			return result + escapeSpecialChars(value) + string;
		} else {
			return result + String(value) + string;
		}
	});
}