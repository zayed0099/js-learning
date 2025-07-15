document.getElementById('sendDataBtn').addEventListener('click', () => {

	const username = document.getElementById('usernameInput').value;
	const password = document.getElementById('passInput').value;

	const dataToSend = {
		username : username,
		password : password
	};
	
	fetch('http://127.0.0.1:5000/auth/v1/login', {
		method: 'POST',
		headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataToSend)
	})
	.then(response => {
		if (!response.ok){
			throw new Error('Network response was not ok.');
		}
		return response.json();
	})
	.then(data => {
		console.log('Server Response:', data);

		// extracting it from response and saving it in local storage
    	const accessToken = data.access_token;
    	localStorage.setItem('jwtToken', accessToken);
	})
	.catch(error => {
		console.error('There was a problem with the fetch operation:', error);
		alert('Failed to send data.')
	});

});

document.getElementById("signupBtn").addEventListener("click", () => {
  window.location.href = "signup.html";
});
