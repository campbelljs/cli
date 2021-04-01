const Builder = require("@campbell/builder");

module.exports = {
  command: "start [port] [dev] [inspect]",
  describe: "Start the campbell server in current dir",
  handler: (argv) => {
    if (argv.port) process.env.CAMPBELL_SERVER_PORT = argv.port;

    if (!process.env.NODE_ENV) process.env.NODE_ENV = "production";
    if (argv.dev) process.env.NODE_ENV = "development";
    if (argv.inspect) require("inspector").open();

    const builder = new Builder(process.cwd());
    builder.build().then(() => {
      // process.cwd must match app's root dir
      process.chdir(builder.resolvePath("#output"));
      // enable source-maps
      require("source-map-support/register");
      // exec app's main script
      require(builder.resolvePath(["#output", "main"]));
    });
  },
};
