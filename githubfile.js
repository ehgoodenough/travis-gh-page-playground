/*if(process.env.TRAVIS_PULL_REQUEST != "false") {
    console.log("this is a pr")
} else if(process.env.TRAVIS_BRANCH != "false") {
    if(process.env.TRAVIS_BRANCH == "master") {
        console.log("this is the master branch")
    } else {
        console.log("this is any ole branch")
    }
}*/

var async = require("async")
var exec = require("child_process").exec
var chalk = require("chalk")

execute = function(cmd) {
    return function(done) {
        exec(cmd, function(jserr, stdout, stderr) {
            console.log(chalk.bold("$ " + cmd))
            if(jserr || stderr) {
                console.log(jserr, stderr)
            } else {
                console.log(stdout)
            }
            console.log("")
            if(done) {
                done()
            }
        })
    }
}

function run(commands, callback) {
    for(var index = 0; index < commands.length; index++) {
        commands[index] = execute(commands[index])
    }
    async.series(commands, callback)
}

var TRAVIS_REPO_SLUG = "ehgoodenough/travis-gh-pages-playground.git"

run([
    "openssl aes-256-cbc -K $encrypted_924df9a25462_key -iv $encrypted_924df9a25462_iv -in deploy_key.enc -out deploy_key -d",
    "chmod 600 deploy_key",
    "eval `ssh-agent -s`",
    "ssh-add deploy_key",
    "git clone ssh://git@github.com/" + TRAVIS_REPO_SLUG + " -b gh-pages gh-pages",
    "cd gh-pages", //this does work; it does change the directory
    "ls" //this does not print out the contents of gh-pages since it's a separate shell
], function(error) {
    if(error) {
        console.log(error)
    } else {
        console.log("DONE")
    }
})
