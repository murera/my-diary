import helper from '../middleware/helper';

const testData = [
  {
    firstName: 'Nyagatare',
    lastName: 'Jameson',
    email: 'nyagatare@gmail.com',
    password: 'Aa!12345',
  },
  {
    password: 'Aa!12345',
    firstName: 'amani',
    lastName: 'murera',
    email: 'amani@proentry.com',
  },
  {
    password: 'Aa!12345',
    firstName: 'amani',
    lastName: 'murera',
    email: 'amani@proentry.com',
  },
  {
    password: 'Aa!12345',
    firstName: 'amani',
    lastName: 'murera',
    email: 'amani@gmail.com',
  },
  {
    email: 'amani@gmail.com',
    password: 'Aa!12345',
  },
  {
    password: 'Aa!12345',
  },
  {
    email: 'bahatiroben@gmail.com',

  },
  {
    email: 'bahati@prolite.com',
    password: 'a!12345',
  },
  {
    email: 'robben@prolite.com',
    password: 'Aa!12345',
  },
  {
    firstName: 'Nyagatare',
    lastName: 'James',
    email: 'nyatare@gmail.com',
    password: 'Aa!12345',
  },
  {
    firstName: 'Nyagatare',
    lastName: 'James',
    email: 'kigali@gmail.com',
    password: 'Aa!123454',
  },
  {
    title: 'a brand new entry',
    description: 'my firt entry',
  },
  {

    description: 'my firt entry',

  },
  {
    title: 'a brand new entry',


  },
  {



  },
  {
    title: 'visiting friend',

    description: 'it was a long time',

  },
  {
    title: 'an edited title',

    description: 'edited description',

  },

];

let invalidToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJODg4OTk5OUB';
const unExistedToken = helper.getToken({ 
id: 0, firstName: 'amani', lastName: 'murera', email: 'amani@gmail.com' 
});
export { testData, invalidToken, unExistedToken };
