module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-image-resize');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-middleman');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-replace');
  grunt.loadNpmTasks('grunt-fail');
  grunt.loadNpmTasks('grunt-inline');
  grunt.loadNpmTasks('grunt-contrib-compass');

  grunt.registerTask('build', ['clean:pre', 'copy:prebuild', 'copy:root_assets', 'compass', 'inline', 'middleman', 'copy:js', 'replace', 'image_resize', 'copy:scripts', 'clean:post']);

  grunt.initConfig({
    copy: {
      prebuild: {
        expand: true,
        cwd: 'source/',
        src: '**',
        dest: 'prebuild/',
        flatten: false
      },
      js: {
        expand: true,
        cwd: 'prebuild/js/',
        src: '**',
        dest: 'build/js/',
        flatten: false
      },
      scripts: {
        expand: true,
        cwd: 'prebuild/script/',
        src: '**',
        dest: 'build/script/',
        flatten: false
      },
      root_assets: {
        expand: true,
        cwd: 'prebuild/root_assets',
        src: '**',
        dest: 'prebuild',
        flatten: true
      }
    },

    image_resize: {
      teaser_small : {
        options: {
          width: 130,
          height: 90,
          crop: true,
          overwrite: true
        },
        src: 'prebuild/blog/images/source/*',
        dest: 'build/blog/images/teaser-small/'          
      },
      full_body : {
        options: {
          width: 650,
          height: 300,
          crop: true,
          overwrite: true
        },
        src: 'prebuild/blog/images/source/*',
        dest: 'build/blog/images/full_body/'          
      }
    },

    clean: {
      pre: {
        src: ['build/*', '!build', '!build/.git', 'prebuild'],
      },
      post: {
        src: ['build/tags', 'build/tmp', 'build/root_assets'],
      }
    },

    middleman: {
      options: {
        useBundle: true
      },
      build: {
        options: {
          command: "build"
        }
      }
    },

    replace: {
      general: {
        options: {
          patterns: [
            {
              match: 'gruntfile_global_path',
              replacement: '/middleman/blog/build'
            }
          ]
        },
        files: [
          {expand: true, flatten: false, src: ['build/**/*.*', '!build/blog/feed.xml'], dest: 'build/tmp/'}
        ]
      },
      feed: {
        options: {
          patterns: [
            {
              match: 'gruntfile_global_path',
              replacement: 'http://benjaminrasmussen.net/blog'
            }
          ]
        },
        files: [
          {expand: true, flatten: false, src: ['build/blog/feed.xml'], dest: 'build/tmp/'}
        ]
      }
    },

    inline: {
        one: {
            options:{
                exts: ['erb'],
            },
            src: 'prebuild/layouts/layout_blog.erb',
            dest: 'prebuild/layouts/layout_blog.erb'
        },
        two: {
            options:{
                exts: ['erb'],
            },
            src: 'prebuild/layouts/layout_intro_da.erb',
            dest: 'prebuild/layouts/layout_intro_da.erb'
        },
        three: {
            options:{
                exts: ['erb'],
            },
            src: 'prebuild/layouts/layout_intro_en.erb',
            dest: 'prebuild/layouts/layout_intro_en.erb'
        },
    },

    compass: {                  // Task
      dist: {                   // Target
        options: {              // Target options
          sassDir: 'prebuild/styles',
          cssDir: 'prebuild/styles',
          environment: 'production',
          outputStyle: 'compressed',
          config: 'source/config.rb'
        }
      },
    },


    watch: {
      fail: {
        files: ['prebuild/**'],
        tasks: ['fail'],
        options: {
          debounceDelay: 250,
        },
      },
      all: {
        files: ['prebuild/**'],
        tasks: ['build'],
        options: {
          debounceDelay: 250,
        },
      },
      middleman: {
        files: ['prebuild/**'],
        tasks: ['middleman'],
        options: {
          debounceDelay: 250,
        },
      }
    },



  })
}