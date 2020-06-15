const gnx = require("@simtlix/gnx");
const GNXError = gnx.GNXError;
const { Salary } = require("../models/salary");

const ToDateCantBeSmallerThanFromDate = {
  validate: async function (typeName, originalObject, materializedObject) {
    if (materializedObject.from_date.getTime() > materializedObject.to_date.getTime()) {//Get time convierte la fecha a milisegundos
      throw new CantUpdateOrCreateEmployeeWithToDateSmallerThanFromDate(typeName);
    }
  },
};

class CantUpdateOrCreateEmployeeWithToDateSmallerThanFromDate extends GNXError {
  constructor(typeName) {
    super(
      typeName,
      "To Date can't be smaller than From Date",
      `CantUpdateOrCreate${typeName}WithToDateSmallerThanFromDate`
    );
  }
}

module.exports = { ToDateCantBeSmallerThanFromDate };
