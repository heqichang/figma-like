# Changesets

Welcome to your changesets! This directory holds all your changeset files.

## What is a changeset?

A changeset is a file that describes the changes you've made to your packages. It contains:
- A summary of the changes
- What packages are affected
- The type of version bump (patch, minor, major)

## How to create a changeset

```bash
npm run changeset
```

This will guide you through creating a changeset interactively.

## How to version packages

```bash
npm run version
```

This will apply all changesets and update the package versions and changelogs.

## How to publish

```bash
npm run release
```

This will build the packages and publish them to npm.