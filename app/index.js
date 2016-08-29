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
      message: 'project name ?'
    }, {
      type: 'input',
      name: 'description',
      message: 'project description ?',
      default: ''
    }]).then(function (answers) {
      this.name = answers.name
      this.description = answers.description
      mkdirp(this.name)
      this.destinationRoot(this.name)
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
        this.fs.copyTpl(this.templatePath(file), this.destinationPath(file), {
          name: this.name,
          description: this.description
        })
      }, this)
    }
  },

  installingLodash: function() {
    this.npmInstall()
  },

  end: function() {}
})