import { spawn } from "node:child_process";
import { Readable } from "node:stream";

/**
 * Wrapper class around yt-dlp.
 */
class YouTubeDownloader {
  #path;
  #baseLink = "https://www.youtube.com/watch?v=";

  /**
   * Creates a new YoutubeDownloader.
   * @param {string} path Path to yt-dlp executable
   * @param {string[]?} options Default options for this downloader
   */
  constructor(path, options) {
    this.#path = path;
    // TODO: Better handle user defined options
    this.options = options ?? ["-f", "251/250/249", "-o", "-"];
  }

  /**
   * Opens an opus audio stream from the given URL.
   * @param {string} url URL of YouTube audio
   * @returns {Readable}
   */
  openStream(url) {
    if (!url) throw new Error("Must specify an URL");
    if (typeof url !== "string") {
      throw new Error("the argument must be a string");
    }

    const readStream = new Readable({
      read() {},
      highWaterMark: 1024 * 10,
    });
    const process = spawn(this.#path, [...this.options, url], {
      detached: true,
    });

    readStream.on("error", () => readStream.emit("close"));
    readStream.on("close", () => readStream.destroy());
    readStream.on("end", () => readStream.destroy());

    // push bytes to our readable stream
    process.stdout.on("data", (data) => readStream.push(data));

    process.on("error", (error) => {
      readStream.push(null);
      process.kill();
      readStream.emit("error", error);
    });

    process.on("close", () => {
      readStream.push(null);
      process.kill();
    });

    return readStream;
  }

  /**
   * Opens an opus audio stream from the given video ID.
   * @param {string} id ID of YouTube video
   * @returns {Readable}
   */
  openStreamFromId(id) {
    return this.openStream(this.#baseLink + id);
  }
}

export default YouTubeDownloader;
