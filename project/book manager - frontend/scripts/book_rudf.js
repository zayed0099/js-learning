document.addEventListener('DOMContentLoaded', () => {
	const token = localStorage.getItem('jwtToken');
    const tableBody = document.getElementById('dataTableBody');
    const apiUrl = 'http://127.0.0.1:5000/api/v1/books'; // Example API endpoint

    fetch(apiUrl, {
		method: 'GET',
		headers: {
			'Authorization': `Bearer ${token}`}
		})
        .then(response => response.json())
        .then(data => {
        	console.log(data);
        	const books = data.books; // get the array from inside the object

			    if (!Array.isArray(books)) {
			        console.error('Expected books array, got:', data);
			        tableBody.innerHTML = '<tr><td colspan="3">No books found or error occurred.</td></tr>';
			        return;
			    }

            books.forEach(item => {
                  const row = document.createElement('tr');

                  const titleCell = document.createElement('td');
                  titleCell.textContent = item.title;
                  row.appendChild(titleCell);

                // Show more (Edit + Delete + Favourites)
          				// Code for DELETE option.
          				const buttonCell = document.createElement('td');
          				const delBtn = document.createElement('button');
          				delBtn.textContent = 'Delete';

          				// Add event listener for button click
          				delBtn.addEventListener('click', () => {
          				    alert(
          				        `Title: ${item.title} will be deleted.`
          				    );

                              url_del = `http://127.0.0.1:5000/api/v1/books/${item.id}`
                              fetch(url_del, {
                                    method: 'DELETE',
                                    headers: {
                                      'Authorization': `Bearer ${token}`}
                                  })
                                  .then(response => {
                                    if (!response.ok) {
                                      throw new Error('Network response was not ok ' + response.statusText);
                                    }
                                    // Handle successful deletion (e.g., remove from UI)
                                    console.log('Resource deleted successfully');
                                    alert('Book deleted successfully.');
                                    location.reload();
                                  })
                                  .catch(error => {
                                    // Handle errors (e.g., display error message)
                                    console.error('There was a problem with the fetch operation:', error);
                              });
          				});

          				buttonCell.appendChild(delBtn);
          				row.appendChild(buttonCell);
                
                // Appending all those data
              tableBody.appendChild(row);
            });
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            tableBody.innerHTML = '<tr><td colspan="3"><i>Error loading data.</i></td></tr>';
        });
});


// Logout Button
document.getElementById("logout").addEventListener("click", () => {
  localStorage.removeItem('jwtToken');
  window.location.href = "login.html";
});