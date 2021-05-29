# STAGE - 1
# Base Stage - creates a base for further stages to build
# Uses Node js image
# Essential tools needed for all stages are installed here and also the steps that will be common in all stages
# This will never be built into its own image
ARG nodeVersion=14.16.1
FROM node:$nodeVersion-alpine3.10 AS base
ARG projectName=react-apollo-example
ARG appDir=/app/$projectName
# This will mark the given path as current working directory.
# This will also create the directories on given path if not present
# hence no need to manually create the directories unless needed.
WORKDIR $appDir
COPY package*.json $appDir
# CI here means Continuous integration
# npm ci will only install production dependencies
# And it is important to clear the cache to optimize build time and size
RUN npm ci \
    && npm cache clean -f

#========================================================================#
#========================================================================#
#========================================================================#

# STAGE - 2
# Dev Stage - Stage extended from base to be only used for local development.
# Development only tools and dependecies are installed here
# This stage will also generally have bind mounts for development
FROM base as dev
# Expose port for development
EXPOSE 3000
# install development dependencies and clear cache
RUN npm install --only=development \
    && npm cache clean -f
# Set node module bin path as environment variable to be able to run node module commands
ENV PATH $appDir/node_modules/.bin/:$PATH
# used react-scripts start instead of npm start to be more clear as to whats actually being run
CMD [ "react-scripts", "start" ]

# TODO: Add stage for production