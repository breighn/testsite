module.exports = function(grunt) {

	// All configuration goes here 
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		concat: {
			global: {
				src: ['../js/src/*.js' ],
				dest: '../js/pro/global.js',
			},
		},

		uglify: {
		    build: {
		        src: ['../js/pro/global.js',],
		        dest: '../js/pro/global.min.js',
		    },
		},


		imagemin: {
		    dynamic: {
		        files: [{
		            expand: true,
		            cwd: '../img/src/',
		            src: ['**/*.{png,jpg,gif}'],
		            dest: '../img/pro/'
		        }]
		    }
		},

		compass: {
			dev: {
		    	options: {              
		        	sassDir: '../sass',
		        	cssDir: '../css',
		        	fontsDir: '../fonts',
		        	imagesDir: '../img/pro',
		        	images: '../img/pro',
		        	javascriptsDir: '../js/pro',
		        	environment: 'development',
		        	//outputStyle: 'nested',
		        	relativeAssets: false,
		        	httpPath: '.',
		        }
		    },
		},

		cssmin: {
		  	minify: {
		    	expand: true,
		    	cwd: '../css/',
		    	src: ['*.css', '!*.min.css'],
		    	dest: '../css/',
		    	ext: '.min.css'
		  	}
		},

		watch: {
			scripts: {
		        files: ['../js/**/**.js'],
		        tasks: ['concat', 'uglify'],
		        options: {
		            spawn: false,
		        },
		    },
		    images: {
		    	files: ['../img/src/**.{png,jpg,gif}'],
				tasks: ['imagemin'],
				options: {
					spawn: false,
				}
		    },
		    compass: {
		    	files: ['../**/*.{scss,sass}'],
		    	tasks: ['compass'],
		    },
		    cssmin: {
		    	files: ['../css/*.css', '!../css/*.min.css'],
				tasks: ['cssmin'],
		    }
		},
	});

	// Where we tell Grunt we plan to use this plug-in.
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-imagemin');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-compass');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	// grunt.loadNpmTasks('grunt-svgstore');

	// Where we tell Grunt what to do when we type "grunt" into the terminal.
	grunt.registerTask('default', ['imagemin', 'concat', 'uglify', 'compass', 'watch']);

};
