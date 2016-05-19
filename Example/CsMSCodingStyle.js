var CsMSCodingStyle = Object.create(CodeGenerator, {
	
	indentString: { value: '    ' },

	openBrace: { value: function(){
		this.write('{');
		this.indent();
	} },

	closeBrace: { value: function(){
		this.unindent();
		this.write('}');
	} }

});
