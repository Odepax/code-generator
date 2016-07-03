# Code Generator

Or "_Code that writes code_".

The idea was to create a simple source code generator (here, with Javascript) which could support different indentation & coding styles.

The result is a general purpose code generator, that can generate code in any programming language.

## Usage

```javascript
// Create a coder
var coder = Object.create(CsharpCoder);

// Adopt a coding style
coder.generator = CsharpMicrosoftCodingStyles;

// Start coding, without worrying about output format
coder.namespace('App', function (coder) {
    coder.class('public', 'Program', function (coder) {
        coder.method('public static int', 'Main', function (coder) {
            coder.write('System.Console.WriteLine("Hello Code!");');
            coder.write('return 0;');
        });
    });
});
```

## Proposed Architecture

The ultimate goal is to be able to generate different strings from the same generation sequence, depending on defined coding style. So we can consider **coding styles as strategies**.

![Simple example of code generator](http://aygix.free.fr/down.php?path=github/Odepax/code-generator/java-simple-example.png)

The architecture is divided into two parts: a low level _code generator_ and a higher level _coder_.

### Code Generator

This is a stupid object which writes the code into a string.

The job of a code generator is to **handle coding style**. It has to be aware of the language syntax (C's `{` or Python's `:`) and possibilities, so it needs to be extended and customized to match the language we want to generate sources of.

Several coding styles can correspond to a single language (spaces/tabs indentation), so each coding style corresponds to a code generator.

Concretely, a code generator will define functions such as `openClassBrace`, `closeClassBrace`, `openMethodParenthesis`, `closeMethodParenthesis`, `openMethodBrace`, etc... Each of them can be overridden to customize the coding style.

Here is an example of an algorithm for `openClassBrace` function:

```
Write " {" on the same line as before
Jump line
Indent
```

And here is for `closeClassBrace`:

```
Unindent
Jump line
Write "}" on a new line
```

These two examples will generate a code which looks like this:

```java
class Foo {

    // Content...

}
```

### Coder

A coder is designed to code in at least one language and **should not change** unless the language it's been designed for changes.

![Code generator Strategies example with C#](http://aygix.free.fr/down.php?path=github/Odepax/code-generator/cs-strategies-example.png)

A coder uses a code generator as coding style strategy. It allows the coder to have a higher level vision of the language it's coding with.

Concretely, a coder will define functions such as `if`, `else`, `while`, `method`, `attribute`, etc... They will use the low level code generator, which now provides an abstraction of coding style.

Here is an example of an algorithm for a coder's `if` function:

```
Write "if"
Open parenthesis    (code generator's method)
Write the predicate (the predicate is given as parameter)
Close parenthesis   (code generator's method)
Open brace          (code generator's method)
Write code          (code as parameter)
Close brace         (code generator's method)
```

This algorithm seems to be horribly complex, however you just have to change the code generator to adopt a different coding style, and generate a new output format!

Furthermore, using a coder is easy because the sequence now looks like the code it will generate:

```javascript
coder.if('foo == 0', function (coder) {
    coder.write('Doge.wow();');
    coder.while('!(amaze)', function (coder) {
        coder.write('++stopPlz;');
    });
});
```

Even the coder depends on the generator, they have been designed to work together.
