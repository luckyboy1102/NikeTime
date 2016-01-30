var sneakerSize = null;
var button = null;
window.addEventListener('DOMContentLoaded', function() {
    sneakerSize = document.querySelector('#size');
    button = document.getElementById('save');
    button.onclick = saveSettings;
    sneakerSize.value = localStorage.getItem('size');
});

function saveSettings() {
    localStorage.setItem('size', sneakerSize.value)
}