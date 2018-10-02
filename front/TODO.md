

Short description

- HTML5 Videoplayer
    - livestream
    - on demand videos
- Anonym chat plugin
    - recaptcha validion

- Further features
    - Admin panel
        - setup streams and ondemand
        - moderation chat messages
    - social sharing, embedd

Layout notice
- playback to right sidebar
    - clickable on/off sidebar
    - search from videos and autocomplete


Useful links

https://videojs.com/getting-started/

layout links
http://www.webdesign-flash.ro/p/uvp/index.html#/?playlistId=0&videoId=8

OUBS live url:
https://wowza.oubs.fi/live/ngrp:oubs_all/playlist.m3u8

For test playlist url:
http://wowza.oubs.fi/vod/mp4:sample.mp4/playlist.m3u8

Chatti:
- Socket io 
- Viestit välittää selaimelta toiselle
- Viestit tallentuu palvelimelle, jokaisella videolla
    - tehdään backend joka on rest api

Dev steps
1. 

Made:
- ~~use vuevideojs component (npm install vue-video-player)~~
- Make first hello world template for beginning
- Videoplayer with demo video. Tech: video.js
- Make basic json output and placeholders componet for player, videolists, chat, titles and footer
- Change video from playlist links. Plus LIVE button to change to live
- Change vuevideojs -> pure videojs
- Chage playlist to own component
- Filter-search from playlist videos

Notes:
- Backend / frontend to separate folders

Workflow plans:

App component
- videoplayer-component
    - Show videos
- playlist-component <--> item-component
    - Show archieved videos
    - Delivery scr url to videoplayer-component
- search-playlist-component
- chat




Deploy to production

CircleCI


Source --> CircleCI --> DockerHub