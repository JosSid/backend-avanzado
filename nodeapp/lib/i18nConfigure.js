'use strict';

const i18n = require('i18n');
const path = require('path');

i18n.configure({
    locales: ['en', 'es'],
    directory: path.join(__dirname, '..', 'locales'),
    defaultLocale: 'en',
    autoReload: true, //watch for changes in JSON files to reload locale on updates - defaults to false
    syncFiles: true, //Sync locale information across all files
    cookie: 'nodeapp-locale'
});

// para utilizar en scripts
i18n.setLocale('en');

module.exports = i18n;