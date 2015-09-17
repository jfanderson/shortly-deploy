module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      client: {
        src: [
          'public/client/**/*.js'
        ],
        dest: 'public/dist/client.js'
      },
      dependencies: {
        src: [
          'public/lib/**/*.js'
        ],
        dest: 'public/dist/dependencies.js'
      }
    },

    mochaTest: {
      test: {
        options: {
          reporter: 'spec'
        },
        src: ['test/**/*.js']
      }
    },

    nodemon: {
      dev: {
        script: 'server.js'
      }
    },

    uglify: {
      client: {
        src: [
          'public/dist/client.js'
        ],
        dest: 'public/dist/client.min.js'
      },
      dependencies : {
        src: [
          'public/dist/dependencies.js'
        ],
        dest: 'public/dist/dependencies.min.js'
      }
    },

    jshint: {
      files: {
        // Add filespec list here
        src: [ 'app/**/*.js', 'lib/*.js', 'server.js' ]
      },
      options: {
        jshintrc: '.jshintrc',
        ignores: [
          'public/lib/**/*.js',
          'public/dist/**/*.js'
        ]
      }
    },

    cssmin: {
        // Add filespec list here
        target: {
          src: [
            'public/style.css'
          ],
          dest: 'public/dist/style.min.css'
        }
    },

    watch: {
      scripts: {
        files: [
          'public/client/**/*.js',
          'public/lib/**/*.js',
        ],
        tasks: [
          'concat',
          'uglify'
        ]
      },
      css: {
        files: 'public/*.css',
        tasks: ['cssmin']
      }
    },

    shell: {
      prodServer: {
        options: {
          stdout: true, 
          stderr: true
        },
        command: 'git push azure master'
      }
    },
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-nodemon');

  grunt.registerTask('server-dev', function (target) {
    // Running nodejs in a different process and displaying output on the main console
    var nodemon = grunt.util.spawn({
         cmd: 'grunt',
         grunt: true,
         args: 'nodemon'
    });
    nodemon.stdout.pipe(process.stdout);
    nodemon.stderr.pipe(process.stderr);

    grunt.task.run([ 'watch' ]);
  });

  ////////////////////////////////////////////////////
  // Main grunt tasks
  ////////////////////////////////////////////////////

  grunt.registerTask('test', [
    'mochaTest'
  ]);

  grunt.registerTask('build', [
    'jshint',
    'mochaTest',
    'concat', 
    'uglify',
    'cssmin'
  ]);

  grunt.registerTask('upload', function(n) {
    grunt.task.run([ 'build' ]);
    if(grunt.option('prod')) {
      // add your production server task here
      grunt.task.run([ 'deploy' ]);
    } else {
      grunt.task.run([ 'server-dev' ]);
    }
  });

  grunt.registerTask('deploy', [
      // add your production server task here
      'shell'
  ]);


};
