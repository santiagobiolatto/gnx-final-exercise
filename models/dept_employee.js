const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dept_employeeFields = {
    from_date:Date,
    to_date:Date,
    deptId:Schema.Types.ObjectId,
    empId:Schema.Types.ObjectId
};
  
const dept_employeeSchema = new Schema(dept_employeeFields);
  
const Dept_employee = mongoose.model('Dept_employee', dept_employeeSchema);
if (!Dept_employee.collection.collection) {
    Dept_employee.createCollection();
}
  
module.exports = {Dept_employee, dept_employeeFields};