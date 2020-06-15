const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dept_managerFields = {
    from_date:Date,
    to_date:Date,
    deptId:Schema.Types.ObjectId,
    empId:Schema.Types.ObjectId
};
  
const dept_managerSchema = new Schema(dept_managerFields);
  
const Dept_manager = mongoose.model('Dept_manager', dept_managerSchema);
if (!Dept_manager.collection.collection) {
    Dept_manager.createCollection();
}
  
module.exports = {Dept_manager, dept_managerFields};