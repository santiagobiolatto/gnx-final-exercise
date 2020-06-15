const graphql = require('graphql');
const gnx = require('@simtlix/gnx');
const Title = require('../models/title').Title;
const Employee = require('../models/employee').Employee;
const {GraphQLString,GraphQLID, GraphQLObjectType} = graphql;
const {GraphQLDate} = require('graphql-iso-date');
const {ToDateCantBeSmallerThanFromDate} = require('../validators/date.validator');

const TitleType = new GraphQLObjectType({
    name: "TitleType",
    description: "Represent titles",
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
        title:{type:GraphQLString},
        from_date:{type:GraphQLDate},
        to_date:{type:GraphQLDate},
        employee:{
            type:EmployeeType,
            extensions:{
                relation: {
                    connectionField: 'empId'
                },
            },
            resolve(parent, args){
                return Employee.findById(parent.empId);
            }
        }
    }),
});

gnx.connect(Title, TitleType, 'title', 'titles');

module.exports = TitleType;

const EmployeeType = require('./employee');