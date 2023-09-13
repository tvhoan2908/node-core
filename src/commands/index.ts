import { Command } from "commander";

const program = new Command();
program
  .name("seed")
  .description("Run database seeds of your project")
  .option("-L, --logging", "enable sql query logging")
  .option("--seeds <path>", "add filepath for your seeds")
  .parse(process.argv);

const options = program.opts();
console.log(options);
async function run() {}

run();
