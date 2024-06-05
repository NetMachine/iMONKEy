history.scrollRestoration = "manual";

window.addEventListener("beforeunload", function() {


  window.scrollTo(0, 0);
});



const faqItems = document.querySelectorAll(".faq-item");
let currentExpandedItem = null; // Track currently expanded item

faqItems.forEach(faqItem => {
  const answerElement = faqItem.querySelector(".faq-answer"); // Get the answer element

  faqItem.addEventListener("click", () => {
    // Handle collapsing the previously expanded item (if any)
    if (currentExpandedItem && currentExpandedItem !== faqItem) {
      currentExpandedItem.classList.remove("active");
      currentExpandedItem.querySelector(".faq-answer").style.maxHeight = "0px";
      currentExpandedItem.querySelector(".faq-answer").style.transition = "max-height 0.3s ease"; // Reset transition
    }

    // Handle expanding or collapsing the clicked item
    if (faqItem.classList.contains("active")) { // Collapse if already expanded
      currentExpandedItem = null;
      faqItem.classList.remove("active");
      answerElement.style.maxHeight = "0px";
      answerElement.style.transition = "max-height 0.3s ease";
    } else { // Expand if not already expanded
      currentExpandedItem = faqItem;
      faqItem.classList.add("active");
      answerElement.style.maxHeight = `${answerElement.scrollHeight}px`;
      answerElement.style.transition = "max-height 0.3s ease";
    }

    if (window.matchMedia("(pointer: touch)").matches) {
      // Trigger animation manually for touch devices
      answerElement.offsetHeight;
      answerElement.addEventListener("transitionend", () => {
        answerElement.style.transition = ""; // Reset transition (optional)
        answerElement.removeEventListener("transitionend"); // Remove listener
      });
    }
  });
});

const arrowContainer = document.querySelector("#arrow-container");

//arrowContainer.addEventListener("click", scrollToSection); // Use click for desktop

arrowContainer.addEventListener("touchstart", (event) => {
  arrowContainer.classList.add("active"); // Apply active on touchstart
  arrowContainer.classList.add("no-hover"); // Assuming this is for visual feedback
});

arrowContainer.addEventListener("touchend", (event) => {
  arrowContainer.classList.remove("active"); // Remove active on touchend
  //arrowContainer.classList.remove("no-hover"); // Assuming this is for visual feedback
  scrollToSection(event); // Trigger scroll on touchend
});


const iosDeviceMapping = new Map([
  ["320x480", "IPhone 4S, 4, 3GS, 3G, 1st gen"],
  ["320x568", "IPhone 5, SE 1st Gen,5C, 5S"],
  ["375x667", "IPhone SE 2nd Gen, 6, 6S, 7, 8"],
  ["375x812", "IPhone X, XS, 11 Pro, 12 Mini, 13 Mini"],
  ["390x844", "IPhone 13, 13 Pro, 12, 12 Pro"],
  ["414x736", "IPhone 8+"],
  ["414x896", "IPhone 11, XR, XS Max, 11 Pro Max"],
  ["428x926", "IPhone 13 Pro Max, 12 Pro Max"],
  ["476x847", "IPhone 7+, 6+, 6S+"],
  ["744x1133", "IPad Mini 6th Gen"],
  [
    "768x1024",
    "IPad Mini (5th Gen), IPad (1-6th Gen), iPad Pro (1st Gen 9.7), Ipad Mini (1-4), IPad Air(1-2)  ",
  ],
  ["810x1080", "IPad 7-9th Gen"],
  ["820x1180", "iPad Air (4th gen)"],
  ["834x1194", "iPad Pro (3-5th Gen 11)"],
  ["834x1112", "iPad Air (3rd gen), iPad Pro (2nd gen 10.5)"],
  ["1024x1366", "iPad Pro (1-5th Gen 12.9)"],
]);


// get device name for ios
const getIosDeviceName = () => {
  const screenResolution = `${window.screen.width}x${window.screen.height}`;
  const device = iosDeviceMapping.get(screenResolution);
  if (device) {
    return device;
  }
  return "Iphone";
};



// Ejemplo de uso
window.addEventListener("load", function() {
//var iphoneModel = getIphoneModel();
const screenResolution = `${window.screen.width}x${window.screen.height}`;
//console.log(screenResolution);
const device = iosDeviceMapping.get(screenResolution);
//console.log("Modelo de iPhone:", device);

});
