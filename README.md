# UP Banking API to Google Apps Script

Provides a way to get a balance from an [Up Bank](https://up.com.au/) transactional or saver account into a Google Sheet using the [Up Banking API.](https://developer.up.com.au/)

## Getting started

Firstly make sure to follow the [getting started steps](https://developer.up.com.au/#getting-started) on the UP Banking API portal to claim your Personal Access Token.\
This is the token you will use to query the API and retrieve you account data.

## Setting up Apps Script

Inside of your Google Sheet go to Tools > Script editor.

Once the Script editor launches in a new tab, you should see a text editor with a single function inside, `myFunction`.

Hit the save icon and name your project.

## Retrieve data and insert it in a cell.

Copy the function below into the editor to define it as a new function for apps script.\
Be sure to replace the value for `UP_TOKEN` with your personal access token.

To retrieve the account ID to be used with this function, you can query the Up Banking API at https://api.up.com.au/api/v1/accounts/ with your personal access token, which will give you a list of all your accounts including their ids.


```javascript
const UP_TOKEN = 'up:yeah:XxXxXxXXxXxXxXXxXxXxXXxXxXxX'; // This is your personal access token

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
```

Save the project and go back to the google sheet.

Target the cell you want to insert your balance in and insert the function as the value in the following format:
`=getAccountBalance("xxxx-xxx-xxx-xxx-xxxxx")`

If everything went well, you should see the balance from the specified account appear in the cell after it fetches the value from the API.

You can now reuse this function in multiple cells with multiple accounts for all your budgeting needs!

## Refreshing balances on demand

You can use a little trick to refetch the balance of the accounts by passing in a second argument to the `getAccountBalance` function, which needs to be an absolute cell reference in the form of `$A$30`.

Open up [script.js](script.js) and copy the contents in the script editor.\
This includes the function listed above. Make sure to save.\
Be careful not to override your `UP_TOKEN` value with the placeholder value.

Go back to the sheet and designate which cell will be your absolute cell.\
Inside this cell, each time you press the button, a new value will be assigned with the current time. In `script.js` the cell is set to `A30` inside the `updateTimestamp` function as an example. Update this value with your absolute cell.

Update your references to the `getAccountBalance` function inside your sheet to the following:
`=getAccountBalance("xxxx-xxx-xxx-xxx-xxxxx", $A$30)`

Refresh the page and you should see a new menu item in the top menu called `Up Bank`.
Click on in and you should see `Updated Balances`. Click this to refresh the balances within your sheet.

How does this work?\
Since our `getAccountBalance` now references the absolute cell, each time the cell contents are updated, the function is triggered which fetches the balance and updates the balance cells.

