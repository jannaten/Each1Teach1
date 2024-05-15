function toJSON(instance) {
  if (instance._id) {
    instance.id = instance._id.toString();
    delete instance._id;
  }
  delete instance.__v;
}

module.exports = { toJSON };
