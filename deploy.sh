#!/usr/bin/env sh

# abort on errors
set -e

# build
# npm run build
npx vuepress build blog

# navigate into the build output directory
cd blog/.vuepress/dist

# if you are deploying to a custom domain
# echo 'www.example.com' > CNAME

git init
git branch -m master
git add -A
git commit -m 'update blog'
git push -f git@github.com:jiyeonseo/jiyeonseo.github.io.git master

cd -
