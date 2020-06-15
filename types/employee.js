const graphql = require('graphql');
const gnx = require('@simtlix/gnx');
const Employee = require('../models/employee').Employee;
const Title = require('../models/title').Title;
const Salary = require('../models/salary').Salary;
const SexTypeEnum = require('./enums/sex.enum');
const {GraphQLString,GraphQLID, GraphQLObjectType, GraphQLList,GraphQLInt} = graphql;
const {GraphQLDate} = require('graphql-iso-date');
const {AuditableObjectFields} = require('./extended_types/auditableGraphQLObjectType');
const {CantRepeatDni, CantBeLessThanEighteen, CantDeleteEmployeeWithChildrens} = require('../validators/employee.validator');

const EmployeeType = new GraphQLObjectType({
    name: "EmployeeType",
    description: "Represent Employees",
    extensions:{
        validations: {
            'CREATE':[
                CantRepeatDni,
                CantBeLessThanEighteen,
            ],
            'UPDATE':[
                CantRepeatDni,
                CantBeLessThanEighteen,
            ],
            'DELETE':[
                CantDeleteEmployeeWithChildrens,
            ]
        },
    },
    fields: () => Object.assign(AuditableObjectFields,{
        id: {type: GraphQLID},
        birth_date:{type: GraphQLDate},
        dni: {type: GraphQLInt},
        first_name: {type:GraphQLString},
        last_name: {type:GraphQLString},
        gender: {type:SexTypeEnum},
        hire_date: {type:GraphQLDate},
        title:{
            type: new GraphQLList(TitleType),
            extensions:{
                relation:{
                    connectionField: 'empId'
                }
            },
            resolve(parent,args){
                return Title.find({'empId': parent.id});
            }
        },
        salary:{
            type: new GraphQLList(SalaryType),
            extensions:{
                relation:{
                    connectionField: 'empId'
                }
            },
            resolve(parent,args){
                return Salary.find({'empId': parent.id});
            }
        },
    }),
});

gnx.connect(Employee, EmployeeType, 'employee', 'employees');

module.exports = EmployeeType;

const TitleType = require('./title');
const SalaryType = require('./salary');