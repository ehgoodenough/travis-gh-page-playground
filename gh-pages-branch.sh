openssl aes-256-cbc -K $encrypted_924df9a25462_key -iv $encrypted_924df9a25462_iv -in deploy_key.enc -out deploy_key -d
chmod 600 deploy_key
eval `ssh-agent -s`
ssh-add deploy_key

git config --global user.name "Mocs Arcade"
git config --global user.email "mocsarcade@gmail.com"
git clone ssh://git@github.com/$TRAVIS_REPO_SLUG.git -b gh-pages gh-pages

cd gh-pages
mkdir tree
cd tree
mkdir $TRAVIS_BRANCH
cd $TRAVIS_BRANCH
rm -rf *
cp ../../../build/* . -r
cd ../..
git status
git add --all
git commit -m "Deployed $TRAVIS_BRANCH"
git push origin gh-pages
