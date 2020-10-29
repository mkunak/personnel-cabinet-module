require("dotenv").config();

module.exports = () => `
      <h1 style="text-align: center">
        Congrats! Code is confirmed.
      </h1>
      <p style="text-align: center">We send you a mail with a register link. 
        In order to finish your registration proccess, 
        find the letter and click the link.</p>
      <hr/>
      <p style="text-align: center;">
        <span style="font-size: 18px">Allready registered? Sign in to cabinet: 
          <a href="${process.env.BASE_URL}/login">GS App</a>
        </span>
      </p>
    `;
