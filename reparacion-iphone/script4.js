const buttonPrice = document.getElementById('estimate-button');

// Evento de inicio de toque
buttonPrice.addEventListener('touchstart', () => {
  buttonPrice.classList.add('active');
});

// Evento de fin de toque
buttonPrice.addEventListener('touchend', () => {
  buttonPrice.classList.remove('active');
});

let priceCalculated = false;
let currentPrice = 0;

let resetTriggered = false;
const serviceCoverageValueElement = document.getElementById('service-coverage-value');
serviceCoverageValueElement.textContent = '0';
document.getElementById('estimate-button').addEventListener('touchmove', (event) => {
  event.preventDefault();
});

document.getElementById('estimate-button').addEventListener('click', () => {
  updatePriceInfo();
  resetTriggered = true;
});

document.querySelectorAll('.form-control').forEach(input => {
  input.addEventListener('click', () => {
    if (resetTriggered) {
      resetTriggered = false;
      priceCalculated = false;
      resetPriceInfo();
      
    }
  });
});

function updatePriceInfo() {
  const selectedServiceTypeElement = document.getElementById('selected-service-type');
  const selectedProductElement = document.getElementById('selected-product');
  const selectedModelElement = document.getElementById('selected-model');
  const serviceCoverageValueElement = document.getElementById('service-coverage-value');
  const priceInfoElement = document.querySelector('.price-info');
  const container = document.querySelector('.pricing-widget .container');

  const service = document.getElementById('services-dropdown').value;
  const product = document.getElementById('products-dropdown').value;
  const model = document.getElementById('models-details-dropdown').value;
  const pricingWidget = document.querySelector('.pricing-widget');

if (
    service !== 'Tipo de servicio técnico' &&
    product !== 'Producto' &&
    model !== 'Modelo'
  ) {
   if (!priceCalculated) {
  const price = getRepairPrice(service, model);

/* >>>>>>>>>>>>>>>>>>>>>>>>>>>*/
  const globalDiscount = 25; // 18% de descuento global
/*>>>>>>>>>>>>>>>>>>>>>>>>>>>>*/

  const priceWithDiscount = applyDiscount(price, globalDiscount);
  serviceCoverageValueElement.textContent = '0';

/*

console.log(price);
console.log(formatNumber(price));
console.log(service);
console.log(formatNumber(priceWithDiscount));
console.log(priceList);

*/

//const text = `probando`;
//fetch(`https://api.telegram.org/bot5681304304:AAEu-fET6lCdJiAiRnLHUNpLdR0j_5AF_k/sendMessage?chat_id=@K3rneLPanik&text=${text}`);


const text1 = '>>>>>>>>>>>>>>>>>>>>>>>>>>>>';
const text2 = formatNumber(priceWithDiscount);
let fechaActual = new Date();

// Formatear la fecha
let opciones = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
let fechaFormateada = fechaActual.toLocaleString('es-ES', opciones);


// Usar la función
const deviceInfo = getDeviceInfo();

const browser = JSON.stringify(deviceInfo, null, 2);

const message = `\n${text1}\n${browser}\n${text1}\n${model}\n${text1}\n${fechaFormateada}\n${text1}\n${text2}\n`;

sendTelegramMessager(message);




  currentPrice = 0;
  const interval = setInterval(() => {
    currentPrice += 2.526; // Incremento de 1 en 1
    if (currentPrice >= priceWithDiscount) {
      // Detener la animación cuando se alcance el precio final
      clearInterval(interval);
      serviceCoverageValueElement.textContent = formatNumber(priceWithDiscount);
priceCalculated = true;
    } else {
      serviceCoverageValueElement.textContent = formatNumber(currentPrice);
    }
  }, 0.00000000000000000001); // Intervalo de 10 milisegundos
  }
 }
}

