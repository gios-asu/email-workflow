var browserSync = require('browser-sync');

module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        // Takes your scss files and compiles them to css
        sass: {
          dist: {
            options: {
              style: 'expanded'
            },
            files: {
              'src/css/main.css': 'src/css/scss/main.scss'
            }
          }
        },


        // Assembles your email content with html layout
        assemble: {
          options: {
            layoutdir: 'src/layouts',
            partials: ['src/partials/**/*.hbs'],
            data: ['src/data/*.{json,yml}'],
            flatten: true
          },
          pages: {
            src: ['src/emails/*.hbs'],
            dest: 'dist/'
          }
        },


        // Inlines your css
        premailer: {
          html: {
            options: {
              removeComments: true
            },
            files: [{
                expand: true,
                src: ['dist/*.html'],
                dest: ''
            }]
          },
          txt: {
            options: {
              mode: 'txt'
            },
            files: [{
                expand: true,
                src: ['dist/*.html'],
                dest: '',
                ext: '.txt'
            }]
          }
        },


        // Watches for changes to css or email templates then runs grunt tasks
        // See http://www.shakyshane.com/javascript/nodejs/browser-sync/2014/08/24/browser-sync-plus-grunt/
        watch: {
          scripts: {
            files: ['src/css/scss/**/*.scss','src/emails/*','src/data/*'],
            options: {
              spawn: false
            },
            tasks: ['default', 'bs-inject']
          }
        }
    });

    grunt.registerTask('bs-init', function () {
        var done = this.async();
        browserSync({
            server: {
              baseDir: './dist',
              directory: true
            }
        }, function (err, bs) {
            done();
        });
    });
    
    /**
     * Inject CSS
     */
    grunt.registerTask('bs-inject', function () {
        browserSync.reload(['dist/*.html']);
    });
    

    // Where we tell Grunt we plan to use this plug-in.
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('assemble');
    grunt.loadNpmTasks('grunt-premailer');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // Where we tell Grunt what to do when we type 'grunt' into the terminal.
    grunt.registerTask('default', ['sass','assemble','premailer']);


    // Agile workflow
    grunt.registerTask('agile', ['bs-init', 'default', 'watch']);

};
