# Academic Team Scoreboard

## Overview

This is a simple scoreboard web app for the Versailles High School Academic Team.

The old scoreboard app doesn't work on Windows 8, so this version is written as a web app
to be compatible with the widest range of devices, including Chromebooks.

This version also provides real-time score updates to users on any device simply by
going to [https://vhsacademicteam.firebaseapp.com](https://vhsacademicteam.firebaseapp.com).


## Technical Details

The web app is written using HTML5 with [Bootstrap](https://getbootstrap.com).
It uses responsive design to adapt the layout to various types of devices and screens.

Score updates are implemented using [Firebase](https://firebase.com).

When the user is offline, the control page and the scoreboard itself will still work
as long as the website has been visited before. This uses the HTML5 application cache.
However, online score updates will not work without an internet connection.
