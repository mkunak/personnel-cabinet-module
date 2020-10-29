require("dotenv").config();

module.exports = () => `
      <h1 style="text-align: center">You are wellcome to our community!</h1>
      <p style="text-align: center">
        Congrats! Your account was created successfully
      </p>
      <hr/>
      <p style="text-align: center;">
        <span style="font-size: 18px">Visit your cabinet: 
          <a href="${process.env.BASE_URL}/login">GS App</a>
        </span>
      </p>
    `;
