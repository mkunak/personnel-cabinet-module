const getTips = () => ([
  {
    id: 1,
    data: [
      "Не забывайте включать трекер когда садитесь за работу.",
      "Хорошего рабочего дня!",
    ],
    created: new Date(Date.now() - 4 * (1000 * 60 * 60 * 24)),
  },
  {
    id: 2,
    data: [
      "Run every morning.",
      "Хорошего рабочего дня!",
    ],
    created: new Date(Date.now() - 3 * (1000 * 60 * 60 * 24)),
  },
  {
    id: 3,
    data: [
      "Read more books.",
      "Хорошего рабочего дня!",
    ],
    created: new Date(Date.now() - 2 * (1000 * 60 * 60 * 24)),
  },
  {
    id: 4,
    data: [
      "Ubuntu born to be root. Windows born to reboot.",
      "Хорошего рабочего дня!",
    ],
    created: new Date(Date.now() - 1 * (1000 * 60 * 60 * 24)),
  },
  {
    id: 5,
    data: [
      "An apple a day keep a doctor away.",
      "Хорошего рабочего дня!",
    ],
    created: new Date(Date.now() - 0 * (1000 * 60 * 60 * 24)),
  },
]);

module.exports = getTips;
