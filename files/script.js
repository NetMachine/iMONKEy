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
        link.href = '#'; // Usamos # para que no abra la página
        link.textContent = file.name;
        const downloadBtn = document.createElement('button');
        downloadBtn.classList.add('download-btn');
        downloadBtn.textContent = 'Descargar';
        downloadBtn.addEventListener('click', () => {
          // Generar la URL de descarga manualmente
          const downloadUrl = `https://raw.githubusercontent.com/NetMachine/iMONKEy/pif-pages/download/${encodeURIComponent(file.name)}`;
          // Crear un enlace de descarga temporal
          const downloadLink = document.createElement('a');
          downloadLink.href = downloadUrl;
          downloadLink.setAttribute('download', file.name);
          downloadLink.style.display = 'none';
          document.body.appendChild(downloadLink);
          downloadLink.click();
          document.body.removeChild(downloadLink);
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
