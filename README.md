<div align="center"><img src="img/youdeez_192.png" alt="logo" width="110" height="110"></div>

<div align="center">
  <a href="https://circleci.com/gh/moon004/YouDeez">
    <img src="https://circleci.com/gh/moon004/YouDeez.png" alt="CI">
  </a>
</div>

# YouDeez, the ultimate music streaming PWA
 
> YouDeez is an offline-first PWA that enables you to enjoy premium music for free without ads.

Visit the PWA on https://youdeez.s3.us-east-2.amazonaws.com/index.html.
Visit the mobile version on http://youdeezmobile.s3.us-east-2.amazonaws.com/index.html

## Overview
YouDeez (Youtube + Deezer) allows you to download music/songs from both Youtube and Deezer (320kbps) library and cache it locally, and enjoy it even without internet connection.

Now you dont have to use Youtube converter to get the audio file anymore! Youdeez will serve the best audio quality of the video, this PWA is mobile supported, just visit https://youdeez.s3.us-east-2.amazonaws.com/index.html and the content will be cached locally. It is suggested that you ([add YouDeez to homescreen](https://www.howtogeek.com/196087/how-to-add-websites-to-the-home-screen-on-any-smartphone-or-tablet/))

***
## Build (For developer)
Before you proceed, make sure u have ([npm installed](https://www.npmjs.com/get-npm)), also make sure u have [Go](https://golang.org/dl/) installed

Clone it to your local repo.
```sh
git clone https://github.com/moon004/YouDeez.git
```
Before anything else, make sure you have .env file at github.com/YouDeez/ , and it is filled with your youtube [Developer keys](https://developers.google.com/youtube/v3/getting-started) and [register your deezer account](https://www.deezer.com/register) details (inspect the code inside the handler/ files to get the key-value pair in the file Yresources or DResources or u can change it), and in order for production build to work, u must create another .env file at fontend/app, that store the dns value (REACT_APP_*value).

### Backend (server) Setup
The backend depends on two CLIs to operate, [go-youtube-dl.exe](https://github.com/ytdl-org/youtube-dl/), [go-decrypt-dl.exe](https://github.com/moon004/Go-deezer-downloader), They are located in this repository as well you need to configure the file Download.go so that the media streams out to ```os.Stdout```. Put the built file into [github.com/app/src/](https://github.com/moon004/YouDeez/tree/master/app/src), and build the main file, and execute the file to spin up the backend. Take note, there is youtube-dl-getsize, it is highly suggested that you use pyinstaller to build it and put it at [github.com/app/src/](https://github.com/moon004/YouDeez/tree/master/app/src). youtube-dl-getsize will give you the size of the audio file of a youtube link.

Example
```
youtube-dl-getsize https://www.youtube.com/watch?v=lGaneyDfyls
```

>Note: Always inspect the code, to get the idea of how it works

### Frontend setup
When you got that set, proceed to frontend/app and run:
```sh
npm install
```

When it's done, run **npm start** to start the development mode.

>View the code on Mainwrapper.js to get started on the codebase.

***
## More About YouDeez
The Restful backend was written in Golang with ([Go-chi](https://github.com/go-chi/chi)) router package. The frontend is powered by Javascript with React library, and redux library is used as state management.

A picture worth a thousand words.

![My Design](img/architecture.png)

All the Downloaded audio will be cached into [Indexed db](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API). The backend has been dockerized and hosted on [Amazon AWS EC2](https://aws.amazon.com/free/) and the frontend is hosted on [Amazon S3](https://docs.aws.amazon.com/AmazonS3/latest/dev/WebsiteHosting.html), I only have a free tier account, so please go easy on the app :sweat_smile: ...

## Contribute to YouDeez

Any issues are welcome, if you are sending pull request, make sure to include test files :blush:, this project obeys the ([Airbnb coding style](https://github.com/airbnb/javascript)), well not entirely, standard style is accepted. Please do not hesitate to drop me a mail at herodotus94@gmail.com.