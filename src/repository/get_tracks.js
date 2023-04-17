import Track from "../entity/Track.js";
import { AppDataSource } from "./data_source.js";

const trackRepository = AppDataSource.getRepository(Track);

/**
 * Gets an array of tracks associated with the server ID.
 * @param {string} serverId Discord server ID.
 * @returns {Promise<[]Track>}
 */
export default async function getTracks(serverId) {
  if (!serverId) {
    throw new Error("Missing arguments");
  }

  return trackRepository.find({
    where: {
      serverId: serverId,
    },
  });
}
