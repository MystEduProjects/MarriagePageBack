import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const giftSchema = new Schema({
  name: String,
  price: Number,
  img: String,
  labels: [String]
});

const Gift = mongoose.model('Gift', giftSchema);

export default Gift;
