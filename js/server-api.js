export const getAdsData = (onSuccess, onFail) => {
  fetch('https://26.javascript.pages.academy/keksobooking/data')
    .then((response) => response.ok ? response : onFail('Не удалось загрузить объявления. Пожалуйста перезагрузите страницу'))
    .then((response) => response.json())
    .then((ads) => onSuccess(ads))
    .catch(() => {
      onFail('Не удалось загрузить объявления. Пожалуйста перезагрузите страницу');
    });
};

export const sendData = (onSuccess, onFail, body) => {
  fetch(
    'https://26.javascript.pages.academy/keksobooking',
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => response.ok ? onSuccess() : onFail('Данные не отправлены, попробуйте еще раз'))
    .catch(() => {
      onFail('Данные не отправлены, попробуйте еще раз');
    });
};
