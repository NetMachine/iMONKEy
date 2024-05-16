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
        listItem.classList.add('file-item');

        const itemName = document.createElement('span');
        itemName.classList.add('file-name');
        itemName.textContent = item.name;

        if (item.type === 'file') {
          const viewBtn = document.createElement('button');
          viewBtn.classList.add('view-btn', 'download-btn');
          const viewIcon = document.createElement('i');
          viewIcon.className = 'fas fa-eye'; // Ensure Font Awesome is included if using this icon
          viewBtn.appendChild(viewIcon);
          viewBtn.addEventListener('click', () => {
            viewFile(item.download_url, item.name, item.size, item.updated_at);
          });

          const downloadBtn = document.createElement('a');
          downloadBtn.href = item.download_url;
          downloadBtn.download = item.name;
          downloadBtn.classList.add('download-btn');
          const downloadIcon = document.createElement('i');
          downloadIcon.className = 'fas fa-download'; // Ensure Font Awesome is included if using this icon
          downloadBtn.appendChild(downloadIcon);

          listItem.appendChild(itemName);
          listItem.appendChild(viewBtn);
          listItem.appendChild(downloadBtn);
        } else if (item.type === 'dir') {
          const folderIcon = document.createElement('i');
          folderIcon.className = 'fas fa-folder'; // Ensure Font Awesome is included if using this icon
          const folderBtn = document.createElement('button');
          folderBtn.classList.add('folder-btn', 'download-btn');
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
function viewFile(url, fileName, fileSize, fileUpdatedAt) {
  const fileContainer = document.createElement('div');
  fileContainer.classList.add('file-container');

  // Create a close button
  const closeBtn = document.createElement('button');
  closeBtn.classList.add('close-btn');
  closeBtn.textContent = 'Cerrar';
  closeBtn.addEventListener('click', () => {
    fileContainer.remove();
  });

  // Create a heading for the file name
  const fileHeader = document.createElement('h2');
  fileHeader.textContent = fileName;

  // Create a container for file details
  const fileDetailsContainer = document.createElement('div');
  fileDetailsContainer.classList.add('file-details');

  // Create file size element
  const fileSizeElement = document.createElement('p');
  fileSizeElement.textContent = `Tamaño: ${formatFileSize(fileSize)}`;


  fileDetailsContainer.appendChild(fileSizeElement);
  //fileDetailsContainer.appendChild(fileUpdatedElement);

  // Create an image or text element to display the content
  const fileContentContainer = document.createElement('div');
  fileContentContainer.classList.add('file-content');

  fetch(url)
    .then(response => {
      // Check if the file is an image
      const contentType = response.headers.get('Content-Type');
      if (contentType.startsWith('image/')) {
        return response.blob();
      } else {
        return response.text();
      }
    })
    .then(content => {
      if (content instanceof Blob) {
        const imageUrl = URL.createObjectURL(content);
        const image = document.createElement('img');
        image.src = imageUrl;
        image.alt = fileName;
        image.style.maxWidth = '100%';
        image.style.maxHeight = '80vh'; // Limit the height to 80% of the viewport height
        fileContentContainer.appendChild(image);
      } else {
        // For non-image files, display the text content
        const fileContent = document.createElement('pre');
        fileContent.textContent = content.length > 1000 ? content.slice(0, 1000) + '...' : content;
        fileContentContainer.appendChild(fileContent);
      }
    })
    .catch(error => {
      console.error('Error al ver el archivo:', error);
    });

  // Append the close button, file header, file details, and file content
  fileContainer.appendChild(closeBtn);
  fileContainer.appendChild(fileHeader);
  fileContainer.appendChild(fileDetailsContainer);
  fileContainer.appendChild(fileContentContainer);

  // Append the file container to the page
  document.body.appendChild(fileContainer);

  // Set the styles for the file container
  fileContainer.style.position = 'fixed';
  fileContainer.style.top = '50%';
  fileContainer.style.left = '50%';
  fileContainer.style.transform = 'translate(-50%, -50%)';
  fileContainer.style.backgroundColor = '#fff';
  fileContainer.style.padding = '2rem';
  fileContainer.style.boxShadow = '0 0 20px rgba(0, 0, 0, 0.3)';
  fileContainer.style.maxWidth = '80%';
  fileContainer.style.maxHeight = '90%';
  fileContainer.style.overflowY = 'auto';
}

// Helper function to format file size
function formatFileSize(size) {
  const units = ['bytes', 'KB', 'MB', 'GB'];
  let index = 0;
  while (size >= 1024 && index < units.length - 1) {
    size /= 1024;
    index++;
  }
  return `${size.toFixed(2)} ${units[index]}`;
}

// Helper function to format file date
function formatFileDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleString();
}

// Create and add the "Back" button
const backButton = document.createElement('button');
backButton.classList.add('back-btn', 'download-btn');
backButton.textContent = 'Volver al inicio';
backButton.addEventListener('click', () => {
  currentPath = 'download';
  displayFiles(currentPath);
});

fileList.parentElement.insertBefore(backButton, fileList);

// Initial file display
displayFiles(currentPath);
