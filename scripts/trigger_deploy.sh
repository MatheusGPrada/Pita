#! /bin/bash

command=$0
semantic_version=$1

echo "Started a new deploy of semantic versioning: $semantic_version"

yarn version --verbose  --no-git-tag-version  --new-version $semantic_version
new_version=`node -p "require('./package.json').version"`

echo "New version: $new_version"

yarn workspace @dasa-health/eslint-config-dasa-health-js version --patch --no-git-tag-version
yarn workspace @dasa-health/commitlint-config version --patch --no-git-tag-version
yarn workspace @dasa-health/components version --patch --no-git-tag-version

yarn jest -u
git add package.json
git add packages/commitlint-config/package.json
git add packages/components/package.json
git add packages/eslint-config/package.json
git add CHANGELOG.md
git add packages/app/src/features/profile/pages/Profile/__snapshots__/Profile.test.tsx.snap
git commit -m "v$new_version"

git tag "v$new_version"

git push
git push origin "v$new_version"

echo "Done"
