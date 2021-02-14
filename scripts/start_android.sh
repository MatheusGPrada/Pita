#!/usr/bin/env bash
# Starts Emulator, Metro and Android

AVD_NAME=pixel
gnome-terminal --tab --title="Emulator" --command="bash -c '${ANDROID_HOME}/emulator/emulator @${AVD_NAME}; $SHELL'"
gnome-terminal --tab --title="Metro" --command="bash -c 'cd ${PWD}; yarn start; $SHELL'"
yarn android