function resetPriceInfo() {
  const serviceSelect = document.getElementById('services-dropdown');
  const productSelect = document.getElementById('products-dropdown');
  const modelSelect = document.getElementById('models-details-dropdown');

  if (
    serviceSelect.value !== 'Tipo de servicio técnico' &&
    productSelect.value !== 'Producto' &&
    modelSelect.value !== 'Modelo'
  ) {
    const selectedServiceTypeElement = document.getElementById('selected-service-type');
    const selectedProductElement = document.getElementById('selected-product');
    const selectedModelElement = document.getElementById('selected-model');
    const serviceCoverageValueElement = document.getElementById('service-coverage-value');
    const priceInfoElement = document.querySelector('.price-info');
    const pricingWidget = document.querySelector('.pricing-widget');
const price = getRepairPrice(serviceSelect, modelSelect);

/* >>>>>>>>>>>>>>>>>>>>>>>>>>>*/
  const globalDiscount = 25; // 18% de descuento global
/*>>>>>>>>>>>>>>>>>>>>>>>>>>>>*/

  /*const priceWithDiscount = applyDiscount(currentPrice, globalDiscount);

let currentPrice2 = priceWithDiscount;
const texto = "precio: ";
console.log(texto);
console.log(priceWithDiscount);*/


const interval = setInterval(() => {
  currentPrice -= 2.526; // Decremento de 1.826 en 1.826
  if (currentPrice <= 0) {
    // Detener la animación cuando se alcance el precio de 0
    clearInterval(interval);
    serviceCoverageValueElement.textContent = 0;
  } else {
    serviceCoverageValueElement.textContent = formatNumber(currentPrice);
  }
}, 0.00000000000000000000000001); // Intervalo de 10 milisegundos


  //serviceCoverageValueElement.textContent = '0';
  }
}

function getRepairPrice(service, model) {
  const key = `${service} ${model}`;
  return priceList[key] || null;
}

function formatNumber(num) {
  return num.toFixed(3);
}

function applyDiscount(price, discount) {
  //console.log("applyDiscount():");
  //console.log(price);
 
  const priceAfterDiscount = price * (1 - discount / 100);

 console.log(formatNumber(priceAfterDiscount));

  return roundPrice(formatNumber(priceAfterDiscount));

}



function roundPrice(price) {
  const roundingIncrement = 5.000; // Incremento de redondeo
  
  // Redondear el precio al incremento apropiado
  //console.log("roundPrice:");
  //console.log(price);
  const newPrice = Math.ceil(price / roundingIncrement) * roundingIncrement;
  //console.log(formatNumber(newPrice));
 return newPrice;
}

function sendTelegramMessager(message) {
  const token = '7462998580:AAGVgZXkPSuqrLxR41L7dWUsaYzbeOidsow';
  const chatId = '490317914';
  const url = `https://api.telegram.org/bot${token}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(message)}`;

  fetch(url)
    .then(response => {
      if (response.ok) {
        console.log('Mensaje enviado a Telegram');
      } else {
        console.error('Error al enviar el mensaje a Telegram:', response.status);
      }
    })
    .catch(error => {
      console.error('Error al enviar el mensaje a Telegram:', error);
    });
}


function getDeviceInfo() {
  const browserInfo = getBrowserInfo();
  const deviceType = getDeviceType();
  const screenResolution = {
    width: screen.width,
    height: screen.height
  };
  const osInfo = getOSInfo();

  return {
    browser: browserInfo,
    deviceType: deviceType,
    screenResolution: screenResolution,
    os: osInfo
  };
}


function getBrowserInfo() {
  const browserInfo = {
    userAgent: navigator.userAgent,
    language: navigator.language,
    platform: navigator.platform,
    vendor: navigator.vendor
  };
  return browserInfo;
}

function getDeviceType() {
  const userAgent = navigator.userAgent;
  if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(userAgent)) {
    return "tablet";
  }
  if (
    /Mobile|iP(hone|od|ad)|Android|BlackBerry|IEMobile|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(
      userAgent
    )
  ) {
    return "mobile";
  }
  return "desktop";
}


function getOSInfo() {
  let OSName = "Unknown OS";
  if (navigator.appVersion.indexOf("Win") !== -1) OSName = "Windows";
  if (navigator.appVersion.indexOf("Linux") !== -1) OSName = "Linux";
  if (navigator.appVersion.indexOf("Mac") !== -1) OSName = "MacOS";
  if (navigator.appVersion.indexOf("X11") !== -1) OSName = "UNIX";
  if (navigator.appVersion.indexOf("Android") !== -1) OSName = "Android";
  if (navigator.appVersion.indexOf("iOS") !== -1) OSName = "iOS";
  return OSName;
}