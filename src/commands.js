import search from "./commands/search.js";
import onSongSelection from "./commands/onSongSelection.js";

const Commands = new Map();
Commands.set(search.data.name, search);
Commands.set("onSongSelection", onSongSelection);

export default Commands;
