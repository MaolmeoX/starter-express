import { model, Schema, SchemaTypes } from 'mongoose';

const MovieSchema = new Schema(
  {
    idAPI: String,
    comments: [{ type: SchemaTypes.ObjectId, ref: 'CommentModel' }],
  },
  { timestamps: true, usePushEach: true }
);

const MovieModel = model('MovieModel', MovieSchema);

export default MovieModel;
