const Builder = require("@campbell/builder");

module.exports = {
  command: "build",
  describe: "Build the campbell server in current dir",
  handler: argv => {
    if (!process.env.NODE_ENV) process.env.NODE_ENV = "production";
    if (argv.dev) process.env.NODE_ENV = "development";
    if (argv.inspect) require("inspector").open();

    const builder = new Builder(process.cwd());
    builder.build();
  }
};
