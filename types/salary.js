const graphql = require('graphql');
const gnx = require('@simtlix/gnx');
const {GraphQLID, GraphQLObjectType,GraphQLInt} = graphql;
const {GraphQLDate} = require('graphql-iso-date');
const {ToDateCantBeSmallerThanFromDate} = require('../validators/date.validator');

const Salary = require('../models/salary').Salary;
const Employee = require('../models/employee').Employee;

const SalaryType = new GraphQLObjectType({
    name: "SalaryType",
    description: "Represent Salaries",
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
        salary:{type:GraphQLInt},
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
        }
    }),
});

gnx.connect(Salary, SalaryType, 'salary', 'salaries');

module.exports = SalaryType;

const EmployeeType = require('./employee');