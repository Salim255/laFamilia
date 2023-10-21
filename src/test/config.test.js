describe("Test config", () => {
  it("Config derived from process.env", () => {
    process.env.DB_HOST = "localhost";
    process.env.DB_PORT = "5432";
    process.env.DB_USER = "salimhassanmohamed";

    const config = require("../config/dbTst");
    require("dotenv").config();

    expect(config.dbDatabase).toEqual(process.env.DB_TST_DATABASE);
    expect(config.dbHost).toEqual(process.env.DB_HOST);
    expect(config.dbPort).toEqual(process.env.DB_PORT);
    expect(config.dbUser).toEqual(process.env.DB_USER);

    //
    delete process.env.DB_HOST;
    delete process.env.DB_PORT;
    delete process.env.DB_USER;
  });
});
