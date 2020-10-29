const { Types } = require("mongoose");

const getLinks = (userId) => ([
  {
    id: 1,
    link: "/register/link",
    persons: 2,
    created: new Date(Date.now()),
    expires: new Date(Date.now() + 1000 * 60 * 2),
    userId: Types.ObjectId(userId),
  },
  {
    id: 2,
    link: "/register/link",
    persons: 2,
    created: new Date(Date.now()),
    expires: new Date(Date.now() + 1000 * 60 * 4),
    userId: Types.ObjectId(userId),
  },
  {
    id: 3,
    link: "/register/link",
    persons: 3,
    created: new Date(Date.now()),
    expires: new Date(Date.now() + 1000 * 60 * 6),
    userId: Types.ObjectId(userId),
  },
  {
    id: 4,
    link: "/register/link",
    persons: 4,
    created: new Date(Date.now()),
    expires: new Date(Date.now() + 1000 * 60 * 8),
    userId: Types.ObjectId(userId),
  },
]);

module.exports = getLinks;
