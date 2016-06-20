let StoreEvent = function (id, name, store, tags) {
  this.id = id;
  this.name = name;
  this.store = store;
  this.tags = typeof tags === 'undefined' ? [] : tags;
};

StoreEvent.prototype.toString = function () {
  return `${this.id}/${this.tags.join('/')}`;
};

StoreEvent.prototype.append = function () {
  return new StoreEvent(this.id, this.name, this.store, this.tags.concat(
    (arguments.length === 1 && Array.isArray(arguments[0])) ? arguments[0] : Array.from(arguments)
  ));
};

export default StoreEvent;