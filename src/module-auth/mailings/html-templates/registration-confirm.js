require("dotenv").config();

module.exports = (url) => `
      <h1 style="text-align: center">
        Wish to create your account? This is last step.
      </h1>
      <p style="text-align: center">
        Click link to finish register proccess and create account.
      </p>
      <p style="text-align: center;">
        <span style="font-size: 18px">
          <a href="${url}">Create account</a>
        </span>
      </p>
      <hr/>
      <p style="text-align: center;">
        <span style="font-size: 18px">Allready confirmed? Visit your cabinet: 
          <a href="${process.env.BASE_URL}/login">Personnel Cabinet</a>
        </span>
      </p>
    `;
