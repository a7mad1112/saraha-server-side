const dataMethods = ['body', 'query', 'params', 'headers']
const validation = (schema) => {
  return (req, res, next) => {
    const validationArray = []
    dataMethods.forEach(key => {
      if (schema[key]) {
        const validationResult = schema[key].validate(req[key], { abortEarly: false });
        if (validationResult.error)
          validationArray.push(validationResult.error?.details)
      }
    })
    if (validationArray.length)
      return res.json({ msg: "validation error", validationArray })
    next();
  }
}

export default validation;