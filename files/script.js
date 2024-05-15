// Reemplaza 'username' y 'repositorio' con tus propios datos
const repoUrl = 'https://api.github.com/repos/NetMachine/iMONKEy/contents/download';
const fileList = document.querySelector('.file-list');

fetch(repoUrl)
  .then(response => response.json())
  .then(files => {
    files.forEach(file => {
      if (!file.type || file.type === 'file') {
        const listItem = document.createElement('li');
        const linkWrapper = document.createElement('div');
        const link = document.createElement('a');
        link.href = file.download_url;
        link.textContent = file.name;
        const downloadBtn = document.createElement('button');
        downloadBtn.classList.add('download-btn');
        downloadBtn.textContent = 'Descargar';
        downloadBtn.addEventListener('click', () => {
          // Redirigir a la URL de descarga directamente
          window.location.href = file.download_url;
        });
        linkWrapper.appendChild(link);
        listItem.appendChild(linkWrapper);
        listItem.appendChild(downloadBtn);
        fileList.appendChild(listItem);
      }
    });
  })
  .catch(error => {
    console.error('Error al obtener los archivos:', error);
    fileList.innerHTML = '<li>No se pudieron cargar los archivos.</li>';
  });
