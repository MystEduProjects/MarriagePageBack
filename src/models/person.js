import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const personSchema = new Schema({
  name: String,
  attend: Boolean,
  availableEscort: Boolean,
  escort: String,
  menu: String,
  allergies: String
});

const Person = mongoose.model('Person', personSchema);

export default Person;
