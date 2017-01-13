export const validate = values => {
  const errors = {};
  const requiredFields = [
    'name',
    'description',
    'posterLink',
    'productionDate',
    'actors',
    'director',
    'country'
  ];
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'Required'
    }
  });
  return errors;
};