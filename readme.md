# Grunt Email Design Workflow

Designing and testing emails is a pain. HTML tables, inline CSS, various devices and clients to test, and varying support for the latest web standards.

This grunt task helps simplify things at the design stage.

1. Compiles your SCSS to CSS

2. Builds your HTML and TXT email templates

3. Inlines your CSS

## Requirements

* Node.js - [Install Node.js](https://github.com/joyent/node/wiki/Installing-Node.js-via-package-manager)
* Grunt-cli and Grunt (`npm install grunt-cli -g`)
* Ruby - [Install ruby with RVM](https://rvm.io/rvm/install)
* Premailer (`gem install premailer hpricot nokogiri`) - Inlines the CSS

## Getting started

If you haven't used [Grunt](http://gruntjs.com/) before check out Chris Coyier's post on [getting started with Grunt](http://24ways.org/2013/grunt-is-not-weird-and-hard/).

Clone this repo, cd to the directory, run `npm install` to install the necessary packages.

```
git clone https://github.com/leemunroe/grunt-email-design.git
cd grunt-email-design
npm install
grunt
```

You can also run:

```
grunt agile
```

Which will listen to your file system for changes and refresh your browser so you can instantly
preview your email.

Note: you may need to run the following command if you receive a cryptic `Waiting...Fatal error: watch ENOSPC` error:

```
echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p
```

## How it works

<img src="http://i.imgur.com/yrHpTdr.jpg" width="500">

### CSS

This project uses [SCSS](http://sass-lang.com/). You don't need to touch the .css files, these are compiled automatically.

For changes to CSS, modify the `.scss` files.

Media queries and responsive styles are in a separate style sheet so that they don't get inlined. Note that only a few clients support media queries e.g. iOS Mail app.

### Email templates and content

Handlebars and Assemble are used for templating.

`/emails` is where your email content will go.

`/data` contains _optional_ .yml or .json data files that can be used in your templates. It's a good way to store commonly used strings.

### Generate your email templates

In terminal, run `grunt`. This will:

* Compile your SCSS to CSS
* Generate your email layout and content
* Inline your CSS

See the output HTML in the `dist` folder. Open them and preview it the browser.

<img src="http://i.imgur.com/WoWgRxm.gif" width="500">

Alternatively run `grunt agile`. This will check for any changes you make to your .scss and .hbs templates, then automatically run the tasks. Saves you having to run grunt every time.
