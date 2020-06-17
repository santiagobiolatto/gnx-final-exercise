const gnx = require("@simtlix/gnx");
const GNXError = gnx.GNXError;
const { Employee } = require("../models/employee");
const { Title } = require("../models/title");
const { Salary } = require("../models/salary");
const { Dept_manager } = require("../models/dept_manager");
const { Dept_employee } = require("../models/dept_employee");

const CantRepeatDni = {
  validate: async function (typeName, originalObject, materializedObject) {
    const EmployeeFinded = await Employee.findOne({
      dni: materializedObject.dni,
    });

    if (EmployeeFinded && EmployeeFinded._id != materializedObject.id) {
      throw new CantUpdateOrCreateEmployeeWithSameDniError(typeName);
    }
  },
};
class CantUpdateOrCreateEmployeeWithSameDniError extends GNXError {
  constructor(typeName) {
    super(
      typeName,
      "DNI cant be repeated",
      "Can'tUpdateOrCreateEmployeeWithSameDniError"
    );
  }
}

const CantBeLessThanEighteen = {
  validate: async function (typeName, originalObject, materializedObject) {
    console.log(originalObject.birth_date);
    const birthDate =  materializedObject.birth_date;
    calculateAge = (birthDate) => {
      let now = new Date();
      let currentYear = now.getFullYear();
      let tempBirthDate = new Date(birthDate);  //Esto es una poronga
      let birthYear = tempBirthDate.getFullYear();
      let age = currentYear - birthYear; 
      if (now < new Date(tempBirthDate.setFullYear(currentYear))) {
        age = age - 1;
      }
      return age;
    };
    if (calculateAge(birthDate) < 18) {
      throw new CantUpdateOrCreateEmployeeWithAgeLessThan18(typeName);
    }
  },
};

class CantUpdateOrCreateEmployeeWithAgeLessThan18 extends GNXError {
  constructor(typeName) {
    super(
      typeName,
      "Age cant be less than 18",
      "Can'tUpdateOrCreateEmployeeWithAgeLessThan18"
    );
  }
}

const CantDeleteEmployeeWithChildrens = {
  validate: async function (typeName, originalObject, materializedObject) {
    const titleFinded = await Title.findOne({ empId: originalObject });
    const salaryFinded = await Salary.findOne({ empId: originalObject });
    const deptEmployeeFinded = await Dept_employee.findOne({ empId: originalObject });
    const deptManagerFinded = await Dept_manager.findOne({ empId: originalObject });
    if ( titleFinded || salaryFinded ||deptManagerFinded || deptEmployeeFinded) {
      throw new CantDeleteEmployeeWithChildrensError(typeName);
    }
  },
};
class CantDeleteEmployeeWithChildrensError extends GNXError {
  constructor(typeName) {
    super(
      typeName,
      "Employee have title, salary, dept_employee or dept_manager related",
      "CantDeleteEmployeeWithChildrens"
    );
  }
}

module.exports = { CantRepeatDni, CantBeLessThanEighteen, CantDeleteEmployeeWithChildrens };
