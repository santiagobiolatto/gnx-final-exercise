const gnx = require("@simtlix/gnx");
const GNXError = gnx.GNXError;
const { Department } = require("../models/department");
const { Dept_employee } = require("../models/dept_employee");
const { Dept_manager } = require("../models/dept_manager");

const CantRepeatDeptName = {
  validate: async function (typeName, originalObject, materializedObject) {
    const DepartmentFinded = await Department.findOne({
      dept_name: materializedObject.dept_name,
    });

    if (DepartmentFinded && DepartmentFinded._id != materializedObject.id) {
      throw new CantUpdateOrCreateDepartmentWithSameNameError(typeName);
    }
  },
};
class CantUpdateOrCreateDepartmentWithSameNameError extends GNXError {
  constructor(typeName) {
    super(
      typeName,
      "Can't create or update Department, same name already exist",
      "CantUpdateOrCreateDepartmentWithSameNameError"
    );
  }
};

const CantDeleteDepartmentsWithChildrens = {
    validate: async function (typeName, originalObject, materializedObject) {
      const deptEmployeeFinded = await Dept_employee.findOne({ deptId: originalObject });
      const deptManagerFinded = await Dept_manager.findOne({ deptId: originalObject });
      if ( deptManagerFinded || deptEmployeeFinded) {
        throw new CantDeleteDepartmentWithChildrensError(typeName);
      }
    },
  };
  class CantDeleteDepartmentWithChildrensError extends GNXError {
    constructor(typeName) {
      super(
        typeName,
        "Department have dept_employee or dept_manager related",
        "CantDeleteDepartmentsWithChildrens"
      );
    }
  }

module.exports = { CantRepeatDeptName, CantDeleteDepartmentsWithChildrens};
