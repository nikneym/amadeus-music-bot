import Track from "../entity/Track.js";
import { AppDataSource } from "./data_source.js";

const trackRepository = AppDataSource.getRepository(Track);

/**
 * Adds the desired track to the queue of the given Discord server.
 * @param {string} serverId Server this track belongs to.
 * @param {string} songId The desired song.
 */
export default async function addTrack(serverId, songId) {
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
