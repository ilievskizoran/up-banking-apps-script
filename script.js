const UP_TOKEN = 'up:yeah:XxXxXxXXxXxXxXXxXxXxXXxXxXxX'; // This is your personal access token

/**
 * @description Queries the given account and returns the balance.
 * You can retrieve the account id by querying https://api.up.com.au/api/v1/accounts
 * 
 * @param {String} accountId - The account ID of the account you want to retrieve the balance for.
 * 
 * @returns {Number} - The balance of the account.
 */
function getAccountBalance(accountId) {
	const options = {
		'method': 'GET',
		'headers': {
			'Authorization': `Bearer ${UP_TOKEN}`
		}
	};
	const response = UrlFetchApp.fetch(`https://api.up.com.au/api/v1/accounts/${accountId}`, options);
	const data = JSON.parse(response.getContentText());
	return parseFloat(data.data.attributes.balance.value);
}

function updateTimestamp() {
	const date = new Date();
	SpreadsheetApp.getActiveSheet().getRange('A30').setValue(date.toLocaleString());
}

function onOpen() {
	const ui = SpreadsheetApp.getUi();

	ui.createMenu('Up Bank')
		.addItem('Update Balances', 'updateTimestamp')
		.addToUi();
}