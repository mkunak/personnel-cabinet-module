require("dotenv").config();

module.exports = (token) => `
    <h1 style="text-align: center">Reset password</h1>
    <p style="text-align: center">
      Do you forget password and wish to reset it?
    </p>
    <p style="text-align: center;">
      <span style="font-size: 18px">If yes, click the link: 
        <a href="${process.env.BASE_URL}/new-password/${token}">
          Reset password
        </a>
      </span>
    </p>
    <hr/>
    <p style="text-align: center">Otherwise, ignore the mail.</p>
    <p style="text-align: center;">
      <span style="font-size: 18px">And login cabinet:
        <a href="${process.env.BASE_URL}/login">GS App</a>
      </span>
    </p>
  `;
