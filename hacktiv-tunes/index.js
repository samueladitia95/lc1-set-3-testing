const Controller = require("./controllers/controller");

// di bebaskan mau pakai condtional switch case atau if else

const [command, ...input] = process.argv.slice(2);

switch (command) {
  case "show":
    Controller.show();
    break;
  case "delete":
    Controller.delete(input);
    break;
  case "addToPlaylist":
    Controller.addToPlaylist(...input);
    break;
  case "upgradeLimitPlaylist":
    Controller.upgradeLimitPlaylist(...input);
    break;
  case "detail":
    Controller.detail(...input);
    break;
}
