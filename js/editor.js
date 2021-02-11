let textarea = document.querySelector('.editor__textarea');
let editButton = document.querySelector('.editor__btn-edit');
let saveButton = document.querySelector('.editor__btn-save');
let cancelButton = document.querySelector('.editor__btn-cancel');
let select = document.querySelector('.editor__versions select');

if (localStorage.length === 0) {
  textarea.textContent = textarea.dataset.placeholder;
} else {
  textarea.textContent = localStorage.getItem(localStorage.getItem('latestVersionDate'));
  var versions = Object.keys(localStorage).filter(elem => elem !== 'latestVersionDate').sort();
  versions.forEach((version) => {
    let option = document.createElement('option');
    option.textContent = version;
    select.append(option);
  });
  select.selectedIndex = select.children.length - 1;
}

editButton.addEventListener('click', function() {
  textarea.setAttribute('contentEditable', true);
  textarea.classList.add('editor__textarea_active');
  this.setAttribute('disabled', true);
  saveButton.removeAttribute('disabled');
  cancelButton.removeAttribute('disabled');
});

saveButton.addEventListener('click', function() {
  textarea.removeAttribute('contentEditable');
  textarea.classList.remove('editor__textarea_active');

  let versionDate = new Date();
  localStorage.setItem(
    'latestVersionDate',
    [versionDate.getDate(), versionDate.getMonth() + 1, versionDate.getFullYear()].map(elem => (elem < 10) ? '0' + elem : elem).join('.') + '-' +
    [versionDate.getHours(), versionDate.getMinutes(), versionDate.getSeconds()].map(elem => (elem < 10) ? '0' + elem : elem).join(':') + '-' +
    String(versionDate).split(' ')[5]
  );
  localStorage.setItem(localStorage.getItem('latestVersionDate'), textarea.textContent);
  textarea.textContent = localStorage.getItem(localStorage.getItem('latestVersionDate'));

  let option = document.createElement('option');
  option.textContent = localStorage.getItem('latestVersionDate');
  select.append(option);
  select.selectedIndex = select.children.length - 1;

  editButton.removeAttribute('disabled');
  this.setAttribute('disabled', true);
  cancelButton.setAttribute('disabled', true);
});

cancelButton.addEventListener('click', function() {
  textarea.removeAttribute('contentEditable');
  textarea.classList.remove('editor__textarea_active');
  textarea.textContent = (localStorage.length === 0) ? textarea.dataset.placeholder : localStorage.getItem(localStorage.getItem('latestVersionDate'));
  select.selectedIndex = select.children.length - 1;

  editButton.removeAttribute('disabled');
  saveButton.setAttribute('disabled', true);
  this.setAttribute('disabled', true);
});

select.addEventListener('change', function() {
  textarea.textContent = localStorage.getItem(this.children[this.selectedIndex].textContent);
});
