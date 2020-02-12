import PlaylistModel from '../models/playlist';

export default class PlaylistService {
  // eslint-disable-next-line consistent-return
  static async getOrCreatePlaylistUser(user, movieId, name) {
    try {
      if (user.playlist === undefined || user.playlist.length <= 0) {
        const playlist = new PlaylistModel();
        playlist.name = name;
        playlist.user = user;
        playlist.movies.push(movieId);
        await PlaylistModel.create(playlist);
        user.playlist.push(playlist.id);
        await user.save();
      } else {
        const playlist = await PlaylistService.getPlayListUser(user);
        playlist.movies.push(movieId);
        await playlist.save();
      }
      return user.playlist;
    } catch (e) {
      console.error(e);
    }
  }

  // eslint-disable-next-line consistent-return
  static async getPlayListUser(user) {
    try {
      return await PlaylistModel.findOne({ user: user.id });
    } catch (e) {
      console.error(e);
    }
  }
}
