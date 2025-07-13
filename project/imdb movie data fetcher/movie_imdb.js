function getData() {
	let imdbid_raw, imdbid, apikey;
	imdbid_raw = document.getElementById('imdbid').value;
	imdbid = imdbid_raw.trim()
	apikey = document.getElementById('apikey').value;

	url = `https://www.omdbapi.com/?i=${imdbid}&apikey=${apikey}`

	fetch(url)
	  .then(response => response.json()) // Parse the response body as JSON
	  .then(data => {
	  		const outputDiv = document.getElementById('output');

			outputDiv.innerHTML = `
			  <b>Movie Name</b> : ${data.Title}<br>
			  <b>Actors</b> : ${data.Actors}<br>
			  <b>Director</b> : ${data.Director}<br>
			  <b>Genre</b> : ${data.Genre}<br>
			  <b>Language</b> : ${data.Language}<br>
			  <b>Released</b> : ${data.Released}<br>
			  <b>imdbID</b> : ${data.imdbID}<br>
			  <b>imdbRating</b> : ${data.imdbRating}<br>
			  <b>Country</b> : ${data.Country}<br>
			  <b>BoxOffice</b> : ${data.BoxOffice}<br>
			  <b>Poster</b> : <a href="${data.Poster}" target="_blank">Click here</a>
			`;

	  })
	  .catch(error => console.error('Error fetching data:', error));
}

getData()
