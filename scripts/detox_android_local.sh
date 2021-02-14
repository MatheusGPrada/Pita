#!/bin/bash

sh ./scripts/clean_android.sh
yarn detox:build:android
concurrently "react-native start" "yarn start:json:server"  "yarn detox:test:android" -k -s first
