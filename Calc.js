/*
 * 
 * 
 * 
 */

"use strict";

var ee = new EventEmitter();

var _Symbol = {
	_div_ : "div"
	, _APP_ : 'App'  
	, _main_ : "main"
	, _span_ : "span"
	, _button_ : "button"
	, _BUTTON_ :  "Button"
	, _section_ : "section"
	, _title_ : "title"
	, _long_text_ : "long-text"
	, _REACT_CALCULATOR : "react-calculator"
	
	, _TOGGLE_MEMORIES_ :  "toggle-memories"
	
	, _FIELD_RESULT_ : "field-result"
	
	, _CONTENTEDITABLE_ : "ContentEditable"
	, _INPUTFIELD_ : "InputField"
	, _KEYSNUMBERS_ : "KeysNumbers"
	, _TOTALRECALL_ : "TotalRecall"
	, _KEYSOPERATORS_ : "KeysOperators"
	, _KEYSFUNCTIONS_ : "KeysFunctions"
	, _KEYS_OPERATORS_ : "keys-operators"
	, _KEYS_FUNCTIONS_ : "keys--functions"
	, _KEYS_NUMBERS_ : "keys--numbers"
};

var App = React.createClass({
  displayName: _Symbol._APP_,
  render: function render() {
    return React.createElement(
      _Symbol._main_,
      { className: _Symbol._REACT_CALCULATOR },
      React.createElement(InputField, null),
      React.createElement(TotalRecall, null),
      React.createElement(KeysNumbers, null),
      React.createElement(KeysFunctions, null),
      React.createElement(KeysOperators, null)
    );
  }
});
var Button = React.createClass({
  displayName: _Symbol._BUTTON_,
  _handleClick: function _handleClick() {
    var text = this.props.text;
    var cb = this.props.clickHandler;

    if (cb) 
    	{
      	cb.call(null, text);
    	}
  },
  render: function render() {
    return React.createElement(
      _Symbol._button_,
      { className: this.props.klass, onClick: this._handleClick },
      React.createElement(
        _Symbol._span_,
        { className: _Symbol._title_ },
        this.props.text
      )
    );
  }
});

var ContentEditable = React.createClass({
  displayName: _Symbol._CONTENTEDITABLE_,
  _handleClick: function _handleClick() 
				  {
				    var cb = this.props.clickHandler;
				
				    if (cb) 
				    	{
				      	cb.call(this);
				    	}
				  },
  render: function render() 
		  {
		    return React.createElement(_Symbol._div_,
		      { className: _Symbol._FIELD_RESULT_, contentEditable: this.props.initEdit, spellcheck: this.props.spellCheck, onClick: this._handleClick },
		      this.props.text
		    );
		  }
});

var InputField = React.createClass({
  displayName: _Symbol._INPUTFIELD_,
  _updateField: function _updateField(newStr) 
				  {
				    newStr = newStr.split ? newStr.split(' ').reverse().join(' ') : newStr;
				    return this.setState({ text: newStr });
				  },
  getInitialState: function getInitialState() 
				  {
				    this.props.text = this.props.text || '0';
				
				    return { text: this.props.text };
				  },
  componentWillMount: function componentWillMount() 
					  {
					    ee.addListener('numberCruncher', this._updateField);
					  },
  render: function render() 
		  {
		    return React.createElement(ContentEditable, { text: this.state.text, initEdit: "false", spellcheck: "false", clickHandler: this._clickBait });
		  }
});

var TotalRecall = React.createClass({
  displayName: _Symbol._TOTALRECALL_,
  _toggleMemories: function _toggleMemories() 
					  {
					    this.setState({ show: !this.state.show });
					  },
  _recallMemory: function _recallMemory(memory) 
				  {
				    store.newInput = memory;
				    ee.emitEvent(_Symbol._TOGGLE_MEMORIES_);
				  },
  getInitialState: function getInitialState() 
					  {
					    return { show: false };
					  },
  componentWillMount: function componentWillMount() 
					  {
					    ee.addListener(_Symbol._TOGGLE_MEMORIES_, this._toggleMemories);
					  },
  render: function render() 
		  {
		    var _this = this;
		    var classNames = "paper-tape"+" " + (this.state.show ? 'visible' : '');
		
		    return React.createElement(
		      _Symbol._section_,
		      { className: classNames },
		      React.createElement(Button, { text: "+", clickHandler: this._toggleMemories, klass: "toggle-close" }),
		      store.curMemories.map(function (mem) 
								      {
								        return React.createElement(Button, { klass: "block memory transparent", text: mem, clickHandler: _this._recallMemory });
								      }
								   )
		    );
		  }
});

