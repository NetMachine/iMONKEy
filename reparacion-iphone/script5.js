history.scrollRestoration = "manual";

window.addEventListener('beforeunload', function() {
  window.scrollTo(0, 0);
});

