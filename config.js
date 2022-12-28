var config = {};
config.server = {};

config.server.port=3000;
config.server.ssl = {};
config.server.ssl.active=false;

config.server.ssl.keypath="./server.key";
config.server.ssl.passphrase="PASSPHRASE"
config.server.ssl.crtpath="./server.crt";
config.server.ssl.capath="./caintermediate.crt"

module.exports = config;
