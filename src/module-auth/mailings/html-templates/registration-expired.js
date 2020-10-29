require("dotenv").config();

module.exports = () => `
      <h1 style="text-align: center">Registration is expired!</h1>
      <p style="text-align: center">
        Start registration from the very beginning.
      </p>
      <hr/>
      <p style="text-align: center;">
        <span style="font-size: 18px">Register page: 
          <a href="${process.env.BASE_URL}/register">Personnel Cabinet</a>
        </span>
      </p>
    `;
