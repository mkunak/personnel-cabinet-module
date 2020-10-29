require("dotenv").config();

module.exports = (code) => `
      <h1 style="text-align: center">
        Wish to create your account in GS?
      </h1>
      <p style="text-align: center">We need your confirmation.</p>
      <p style="text-align: center;">
        <span style="font-size: 18px">Confirmation code: ${code}</span>
      </p>
      <hr/>
      <p style="text-align: center;">
        <span style="font-size: 18px">Allready confirmed? Visit your cabinet: 
          <a href="${process.env.BASE_URL}/login">GS App</a>
        </span>
      </p>
    `;
