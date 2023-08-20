const moduleAlias = require('module-alias');

// Set up aliases
moduleAlias.addAliases({
    '@app': __dirname + '/app',
    '@src': __dirname + '/src',
    '@config': __dirname + '/config',
    '@database': __dirname + '/app/database',
    '@cron': __dirname + '/app/cron',
    '@cache': __dirname + '/app/cache',
    '@enums': __dirname + '/app/enums',
    '@plugins': __dirname + '/app/plugins',
    '@utils': __dirname + '/src/utils',
    '@middleware': __dirname + '/app/middleware',
    '@managers': __dirname + '/app/managers',
    '@models': __dirname + '/app/database/models',
    '@views': __dirname + '/src/views',
});