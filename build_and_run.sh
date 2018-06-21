#!/bin/bash

sudo docker build -t infra_test .

sudo docker run -d -p 3030:3030 infra_test