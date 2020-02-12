import { model, Schema, SchemaTypes } from 'mongoose';

const MovieSchema = new Schema(
  {
    idAPI: String,
  },
  { timestamps: true, usePushEach: true }
);

const MovieModel = model('MovieModel', MovieSchema);

export default MovieModel;
