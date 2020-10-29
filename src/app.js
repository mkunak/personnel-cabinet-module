require("dotenv").config();
// const i18n = require('i18n');
const path = require("path");
const csrf = require("csurf");
const flash = require("connect-flash");
const express = require("express");
const session = require("express-session");
const MongodbStore = require("connect-mongodb-session")(session);
const { create } = require("express-handlebars");
const cookieParser = require("cookie-parser");

const { homeRoutes } = require("./routes");
const auth = require("./module-auth/routes");
const { adminRoutes } = require("./module-admin/routes");
const { cabinetRoutes } = require("./module-cabinet/routes");

const { ifEquals, incremented } = require("./helpers/hbs");
const startServer = require("./helpers/start-server");

const { setResponseVariables } = require("./middlewares");
const { setResponseAuthVariables } = require("./module-auth/middlewares");
// const checkLocale = require('./middlewares/check-locale');

const app = express();

const hbs = create({
  extname: "hbs",
  defaultLayout: "main",
  helpers: {
    ifEquals,
    incremented,
  },
});
app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");
app.set("views", "src/views");

// i18n.configure({
//   locales: ['ru', 'en'],
//   fallbacks: { 'en': 'ru' },
//   defaultLocale: 'ru',
//   cookie: 'locale',
//   queryParameter: 'lang',
//   directory: __dirname + '/src/locales',
//   directoryPermissions: '755',
//   autoReload: true,
//   updateFiles: true,
//   api: {
//     '__': '__',  //now req.__ becomes req.__
//     '__n': '__n' //and req.__n can be called as req.__n
//   }
// });

const store = new MongodbStore({
  collection: "sessions",
  uri: process.env.MONGODB_CABINET_URI,
});

app.use(express.static(path.join(__dirname, "static")));

app.use(
  express.urlencoded({
    limit: "50mb",
    extended: false,
    parameterLimit: 50000,
  }),
);
app.use(express.json({ limit: "50mb" }));

app.use(
  session({
    store,
    resave: false,
    saveUninitialized: true,
    secret: process.env.SESSION_SECRET,
    cookie: {
      maxAge: 1000 * 60 * 100,
    },
  }),
);
app.use(flash());

app.use(cookieParser());
// app.use(i18n.init);
// app.use(checkLocale);
app.use(csrf());
app.use(setResponseVariables);
app.use(setResponseAuthVariables);

app.use("/", homeRoutes);
app.use("/login", auth.loginRoutes);
app.use("/reset", auth.resetRoutes);
app.use("/logout", auth.logoutRoutes);
app.use("/register", auth.registerRoutes);
app.use("/new-password", auth.newPasswordRoutes);
app.use("/admin", adminRoutes);
app.use("/cabinet", cabinetRoutes);

// app.get('/en', function (req, res, next) {
//   res.cookie('locale', 'en', { maxAge: 900000, httpOnly: true });
//   res.redirect('/en/home');
//   next();
// });

// app.get('/ru', function (req, res, next) {
//   res.cookie('locale', 'ru', { maxAge: 900000, httpOnly: true });
//   res.redirect('/ru/home');
//   next();
// });

app.use((req, res) => {
  res.end("404");
});

startServer(app);
