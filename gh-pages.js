var exec = require("child_process").exec

if(process.env.TRAVIS_PULL_REQUEST != "false") {
    exec("./gh-pages-pull-request.sh", function(jserr, stdout, stderr) {
        console.log(stdout)
        console.log("DONE")
    })
} else if(process.env.TRAVIS_BRANCH != "false") {
    exec("./gh-pages-branch.sh", function(jserr, stdout, stderr) {
        console.log(stdout)
        console.log("DONE")
    })
    if(process.env.TRAVIS_BRANCH == "master") {
        console.log("this is the master branch")
    }
}
