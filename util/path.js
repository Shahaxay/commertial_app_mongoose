const path = require('path');

module.exports = path.dirname(process.mainModule.filename);

//instead of process.mainModule.filename use require.main.filename