const gnx = require("@simtlix/gnx");
const GNXError = gnx.GNXError;
const { Dept_employee } = require("../models/dept_employee");

const CantBeTwoEmployeeInTheSameDeptAtTheSameTime = {
  validate: async function (typeName, originalObject, materializedObject) {
    const DepartmentWithEmployeeFinded = await Dept_employee.findOne({
      deptId: materializedObject.deptId,
    });

    if(materializedObject.from_date>DepartmentWithEmployeeFinded.from_date && materializedObject.to_date<DepartmentWithEmployeeFinded.to_date ||
        materializedObject.from_date<DepartmentWithEmployeeFinded.from_date && materializedObject.to_date>DepartmentWithEmployeeFinded.from_date ||
        materializedObject.from_date>DepartmentWithEmployeeFinded.from_date && materializedObject.from_date<DepartmentWithEmployeeFinded.to_date
        ){
            throw new CantUpdateOrCreateDepartmentWithTwoEmployeeAtTheSameTimeError(typeName);
    }
  },
};
class CantUpdateOrCreateDepartmentWithTwoEmployeeAtTheSameTimeError extends GNXError {
  constructor(typeName) {
    super(
      typeName,
      "Can't create or update deptEmployee, there's other employee in the same lapse of time",
      "CantUpdateOrCreateDepartmentWithTwoEmployeeAtTheSameTimeError"
    );
  }
}

module.exports = { CantBeTwoEmployeeInTheSameDeptAtTheSameTime };
