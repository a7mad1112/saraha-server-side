const validation = (schema) => {
  return (req, res, next) => {
    const validationResult = schema.validate(req.body, { abortEarly: false })
    if (validationResult.error)
      return res.status(400).json(validationResult.error?.details)
    next();
  }
}

export default validation;