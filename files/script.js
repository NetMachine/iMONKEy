const repoUrl = 'https://api.github.com/repos/NetMachine/iMONKEy/contents'; // Replace with your repo URL
const fileList = document.getElementById('file-list');
const backButton = document.querySelector('.back-btn');
let currentPath = 'download';

function displayFiles(path) {
  fileList.innerHTML = ''; // Clear previous content

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

        const fileActions = document.createElement('div');
        fileActions.classList.add('file-actions');

        if (item.type === 'file') {
          const viewBtn = document.createElement('button');
          viewBtn.classList.add('button', 'is-primary', 'is-small', 'view-btn');
          const viewIcon = document.createElement('span');
          viewIcon.classList.add('icon');
          const viewIconImage = document.createElement('i');
          viewIconImage.classList.add('fas', 'fa-eye');
          viewIcon.appendChild(viewIconImage);
          viewBtn.appendChild(viewIcon);
          viewBtn.addEventListener('click', () => {
            viewFile(item.download_url, item.name, item.size, item.updated_at);
          });

          const downloadBtn = document.createElement('a');
          downloadBtn.href = item.download_url;
          downloadBtn.download = item.name;
          downloadBtn.classList.add('button', 'is-primary', 'is-small', 'download-btn');
          const downloadIcon = document.createElement('span');
          downloadIcon.classList.add('icon');
          const downloadIconImage = document.createElement('i');
          downloadIconImage.classList.add('fas', 'fa-download');
          downloadIcon.appendChild(downloadIconImage);
          downloadBtn.appendChild(downloadIcon);

          fileActions.appendChild(viewBtn);
          fileActions.appendChild(downloadBtn);
        } else if (item.type === 'dir') {
          const folderBtn = document.createElement('button');
          folderBtn.classList.add('button', 'is-primary', 'is-small', 'folder-btn');
          const folderIcon = document.createElement('span');
          folderIcon.classList.add('icon');
          const folderIconImage = document.createElement('i');
          folderIconImage.classList.add('fas', 'fa-folder');
          folderIcon.appendChild(folderIconImage);
          folderBtn.appendChild(folderIcon);
          folderBtn.appendChild(itemName);
          folderBtn.addEventListener('click', () => displayFiles(`${path}/${item.name}`));

          fileActions.appendChild(folderBtn);
        }

        listItem.appendChild(itemName);
        listItem.appendChild(fileActions);
        fileList.appendChild(listItem);
      });
    })
    .catch(error => {
      console.error('Error al obtener los archivos:', error);
      fileList.innerHTML = '<li class="file-item">No se pudieron cargar los archivos.</li>';
    });
}

function viewFile(url, fileName, fileSize, fileUpdatedAt) {
  const fileContainer = document.createElement('div');
  fileContainer.classList.add('file-container');

  const closeBtn = document.createElement('button');
  closeBtn.classList.add('button', 'is-danger', 'is-small', 'close-btn');
  const closeIcon = document.createElement('span');
  closeIcon.classList.add('icon');
  const closeIconImage = document.createElement('i');
  closeIconImage.classList.add('fas', 'fa-times');
  closeIcon.appendChild(closeIconImage);
  closeBtn.appendChild(closeIcon);
  closeBtn.addEventListener('click', () => {
    fileContainer.remove();
  });

  const fileHeader = document.createElement('h2');
  fileHeader.classList.add('title', 'is-4');
  fileHeader.textContent = fileName;

  const fileDetailsContainer = document.createElement('div');
  fileDetailsContainer.classList.add('file-details');

  const fileSizeElement = document.createElement('p');
  fileSizeElement.textContent = `Tamaño: ${formatFileSize(fileSize)}`;

  fileDetailsContainer.appendChild(fileSizeElement);

  const fileContentContainer = document.createElement('div');
  fileContentContainer.classList.add('file-content');

  fetch(url)
    .then(response => {
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
        image.style.maxHeight = '100%';
        fileContentContainer.appendChild(image);
      } else {
        const fileContent = document.createElement('pre');
        fileContent.textContent = content.length > 1000 ? content.slice(0, 1000) + '...' : content;
        fileContentContainer.appendChild(fileContent);
      }
    })
    .catch(error => {
      console.error('Error al ver el archivo:', error);
    });

  fileContainer.appendChild(closeBtn);
  fileContainer.appendChild(fileHeader);
  fileContainer.appendChild(fileDetailsContainer);
  fileContainer.appendChild(fileContentContainer);

  document.body.appendChild(fileContainer);
}

function formatFileSize(size) {
  const units = ['bytes', 'KB', 'MB', 'GB'];
  let index = 0;
  while (size >= 1024 && index < units.length - 1) {
    size /= 1024;
    index++;
  }
  return `${size.toFixed(2)} ${units[index]}`;
}

backButton.addEventListener('click', () => {
  currentPath = 'download';
  displayFiles(currentPath);
});

displayFiles(currentPath);
