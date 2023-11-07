# Atllas, Inc. Takehome

Welcome! We're excited that you’ve applied to be an engineer, and we’re looking
forward to evaluating your takehome! This project is meant to showcase your
ability to meld a native app with an existing front-end.

This doc is a bit of a long read, but it’s all important information so make
sure you take the time!

# Requirements
### Time Requirements
There are no hard time requirements. Please take as much time as you need to do
your best work.

However, submitting this takehome is mandatory before we can consider your
application for the next phase.

### Tech Requirements
* You must use the existing infrastructure in every form. This means you must
  modify the existing source skeletons that exist, as they exist, but you are
  free to add packages to it to achieve your goals if needed. You just can't
  replace nextjs 13 with sveltekit, for example.
* All three packages in the monorepo should build without warning or error on
  the first try.
* There should be no lint or type errors reported from any monorepo packages.

### Important Information
* This is an NPM monorepo. You'll need to install dependencies in subdirectories
  as well as the root directory.
* The web portion can be started with `npm run start`. The mobile portion must
  be interfaced with through standard Expo commands,
  `cd packages/mobile` -> `npm run ios`.
* We have provided a seed script that will set up the database and add some
  default users: `npm run seed`.
    * `admin:admin`, `test:test`, and `user:password` are created in the seed
      script.

# Running Everything
Since this is an NPM monorepo, we omit the `packages/mobile` from the workspace
array to bypass the no-hoist issue. This means that you'll need to run `npm i`
in two places: the root directory and `packages/mobile`.

After that, you'll be able to spin up two consoles and run the following
commands:

1. `npm run start` in the root directory
2. `npx expo start` in `packages/mobile`

After that, everything should feel natural.

# Directory Structure
This is an NPM monorepo, so there are a few things to note:
1. The root directory contains the monorepo configuration and the web
   application.
2. The mobile application will display `packages/front-end` in a webview.
   `packages/front-end` interfaces with `packages/back-end` via fetch. You will
   be working on an app that interfaces with both the webview and the native
   screens.
3. You will also interface with `packages/back-end` to handle the authentication
   native screens.
4. `packages/back-end` contains the back-end. This is an expressjs project
   configured for typescript. The database is sqlite3 and interfaced via
   sequelize.
5. `packages/front-end` contains the front-end. This is a nextjs project
   configured for typescript and uses the `pages` directory structure.
6. `packages/mobile` contains the mobile application. This is an Expo project
   scaffolded with `npm create expo -t expo-template-blank-typescript`. We
   provide some basic scaffolding for the app so you don't have to boilerplate
   too much.

# Configuration
If you test on the simulator, everything should work no problem through
localhost and you can skip this. However, if you want to test on a physical
device, there's some network-related config to do.

Thankfully, most of this can be done through env vars, with the one exception
being the back-end.

### `packages/back-end`:

You should set `EXPRESS_HOST` to your local IP, e.g. 192.168.1.24. This can
either be done in your terminal or by overwriting the default
in `src/config.ts`.

### `packages/front-end`:

You should copy `.env.development` to `.env.local` and set `BACK_END_HOST` to
your local IP, e.g. 192.168.1.24.

### `packages/mobile`:

You should copy `.env.development` to `.env.local` and
set `EXPO_PUBLIC_WEBAPP_ROOT` to include local IP, e.g.
`http://192.168.1.24:3000/`.

### `Windows Considerations`:
For Windows systems, depending on your firewall settings, you may need to allow
the ports you'll be using since network access will be through your router
rather than the loopback resolver.

# Assignment

You'll be writing a small react native application that interfaces with a web
application via webview but still includes several native screens. Your
submission should include the following at a bare minimum:

1. Functional native login form. Users should be able to log in with a username
   and password, if it exists in the database.
2. Functional native registration form. Users should be able to create a new
   account with a username and password, assuming the requested user does not
   already exist.
3. A functional WebView that injects authentication accordingly such that the
   existing infrastructure recognizes the token.

You are not limited to the requirements listed above. As long as you include the
three primary assignment points, you’re free to add whatever else you want, but
you’re not required to do anything extra. We’re not expecting anything outside
of the user stories and engineering requirements, so it’s completely up to you
as to how far you go.

# Submission

_⚠️ Important: What we expect you to submit is **not** just a zipped folder of
your source tree._

There are a couple of things to do once you’re ready for hand-off. First and
foremost, it’s important to **make sure everything is committed to the “master”
branch**. Once that’s done, run the NPM script “prepare-submission” in the
top-level of the workspace, and that will generate a binary file called
“submission.bundle”. Zip this file up and submit it
to [this google form](https://forms.gle/tRRZhAj8qQwcS5d17).

# Evaluation

Your submission will be evaluated according to:
1. The quality of the implementation - Is the code clear, concise, and correct
   in implementing the desired experience?
2. The quality of the user experience - Is it the best user experience for
   mobile users?

# Need Help/More Information?
If you have any questions or concerns, please reach out to us
at [developers@atllas.com](mailto:developers@atllas.com?subject=[Atllas%20RN%20Takehome]%20)
and include “[Atllas RN Takehome]” in the subject line. We’ll be more than happy
to answer your questions to the best of our ability!

Thank you, and good luck!
