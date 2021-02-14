#!/bin/node
/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs')
const path = require('path')

const BASE_PATH = path.resolve(__dirname, '..')

const environment = process.argv[2]
const envFileContent = require(`../envs/${environment}.json`)
fs.writeFileSync(`${BASE_PATH}/env.json`, JSON.stringify(envFileContent, undefined, 2))
