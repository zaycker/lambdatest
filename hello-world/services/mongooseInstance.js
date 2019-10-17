'use strict'

const mongoose = require('mongoose')
mongoose.Promise = require('q').Promise

require('mongoose-currency')
  .loadType(mongoose)

module.exports = mongoose