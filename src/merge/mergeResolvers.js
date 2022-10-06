const { mergeResolvers } = require("@graphql-tools/merge");
const { loadFilesSync } = require("@graphql-tools/load-files");
const path = require("path");

const typesArray = loadFilesSync(path.join(__dirname, '..', 'resolvers'), {extensions: ['js']});
module.exports = mergeResolvers(typesArray);