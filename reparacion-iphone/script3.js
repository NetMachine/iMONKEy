const iPhoneModels = {
  iPhoneSE: ['iPhone SE 2G', 'iPhone SE 3G'],
  iPhone6S: ['iPhone 6S', 'iPhone 6S Plus'],
  iPhone7: ['iPhone 7', 'iPhone 7 Plus'],
  iPhone8: ['iPhone 8', 'iPhone 8 Plus'],
  iPhoneX: ['iPhone X', 'iPhone XS', 'iPhone XS Max', 'iPhone XR'],
  iPhone11: ['iPhone 11', 'iPhone 11 Pro', 'iPhone 11 Pro Max'],
  iPhone12: ['iPhone 12', 'iPhone 12 Mini', 'iPhone 12 Pro', 'iPhone 12 Pro Max'],
  iPhone13: ['iPhone 13', 'iPhone 13 Mini', 'iPhone 13 Pro', 'iPhone 13 Pro Max'],
  iPhone14: ['iPhone 14', 'iPhone 14 Plus', 'iPhone 14 Pro', 'iPhone 14 Pro Max'],
  iPhone15: ['iPhone 15', 'iPhone 15 Plus', 'iPhone 15 Pro', 'iPhone 15 Pro Max']
};

function updateIPhoneTypes() {
  if (priceCalculated) { 
	 resetPriceInfo();
	 priceCalculated = false;
}
  const iPhoneProductSelect = document.getElementById('products-dropdown');
  const iPhoneModelSelect = document.getElementById('models-details-dropdown');

  // Obtener el modelo de iPhone seleccionado
  const selectedModel = iPhoneProductSelect.value;

  // Limpiar las opciones existentes en el segundo dropdown
  iPhoneModelSelect.innerHTML = '<option value="Modelo" disabled selected>Modelo</option>';

  // Agregar las nuevas opciones según el modelo seleccionado
  if (selectedModel && iPhoneModels[selectedModel]) {
    iPhoneModels[selectedModel].forEach(type => {
      const option = document.createElement('option');
      option.value = type;
      option.text = type;
      iPhoneModelSelect.add(option);
    });
  }
}

