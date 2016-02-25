var Metalsmith = require('metalsmith'),
	extname = require('path').extname,
	layouts = require('metalsmith-layouts'),
	multiLanguage = require('metalsmith-multi-language'),
	permalinks = require('metalsmith-permalinks'),
	i18n = require('metalsmith-i18n'),
	collections = require('metalsmith-collections'),
    define = require('metalsmith-define'),
    beautify = require('metalsmith-beautify'),
    nunjucks = require('nunjucks'),
    pkg = require('./package.json');

const   DEFAULT_LOCALE = 'es',
        LOCALES = ['en', 'es'];

nunjucks.configure('./src/layouts', {watch: false});

var metalsmith = Metalsmith(__dirname)
	.source('src/pages')
	.destination('dist')
    .use(define({
        _: require('underscore')
    }))
	.use(collections({
		'pages_es': {
            pattern: '**/*_es.html',
            sortBy: 'orderMenu'
        },
		'pages_en': {
            pattern: '**/*_en.html',
            sortBy: 'orderMenu'
        },
        'subfolder_es': 'subfolder/*_es.html',
        'subfolder_en': 'subfolder/*_en.html'
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
        pattern: ':locale/:title/',
        linksets: [{
            match: { collection: 'subfolder_es' },
            pattern: ':locale/subcarpeta/:title/'
        }, {
            match: { collection: 'subfolder_en' },
            pattern: ':locale/subfolder/:title/'
        }]
    }))
	.use(layouts({
        engine: 'nunjucks',
        default: 'default.j2',
        pattern: '**/*.html',
        directory: 'src/layouts'
    }))
    .use(beautify())
    .build(function(err, files){
        if (err) console.error(err.stack)
    });