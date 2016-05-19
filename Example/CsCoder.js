var CsCoder = {

	codingStyle: null,

	write: function(text) {
		this.codingStyle.write(text);
	},

	indent: function() {
		this.codingStyle.indent();
	},

	unindent: function() {
		this.codingStyle.unindent();
	},

	namespace: function(name, callback) {
		this.write('namespace ' + name);
		this.codingStyle.openBrace();
		callback(this);
		this.codingStyle.closeBrace();
	},

	class: function(mod, name, callback) {
		this.write(mod + ' class ' + name);
		this.codingStyle.openBrace();
		callback(this);
		this.codingStyle.closeBrace();
	},

	method: function(mod, name, callback) {
		this.write(mod + ' ' + name);
		this.codingStyle.openBrace();
		callback(this);
		this.codingStyle.closeBrace();
	},

	if: function(cond, callback) {
		this.write('if(' + cond + ')');
		this.codingStyle.openBrace();
		callback(this);
		this.codingStyle.closeBrace();
	},

	else: function(callback) {
		this.write('else');
		this.codingStyle.openBrace();
		callback(this);
		this.codingStyle.closeBrace();
	}

};

Object.defineProperty(CsCoder, 'generatedCode', {
	get: function() {
		return this.codingStyle.generatedCode.substr(1);
	}
});
