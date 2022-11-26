# Strapi Provider Upload IPFS Storage

<img alt="strapi-provider-upload-ipfs-storage" src="https://raw.githubusercontent.com/alexbakers/strapi-provider-upload-ipfs-storage/main/public/screenshot.png" />

IPFS (Filebase, Pinata, Fleek, Web3) provider for Strapi uploads.

## Installation

```bash
# using yarn
yarn add strapi-provider-upload-ipfs-storage

# using npm
npm install strapi-provider-upload-ipfs-storage --save
```

### Providers Configuration

`./config/plugins.js`

```js
module.exports = ({ env }) => ({
  // ...
  upload: {
    config: {
      provider: "strapi-provider-upload-ipfs-storage",
      providerOptions: {
        defaultStorage: "filebase",
        filebase: {
          // https://console.filebase.com/keys
          key: env("FILEBASE_KEY"),
          secret: env("FILEBASE_SECRET"),
          bucket: env("FILEBASE_BUCKET"),
        },
        pinata: {
          // https://app.pinata.cloud/keys
          jwt: env("PINATA_JWT"),
        },
        fleek: {
          // https://app.fleek.co/#/settings/general/profile
          key: env("FLEEK_KEY"),
          secret: env("FLEEK_SECRET"),
          bucket: env("FLEEK_BUCKET"),
        },
        web3: {
          // https://web3.storage/tokens/
          token: env("WEB3_TOKEN"),
        },
      },
    },
  },
  // ...
});
```

`.env`

```bash
FILEBASE_KEY=""
FILEBASE_SECRET=""
FILEBASE_BUCKET=""

PINATA_JWT=""

FLEEK_KEY=""
FLEEK_SECRET=""
FLEEK_BUCKET=""

WEB3_TOKEN=""
```

## Configuration Strapi + Filebase [ [tutorial](https://docs.filebase.com/configurations/third-party-configurations/backup-client-configurations/strapi-provider-plugin) ]

<img alt="Configuration Strapi + Filebase" src="https://raw.githubusercontent.com/alexbakers/strapi-provider-upload-ipfs-storage/main/public/filebase-provider.png" />

| Variable | Type   | Description            | Required |
| -------- | ------ | ---------------------- | -------- |
| key      | string | Filebase access key    | yes      |
| secret   | string | Filebase access secret | yes      |
| bucket   | string | Filebase bucket name   | yes      |

```js
module.exports = ({ env }) => ({
  // ...
  upload: {
    config: {
      provider: "strapi-provider-upload-ipfs-storage",
      providerOptions: {
        defaultStorage: "filebase",
        filebase: {
          // https://console.filebase.com/keys
          key: env("FILEBASE_KEY"),
          secret: env("FILEBASE_SECRET"),
          bucket: env("FILEBASE_BUCKET"),
        },
      },
    },
  },
  // ...
});
```

## Configuration Strapi + Pinata

<img alt="Configuration Strapi + Pinata" src="https://raw.githubusercontent.com/alexbakers/strapi-provider-upload-ipfs-storage/main/public/pinata-provider.png" />

| Variable | Type   | Description                      | Required |
| -------- | ------ | -------------------------------- | -------- |
| jwt      | string | Pinata JWT (Secret access token) | yes      |

```js
module.exports = ({ env }) => ({
  // ...
  upload: {
    config: {
      provider: "strapi-provider-upload-ipfs-storage",
      providerOptions: {
        defaultStorage: "pinata",
        pinata: {
          // https://app.pinata.cloud/keys
          jwt: env("PINATA_JWT"),
        },
      },
    },
  },
  // ...
});
```

## Configuration Strapi + Fleek

<img alt="Configuration Strapi + Fleek" src="https://raw.githubusercontent.com/alexbakers/strapi-provider-upload-ipfs-storage/main/public/fleek-provider.png" />

| Variable | Type   | Description                            | Required |
| -------- | ------ | -------------------------------------- | -------- |
| key      | string | Fleek Storage API key                  | yes      |
| secret   | string | Fleek Storage API secret               | yes      |
| bucket   | string | Fleek bucket name (e.g. 71a...-bucket) | yes      |

```js
module.exports = ({ env }) => ({
  // ...
  upload: {
    config: {
      provider: "strapi-provider-upload-ipfs-storage",
      providerOptions: {
        defaultStorage: "fleek",
        fleek: {
          // https://app.fleek.co/#/settings/general/profile
          key: env("FLEEK_KEY"),
          secret: env("FLEEK_SECRET"),
          bucket: env("FLEEK_BUCKET"),
        },
      },
    },
  },
  // ...
});
```

## Configuration Strapi + Web3

<img alt="Configuration Strapi + Web3" src="https://raw.githubusercontent.com/alexbakers/strapi-provider-upload-ipfs-storage/main/public/web3-provider.png" />

| Variable | Type   | Description            | Required |
| -------- | ------ | ---------------------- | -------- |
| token    | string | Web3 Storage API Token | yes      |

```js
module.exports = ({ env }) => ({
  // ...
  upload: {
    config: {
      provider: "strapi-provider-upload-ipfs-storage",
      providerOptions: {
        defaultStorage: "web3",
        web3: {
          // https://web3.storage/tokens/
          token: env("WEB3_TOKEN"),
        },
      },
    },
  },
  // ...
});
```

### Security Middleware Configuration

Due to the default settings in the Strapi Security Middleware you will need to modify the `contentSecurityPolicy` settings to properly see thumbnail previews in the Media Library. You should replace `strapi::security` string with the object bellow instead as explained in the [middleware configuration](https://docs.strapi.io/developer-docs/latest/setup-deployment-guides/configurations/required/middlewares.html#loading-order) documentation.

`./config/middlewares.js`

```js
module.exports = [
  // ...
  {
    name: "strapi::security",
    config: {
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          "connect-src": ["'self'", "https:"],
          "img-src": [
            "'self'",
            "data:",
            "blob:",
            "dl.airtable.com",
            "*.ipfs.dweb.link", // ipfs.tech
            "*.ipfs.cf-ipfs.com", // cloudflare.com
            "*.ipfs.w3s.link", // web3.storage
          ],
          "media-src": [
            "'self'",
            "data:",
            "blob:",
            "dl.airtable.com",
            "*.ipfs.dweb.link", // ipfs.tech
            "*.ipfs.cf-ipfs.com", // cloudflare.com
            "*.ipfs.w3s.link", // web3.storage
          ],
          upgradeInsecureRequests: null,
        },
      },
    },
  },
  // ...
];
```

## Links

- [Strapi website](https://strapi.io/)
- [IPFS website](https://ipfs.tech/)
- [Filebase website](https://filebase.com/)
- [Pinata website](https://pinata.cloud/)
- [Fleek website](https://fleek.co/)
- [Web3 website](https://web3.storage/)

`(c)` Alex Baker
