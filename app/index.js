'use strict'

var generators = require('yeoman-generator')
var mkdirp = require('mkdirp')

module.exports = generators.Base.extend({

  constructor: function() {
    generators.Base.apply(this, arguments)
  },

  prompting: function() {
    return this.prompt([{
      type: 'input',
      name: 'name',
      message: 'project name?'
    }, {
      type: 'input',
      name: 'description',
      message: 'project description?'
    }]).then(function (answers) {
      mkdirp(answers.name)
      this.destinationRoot(answers.name)
    }.bind(this))
  },

  writing: {
    folder: function() {
      ['src', 'test'].forEach(function(folder) {
        this.directory(this.templatePath(folder), this.destinationPath(folder))
      }, this)
    },

    dotedFiles: function() {
      ['babelrc', 'gitignore', 'eslintrc', 'npmignore', 'travis.yml'].forEach(function(file) {
        this.fs.copy(this.templatePath(file), this.destinationPath('.' + file))
      }, this)
    },

    files: function() {
      ['LICENCE', 'package.json', 'README.md'].forEach(function(file) {
        this.fs.copy(this.templatePath(file), this.destinationPath(file))
      }, this)
    }
  },

  installingLodash: function() {
    this.npmInstall()
  },

  end: function() {}
})