var KeysFunctions = React.createClass({
  displayName: _Symbol._KEYSFUNCTIONS_,
  _showMemoryBank: function _showMemoryBank() 
	  {
	    ee.emitEvent(_Symbol._TOGGLE_MEMORIES_);
	  },
  _clear: function _clear() 
	  {
	    store.newInput = 0;
	  },
  _contentClear: function _contentClear() 
				  {
				    var curInput = String(store.curInput);
				    var lessOne = curInput.substring(0, curInput.length - 1);
				
				    return store.newInput = lessOne === '' ? 0 : lessOne;
				  },
  render: function render() 
		  {
		    return React.createElement(
		      _Symbol._section_,
		      { className: _Symbol._KEYS_FUNCTIONS_ },
		      React.createElement(Button, { klass: _Symbol._long_text_, text: "recall", clickHandler: this._showMemoryBank }),
		      React.createElement(Button, { klass: _Symbol._long_text_, text: "clear", clickHandler: this._clear }),
		      React.createElement(Button, { text: "(del)", clickHandler: this._contentClear })
		    );
		  }
});
var KeysOperators = React.createClass({
  displayName: _Symbol._KEYSOPERATORS_,
  _eq: function _eq(type) 
		  {
		    store.newInput = store.curInput + " " + type + " ";
		  },
  _equate: function _equate() 
			  {
			    store.newInput = eval(store.curInput);
			  },
  render: function render() 
			  {
			    return React.createElement(
			      _Symbol._section_,
			      { className: _Symbol._KEYS_OPERATORS_ },
			      React.createElement(Button, { text: "+", clickHandler: this._eq }),
			      React.createElement(Button, { text: "-", clickHandler: this._eq }),
			      React.createElement(Button, { text: "*", clickHandler: this._eq }),
			      React.createElement(Button, { text: "/", clickHandler: this._eq }),
			      React.createElement(Button, { text: "=", clickHandler: this._equate })
			    );
			  }
});
var KeysNumbers = React.createClass({
  displayName: _Symbol._KEYSNUMBERS_,
  _number: function _number(num) 
		  {
		    if (!store.curInput) 
		    	{
		      	return store.newInput = num;
		    	}
		
		    return store.newInput = "" + store.curInput + num;
		  },
  render: function render() 
		  {
		    return React.createElement(
		      _Symbol._section_,
		      { className: _Symbol._KEYS_NUMBERS_ },
		      React.createElement(Button, { text: "1", clickHandler: this._number }),
		      React.createElement(Button, { text: "2", clickHandler: this._number }),
		      React.createElement(Button, { text: "3", clickHandler: this._number }),
		      React.createElement(Button, { text: "4", clickHandler: this._number }),
		      React.createElement(Button, { text: "5", clickHandler: this._number }),
		      React.createElement(Button, { text: "6", clickHandler: this._number }),
		      React.createElement(Button, { text: "7", clickHandler: this._number }),
		      React.createElement(Button, { text: "8", clickHandler: this._number }),
		      React.createElement(Button, { text: "9", clickHandler: this._number }),
		      React.createElement(Button, { text: "0", clickHandler: this._number })
		    );
		  }
});

var store = {
  input: 0,
  memory: [],
  get curInput() 
	  {
	    return this.input;
	  },

  get curMemories() 
	  {
	    return this.memory.filter(function (m) 
								    {
								      return m !== undefined;
								    }
								  );
	  },

  set commitMemory(input) 
	  {
	    this.memory.push(input);
	  },

  set newInput(str) 
	  {
	    var curInput = str;
	    var oldInput = this.curInput;
	
	    if (this.curMemories.indexOf(oldInput) === -1) 
	    	{
	      	this.commitMemory = oldInput;
	    	}
	
	    this.input = curInput;
	    ee.emitEvent('numberCruncher', [this.curInput]);
	  }
};

React.render(React.createElement(App, null), document.querySelector('body'));

// ----------------------------------------------------------------