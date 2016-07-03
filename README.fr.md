# Code Generator

Ou "_Du code qui écrit du code_".

L'idée était de créer un générateur de code source simple (ici, en Javascript) qui pourrait supporter des styles d'indentation et de code différents.

Il en résulte un générateur de code généraliste, capable d'écrire dans n'importe quel langage de programmation.

## Utilisation

```javascript
// Créer un "coder"
var coder = Object.create(CsharpCoder);

// Adopter un convention de programmation
coder.generator = CsharpMicrosoftCodingStyles;

// Coder... sans plus se préoccuper de l'indentation ou de la présentation !
coder.namespace('App', function (coder) {
    coder.class('public', 'Program', function (coder) {
        coder.method('public static int', 'Main', function (coder) {
            coder.write('System.Console.WriteLine("Hello Code!");');
            coder.write('return 0;');
        });
    });
});
```

## Architecture proposée

Le but est de générer différentes strings à partir de la même séquence de génération en fonction de la convention de programmation choisie. Ainsi, on peut considérer **les conventions de programmation comme étant des "strategies"**.

![Générateur de code simple](http://aygix.free.fr/down.php?path=github/Odepax/code-generator/java-simple-example.png)

L'architecture utilise deux parties : un "_code generator_", entité de bas niveau, et un "_coder_", entité de haut niveau.

### Code Generator

Le "code generator" est un objet basique qui écrit du code dans une string.

Son rôle se ramène à **s'occuper de la convention de programmation**. Il doit être au courant de la syntaxe du langage utilisé (`{` pour le C, `:` pour le Python), il doit être hérité et personnalisé pour correspondre au mieux au langage généré.

À un langage, peuvent correspondre plusieurs conventions de programmation, ce qui induit le besoin de créer un "code generator" pour chaque convention de programmation.

Concrètement, un "code generator" doit fournir des fonctions du type `openClassBrace`, `closeClassBrace`, `openMethodParenthesis`, `closeMethodParenthesis`, `openMethodBrace`, etc... `La personnalisation de la convention de programmation passe par la redifinition de ces fonctions.

Si vous ne comprenez toujours pas, voici un exemple d'algorithme pour la fonction `openClassBrace` :

```
Écrire " {" sur la ligne courante
Sauter une ligne
Indenter
```

Et pour `closeClassBrace`:

```
Déindenter
Suter un line
Écrire "}" sur une nouvelle ligne
```

Ces deux exemples pourront générer ce genre de code :

```java
class Foo {

    // Content...

}
```

### Coder

Un "coder" est fait pour coder dans au moins un langage et **ne devrait pas être modifié** à moins que le langage lui-même ne change.

![Code generator comme strategies avec C#](http://aygix.free.fr/down.php?path=github/Odepax/code-generator/cs-strategies-example.png)

Le "coder" utilise un générateur comme une convention de codage, ce qui permet au "coder" d'avoir une vision plus haut niveau sur le langage qu'il pratique.

Concrètement, un "coder" doit fournir des fonctions du genre `if`, `else`, `while`, `method`, `attribute`, etc... le "code generator" faisant abstraction de la convention de codage.

Voici un exemple d'algorithme pour la fonction `if` :

```
Écrire "if"
Ouvrir la parenthèse   (fonction dans le générateur)
Écrire la condition    (passé en paramètre)
Fermer la parenthèse   (fonction dans le générateur)
Ouvrir l'accolade      (fonction dans le générateur)
Écrire le bloc de code (passé en paramètre)
Fermer l'accolade      (fonction dans le générateur)
```

Cet algorithme, complexe au premier abord, permet de changer complètement le format du code généré rien qu'en changeant de "code generator" !

De plus, l'utilisation d'un "coder" est d'autant plus simple qu'elle se rapproche de la programmation dans le langage généré :

```javascript
coder.if('foo == 0', function (coder) {
    coder.write('Doge.wow();');
    coder.while('!(amaze)', function (coder) {
        coder.write('++stopPlz;');
    });
});
```

Même si c'est le "coder" qui dépend du générateur, ils vont généralement de paire.
