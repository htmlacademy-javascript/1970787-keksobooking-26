const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
const PREVIEW_WIDTH = 60;
const PREVIEW_HEIGHT = 60;

const avatarChooser = document.querySelector('.ad-form__field input[type=file]');
const avatarPreview = document.querySelector('.ad-form-header__preview img');

const adPhotoChooser = document.querySelector('.ad-form__upload input[type=file]');
const adPhotoPreviewContainer = document.querySelector('.ad-form__photo');

avatarChooser.addEventListener('change', () => {
  const file = avatarChooser.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((type) => fileName.endsWith(type));

  if (matches) {
    avatarPreview.src = URL.createObjectURL(file);
  }
});

//По ТЗ нужно загрузить только 1 фото жилья
// Код ниже написан чтобы при желании было легко переделать под множественную загрузку

const createImagePreview = (container, src, alt, width, height) => {
  const img = document.createElement('img');
  img.style.margin = '5px';
  img.src = src;
  img.alt = alt;
  img.width = width;
  img.height = height;
  container.appendChild(img);
};

adPhotoChooser.addEventListener('change', () => {
  adPhotoPreviewContainer.innerHTML = ''; //Убрать при реализации множественной загрузки изображений
  const files = adPhotoChooser.files;

  for (let i = 0; i < files.length; i++) {
    const fileName = files[i].name.toLowerCase();

    const matches = FILE_TYPES.some((type) => fileName.endsWith(type));

    if (matches) {
      createImagePreview(adPhotoPreviewContainer, URL.createObjectURL(files[i]), `Фотография жилья ${i}`, PREVIEW_WIDTH, PREVIEW_HEIGHT);
    }
  }
});
