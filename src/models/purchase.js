import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const objectSchema = new Schema({
  gift: { type: mongoose.Schema.Types.ObjectId, ref: 'Gift' },
  quantity: Number
});

const purchaseSchema = new Schema({
  personName: String,
  objects: [objectSchema],
  message: String,
  paymentMethod: String,
  totalPayment: Number
});

const Purchase = mongoose.model('Purchase', purchaseSchema);

export default Purchase;
