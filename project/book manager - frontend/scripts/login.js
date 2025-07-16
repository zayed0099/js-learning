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
				// alert('Failed to send data.')
	});


	// get req to make sure the user is valid
	const token = localStorage.getItem('jwtToken');

	fetch('http://127.0.0.1:5000/auth/v1/check', {
				method: 'GET' ,
				headers: {
					'Authorization': `Bearer ${token}`
				}
		})
			.then(response => {
				if (!response.ok){
					throw new Error('Network response was not ok.');
				}
				return response.json();
		})
			.then(data => {
			// Check your "message" field
			if (data.message === "Valid") {
				console.log("User is valid, ID:", data.user_id);
				window.location.href = "book_cr.html";      
			} else {
				console.log("Invalid user");
			}
		})
			.catch(error => {
			console.error("Error:", error);
	});


});

document.getElementById("signupBtn").addEventListener("click", () => {
  window.location.href = "signup.html";
});
