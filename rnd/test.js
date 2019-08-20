console.log('test');

class liClass {
    constructor(textElement, elementId) {
        this.textElement = textElement;
        this.elementId = elementId;
    }

    appendLi() {
        var text = document.createTextNode(this.textElement);
        var item = document.createElement('li').appendChild(text);
        document.getElementById(this.elementId).appendChild(item);
    }
}

var whatever = new liClass('your text', 'my-field');
whatever.appendLi();
