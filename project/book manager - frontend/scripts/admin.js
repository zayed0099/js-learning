// console.log('connected')
let selectedadmin = null;

const token = localStorage.getItem('jwtToken');; // or set it manually

const tableBody2 = document.getElementById('userTable');
// Show all Admin Data
fetch('http://127.0.0.1:5000/a/v1/manage', {
method: 'GET',
headers: {
  'Authorization': `Bearer ${token}`
}
})
.then(response => {
  if (!response.ok) {
    throw new Error('Network response was not ok');
    tableBody2.innerHTML = '<tr><td colspan="3"><i>Error loading data.</i></td></tr>';
  }
  return response.json();
})

.then(data => {
  const admins = data.admins
  admins.forEach(item => {
    const row = document.createElement('tr');

    const usernamecell = document.createElement('td');
    usernamecell.textContent = item.username;
    row.appendChild(usernamecell);

    const emailcell = document.createElement('td');
    emailcell.textContent = item.email;
    row.appendChild(emailcell);

    const updateCell = document.createElement('td');
    const updateBtn = document.createElement('button');
    updateBtn.textContent = 'Update';

    updateBtn.addEventListener('click', () => {
        selectedbook = item
        showModal(item); // this function will open the modal and populate it
    });

    updateCell.appendChild(updateBtn);
    row.appendChild(updateCell);

    tableBody2.appendChild(row);
  });
})
.catch(error => {
  console.error('Error fetching data:', error);
  tableBody2.innerHTML = '<tr><td colspan="3"><i>Error loading data.</i></td></tr>';
}); 


// Show modal code
// Modal control logic
const modal = document.getElementById("modal");
const closeBtn = document.getElementById("closeBtn");
const modalTitle = document.getElementById("modalTitle");
const modalAuthor = document.getElementById("modalAuthor");
const modalGenre = document.getElementById("modalGenre");
const submitBtn = document.getElementById("submitChanges");

const token_ = localStorage.getItem('jwtToken');

function showModal(book) {
  modalTitle.textContent = book.title;
  modalAuthor.textContent = "Author: " + book.author;
  modalGenre.textContent = "Genre: " + book.genre;
  modal.style.display = "flex";
} // for function

closeBtn.addEventListener("click", () => {
  modal.style.display = "none";
});

window.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
  }
});


submitBtn.addEventListener('click', () => {
  const titleCng = document.getElementById('modalTitlecng').value.trim();
  const authorCng = document.getElementById('modalAuthorcng').value.trim();
  const genreCng = document.getElementById('modalGenrecng').value.trim();

  let dataToSend = {};

  if (titleCng) {dataToSend.title = titleCng;}
  if (authorCng) {dataToSend.author = authorCng;}
  if (genreCng) {dataToSend.genre = genreCng;}

  if (!selectedbook) {
    alert("No book selected for update.");
    return;}

  const url_update_data = `http://127.0.0.1:5000/api/v1/books/${selectedbook.id}`;

  fetch(url_update_data, {
    method: 'PATCH', // or 'PATCH' if updating
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token_}` // if using JWT
    },
    body: JSON.stringify(dataToSend)
  })
  .then(response => response.json())
  .then(data => {
    console.log('Success:', data);
    alert('Data updated successfully')
    selectedbook = null;
  })
  .catch(error => {
    console.error('Error:', error);
  });

}); // for submitBtn