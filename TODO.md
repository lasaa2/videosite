

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


Dev steps

~~1. Make first hello world template for beginning~~
~~2. Videoplayer with demo video. Tech: video.js~~
~~3. Make basic json output and placeholders componet for player, videolists, chat, titles and footer~~

~~4. Change video from playlist links. Plus LIVE button to change to live~~

5. Search from playlist videos


Made:
- use vuevideojs component (npm install vue-video-player)


Videoplayer component
- res for show and handle videoj




App component
    |
    |
videoplayer-component
    |
    |
    playlist-component <---> item-component