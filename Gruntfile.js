module.exports = function(grunt) {
    grunt.initConfig({
        browserify: {
            options: {
                transform: [ require('grunt-react').browserify ]
            },
            client: {
                src: ['routes/*.jsx'],
                dest: 'dist/bundle.js',
            },
        },
        nodemon: {
            dev: {
                script: 'server.js',
            },
        },
        watch: {
            react: {
                files: ['routes/*.jsx'],
                tasks: ['browserify'],
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

    grunt.registerTask('compile', ['browserify']);
    grunt.registerTask('default', ['compile', 'concurrent:watches']);
};
