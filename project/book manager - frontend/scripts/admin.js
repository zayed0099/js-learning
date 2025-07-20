// console.log('connected')

const token = localStorage.getItem('jwtToken');; // or set it manually
const tableBody = document.getElementById('allUserBooks'); // your tbody should have id="api-table-body"

fetch('http://127.0.0.1:5000/a/v1/books', {
method: 'GET',
headers: {
  'Authorization': `Bearer ${token}`
}
})
.then(response => {
  if (!response.ok) {
    throw new Error('Network response was not ok');
    tableBody.innerHTML = '<tr><td colspan="3"><i>Error loading data.</i></td></tr>';
  }
  return response.json();
})

.then(data => {
  const books = data.books
  books.forEach(item => {
    const row = document.createElement('tr');

    const titleCell = document.createElement('td');
    titleCell.textContent = item.title;
    row.appendChild(titleCell);

    const authorCell = document.createElement('td');
    authorCell.textContent = item.author;
    row.appendChild(authorCell);

    const delCell = document.createElement('td');
    delCell.textContent = item.is_deleted;
    row.appendChild(delCell);

    const useridCell = document.createElement('td');
    useridCell.textContent = item.user_id;
    row.appendChild(useridCell);

    tableBody.appendChild(row);
  });
})
.catch(error => {
  console.error('Error fetching data:', error);
  tableBody.innerHTML = '<tr><td colspan="3"><i>Error loading data.</i></td></tr>';
});
