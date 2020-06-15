const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const titleFields = {
    title:String,
    from_date:Date,
    to_date:Date,
    empId: Schema.Types.ObjectId
};
  
const titleSchema = new Schema(titleFields);
  
const Title = mongoose.model('Title', titleSchema);
if (!Title.collection.collection) {
    Title.createCollection();
}
  
module.exports = {Title, titleFields};