 
// Add event listener
function onEvent(selector, event, callback) {
  const element = document.getElementById(selector);
  if (element) {
      element.addEventListener(event, callback);
  } else {
      console.error(`Element with id '${selector}' not found.`);
  }
}

// Select HTML element
function select(selector) {
  return document.getElementById(selector);
}

// Clear interval
function clearIntervalHandler(interval) {
  clearInterval(interval);
}

export { onEvent, select, clearIntervalHandler };
