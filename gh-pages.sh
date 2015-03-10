openssl aes-256-cbc -K $encrypted_924df9a25462_key -iv $encrypted_924df9a25462_iv -in deploy_key.enc -out deploy_key -d # this was gen'd from travis encrypt-files on a deploy-key, which itself was gen'd from ssh-keygen, and copied into the deploy_keys section of github settings for this repo.
chmod 600 deploy_key
eval `ssh-agent -s`
ssh-add deploy_key

mkdir gh-pages
cd gh-pages
git init
git remote add origin ssh://git@github.com/$TRAVIS_REPO_SLUG.git
git checkout --orphan gh-pages
git pull origin gh-pages

mkdir $TRAVIS_BRANCH
cd $TRAVIS_BRANCH
rm -rf *
#cp ../../build/* .
echo "Hello World" > "helloworld.txt"
cd ..

git config --global user.name "Mocs Arcade"
git config --global user.email "mocsarcade@gmail.com"
git status
git add --all
git commit -m "Deployed $TRAVIS_BRANCH"
git push origin gh-pages