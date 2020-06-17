const gnx = require("@simtlix/gnx");
const GNXError = gnx.GNXError;
const { Dept_manager } = require("../models/dept_manager");

const CantBeTwoManagerInTheSameDeptAtTheSameTime = {
  validate: async function (typeName, originalObject, materializedObject) {
    const DepartmentWithManagerFinded = await Dept_manager.findOne({
      deptId: materializedObject.deptId,
    });

    if(materializedObject.from_date>DepartmentWithManagerFinded.from_date && materializedObject.to_date<DepartmentWithManagerFinded.to_date ||
        materializedObject.from_date<DepartmentWithManagerFinded.from_date && materializedObject.to_date>DepartmentWithManagerFinded.from_date ||
        materializedObject.from_date>DepartmentWithManagerFinded.from_date && materializedObject.from_date<DepartmentWithManagerFinded.to_date
        ){
            throw new CantUpdateOrCreateDepartmentWithTwoManagerAtTheSameTimeError(typeName);
    }
  },
};
class CantUpdateOrCreateDepartmentWithTwoManagerAtTheSameTimeError extends GNXError {
  constructor(typeName) {
    super(
      typeName,
      "Can't create or update deptManager, there's other manager in the same lapse of time",
      "CantUpdateOrCreateDepartmentWithTwoManagerAtTheSameTimeError"
    );
  }
}

module.exports = { CantBeTwoManagerInTheSameDeptAtTheSameTime };
