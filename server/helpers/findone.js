import data from '../data/data';

const getById = (id) => {
  const getOne = data.entries.find((e) => e.id == id);
  return getOne;
};
export default getById;
