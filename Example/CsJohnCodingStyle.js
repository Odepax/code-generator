var CsJohnCodingStyle = Object.create(CodeGenerator, {
	
	indentString: { value: '  ' },

	openBrace: { value: function(){
		this.write(' {', false);
		this.indent();
	} },

	closeBrace: { value: function(){
		this.unindent();
		this.write('}');
	} }

});
