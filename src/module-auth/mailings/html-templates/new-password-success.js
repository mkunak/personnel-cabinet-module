require("dotenv").config();

module.exports = () => `
      <h1 style="text-align: center">Your password was restored</h1>
      <hr/>
      <p style="text-align: center;">
        <span style="font-size: 18px">Sign in to cabinet:
          <a href="${process.env.BASE_URL}/login">GS App</a>
        </span>
      </p>
    `;
