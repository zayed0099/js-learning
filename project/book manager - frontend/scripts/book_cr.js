
document.getElementById('sendDataBtn').addEventListener('click', () => {

	const title = document.getElementById('titleInput').value;
	const author = document.getElementById('authorInput').value;
	const genre = document.getElementById('genreInput').value;

	const dataToSend = {
		title : title,
		author : author,
		genre : genre
	};
	
	const token = localStorage.getItem('jwtToken');

	fetch('http://127.0.0.1:5000/api/v1/books', {
		method: 'POST',
		headers: {
			'Authorization': `Bearer ${token}`,
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
		alert('Data sent successfully');
	})
	.catch(error => {
		console.error('There was a problem with the fetch operation:', error);
		alert('Failed to send data.')
	});

// ✅ Clear inputs automatically after submitting
	document.getElementById('titleInput').value = "";
	document.getElementById('authorInput').value = "";
	document.getElementById('genreInput').value = "";

});
