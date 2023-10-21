const jwt = require("jsonwebtoken");

const { promisify } = require("util");

const tokenConfig = require("../config/token");

const createToken = userId => {
  return jwt.sign({ id: userId }, tokenConfig.tokenJWT, { expiresIn: tokenConfig.tokenEXP });
};

describe("Can sign and verify tokens", () => {
  it("Signing and verifying token with secret key works", async () => {
    const userData = { id: 3 };
    const token = createToken(userData.id);

    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    expect(decoded).toEqual({
      ...userData,
      iat: expect.any(Number),
      exp: expect.any(Number),
    });
  });

  it("Signing with secret key and verifying token with incorrect key throws error", async () => {
    const userData = { id: 3 };
    const token = createToken(userData.id);

    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    expect(decoded).toEqual({
      ...userData,
      iat: expect.any(Number),
      exp: expect.any(Number),
    });
  });
});
