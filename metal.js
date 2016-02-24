var Metalsmith = require('metalsmith'),
	extname = require('path').extname,
	layouts = require('metalsmith-layouts'),
	multiLanguage = require('metalsmith-multi-language'),
	permalinks = require('metalsmith-permalinks'),
	i18n = require('metalsmith-i18n'),
	collections = require('metalsmith-collections');

const 	DEFAULT_LOCALE = 'es',
		LOCALES = ['en', 'es'];

var metalsmith = Metalsmith(__dirname)
	.source('src/pages')
	.destination('dist')
	.use(collections({
		'pages_es': '*_es.html',
		'pages_en': '*_en.html',
	}))
	.use(multiLanguage({
        default: DEFAULT_LOCALE,
        locales: LOCALES
    }))
    .use(i18n({
        default: DEFAULT_LOCALE,
        locales: LOCALES,
        directory: 'src/locales'
    }))
    .use(permalinks({
        relative: false,
        pattern: ':locale/:title/'
    }))
	.use(layouts({
        engine: 'ejs',
        default: 'home.ejs',
        pattern: '**/*.html',
        directory: 'src/layouts'
    }))
    .build(function(err, files){
        if (err) console.error(err.stack)
    });