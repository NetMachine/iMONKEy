const repoUrl = 'https://api.github.com/repos/NetMachine/iMONKEy/contents'; // Replace with your repo URL
const fileList = document.getElementById('file-list');
let currentPath = 'download';

// Function to display files and folders
function displayFiles(path) {
  fileList.innerHTML = ''; // Clear previous content

  const backButton = document.querySelector('.back-btn');
  backButton.style.display = path !== 'download' ? 'block' : 'none';

  fetch(`${repoUrl}/${path}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Error al obtener los archivos');
      }
      return response.json();
    })
    .then(files => {
      files.forEach(item => {
        const listItem = document.createElement('li');
        const itemName = document.createElement('span');
        itemName.textContent = item.name;

        if (item.type === 'file') {
          const viewBtn = document.createElement('button');
          viewBtn.textContent = 'Ver';
          viewBtn.classList.add('view-btn');
          viewBtn.setAttribute('href', item.download_url); // Add the download URL as an attribute
          viewBtn.addEventListener('click', () => viewFile(item.download_url, item.name));

          // Add loading indicator for file view (optional)
          const viewLoading = document.createElement('span');
          viewLoading.classList.add('view-loading');
          viewLoading.style.display = 'none';
          viewBtn.appendChild(viewLoading);

          listItem.appendChild(itemName);
          listItem.appendChild(viewBtn);
        } else if (item.type === 'dir') {
          const folderIcon = document.createElement('i');
          folderIcon.className = 'fas fa-folder'; // Ensure Font Awesome is included if using this icon
          const folderBtn = document.createElement('button');
          folderBtn.classList.add('folder-btn');
          folderBtn.addEventListener('click', () => displayFiles(`${path}/${item.name}`));
          folderBtn.appendChild(folderIcon);
          folderBtn.appendChild(itemName);
          listItem.appendChild(folderBtn);
        }

        fileList.appendChild(listItem);
      });
    })
    .catch(error => {
      console.error('Error al obtener los archivos:', error);
      fileList.innerHTML = '<li>No se pudieron cargar los archivos.</li>';
    });
}

// Function to view a file
function viewFile(url, fileName) {
  const viewBtn = document.querySelector('.view-btn[href="' + url + '"]'); // Get the corresponding view button
  const viewLoading = viewBtn.querySelector('.view-loading'); // Get the loading indicator

  // Show loading indicator
  viewLoading.style.display = 'block';

  fetch(url)
    .then(response => response.text())
    .then(content => {
      const viewWindow = window.open('', '_blank', 'width=800,height=600');
      viewWindow.document.write(`<pre>${content}</pre>`);
      viewWindow.document.title = fileName;

      // Hide loading indicator
      viewLoading.style.display = 'none';
    })
    .catch(error => {
      console.error('Error al ver el archivo:', error);
      // Hide loading indicator
      viewLoading.style.display = 'none';
    });
}

// Create and add the "Back" button
const backButton = document.createElement('button');
backButton.classList.add('back-btn');
backButton.textContent = 'Volver al inicio';
backButton.addEventListener('click', () => {
  currentPath = 'download';
  displayFiles(currentPath);
});

fileList.parentElement.insertBefore(backButton, fileList);

// Initial file display
displayFiles(currentPath);
