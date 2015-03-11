var exec = require("child_process").exec

if(process.env.TRAVIS_PULL_REQUEST != "false") {
    console.log("this is a pr")
} else if(process.env.TRAVIS_BRANCH != "false") {
    exec("./gh-pages-branch.sh", function(jserr, stdout, stderr) {
        console.log(stdout)
    })
    if(process.env.TRAVIS_BRANCH == "master") {
        console.log("this is the master branch")
    }
}
