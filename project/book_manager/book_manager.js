let books = [
	{'id' : 1, 'title' : 'testing', 'author' : 'testing also'},
	{'id' : 2, 'title' : 'testing2', 'author' : 'testing also2'}
];


function renderTable(data) {
	let html = "<tr><th>ID</th><th>Title</th><th>Author</th></tr>";
	  data.forEach(book => {
	    html += `<tr><td>${book.id}</td><td>${book.title}</td><td>${book.author}</td></tr>`;
});
	    document.getElementById("bookTable").innerHTML = html;
}

function addBook() {
	let title, author, id;

	id_str = document.getElementById('id_').value;
	id = parseInt(id_str)
	title = document.getElementById('myInput').value;
	author = document.getElementById('myInput2').value;	
	books.push({ id : id ,title: title, author: author });


	renderTable(books)
}

function searchBook(data) {
	let title = document.getElementById('myInput3').value.trim();
	let html = "<tr><th>Title</th><th>Author</th></tr>";
	data.forEach(book => {
		if (book.title.toLowerCase() === title.toLowerCase()) {
			html += `<tr><td>${book.title}</td><td>${book.author}</td></tr>`;
		}
	});
	document.getElementById("searchTable").innerHTML = html;
}


renderTable(books)