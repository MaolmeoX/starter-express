import { model, Schema, SchemaTypes } from 'mongoose';

const PlaylistSchema = new Schema(
  {
    name: String,
    movies: [{ type: SchemaTypes.ObjectId, ref: 'MovieModel' }],
    user: { type: SchemaTypes.ObjectId, ref: 'UserModel' },
  },
  { timestamps: true, usePushEach: true }
);

const PlaylistModel = model('PlaylistModel', PlaylistSchema);

export default PlaylistModel;
