export const getAdsData = (onSuccess, onFail) => {
  fetch('https://26.javascript.pages.academy/keksobooking/data')
    .then((response) => {
      if (response.ok) {
        return response;
      } else {
        onFail('Не удалось загрузить объявления. Пожалуйста перезагрузите страницу');
      }
    })
    .then((response) => response.json())
    .then((ads) => onSuccess(ads))
    .catch(() => {
      onFail('Не удалось загрузить объявления. Пожалуйста перезагрузите страницу');
    });
};
