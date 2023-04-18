import Track from "../entity/Track.js";
import { AppDataSource } from "./data_source.js";

const trackRepository = AppDataSource.getRepository(Track);

/**
 * Adds the desired track to the queue of the given Discord server.
 * @param {string} serverId Server this track belongs to.
 * @param {string} songId The desired song.
 */
export async function addTrack(serverId, songId) {
  if (!serverId || !songId) {
    throw new Error("Missing arguments");
  }

  if (songId.length >= 255) {
    throw new Error("Song ID is too long");
  }

  await trackRepository.save({
    serverId: serverId,
    songId: songId,
  });
}

/**
 * Returns how many rows there is with given server ID.
 * @param {string} serverId Discord server ID.
 * @returns {Promise<number>}
 */
export async function getTrackCount(serverId) {
  if (!serverId) {
    throw new Error("Missing arguments");
  }

  return trackRepository.count({
    where: {
      serverId: serverId,
    },
  });
}

/**
 * Gets an array of tracks associated with the server ID.
 * @param {string} serverId Discord server ID.
 * @returns {Promise<[]Track>}
 */
export async function getTracks(serverId) {
  if (!serverId) {
    throw new Error("Missing arguments");
  }

  return trackRepository.find({
    where: {
      serverId: serverId,
    },
  });
}
