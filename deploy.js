console.log("Hello World!")

if(process.env.TRAVIS_BRANCH) {
    console.log("this is a branch!")
    if(process.env.TRAVIS_BRANCH == "master") {
        console.log("m-m-master!")
    } else if(process.env.TRAVIS_TRANCH == "gh-pages") {
        console.log("do nothing; it's already ghpages!")
    }
} else if(process.env.TRAVIS_PULL_REQUEST) {
    console.log("this is a pull request!")
}
