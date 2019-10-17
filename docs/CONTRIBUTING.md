# Contributing to Angular Codelab

Thank you for deciding to contribute to codelab.fun! We're excited to have you on the team 🙌

Below you'll find our guidelines for contributing to further development of this codelab, which is hosted at [codelab-fun/codelab](https://github.com/codelab-fun/codelab) on GitHub.

---

#### Table Of Contents

[Before You Start](#before-you-start)

- [Code of Conduct](#code-of-conduct)
- [NPM Packages](#npm-packages)

[Contributing to the Codelab](#contributing-to-the-codelab)

- [Reporting Bugs](#reporting-bugs)
- [Opening Issues on GitHub](#opening-issues-on-github)
- [Contributing Code](#contributing-code)
- [Making a Pull Request](#making-a-pull-request)

[On Style](#on-style)

- [Git Commit Messages](#git-commit-messages)
- [Code Style](#code-style)

---

## Before You Start

### Code of Conduct

This project adheres to the [Contributor Covenant Code of Conduct](http://contributor-covenant.org/version/1/4/).
So that everyone can feel welcome we ask you to please uphold this code should you decide to contribute to this project.

---

## Quick start

`git clone https://github.com/codelab-fun/codelab.git` (this UTL might be different if you forked)
`npm install`
`npm start`

## Repository structure

We're using [NX](https://nx.dev/web) - Extensible Dev Tools for Monorepos.
This allows us to have multiple projects and libraries in one repository.

Most of the work will happen in `apps/codelab`, but here's the overview of the other folders:

```
- apps
  - codelab                  - The actual codelab code. Most of the work will be done here.
  - angular-thirty-seconds   - 30.codelab.fun code
  - kirjs                    - @kirjs's folder for experiments
  - lis                      - @the_kibs's folder for experiments
  - blog                     - blog is coming soon

- libs                       - Libraries and helper code shared across projects

- ng2ts                      - Legacy code which shouldn't be touched

- tools                      - Angular schematic for generating new presentations.
```

## Contributing to the Codelab

### Reporting Bugs

If you find a bug while going through the codelab as a student, you can submit feedback through the blue feedback button in the bottom-right corner.
<img src="https://user-images.githubusercontent.com/2545357/66276032-b56d8680-e85c-11e9-9148-ab38caeb4a57.png" width = 600>

#### Before Sending Feedback

Please check out the previous comments to ensure this problem hasn't already been reported!

#### Submitting a Report

Feedback form submissions are magically converted to [GitHub issues](https://guides.github.com/features/issues/) by codelab team members.

- Make sure you explain the problem and include any relevant details
- Describe the steps you followed to encounter the issue if you can remember them
- Explain what behavior you expected to see instead
- Feel free to include any suggestions if you have them ✨

---

### Opening Issues on GitHub

Before opening a new issue, please check the existing ones to confirm it isn't on file yet.

If opening an issue, please include:

- A succinct and illustrative title
- A helpful description
- Current and expected behavior
- If a suggestion for improvement, how you think the suggestion can improve the project
- Any other details if necessary like screenshots

---

### Contributing Code

If you don't know where to start, try perusing issues marked by `help-wanted` tags!

If you want to work on something there isn't yet an issue for, consider submitting an issue so that multiple contributers aren't _unknowingly_ working on solving the same problem in parallel.

If you're new to Git check out this awesome [free Udacity class](https://www.udacity.com/course/how-to-use-git-and-github--ud775) by [Caroline Buckey](https://github.com/cbuckey-uda) and [Sarah Spikes](https://github.com/salogel42) 📚

And if you're new to just GitHub check out [this cool tutorial series](https://egghead.io/courses/how-to-contribute-to-an-open-source-project-on-github) by [Kent C. Dodds](https://github.com/kentcdodds) 📝

### Making a Pull Request

- Don't forget to pull from the master branch and resolve any merge conflicts first!
- We run `npm run lint` and `npm run build:prod` in CI, so run it locally before committing you code
- If you don't have access to the repo, fork the project and make a PR from there
- Describe what the PR addresses
- Include screenshots and descriptive explanations if necessary

---

## On Style

### Git Commit Messages

- Use the present tense
- If applicable, reference the issue being resolved

#### For example:

- 💯: [Redirect user to the requested page after login](https://robots.thoughtbot.com/5-useful-tips-for-a-better-commit-message)
- 😱: [HAAAAAAAAANDS](https://xkcd.com/1296)

Extended example:

```
Change bears' entrypoint

This entrypoint ensures that coala discovers
the bears correctly.
It helps not writing more functions inside
``coalib`` for this.

Closes #5861 // this will automatically link it to the issue and close it when merged
```

You can read more about git commit style [here](http://api.coala.io/en/latest/Developers/Writing_Good_Commits.html)
not [here](https://xkcd.com/1296/)

### Code Style

## Autoformatting

run `npm run format:write` before submitting your code.

# Linter

Angular Codelab comes with its own linter settings. If you're not sure your linter is picking up on them, please run `npm lint` and fix any styling errors before submitting.
