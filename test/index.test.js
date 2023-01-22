const fs = require("fs");
const { join } = require("path");
const ipfs = require("ipfs-storage");

require("dotenv").config();

fs.readFile(join(__dirname, "..", "banner.png"), async (err, data) => {
  if (err) {
    console.log("🆘 ERROR:", err);
    return;
  }

  if (
    !process.env.FILEBASE_KEY &&
    !process.env.PINATA_JWT &&
    !process.env.FLEEK_KEY &&
    !process.env.WEB3_TOKEN &&
    !process.env.LIGHTHOUSE_TOKEN
  ) {
    console.log("🆘 ERROR:", "Create .env file");
    return;
  }

  try {
    const url = await ipfs.uploadFile.filebase(
      {
        key: process.env.FILEBASE_KEY,
        secret: process.env.FILEBASE_SECRET,
        bucket: process.env.FILEBASE_BUCKET,
      },
      {
        hash: "banner",
        ext: ".png",
        buffer: data,
      }
    );
    console.log("✅ FILEBASE:", url);
    await ipfs.deleteFile.filebase(
      {
        key: process.env.FILEBASE_KEY,
        secret: process.env.FILEBASE_SECRET,
        bucket: process.env.FILEBASE_BUCKET,
      },
      {
        hash: "banner",
        ext: ".png",
      }
    );
  } catch (err) {
    console.log("🆘 FILEBASE:", err);
  }

  try {
    const url = await ipfs.uploadFile.pinata(
      {
        jwt: process.env.PINATA_JWT,
      },
      {
        hash: "banner",
        ext: ".png",
        buffer: data,
      }
    );
    console.log("✅ PINATA:", url);
    await ipfs.deleteFile.pinata(
      {
        jwt: process.env.PINATA_JWT,
      },
      {
        url,
      }
    );
  } catch (err) {
    console.log("🆘 PINATA:", err);
  }

  try {
    const url = await ipfs.uploadFile.fleek(
      {
        key: process.env.FLEEK_KEY,
        secret: process.env.FLEEK_SECRET,
        bucket: process.env.FLEEK_BUCKET,
      },
      {
        hash: "banner",
        ext: ".png",
        buffer: data,
      }
    );
    console.log("✅ FLEEK:", url);
    await ipfs.deleteFile.fleek(
      {
        key: process.env.FLEEK_KEY,
        secret: process.env.FLEEK_SECRET,
        bucket: process.env.FLEEK_BUCKET,
      },
      {
        hash: "banner",
        ext: ".png",
      }
    );
  } catch (err) {
    console.log("🆘 FLEEK:", err);
  }

  try {
    const url = await ipfs.uploadFile.web3(
      {
        token: process.env.WEB3_TOKEN,
      },
      {
        hash: "banner",
        ext: ".png",
        buffer: data,
      }
    );
    console.log("✅ WEB3:", url);
    await ipfs.deleteFile.web3(
      {
        token: process.env.WEB3_TOKEN,
      },
      {
        url,
      }
    );
  } catch (err) {
    console.log("🆘 WEB3:", err);
  }

  try {
    const url = await ipfs.uploadFile.lighthouse(
      {
        token: process.env.LIGHTHOUSE_TOKEN,
      },
      {
        hash: "banner",
        ext: ".png",
        buffer: data,
      }
    );
    console.log("✅ LIGHTHOUSE:", url);
    await ipfs.deleteFile.lighthouse(
      {
        token: process.env.LIGHTHOUSE_TOKEN,
      },
      {
        url,
      }
    );
  } catch (err) {
    console.log("🆘 LIGHTHOUSE:", err);
  }
});
