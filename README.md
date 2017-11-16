# Power VTT Character Sheets

Community character sheets for [Power Virtual TableTop](https://www.poweredvtt.com).

# Guide

Starting a new character sheet from scratch is quite easy as it's simply JavaScript. We give you the
pieces to necessary to build templates and you simply put them together how you like.

We welcome your creativity when designing a sheet. Design animations, add graphics, and most
importantly, make it usable!

If you have questions before creating a new character sheet, feel free to drop us an email at
[support@poweredvtt.com](mailto:support@poweredvtt.com) or [open a new issue](https://github.com/UnicornHeartClub/character-sheets/issues/new).

## Getting Started

Before starting, ensure you have [Node.js](https://nodejs.org) >= 8 installed on your machine.

Character sheets are built using [Storybook](https://github.com/storybooks/storybook), a framework
that makes it lightning quick to create and iterate on designs. Storybook live-reloads any changes
you make and provides you with an excellent way to create different examples of your sheet with
a few lines of code.

To begin, start the storybook by running:

```bash
yarn storybook
# or
npm run storybook
```

Navigate to [http://localhost:6006](http://localhost:6006) in your browser to view all the available
character sheets.

## Create a Character Sheet

Create a new sheet by running the command below in this repository.

```bash
yarn new -- "Sheet Name"
```

This will create two (2) new files for you to use

 - `sheets/Sheet Name/index.js`
 - `stories/Sheet Name/index.js`

We will dive into each one.

## Higher-Order Component

In the Character Sheet, you are given a special
[higher-order component](https://reactjs.org/docs/higher-order-components.html) that gives you
access to special properties and methods that you can use in your sheet.

# License

[MIT](LICENSE) &copy; 2017 Unicorn Heart Club LLC
