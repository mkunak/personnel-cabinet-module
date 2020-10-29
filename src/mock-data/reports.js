const { Types } = require("mongoose");

const getReports = (userId) => ([
  {
    id: 1,
    created: `${Date.now() - 3 * (1000 * 60 * 60 * 24)}`,
    changed: `${Date.now() - 3 * (1000 * 60 * 60 * 24)}`,
    isReport: true,
    isPrereport: false,
    workingHours: 8,
    tasks: {
      todo: [
        "Switch on PC.",
        "Do 7 tasks.",
        "Switch off PC.",
      ],
      inProgress: [
        "Make breakfast.",
        "Do 1 coffee.",
      ],
      onCheck: [
        "Switch on PC.",
        "Do 7 tasks.",
        "Switch off PC.",
      ],
      done: [
        "2 secure bugs fixed.",
        "Animated icons are connected.",
        "Model instances are created.",
      ],
    },
    links: [
      "google.com",
      "yahoo.com",
    ],
    files: [
      "/file1.jpg",
      "/file2.jpg",
      "/file3.jpg",
    ],
    userId: Types.ObjectId(userId),
  },
  {
    id: 2,
    created: `${Date.now() - 2 * (1000 * 60 * 60 * 24)}`,
    changed: `${Date.now() - 2 * (1000 * 60 * 60 * 24)}`,
    isReport: true,
    isPrereport: false,
    workingHours: 4,
    tasks: {
      todo: [
        "Switch on PC.",
        "Do 4 tasks.",
        "Switch off PC.",
      ],
      inProgress: [
        "Make breakfast.",
        "Do 1 coffee.",
      ],
      onCheck: [
        "Switch on PC.",
        "Do 7 tasks.",
        "Switch off PC.",
      ],
      done: [
        "2 secure bugs fixed.",
        "Animated icons are connected.",
        "Model instances are created.",
      ],
    },
    links: [
      "google.com",
      "yahoo.com",
    ],
    files: [
      "/file1.jpg",
      "/file2.jpg",
      "/file3.jpg",
    ],
    userId: Types.ObjectId(userId),
  },
  {
    id: 3,
    created: `${Date.now() - 1 * (1000 * 60 * 60 * 24)}`,
    changed: `${Date.now() - 1 * (1000 * 60 * 60 * 24)}`,
    isReport: true,
    isPrereport: false,
    workingHours: 7,
    tasks: {
      todo: [
        "Switch on PC.",
        "Do 7 tasks.",
        "Switch off PC.",
      ],
      inProgress: [
        "Make breakfast.",
        "Do 1 coffee.",
      ],
      onCheck: [
        "Switch on PC.",
        "Do 7 tasks.",
        "Switch off PC.",
      ],
      done: [
        "2 secure bugs fixed.",
        "Animated icons are connected.",
        "Model instances are created.",
      ],
    },
    links: [
      "google.com",
      "yahoo.com",
    ],
    files: [
      "/file1.jpg",
      "/file2.jpg",
      "/file3.jpg",
    ],
    userId: Types.ObjectId(userId),
  },
  {
    id: 4,
    tasks: {
      todo: [
        "Switch on PC.",
        "Do 7 tasks.",
        "Switch off PC.",
      ],
    },
    workingHours: 7,
    created: `${Date.now() - 4 * (1000 * 60 * 60 * 24)}`,
    changed: `${Date.now() - 4 * (1000 * 60 * 60 * 24)}`,
    isReport: false,
    isPrereport: true,
    userId: Types.ObjectId(userId),
  },
  {
    id: 5,
    tasks: {
      todo: [
        "Switch on PC.",
        "Do 6 tasks.",
        "Switch off PC.",
      ],
    },
    workingHours: 6,
    created: `${Date.now() - 3 * (1000 * 60 * 60 * 24)}`,
    changed: `${Date.now() - 3 * (1000 * 60 * 60 * 24)}`,
    isReport: false,
    isPrereport: true,
    userId: Types.ObjectId(userId),
  },
  {
    id: 6,
    tasks: {
      todo: [
        "Switch on PC.",
        "Do 8 tasks.",
        "Switch off PC.",
      ],
    },
    workingHours: 8,
    created: `${Date.now() - 2 * (1000 * 60 * 60 * 24)}`,
    changed: `${Date.now() - 2 * (1000 * 60 * 60 * 24)}`,
    isReport: false,
    isPrereport: true,
    userId: Types.ObjectId(userId),
  },
  {
    id: 7,
    tasks: {
      todo: [
        "Switch on PC.",
        "Do 6 tasks.",
        "Switch off PC.",
      ],
    },
    workingHours: 6,
    created: `${Date.now() - 1 * (1000 * 60 * 60 * 24)}`,
    changed: `${Date.now() - 1 * (1000 * 60 * 60 * 24)}`,
    isReport: false,
    isPrereport: true,
    userId: Types.ObjectId(userId),
  },
]);

module.exports = getReports;
