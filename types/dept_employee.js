const graphql = require('graphql');
const gnx = require('@simtlix/gnx');
const {GraphQLID, GraphQLObjectType} = graphql;
const {GraphQLDate} = require('graphql-iso-date');
const {ToDateCantBeSmallerThanFromDate} = require('../validators/date.validator');
const {CantBeTwoEmployeeInTheSameDeptAtTheSameTime} = require('../validators/dept_employee.validator');

const Dept_employee = require('../models/dept_employee').Dept_employee;
const Employee = require('../models/employee').Employee;
const Department = require('../models/department').Department;

const Dept_employeeType = new GraphQLObjectType({
    name: "Dept_employeeType",
    description: "Represent Department Employees",
    extensions:{
        validations: {
            'CREATE':[
                ToDateCantBeSmallerThanFromDate,
                CantBeTwoEmployeeInTheSameDeptAtTheSameTime,
            ],
            'UPDATE':[
                ToDateCantBeSmallerThanFromDate,
                CantBeTwoEmployeeInTheSameDeptAtTheSameTime,
            ],
            'DELETE':[

            ]
        },
    },
    fields: () =>({
        id:{type:GraphQLID},
        from_date:{type:GraphQLDate},
        to_date:{type:GraphQLDate},
        employee:{
            type: EmployeeType,
            extensions:{
                relation:{
                    connectionField: 'empId'
                }
            },
            resolve(parent,args){
                return Employee.findById(parent.empId);
            }
        },
        department:{
            type: DepartmentType,
            extensions:{
                relation:{
                    connectionField: 'deptId'
                }
            },
            resolve(parent,args){
                return Department.findById(parent.deptId);
            }
        }
    }),
});

gnx.connect(Dept_employee, Dept_employeeType, 'dept_employee', 'dept_employees');

module.exports = Dept_employeeType;

const EmployeeType = require('./employee');
const DepartmentType = require('./department');