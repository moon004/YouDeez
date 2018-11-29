# YouDeez, the ultimate music streaming PWA

> YouDeez is an offline-first PWA that enables you to enjoy premium music for free without ads.

Visit the PWA on [https://moon004.github.io/YouDeez/](https://moon004.github.io/YouDeez/)

## Overview
YouDeez (Youtube + Deezer) allows you to download music/songs from both Youtube and Deezer (320kbps) library and cache it locally, and enjoy it even without internet connection.

Now you dont have to use Youtube converter to get the audio file anymore! Youdeez will serve the best audio quality of the video, this PWA is mobile supported, just visit [this link](https://moon004.github.io/YouDeez/) and the content will be cached locally. It is suggested that you ([add YouDeez to homescreen](https://www.howtogeek.com/196087/how-to-add-websites-to-the-home-screen-on-any-smartphone-or-tablet/))

## Build (For devs)
Before you proceed, make sure u have ([npm installed](https://www.npmjs.com/get-npm)).

Clone it to your local repo.
```sh
git clone https://github.com/moon004/YouDeez.git
```
then run the build script depending on your operating system which is located at frontend/app file. After the build, the PWA will be served on port 5050 in production mode.

If you wanted to run it in development mode just run:
```sh
npm start
```

That's it,  happy tinkering!


## More About YouDeez
The backend was written in Golang with ([Go-chi](https://github.com/go-chi/chi)) router package. The frontend is powered by Javascript with React library, and redux library is used as state management.

A picture worth a thousand words.

![](img/architecture.png)

All the Downloaded audio will be cached into [Indexed db](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API).

## Contribute to YouDeez
Any issues are welcome, if you are sending pull request, make sure to include test files, this project obeys the ([Airbnb coding style](https://github.com/airbnb/javascript)), well not entirely. Please do not hesitate to drop me a mail at herodotus94@gmail.com