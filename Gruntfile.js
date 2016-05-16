module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        copy: {
            main: {
                expand: true,
                cwd: 'src',
                src: ['**', '!**/css/**', '!**/js/**', '!**/less/**', '**/js/vendor/modernizr-2.8.3.min.js'],
                dest: 'dist/'
            }
        },
        less: {
            development: {
                files: {
                    'src/css/main.css': 'src/**/*.less'
                }
            }
        },
        concat: {
            css: {
                src: [
                    'bower_components/normalize-css/normalize.css',
                    'src/css/reset.css',
                    'bower_components/bootstrap/dist/css/bootstrap.css',
                    'bower_components/bootstrap/dist/css/bootstrap-theme.css',
                    'src/css/main.css'
                ],
                dest: 'dist/css/main.css'
            },
            js: {
                src: [
                    'bower_components/jquery/dist/jquery.js',
                    'bower_components/angular/angular.js',
                    'bower_components/angular-resource/angular-resource.js',
                    'bower_components/angular-route/angular-route.js',
                    'src/**/*.js'
                ],
                dest: 'dist/js/main.js'
            }
        },
        uglify: {
           options: {
               banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
               '<%= grunt.template.today("yyyy-mm-dd") %> */\n'
           },
           my_target: {
                files: {
                    'dist/js/main.min.js': ['dist/js/main.js']
                }
           }
        },
        watch: {
            main: {
                files: ['src/**/*', '!src/**/*.css', '!src/**/*.less', '!src/**/*.js'],
                tasks: ['copy']
            },
            css: {
                files: [
                    'src/**/*.css',
                    'src/**/*.less'
                ],
                tasks: ['less', 'concat:css']
            },
            js: {
                files: [
                    'src/**/*.js'
                ],
                tasks: ['concat:js', 'uglify']
            }
        }
    });

    grunt.registerTask('default', ['copy', 'less', 'concat', 'uglify']);

    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-less');
};