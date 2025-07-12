let books = [
	{'title' : 'testing', 'author' : 'testing also'},
	{'title' : 'testing2', 'author' : 'testing also2'}
];


function renderTable(data) {
	let html = "<tr><th>Title</th><th>Author</th></tr>";
	  data.forEach(book => {
	    html += `<tr><td>${book.title}</td><td>${book.author}</td></tr>`;
});
	    document.getElementById("bookTable").innerHTML = html;
}

function addBook() {
	let title, author;

	title = document.getElementById('myInput').value;
	author = document.getElementById('myInput2').value;	
	books.push({ title: title, author: author });

	renderTable(books)
}

renderTable(books)
