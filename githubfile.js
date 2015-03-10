if(process.env.TRAVIS_PULL_REQUEST) {
    console.log("this is a pr")
} else if(process.env.TRAVIS_BRANCH) {
    if(process.env.TRAVIS_BRANCH == "master") {
        console.log("this is the master branch")
    } else {
        console.log("this is any ole branch")
    }
}
