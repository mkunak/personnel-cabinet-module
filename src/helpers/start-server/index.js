require("dotenv").config();

module.exports = (app) => {
  try {
    app.listen(process.env.PORT, () => {
      console.log(`>>> Server is running on port ${process.env.PORT}...`);
      console.log(">>> Press Ctrl+C to quit.");
    });
  } catch (error) {
    console.log(`>>> Server connect error: ${error}`);
  }
};
