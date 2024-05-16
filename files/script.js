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
          const downloadBtn = document.createElement('button');
          downloadBtn.textContent = 'Descargar';
          downloadBtn.classList.add('download-btn');
          downloadBtn.addEventListener('click', () => downloadFile(item.download_url));

          // Add loading indicator for file download (optional)
          const downloadLoading = document.createElement('span');
          downloadLoading.classList.add('download-loading');
          downloadLoading.style.display = 'none';
          downloadBtn.appendChild(downloadLoading);

          listItem.appendChild(itemName);
          listItem.appendChild(downloadBtn);
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

// Function to download a file
function downloadFile(url) {
  const downloadBtn = document.querySelector('.download-btn[href="' + url + '"]'); // Get the corresponding download button
  const downloadLoading = downloadBtn.querySelector('.download-loading'); // Get the loading indicator

  // Show loading indicator
  downloadLoading.style.display = 'block';

  fetch(url)
    .then(response => response.blob())
    .then(blob => {
      const downloadLink = document.createElement('a');
      downloadLink.href = URL.createObjectURL(blob);
      downloadLink.download = url.split('/').pop();
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);

      // Hide loading indicator
      downloadLoading.style.display = 'none';
    })
    .catch(error => {
      console.error('Error al descargar el archivo:', error);
      // Hide loading indicator
      downloadLoading.style.display = 'none';
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
