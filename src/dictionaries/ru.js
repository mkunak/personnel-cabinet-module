/* eslint-disable max-len */
module.exports = {
  errors: {
    reset: {
      repeatLater: "Внимание! Что-то пошло не так. Пожалуйста, попробуйте вновь.",
    },
  },

  warnings: {
    home: {
      VINWrong: "Внимание! Введенный VIN не содержится в базе или не корректен. Пожалуйста, попробуйте вновь.",
    },
    catalog: {
      VINWrong: "Внимание! Введенный VIN не содержится в базе или не корректен. Пожалуйста, попробуйте вновь.",
    },
    login: {
      passwordWrong: "Внимание! Введенный пароль не корректен. Пожалуйста, попробуйте вновь.",
      emailWrong: "Внимание! Введенный email не корректен. Пожалуйста, попробуйте вновь.",
      gmailNotVerified: "Внимание! Введенный email не проверен Google. Пожалуйста, используйте другой аккаунт Google.",
      emailNotConfirmed: "Внимание! Введенный email не подтвержден. Пожалуйста, посетите Ваш email и сделайте подтверждение.",
      accountNotRegistered: "Внимание! Аккаунт не зарегистрирован. Пожалуйста, начните регистрацию сначала.",
    },
    register: {
      passwordWrong: "Внимание! Введенные пароли не совпадают. Пожалуйста, попробуйте вновь.",
      noPassword: "Поля для паролей должны быть заполнены.",
      emailWrong: "Внимание! Введенный email уже задействован. Пожалуйста, введите другой email.",
      codeWrong: "Внимание! Введенный код не верный. Пожалуйста, попробуйте вновь.",
      codeHasExpired: "Внимание! Время истекло. Пожалуйста, начните регистрацию вновь.",
      registerHasExpired: "Внимание! Время истекло. Пожалуйста, начните регистрацию вновь.",
      tokenHasExpired: "Внимание! Время истекло. Пожалуйста, начните регистрацию вновь.",
    },
    reset: {
      repeatLater: "Внимание! Что-то пошло не так. Пожалуйста, попробуйте вновь позже.",
      userNotFound: "Внимание! Пользователь с этим email не найден.",
    },
    newPassword: {
      tokenHasExpired: "Внимание! Время истекло. Пожалуйста, начните сброс пароля вновь.",
      passwordMismatch: "Внимание! Введенные пароли не совпадают. Пожалуйста, попробуйте вновь.",
      userNotFound: "Внимание! Что-то пошло не так. Пользователь не найден. Пожалуйста, авторизуйтесь и попробуйте вновь.",
    },
    google: {
      gmailNotVerified: "Внимание! Введенный email не проверен Google. Пожалуйста, используйте другой аккаунт Google.",
      repeatLater: "Внимание! Что-то пошло не так. Пожалуйста, попробуйте вновь позже.",
    },
    facebook: {
      accountNotVerified: "Внимание! Введенный email не проверен Facebook. Пожалуйста, используйте другой аккаунт Facebook.",
      repeatLater: "Внимание! Что-то пошло не так. Пожалуйста, попробуйте вновь позже.",
    },
  },

  successes: {
    login: {
      succeeded: "Вы успешно авторизованы!",
    },
    logout: {
      succeeded: "Вы успешно покинули свой аккаунт!",
    },
    register: {
      confirmCode: "Все идет хорошо. Пожалуйста, посетите Ваш email и откройте письмо с кодом для подтверждения. Удачи!",
      confirmEmail: "Все идет хорошо. Пожалуйста, подтвердите свою регистрацию. Для этого посетите Ваш email и откройте письмо с инструкциями. Удачи!",
      confirmRegister: "Все идет хорошо. Пожалуйста, подтвердите свою регистрацию, чтобы создать аккаунт. Для этого посетите Ваш email и откройте письмо с инструкциями. Удачи!",
      codeIsConfirmed: "Все идет хорошо. Ваш код подтвержден.",
      confirmed: "Отлично! Ваш аккаунт создан. Пожалуйста, авторизуйтесь.",
      accountRegistered: "Отлично! Ваш аккаунт создан. Пожалуйста, авторизуйтесь.",
    },
    google: {
      confirmEmail: "Все идет хорошо. Пожалуйста, подтвердите свою регистрацию. Для этого посетите Ваш email и откройте письмо с инструкциями. Удачи!",
      confirmed: "Отлично! Ваш аккаунт создан. Пожалуйста, авторизуйтесь.",
    },
    facebook: {
      confirmed: "Отлично! Ваш аккаунт создан. You are logged in.",
    },
    newPassword: {
      succeeded: "Ваш пароль успешно изменен.",
    },
    reset: {
      succeeded: "Мы отправили Вам письмо с инструкциями, чтобы сбросить текущий пароль.",
    },
  },

  text: {},
};