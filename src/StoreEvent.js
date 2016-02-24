let StoreEvent = function (id, name, store) {
  this.id = id;
  this.name = name;
  this.store = store;
};

StoreEvent.prototype.toString = function () {
  return this.id.toString();
};

StoreEvent.prototype.append = function () {
  return new StoreEvent(`${this.id}/${Array.from(arguments).join('/')}`, this.name, this.store);
};

export default StoreEvent;