module.exports = function(grunt) {
    grunt.initConfig({
        react: {
            dynamic_mappings: {
                files: [{
                    expand: true,
                    cwd: 'routes',
                    src: ['**/*.jsx'],
                    dest: 'src',
                    ext: '.js',
                }],
            },
        },
        browserify: {
            'dist/app.js': ['src/app.js'],
        },
        nodemon: {
            dev: {
                script: 'server.js',
            },
        },
        watch: {
            all: {
                files: ['**/*.jsx'],
                tasks: ['compile'],
            },
        },
        concurrent: {
            limit: 8,
            watches: {
                tasks: ['watch', 'nodemon'],
                options: {logConcurrentOutput: true,}
            },
        },
    });

    grunt.loadNpmTasks('grunt-react');
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-nodemon');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-concurrent');

    grunt.registerTask('compile', ['react', 'browserify']);
    grunt.registerTask('default', ['compile', 'concurrent:watches']);
};
