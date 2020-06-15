const graphql = require('graphql');
const gnx = require('@simtlix/gnx');
const Department = require('../models/department').Department;
const {GraphQLString,GraphQLID, GraphQLObjectType} = graphql;
const {CantRepeatDeptName, CantDeleteDepartmentsWithChildrens} = require('../validators/department.validator');

const DepartmentType = new GraphQLObjectType({
    name: "DepartmentType",
    description: "Represent Departments",
    extensions:{
        validations: {
            'CREATE':[
                CantRepeatDeptName,
            ],
            'UPDATE':[
                CantRepeatDeptName,
            ],
            'DELETE':[
                CantDeleteDepartmentsWithChildrens
            ]
        },
    },
    fields: () =>({
        id:{type:GraphQLID},
        dept_name:{type:GraphQLString}
    }),
});

gnx.connect(Department, DepartmentType, 'department', 'departments');

module.exports = DepartmentType;