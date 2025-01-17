const isArray = require('lodash/isArray')
const isString = require('lodash/isString')
const pull = require('lodash/pull')

var id = 0

class Node {
  constructor(data) {
    this.id = ++id
    if (isArray(data)) {
      this.open = data[0]
      this.close = data[1]
    } else if (isString(data)) {
      this.text = data
    }
    this.children = []
  }

  append(e) {
    if (!(e instanceof Node)) {
      e = new Node(e)
    }
    if (e._parent) {
      pull(e._parent.children, e)
    }
    e._parent = this
    this.children = this.children.concat(e)
    return this;
  }

  render() {
    let res = this.draw();
    return res.text;
  }

  draw(range) {
    var text = '';
    if (this.open) {
      text += this.open;
    }
    if (range) range.process (this.openMap || this.open);
    if (this.text) {
      text += this.text;
      if (range) range.process(this.textMap || this.text);
    }
    for (var i = 0; i < this.children.length; i++) {
      let child = this.children[i].draw(range);
      text += child.text;
    }
    if (this.close) {
      text += this.close;
      if (range) range.process(this.closeMap || this.close);
    }
    return {text, range};
  }

  parent() {
    return this._parent
  }
}

module.exports = Node
