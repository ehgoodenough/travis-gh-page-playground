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
            if(done) {
                done()
            }
        })
    }
}

function run(commands) {
    for(var index = 0; index < commands.length; index++) {
        commands[index] = execute(commands[index])
    }
    async.series(commands, function(error, results) {
        console.log("error", error)
        console.log("results", results)
    })
}

run([
    "ls",
    "cd " + process.cwd(),
    "git status"
])
