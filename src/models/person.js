import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const personSchema = new Schema({
  name: String,
  attend: Boolean,
  menu: String,
  allergies: String,
  availableEscort: Boolean,
  wantsEscort: Boolean,
  escort: String,
  escortMenu: String,
  escortAllergies: String
});

const Person = mongoose.model('Person', personSchema);

export default Person;
