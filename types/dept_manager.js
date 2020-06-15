const graphql = require('graphql');
const gnx = require('@simtlix/gnx');
const {GraphQLID, GraphQLObjectType} = graphql;
const {GraphQLDate} = require('graphql-iso-date');
const {ToDateCantBeSmallerThanFromDate} = require('../validators/date.validator');

const Dept_manager = require('../models/dept_manager').Dept_manager;
const Employee = require('../models/employee').Employee;
const Department = require('../models/department').Department;

const Dept_managerType = new GraphQLObjectType({
    name: "Dept_managerType",
    description: "Represent Department Managers",
    extensions:{
        validations: {
            'CREATE':[
                ToDateCantBeSmallerThanFromDate,
            ],
            'UPDATE':[
                ToDateCantBeSmallerThanFromDate,
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

gnx.connect(Dept_manager, Dept_managerType, 'dept_manager', 'dept_managers');

module.exports = Dept_managerType;

const EmployeeType = require('./employee');
const DepartmentType = require('./department');