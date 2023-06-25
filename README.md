## Twitter-Clone - Twitter clone in Next JS and Firebase

[![GitHub stars](https://img.shields.io/github/stars/rohittiwari-dev/twitter-clone?style=social)](https://github.com/login?return_to=%2Frohittiwari-dev%twitter-clone) ![GitHub forks](https://img.shields.io/github/forks/rohittiwari-dev/twitter-clone?style=social)

A working Twitter clone built in Next JS using Firebase auth,realtime,firestore database and storage.This Project is Only for learning Purpose. Anyone can Learn using the Project and Contribute.

![Alt text](/assets/screenshots/image.webp)

![GitHub last commit](https://img.shields.io/github/last-commit/rohittiwari-dev/twitter-clone)
[![Awesome Next JS](https://img.shields.io/badge/Awesome-Next%20JS-pink.svg?longCache=true&style=flat-square)](https://nextjs.org/)

## Features

-   Google and Github Authentication is Available
-   User can create Account,can Manage Account and can Change and Upload Profile and Cover Image
-   User Can tweet,Like ,Comment and can Follow others in Twitter-clone
-   User can Post Media,texts and Inreactive Emogies with it.
-   User Can Create Threads of Comments

[![Live Project](https://img.shields.io/badge/Live-Project-blue.svg?longCache=true&style=flat-square)](https://twitterrohit.netlify.app/login)

## Setup Project

> Add Firebase Project Credentials in `firebase.js`

```js
const firebaseConfig = {
	apiKey: "", //Firebase Project API KEY
	authDomain: "", //Firebase Project authDomain
	projectId: "", //Firebase Project project ID
	storageBucket: "", //Firebase Project storage Bucket
	messagingSenderId: "", //Firebase Project message sender id
	appId: "", //Firebase Project app ID
};
```

> Add Environment Variables `.env` File

```env
NEXTAUTH_GOOGLE_CLIENTID="" #From Google Consol
NEXTAUTH_GOOGLE_CLIENTSECRET="" #From Google Consol
NEXTAUTH_SECRET="dfg64fdgdf5gdf4gfsdf54fds5sdf4"
NEXTAUTH_URL="http://127.0.0.1:3000"
```

## Getting Started With Project

1. Need Node Js v16^
2. VS Code
3. Download Code From Github or Clone IT
4. Go To Project Directory
5. Open VsCode and Open Terminal
6. Type `npm install`
7. For Localhost :

> Development Build

```sh
npm run dev
```

> Production Build

```sh
npm run build && npm start
```

## Dependencies

<details>
     <summary> Click to expand </summary>
     
* [next](https://www.npmjs.com/package/next)
* [firebase](https://www.npmjs.com/package/firebase)
* [next-auth](https://www.npmjs.com/package/next-auth)
* [react](https://www.npmjs.com/package/react)
* [react-dom](https://www.npmjs.com/package/react-dom)
* [react-icons](https://www.npmjs.com/package/react-icons)
* [react-redux](https://www.npmjs.com/package/react-redux)
* [sharp](https://www.npmjs.com/package/sharp)
* [tailwind-scrollbar-hide](https://www.npmjs.com/package/tailwind-scrollbar-hide)
* [timeago.js](https://www.npmjs.com/package/timeago.js)
* [uuid](https://www.npmjs.com/package/uuid)
* [autoprefixer](https://www.npmjs.com/package/autoprefixer)
* [postcss](https://www.npmjs.com/package/postcss)
* [tailwindcss](https://www.npmjs.com/package/tailwindcss)
* [@next/font](https://www.npmjs.com/package/@next/font)
* [@reduxjs/toolkit](https://www.npmjs.com/package/@reduxjs/toolkit)
* [emoji-picker-react](https://www.npmjs.com/package/emoji-picker-react)
     
</details>

## Created & Maintained By

**Rohit Tiwari**

![Twitter Follow](https://img.shields.io/twitter/follow/dev24_tiwari?style=social)

> If you found this project helpful or you learned something from the source code and want to thank me, consider buying me a cup of :coffee:
>
> ![QR](/assets/screenshots/qr.webp)
>
> You can also nominate me for Github Star developer program
> https://stars.github.com/nominate

## Visitors Count

![Couter](https://profile-counter.glitch.me/rohittiwari-dev/count.svg)
