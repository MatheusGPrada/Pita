#!/bin/bash

yarn build:ios
cd ios || exit
pod install
fastlane increment_version
fastlane beta matchGitAuthorization:"$1" appleAppPassword:"$2"
