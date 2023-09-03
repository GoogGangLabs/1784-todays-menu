#!/bin/bash

/wait-for-it.sh database:3306 -t 30

yarn start:prod