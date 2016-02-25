var autoprefixer  = require('autoprefixer');
//var precss        = require('precss');

module.exports = function(grunt) {
  var config = grunt.file.readJSON('package.json');
  // Project configuration.
  grunt.initConfig({
    pkg: config,
    watch: {
      options: {
        spawn: false,
        livereload: true
      },
      dev: {
        files: [
          '<%= pkg.project.src_folder %>/**/*.{html,j2,scss,js}'
        ],
        tasks: ['dev']
      }
    },
    sass:{
      dev: {
        options:{
          includePaths: [
            'node_modules/'
          ],
          sourceMap: true
        },
        files:{
          '<%= pkg.project.public_folder %>/assets/css/main.css':'<%= pkg.project.src_folder %>/assets/scss/main.scss'
        }
      }
    },
    uglify: {
      dev: {
        files:[{
          expand: true,
          cwd:'<%= pkg.project.public_folder %>/assets/js/',
          src: ['**/*.js'],
          dest:'<%= pkg.project.public_folder %>/assets/js/'
        }]
      }
    },
    svgstore: {
      options: {
        prefix: 'icon-',
        svg: {
          style: 'display: none;'
        },
        cleanup: ['fill','stroke']
      },
      main: {
        files: {
          '<%= pkg.project.public_folder %>/assets/images/icons.svg': ['<%= pkg.project.src_folder %>/assets/icons/*.svg'],
        }
      }
    },
    postcss: {
      options: {
        processors: [
          autoprefixer({browsers: config.browsersSupport })
        ]
      },
      dist: {
        src: '<%= pkg.project.public_folder %>/assets/css/*.css'
      }
    },
    shell: {
      metal:{
        command: 'node metal.js'
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-svgstore');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-postcss');
  // User tasks
  grunt.registerTask('dev',['shell:metal', 'sass']);
  //grunt.registerTask('dev',['sass','concat','newer:imagemin','newer:copy']);
  grunt.registerTask('dist',['dev','uglify', 'postcss']);
  // Default task(s).
  grunt.registerTask('default', ['watch']);
};