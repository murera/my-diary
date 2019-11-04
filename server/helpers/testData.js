// import helper from '../middleware/helper';
import generateAuthToken from  '../helpers/tokenEncoder';
const testData = [
  {
    firstName: 'Manzi',
			lastName: 'miguel',
			email: 'miguel@gmail.com',
			password: 'Aa!12345'
  },
  {
    firstName: '',
			lastName: '',
			email: '',
			password: ''
  },
  {
    password: 'Aa!12345',
		firstName: 'amani',
		lastName: 'murera',
		email: 'amani@proentry.com'
  },
  {
    password: 'Aa!12345',
		firstName: 'amani',
		lastName: 'murera',
		email: 'amani@proentry.com'
  },
  {
    
      password: 'Aa!12345',
      firstName: 'amani',
      lastName: 'murera',
      email: 'amani@gmail.com',
    
  },
  {
    email: 'amani@gmail.com',
    password: 'Aa!12345'
  },
{
  
    password: 'Aa!12345',
  
},
{
  email: 'amani@gmail.com',

},
{
  email: 'amani@gmail.com',
  password: 'a!12345',
},
{
  email: 'rosine@prolite.com',
  password: 'Aa!12345',
},
{
  firstName: '',
	lastName: 'miguel',
	email: 'miguel@gmail.com',
	password: 'Aa!12345'
},
{
  firstName: 'Nyagatare',
  lastName: 'James',
  email: 'nyatare@gmail.com',
  password: 'Aa!12345',
},
{
  firstName: 'umuhoza',
  lastName: 'rosine',
  email: 'rosine@gmail.com',
  password: 'Aa!12345',
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
  title: 10,
  description: 50,
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
const unExistedToken = generateAuthToken( 0, 'amani@gmail.com');


export { testData, invalidToken, unExistedToken};
