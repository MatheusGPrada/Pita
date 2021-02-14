#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-var-requires */
const { execSync } = require('child_process')
const fs = require('fs')

const file = 'package.json'

function run(cwd, command) {
    return execSync(command, { cwd, encoding: 'utf8' })
}

function getAdbDevices(cwd) {
    return run(cwd, 'adb devices -l')
}

function getAttDevice() {
    const devices = getAdbDevices()
    const output = devices.split('\n')
    const line = output.find(out => out.includes('device usb'))
    if (line === undefined) {
        return line
    }
    return line.match(/^\S*/)[0]
}

const adbName = getAttDevice()

if (adbName === undefined) {
    console.error('Could not find device name')
} else {
    const packageFile = fs.readFileSync(file)
    const content = JSON.parse(packageFile)
    content.detox.configurations['android.att.debug'].device.adbName = adbName

    fs.writeFileSync(file, `${JSON.stringify(content, undefined, 4)}\r\n`)
}
