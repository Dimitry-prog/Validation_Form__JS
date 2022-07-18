const { src, dest, watch, series, parallel } = require("gulp");

function output(callback) {
  console.log("Привет, Gulp!");
  callback();
}
exports.output = output;
