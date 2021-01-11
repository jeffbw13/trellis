const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/trellisdb');
mongoose.Promise = global.Promise;

