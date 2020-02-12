import { model, Schema, SchemaTypes } from 'mongoose';

const CommentSchema = new Schema(
  {
    text: String,
    user: { type: SchemaTypes.ObjectId, ref: 'UserModel' },
  },
  { timestamps: true, usePushEach: true }
);

const CommentModel = model('CommentModel', CommentSchema);

export default CommentModel;
