import { think } from 'thinkjs';
const view = require('think-view');
const mongoose = require('think-mongoose');
const cache = require('think-cache');
const session = require('think-session');

module.exports = [
  view, // make application support view
  mongoose(think.app),
  cache,
  session
];
