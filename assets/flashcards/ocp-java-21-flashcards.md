# OCP Java SE 21 Flashcards

Paraphrased study cards based on the full chapter content of the OCP Java SE 21 Developer study guide. The cards emphasize rules, edge cases, common exam traps, and facts worth memorizing.

## Chapter 1 - Building Blocks

| # | Front | Back | Exam trap |
|---:|---|---|---|
| 1 | What is the canonical command-line entry point? | `public static void main(String[] args)`; `String... args` is also valid. | The parameter name is arbitrary, but the parameter type, `public`, `static`, and `void` matter. |
| 2 | In what order do package, import, and type declarations appear? | Optional `package`, then optional `import` declarations, then the type declaration. | A package or import after a type declaration does not compile. |
| 3 | What does a wildcard import include? | Types directly in that package. | It does not include subpackages, and `import a.*` does not import child package `a.b`. |
| 4 | How are conflicting imports resolved? | A single-type import takes precedence over a wildcard import. Two conflicting single-type imports fail. | `java.lang.*` is automatic, but its simple names can still conflict with explicit imports. |
| 5 | How do you recognize a constructor? | It has the same name as its class and no return type. | A declaration with `void` is a method, not a constructor. |
| 6 | Which variables receive default values? | Instance and static fields do; local variables do not. | A local variable must be definitely assigned before use, even if its type has a field default. |
| 7 | What are common field defaults? | Numeric: zero; `boolean`: `false`; `char`: `\u0000`; reference: `null`. | `float` defaults to `0.0f`, not an untyped integer conceptually. |
| 8 | What makes an identifier legal? | It may use letters, digits, currency symbols, and `_`, but cannot start with a digit or be a reserved word. | A single underscore `_` is forbidden. Java is case-sensitive, so `Public` is legal. |
| 9 | Where may underscores appear in numeric literals? | Between digits, including repeated underscores. | Not at the start/end, beside a decimal point, or directly beside a numeric prefix/suffix. |
| 10 | What are the rules for `var`? | Local variable only, initialized in the same declaration; inferred type is fixed. | No field, method parameter, return type, untyped `null`, compound declaration, or missing initializer. |
| 11 | Can a `var` variable later hold another type? | No. It may receive another value compatible with its inferred compile-time type. | `var` is not dynamic typing. |
| 12 | How does a text block begin? | Opening `"""` followed by a required line terminator; content starts on the next line. | Content cannot begin on the same line as the opening delimiter. |
| 13 | What controls incidental indentation in a text block? | Java removes common incidental indentation based on the least-indented content/closing delimiter. | Moving the closing delimiter changes the resulting spaces. |
| 14 | When is an object eligible for garbage collection? | When no reachable reference chain points to it. | Setting one reference to `null` is insufficient if another live reference still reaches the object. |
| 15 | Does `System.gc()` guarantee collection? | No; it is only a request to the JVM. | Exam answers claiming immediate or guaranteed collection are false. |
| 16 | When do variables leave scope? | Local variables at block end; fields with object/class lifetime as applicable. | Scope and object eligibility are different concepts. |
| 17 | What do `javac`, `java`, `jar`, and `javadoc` do? | Compile source to bytecode, run a program, package files, and generate API documentation. | `java` launches the JVM; it is not the ordinary source compiler. |
| 18 | Where do command-line arguments begin in `main()`? | At index `0` of the parameter array. | Reading an argument that was not supplied throws `ArrayIndexOutOfBoundsException`. |
| 19 | How do class, object, and reference differ? | A class is a blueprint, an object is its runtime instance, and a reference points to an object. | A reference is not the object itself and may be reassigned or `null`. |
| 20 | What belongs to a method signature? | The method name and parameter types. | Return type, parameter names, modifiers, and declared exceptions are excluded. |
| 21 | Which three comment forms does Java support? | `//`, `/* ... */`, and `/** ... */` for single-line, multiline, and Javadoc comments. | Multiline comments do not nest. |
| 22 | What filename rule applies to a public top-level class? | The source filename must match the public class name plus `.java`. | A file can contain many top-level types but at most one public one. |
| 23 | May fields and methods appear in any order inside a class? | Yes. | Declaration order freedom does not change runtime initialization order. |
| 24 | Which primitive types are integral? | `byte`, `short`, `int`, `long`, and `char`. | `char` is unsigned; the others are signed. |
| 25 | Which literal suffixes matter for `long` and `float`? | `L` marks a long literal and `F` marks a float literal. | Decimal literals are `double` by default. |
| 26 | How do primitive and reference variables differ? | A primitive stores its value directly; a reference stores a reference and can be `null`. | Calling an instance method through `null` throws at runtime. |
| 27 | How do array brackets affect multi-variable declarations? | Brackets on the type apply to all variables; brackets after a name apply only to that variable. | In `int a[], b`, only `a` is an array. |
| 28 | What does text-block closing-delimiter placement affect? | Incidental indentation and whether a trailing newline is included. | A delimiter on its own line generally preserves a final line terminator. |
| 29 | What is the inferred type of `var`? | The initializer's compile-time type, fixed at compilation. | It is not necessarily the most general type that could hold the value. |
| 30 | How do reachability and scope differ? | Scope controls name access; reachability controls whether an object can still be reached. | Reassignment can make an object unreachable while the variable remains in scope. |

## Chapter 2 - Operators

| # | Front | Back | Exam trap |
|---:|---|---|---|
| 1 | What is the difference between `x++` and `++x`? | Postfix returns the old value then increments; prefix increments then returns the new value. | Both mutate `x`, even when embedded in a larger expression. |
| 2 | What does unary numeric promotion do? | Promotes `byte`, `short`, and `char` operands to `int`. | `byte b = -b;` fails without a cast because the result is `int`. |
| 3 | What is binary numeric promotion? | Promote operands to the widest of `double`, `float`, `long`, or otherwise `int`. | Arithmetic on two `byte` values still produces `int`. |
| 4 | Why do compound assignments sometimes compile without a cast? | They include an implicit cast back to the left operand type. | `short s=1; s=s+1;` fails, while `s+=1;` compiles and may narrow. |
| 5 | What is special about integer division? | It discards the fractional part before assignment. | Assigning the result to `double` afterward does not restore the lost fraction. |
| 6 | What does `%` return? | The remainder after division; it works with integral and floating-point values. | The sign follows the dividend, not necessarily a mathematically positive modulus. |
| 7 | When do `&&` and `\|\|` short-circuit? | When the left operand determines the result. | The right operand may not execute, so side effects may not occur. |
| 8 | How do `&` and `\|` differ on booleans? | Both sides are always evaluated. | The same symbols are bitwise operators for integral operands. |
| 9 | What types may use logical negation `!`? | Only `boolean`. | Numeric truthiness does not exist in Java. |
| 10 | What does `^` mean for booleans? | Exclusive OR: true only when operands differ. | It does not short-circuit. |
| 11 | What are the equality rules for primitives? | Compatible numeric types are promoted; booleans compare only with booleans. | You cannot compare a boolean with a number. |
| 12 | What does `==` compare for references? | Whether both references point to the same object, after compatible-type checking. | It does not compare object content; use `equals()` when appropriate. |
| 13 | What must the ternary operator provide? | A boolean condition and two result expressions with a compatible resulting type. | Only the selected branch executes, but both branches must compile. |
| 14 | How does assignment associate? | Right to left. | `a = b = 3` assigns `3` to `b`, then to `a`. |
| 15 | What is a reliable exam strategy for precedence? | Apply parentheses/precedence deliberately, then track promotions and side effects. | Do not assume left-to-right evaluation means all operators have equal precedence. |
| 16 | What is the broad operator precedence order? | Postfix, unary, multiplicative, additive, shift, relational, equality, bitwise, conditional, assignment. | Parentheses override grouping but not type rules. |
| 17 | What happens when a narrowing primitive cast overflows? | High-order bits are discarded, wrapping into the target range. | A compiling cast can silently change the value. |
| 18 | When can an `int` constant be assigned to `byte`, `short`, or `char` without a cast? | When it is a compile-time constant that fits the target range. | The same value in a nonconstant `int` variable needs a cast. |
| 19 | How does promotion work with `double`, `float`, or `long` operands? | Both operands promote to the widest present type in that order. | The result type follows promotion even when the value is small. |
| 20 | What happens for integral division by zero? | It throws `ArithmeticException`. | Floating-point division by zero yields infinity or `NaN`. |
| 21 | How does `NaN` compare? | Ordered comparisons are false, and even `NaN == NaN` is false. | Use `isNaN()` to test it. |
| 22 | What does `null instanceof Type` return? | `false`. | It does not throw `NullPointerException`. |
| 23 | What compatibility rule applies to `instanceof`? | The operand and tested type must be potentially compatible. | Unrelated final types can make the test fail to compile. |
| 24 | How does `+` switch from addition to concatenation? | Evaluation is left to right; after a `String` participates, later `+` operations concatenate. | `1+2+"3"` and `"1"+2+3` produce different text. |
| 25 | How do `>>` and `>>>` differ? | `>>` preserves the sign bit; `>>>` fills high bits with zero. | They differ most visibly for negative values. |
| 26 | Which operands accept bitwise operators? | Integral primitives; `&`, `|`, and `^` also accept booleans. | Floating-point operands are invalid. |
| 27 | Why does `1 < x < 10` not compile? | The first comparison returns `boolean`, which cannot be compared with `10`. | Java does not support chained relational comparisons. |
| 28 | What value does an assignment expression produce? | The converted value assigned to the left side. | This enables chaining and can conceal side effects. |
| 29 | How does `+=` act on a `String`? | It concatenates and assigns a new string. | The right operand is converted to text unless parentheses force earlier arithmetic. |
| 30 | How do evaluation order and precedence differ? | Operands evaluate left to right; precedence determines grouping. | Short-circuit operators may skip the right operand. |

## Chapter 3 - Making Decisions

| # | Front | Back | Exam trap |
|---:|---|---|---|
| 1 | What type must an `if` condition produce? | `boolean`. | Java does not treat `0`, nonzero numbers, or references as booleans. |
| 2 | Which `if` owns an `else` without braces? | The nearest unmatched `if`. | Misleading indentation has no syntactic effect. |
| 3 | What is flow scoping for an `instanceof` pattern variable? | The variable is in scope only where the compiler can prove the match succeeded. | Negation and early exits can extend scope in ways visual block boundaries do not suggest. |
| 4 | Can pattern matching test an impossible type? | No; incompatible or unconditional patterns can be compile-time errors. | A pattern that adds no meaningful test may be rejected. |
| 5 | Which types traditionally work as a `switch` selector? | Integral-compatible types, wrappers, `String`, enums, plus supported reference types with pattern matching. | `long`, `float`, `double`, and `boolean` are not traditional switch selector types. |
| 6 | What must a classic `case` label be? | A compile-time constant compatible with the selector. | A `final` variable initialized at runtime is not a compile-time constant. |
| 7 | What causes fall-through in a switch statement? | Execution continues into later labels until `break`, `return`, `throw`, or switch end. | Labels do not automatically stop execution. |
| 8 | What must a switch expression guarantee? | A value on every possible path and compatible branch result types. | It must be exhaustive, often through `default` or full enum/sealed coverage. |
| 9 | When is `yield` used? | To return a value from a block arm of a switch expression. | `break value` is not the syntax. |
| 10 | Why does pattern-case order matter? | A broader pattern can dominate a later narrower one. | Put specific patterns before general patterns. |
| 11 | What does a guarded pattern use? | `case Type v when condition -> ...`. | The guard is evaluated only after the type pattern matches. |
| 12 | What is the minimum execution count of `while` vs. `do/while`? | `while`: zero; `do/while`: at least one. | A semicolon is required after the `do/while` condition. |
| 13 | Which parts of a basic `for` loop are optional? | Initialization, condition, and update; separators remain. | Missing condition means `true`, potentially creating an infinite loop. |
| 14 | What can enhanced `for` iterate? | Arrays and objects implementing `Iterable`. | It does not directly iterate a `Map`; iterate a view such as `entrySet()`. |
| 15 | What does `break` target? | The nearest loop or switch, or a matching labeled statement. | `continue` targets loops only, not switches. |
| 16 | What does labeled `continue` do? | Starts the next iteration of the named enclosing loop. | The label must identify an iteration statement. |
| 17 | When may braces be omitted from an `if` or loop? | When the controlled body is exactly one statement. | Indentation never creates a block. |
| 18 | Which reference-like values work in a traditional switch? | `String`, enums, and compatible wrappers such as `Integer`. | `boolean`, `long`, `float`, and `double` do not. |
| 19 | May multiple case labels share one branch? | Yes, using comma-separated labels. | Duplicate equivalent labels are still illegal. |
| 20 | How do arrow and colon switch branches differ? | Arrow branches do not fall through; colon branches can. | Do not apply fall-through reasoning to arrow syntax. |
| 21 | What makes a switch expression exhaustive? | It handles every possible value, often with `default` or a complete enum/sealed set. | Every expression must be exhaustive. |
| 22 | What happens when a traditional switch selector is `null`? | It normally throws `NullPointerException`. | Pattern switches can explicitly include `case null`. |
| 23 | What is pattern dominance in switch? | An earlier pattern matches every value a later pattern could match. | A broad type before its subtype makes the subtype unreachable. |
| 24 | What must all switch-expression result branches provide? | Values with a compatible resulting type. | A block branch uses `yield`, not `return`, to supply the value. |
| 25 | What is the key execution difference between `while` and `do/while`? | `while` tests first; `do/while` tests after the body. | `do/while` runs at least once and requires a trailing semicolon. |
| 26 | Can a basic `for` initializer declare multiple variables? | Yes, when they share one declared type. | Unrelated types cannot appear in the same declaration. |
| 27 | What happens when an enhanced-for loop variable is reassigned? | Only the local loop variable changes. | It does not replace the array or collection element. |
| 28 | Where may a label be placed? | Immediately before a statement, commonly a loop or block. | `continue label` requires that label to mark a loop. |
| 29 | How do unlabeled `break` and `continue` differ? | `break` exits the nearest loop/switch; `continue` advances the nearest loop. | `continue` cannot target a switch alone. |
| 30 | What does `return` do inside nested control flow? | It exits the entire method and optionally supplies a value. | It does not merely leave the nearest loop. |

## Chapter 4 - Core APIs

| # | Front | Back | Exam trap |
|---:|---|---|---|
| 1 | Are `String` objects mutable? | No; operations return new strings unless the result is ignored. | Calling `concat()`, `replace()`, or `toUpperCase()` without assignment leaves the original unchanged. |
| 2 | How does `+` behave with strings? | Evaluation is left to right; once a string participates, later `+` operations concatenate. | `1 + 2 + "3"` differs from `"1" + 2 + 3`. |
| 3 | What are valid string indexes? | `0` through `length()-1`. | `charAt(length())` throws an exception. |
| 4 | How does `substring(begin,end)` treat `end`? | End-exclusive. | Equal indexes return `""`; reversed or out-of-range indexes fail. |
| 5 | What does `String.strip()` do versus `trim()`? | `strip()` is Unicode-aware; `trim()` removes characters up to U+0020. | They can differ for non-ASCII whitespace. |
| 6 | How do `equals()` and `equalsIgnoreCase()` differ? | Exact content vs. case-insensitive content. | `==` still tests reference identity. |
| 7 | What is string-pool behavior? | Identical literals usually share pooled references; runtime-created strings need not. | Do not infer content equality from `==`; compile-time constant folding can make traps. |
| 8 | Is `StringBuilder` mutable? | Yes; most modification methods change and return the same builder. | `substring()` returns a `String` and does not modify the builder. |
| 9 | How do `StringBuilder.delete()` and `insert()` indexes work? | Start-inclusive/end-exclusive for delete; insert at the given offset. | Delete may tolerate an end beyond length, while invalid starts still fail. |
| 10 | How are arrays initialized? | Elements receive type defaults; array length is fixed. | The array reference may be reassigned, but the array's length never changes. |
| 11 | What does `Arrays.binarySearch()` require? | The searched array must be sorted using the same ordering. | On unsorted data, the result is undefined; a negative result encodes insertion point as `-(p)-1`. |
| 12 | What is array covariance? | A subtype array may be assigned to a supertype array reference. | Storing an incompatible element can compile but throw `ArrayStoreException`. |
| 13 | How are multidimensional arrays represented? | Arrays of arrays; row lengths may differ. | Rectangular shape is not guaranteed. |
| 14 | What are common `Math` return-type traps? | Methods such as `round()` vary by input; `random()` is `[0.0,1.0)`. | Check signatures rather than assuming every numeric result is `double`. |
| 15 | Are `LocalDate`, `LocalTime`, and `LocalDateTime` mutable? | No; adjustment methods return new objects. | Ignoring the returned value ignores the adjustment. |
| 16 | What happens when adding calendar units to invalid dates? | Java adjusts to a valid date where specified, such as month-end. | Chained additions can differ from one combined conceptual calculation. |
| 17 | What does `Period` represent? | Date-based years, months, and days. | Chained `Period.ofX()` static calls replace rather than accumulate because each creates a new period. |
| 18 | What does `String.length()` count? | UTF-16 `char` code units. | It is not always the number of user-perceived Unicode characters. |
| 19 | How do `indexOf()` and `charAt()` signal failure? | `indexOf()` returns `-1`; `charAt()` throws an index exception. | Do not expect both APIs to use the same failure signal. |
| 20 | What does `String.replace()` do to the original? | Nothing; it returns a new string. | Ignoring the return value loses the replacement. |
| 21 | How do `isEmpty()` and `isBlank()` differ? | Empty means length zero; blank also accepts only whitespace. | A string of spaces is blank but not empty. |
| 22 | Does `StringBuilder.substring()` mutate the builder? | No; it returns a `String`. | `append()`, `delete()`, and `insert()` do mutate it. |
| 23 | How do `StringBuilder` length and capacity differ? | Length is used characters; capacity is allocated storage. | Capacity grows automatically and need not equal length. |
| 24 | What fills positions when `StringBuilder.setLength()` grows? | Null characters (`\u0000`). | They are characters, not the text `null`. |
| 25 | What initializes elements of a newly created array? | The component type's default values. | This applies even when the array reference is local. |
| 26 | How do you decode a negative binary-search result? | The insertion point is `-result - 1`. | Negating alone is off by one. |
| 27 | What does `Arrays.compare()` return? | A negative, zero, or positive lexicographic comparison result. | The exact magnitude is not guaranteed to be one. |
| 28 | What does `Arrays.mismatch()` return? | The first differing index, or `-1` if equivalent. | A length difference can mismatch at the shorter length. |
| 29 | What are the return types of `Math.round()`? | `float` input returns `int`; `double` input returns `long`. | `ceil()` and `floor()` return `double`. |
| 30 | How do `Period` and `Duration` differ? | `Period` is date-based; `Duration` is time-based. | Across daylight-saving changes they can produce different clock results. |

## Chapter 5 - Methods

| # | Front | Back | Exam trap |
|---:|---|---|---|
| 1 | What is the general method declaration order? | Modifiers, type parameters, return type, name, parameters, optional `throws`, body. | Optional modifiers may vary in order, but return type/name/parameters cannot. |
| 2 | What must a non-void method do? | Return a compatible value on every reachable path. | A `return` inside only one conditional branch may be insufficient. |
| 3 | Where may a varargs parameter appear? | Last parameter only, at most one. | At the call site it behaves like an array and may receive zero or more arguments. |
| 4 | What happens when `null` is passed to varargs? | It may mean a null array rather than one null element, depending on the call. | Warnings and runtime `NullPointerException` traps are common. |
| 5 | What does `private` permit? | Access only within the declaring top-level nest/class context. | It is not inherited access for ordinary subclasses. |
| 6 | What is package-private access? | No access modifier; access from the same package. | `default` is not an access modifier keyword for members. |
| 7 | What is the two-part rule for `protected` across packages? | Accessible in subclasses, but through inheritance/subclass-appropriate references. | A subclass cannot freely access a protected member through any superclass instance. |
| 8 | What does `final` mean for a reference variable? | The reference cannot point elsewhere. | The referenced object may still be mutable. |
| 9 | What is effectively final? | A local variable assigned once and never changed after initialization. | It need not be declared `final`, but lambdas/local classes treat it as such. |
| 10 | How is a static import written? | `import static package.Type.member;`. | `static import` is invalid, and the import targets static members, not a class name. |
| 11 | What can static code access directly? | Static members. It needs an instance for instance members. | Calling a static method through an instance may compile but is resolved statically and is misleading. |
| 12 | What is autoboxing/unboxing? | Automatic primitive-wrapper conversion in compatible contexts. | Unboxing `null` throws `NullPointerException`. |
| 13 | What is the usual overload preference? | Exact match, primitive widening, boxing, then varargs. | Widening plus boxing is generally not combined arbitrarily. |
| 14 | What defines an overload? | Same method name with a different parameter list. | Return type, access modifier, and `throws` clause alone do not overload. |
| 15 | Is Java pass-by-reference? | No; Java always passes copies of values, including copies of references. | Reassigning a parameter does not affect the caller, but mutating the referenced object can. |
| 16 | What access does a package-private member have? | Access from the same package only. | Package access has no keyword. |
| 17 | May method modifiers appear in different orders? | Many orders compile, though conventional order is clearer. | The return type must still precede the method name. |
| 18 | What is a method parameter's scope? | The entire method body. | A local variable cannot redeclare that parameter name. |
| 19 | How are varargs represented inside the method? | As an array of the component type. | Callers may pass separate arguments or a compatible array. |
| 20 | Can otherwise identical `T...` and `T[]` methods overload each other? | No; they have the same signature. | Varargs is array-based compilation syntax. |
| 21 | How must a blank final field be initialized? | Exactly once on every valid initialization path. | Instance and static blank finals use different initializer contexts. |
| 22 | When does unboxing throw `NullPointerException`? | When a null wrapper is converted to a primitive. | Arithmetic and comparison can trigger implicit unboxing. |
| 23 | Why should wrapper values not be compared with `==`? | Wrapper caching may reuse some objects but not others. | Use `equals()` for value equality. |
| 24 | Can Java widen a primitive and then box it to another wrapper? | No, not as one overload conversion. | An `int` does not become `Long` by widening-then-boxing. |
| 25 | How does `null` choose among overloads? | It selects the most specific compatible reference overload. | Unrelated equally specific types make the call ambiguous. |
| 26 | Can methods overload by return type alone? | No; parameter lists must differ. | Return type is not part of the method signature. |
| 27 | Which overload phase is considered last? | Varargs, after fixed-arity widening and boxing applicability. | An applicable fixed-arity method beats varargs. |
| 28 | Can a static method be called through an instance? | Yes, though discouraged; resolution uses the reference type. | Even a null reference can appear to call a static method. |
| 29 | What may an instance method access directly? | Both instance and static members. | Static methods have no implicit `this`. |
| 30 | What can a method do through a copied object reference? | Mutate the shared object's state. | Reassigning the parameter still leaves the caller's variable unchanged. |

## Chapter 6 - Class Design

| # | Front | Back | Exam trap |
|---:|---|---|---|
| 1 | What members are inherited by a subclass? | Accessible instance/static members according to access rules; constructors are not inherited. | Private members exist in the object but are not directly accessible by the subclass. |
| 2 | What is the difference between `this` and `super`? | `this` refers to current object members; `super` selects inherited superclass members. | Neither may be used from a static context without an instance. |
| 3 | What do `this()` and `super()` do? | Invoke another constructor in the same class or direct superclass. | They are constructor calls, not ordinary method calls. |
| 4 | Where must an explicit constructor invocation appear? | As the first statement of a constructor. | A constructor cannot invoke both `this()` and `super()` directly. |
| 5 | When does the compiler insert `super()`? | When the constructor has no explicit `this()`/`super()` call. | Compilation fails if the superclass lacks an accessible no-arg constructor. |
| 6 | When is a default constructor supplied? | Only when the class declares no constructor. | Declaring any constructor suppresses the compiler-provided default. |
| 7 | What is initialization order? | Superclass static initialization, subclass static initialization; then superclass instance fields/blocks/constructor, then subclass equivalents. | Static initialization occurs once; instance initialization occurs per object. |
| 8 | What are the core override rules? | Same signature; compatible covariant return; no broader checked exceptions; access cannot be more restrictive. | Private methods are not overridden; static methods are hidden. |
| 9 | What is a covariant return type? | An overriding method may return a subtype of the inherited reference return type. | Primitive return types must match exactly. |
| 10 | How do checked exceptions affect overriding? | Child may declare fewer/narrower checked exceptions. | Unchecked exceptions are not restricted by this rule. |
| 11 | How are overridden instance methods selected? | At runtime by the actual object's type. | Fields, static methods, and private methods are selected differently, often by reference/declaring type. |
| 12 | What is method hiding? | A subclass declares a static method with the same signature as an inherited static method. | Parent and child declarations must agree on static-ness. |
| 13 | Can an abstract class be instantiated? | No, but it can have constructors, fields, concrete methods, and zero abstract methods. | `abstract` and `final` are incompatible for a class or method. |
| 14 | What must the first concrete subclass do? | Implement all inherited abstract methods not already implemented. | An intermediate abstract subclass may leave them unimplemented. |
| 15 | What makes a class effectively immutable? | Prevent state changes, use private/final fields, defensive copies, and controlled construction. | A final reference to a mutable object does not make the object immutable. |
| 16 | Are constructors inherited? | No. | A subclass constructor may invoke a superclass constructor, but it does not inherit it. |
| 17 | What is constructor chaining? | One constructor invokes another with `this()` or invokes its parent with `super()`. | Every chain must eventually reach a superclass constructor. |
| 18 | Can `this()` and `super()` appear in the same constructor? | No; each must be the first statement, so only one can be used directly. | Another constructor reached by `this()` may later invoke `super()`. |
| 19 | What happens if the parent has no accessible no-argument constructor? | Each child constructor must explicitly invoke an accessible parent constructor with arguments. | The compiler-inserted `super()` would fail. |
| 20 | Are private parent members inherited for direct access? | No; they exist in the parent portion of the object but are not directly accessible in the child. | Public/protected parent methods may expose them. |
| 21 | How do overloading and overriding differ? | Overloading changes parameters; overriding replaces an inherited instance method with a compatible declaration. | Static method hiding is neither ordinary overriding nor instance polymorphism. |
| 22 | What does a `final` method or class prevent? | A final method cannot be overridden; a final class cannot be extended. | A final class may still contain mutable objects. |
| 23 | May an overriding method reduce visibility? | No; it may keep or widen access. | A protected method cannot be overridden as package-private. |
| 24 | How are fields selected when hidden? | By the compile-time reference type. | Fields are not polymorphic like overridden instance methods. |
| 25 | What is the full high-level initialization order for a child object? | Parent static initialization, child static initialization, parent instance initialization/constructor, then child instance initialization/constructor. | Static initialization occurs once per class, not once per object. |
| 26 | In what order do instance fields and initializer blocks run? | In textual order before the constructor body. | Forward-reference rules can still make some field uses illegal. |
| 27 | Which declarations may be abstract? | Classes and instance methods, subject to modifier rules. | Constructors, fields, static methods, private methods, and final methods cannot be abstract. |
| 28 | May an abstract class have constructors and concrete methods? | Yes. | Its constructor runs when a concrete subclass is instantiated. |
| 29 | What happens when an abstract subclass does not implement inherited abstract methods? | It remains abstract. | The first concrete descendant must implement all remaining abstract methods. |
| 30 | Why are defensive copies needed for immutable classes? | They prevent callers from mutating internal mutable state through shared references. | Copy both incoming mutable values and values returned by accessors where necessary. |

## Chapter 7 - Beyond Classes

| # | Front | Back | Exam trap |
|---:|---|---|---|
| 1 | What may an interface extend or a class implement? | An interface may extend multiple interfaces; a class may implement multiple interfaces. | An interface does not extend a class, and a class does not extend an interface. |
| 2 | What are interface fields implicitly? | `public static final`. | They require initialization and cannot be instance variables. |
| 3 | What are ordinary interface methods implicitly? | `public abstract` unless declared `default`, `static`, or `private`. | `protected` interface methods are not allowed. |
| 4 | What is a default interface method? | An inherited instance method with a body, declared `default`. | It is implicitly public and cannot be `static`, `final`, or `abstract`. |
| 5 | How are conflicting default methods resolved? | A class method wins; otherwise the implementing class may need an explicit override. | Two unrelated defaults with the same signature create ambiguity. |
| 6 | What can private interface methods support? | Shared implementation used only inside the interface. | Private interface methods are not inherited or externally callable. |
| 7 | How are static interface methods accessed? | Through the interface name. | They are not inherited as instance methods by implementing classes. |
| 8 | What is special about enum constructors? | They are implicitly private and run once per constant. | You cannot call an enum constructor directly or declare it public/protected. |
| 9 | When is the semicolon after enum constants required? | When members follow the constants. | It is optional only when the enum body ends after the constants. |
| 10 | Can enum constants have specialized behavior? | Yes, with constant-specific class bodies and method overrides. | If the enum declares an abstract method, every constant must implement it. |
| 11 | What must a direct subtype of a sealed type declare? | `final`, `sealed`, or `non-sealed`. | A permitted direct subtype cannot omit all three. |
| 12 | When may a `permits` clause be omitted? | When permitted direct subtypes are discoverable in the same source file as allowed by the language rules. | Package/module locality rules still apply. |
| 13 | What does a record automatically provide? | Final component fields, accessors, canonical constructor, and value-based `equals`, `hashCode`, `toString`. | Accessors are named like components (`name()`), not JavaBean getters. |
| 14 | What is a compact record constructor? | Canonical-constructor shorthand without a parameter list. | Component fields are assigned after the body; direct assignment to them there is restricted. |
| 15 | Are records deeply immutable? | No; component references are final, but referenced objects may be mutable. | Defensive copying may still be required. |
| 16 | How does polymorphic casting work? | Upcasts are implicit; downcasts require an explicit cast and runtime compatibility. | A compiling cast may still throw `ClassCastException`. |
| 17 | May an interface extend multiple interfaces? | Yes. | A class extends only one class but can implement multiple interfaces. |
| 18 | Which interface methods may have bodies? | Default, static, and private methods. | An ordinary abstract interface method ends with a semicolon. |
| 19 | Are inherited `Object` methods counted toward functional-interface abstract methods? | No. | Redeclaring `equals(Object)` does not add a second functional method. |
| 20 | How are enum constants obtained programmatically? | `values()` returns all constants; `valueOf(String)` returns the exact named constant. | `valueOf()` is case-sensitive and throws for an unknown name. |
| 21 | What does an enum's `ordinal()` represent? | Its zero-based declaration position. | Persisting business meaning by ordinal is fragile when constants are reordered. |
| 22 | Can enum constants invoke different constructors? | Yes, by supplying arguments after each constant name. | Enum constructors are implicitly private. |
| 23 | What restrictions apply to sealed direct subclasses? | Each must be `final`, `sealed`, or `non-sealed`. | Omitting all three does not compile. |
| 24 | Where must permitted subclasses be located? | In the same module, or the same package when using the unnamed module. | Sealing is not an unrestricted cross-module relationship. |
| 25 | What is a record's canonical constructor? | The constructor whose parameters match all components in order and type. | It cannot reduce the record's access level. |
| 26 | Can a record explicitly extend another class or be subclassed? | No; it implicitly extends `java.lang.Record` and is final. | A record may implement interfaces. |
| 27 | Can a record declare extra instance fields? | No; additional fields must be static. | It may declare instance methods and override generated methods. |
| 28 | How does a static nested class relate to its enclosing instance? | It has no implicit enclosing-object reference. | It can directly access only static outer members without an outer instance. |
| 29 | What does a member inner class carry? | An implicit reference to an instance of its enclosing class. | Creating it from elsewhere requires an outer instance. |
| 30 | What can local and anonymous classes capture? | Final or effectively final local variables plus accessible enclosing state. | Anonymous classes have no explicit constructor declaration. |

## Chapter 8 - Lambdas and Functional Interfaces

| # | Front | Back | Exam trap |
|---:|---|---|---|
| 1 | When may lambda parameter parentheses be omitted? | Exactly one implicitly typed parameter. | Zero, multiple, or explicitly typed parameters require parentheses. |
| 2 | When may lambda braces/return/semicolon be omitted? | For a single expression body. | With braces, statement syntax and explicit `return` rules apply. |
| 3 | May `var` be used in lambda parameters? | Yes, but then all parameters use `var`; annotations can be applied. | Do not mix `var`, explicit types, and implicit types in one parameter list. |
| 4 | What local variables may a lambda capture? | Final or effectively final locals/parameters. | Instance and static fields do not have this restriction. |
| 5 | What makes an interface functional? | Exactly one abstract method after accounting for inherited/`Object`-equivalent methods. | Default, static, and private methods do not count as abstract methods. |
| 6 | Does `@FunctionalInterface` create functionality? | No; it asks the compiler to verify the rule. | A valid functional interface need not carry the annotation. |
| 7 | What is the target type of a lambda? | The functional interface supplied by assignment, argument, cast, or return context. | A lambda has no standalone type and can be ambiguous between overloads. |
| 8 | What are the four method-reference forms? | Static; bound instance; unbound instance; constructor. | For unbound references, the receiver becomes the first functional parameter. |
| 9 | What does `Type::new` require? | A functional interface whose parameters/return match an accessible constructor. | Array constructor references such as `String[]::new` are also possible. |
| 10 | What does `Predicate<T>` do? | `T -> boolean`; common method `test()`. | Primitive-specialized predicates avoid boxing. |
| 11 | What does `Consumer<T>` do? | `T -> void`; common method `accept()`. | `BiConsumer` takes two inputs but still returns void. |
| 12 | What does `Supplier<T>` do? | `() -> T`; common method `get()`. | It takes no input, often used for lazy creation. |
| 13 | What does `Function<T,R>` do? | `T -> R`; common method `apply()`. | `UnaryOperator<T>` is the same input/output type specialization. |
| 14 | What does `BinaryOperator<T>` do? | `(T,T) -> T`. | It is a specialization of `BiFunction<T,T,T>`. |
| 15 | What should you check when a lambda fails overload resolution? | Parameter types, return compatibility, checked exceptions, and ambiguity. | Adding an explicit cast can select the intended functional interface. |
| 16 | What is a lambda's lexical `this`? | `this` refers to the enclosing instance, not a new lambda object. | This differs from an anonymous class. |
| 17 | Must lambda parameter types be all explicit or all inferred? | Yes; do not mix typed and untyped parameters. | When using `var`, every parameter must use `var`. |
| 18 | When are lambda annotations allowed? | With explicitly declared parameters, including `var` parameters. | Parentheses are required when annotations or `var` are used. |
| 19 | What return rule applies to a block lambda? | A value-compatible block must return on every path; a void-compatible block may complete normally. | A statement expression can sometimes be both value- and void-compatible. |
| 20 | Can a lambda throw a checked exception? | Only if the target functional method permits that exception. | The lambda body is checked against the target method's `throws` clause. |
| 21 | What does `UnaryOperator<T>` represent? | A function from `T` to the same `T`. | It specializes `Function<T,T>`, not `Consumer<T>`. |
| 22 | What does `BiFunction<T,U,R>` represent? | Two inputs of potentially different types producing one result. | `BinaryOperator<T>` instead requires both inputs and result to be `T`. |
| 23 | What are common primitive specializations? | `IntPredicate`, `IntConsumer`, `IntSupplier`, and forms such as `ToIntFunction<T>`. | They avoid boxing and their method signatures differ from generic versions. |
| 24 | What do `Predicate.and()`, `or()`, and `negate()` do? | Compose predicates into a new predicate. | `and()` and `or()` use short-circuit behavior. |
| 25 | What do `Function.andThen()` and `compose()` change? | Evaluation order: `andThen` applies this function first; `compose` applies the argument first. | Reversing them can change types and results. |
| 26 | What does `Consumer.andThen()` return? | A consumer that performs both actions in sequence. | If the first action throws, the second is not run. |
| 27 | How is an unbound instance method reference invoked? | Its first functional parameter supplies the receiver object. | `String::length` needs a `String` input even though `length()` declares no parameter. |
| 28 | How is a bound instance method reference different? | The receiver is fixed in the expression, so functional parameters map only to method arguments. | `text::startsWith` and `String::startsWith` target different arities. |
| 29 | When is a constructor reference compatible? | When a functional method's parameters and return type match an accessible constructor. | Arrays use forms such as `String[]::new` with an integer length parameter. |
| 30 | Why can the same lambda have different types? | Its type comes from the target functional interface at the use site. | A lambda has no standalone nominal type without target context. |

## Chapter 9 - Collections and Generics

| # | Front | Back | Exam trap |
|---:|---|---|---|
| 1 | Which collection allows duplicates and preserves order? | `List`. | Ordering does not imply sorting. |
| 2 | Which collection rejects duplicates? | `Set`. | `HashSet` does not promise encounter order. |
| 3 | What is a `Deque` used for? | Efficient insertion/removal at both ends; queue or stack behavior. | Method pairs differ on whether failure returns a sentinel or throws. |
| 4 | What does a `Map` store? | Unique keys mapped to values; values may repeat. | `Map` is not a subtype of `Collection`. |
| 5 | Which factory collections are immutable? | `List.of`, `Set.of`, `Map.of`, and copy variants. | They reject `null`; sets/maps also reject duplicates/duplicate keys. |
| 6 | What is the `List.remove()` overload trap? | `remove(int)` removes by index; `remove(Object)` removes a matching value. | With `List<Integer>`, an int literal selects the index overload unless boxed/cast. |
| 7 | How should `compareTo()` results be interpreted? | Negative, zero, or positive; magnitude is irrelevant. | Do not assume results are only `-1`, `0`, `1`. |
| 8 | How do `Comparable` and `Comparator` differ? | Comparable defines one natural order in the class; comparators provide external alternate orders. | `compareTo()` takes one argument; `compare()` takes two. |
| 9 | Why is subtraction risky in a comparator? | Integer overflow can reverse the sign. | Prefer `Integer.compare()` or comparator factories. |
| 10 | What do `thenComparing()` and `reversed()` do? | Add tie-breakers and reverse an ordering. | Placement of `reversed()` determines whether it reverses one component or the whole chain. |
| 11 | What are sequenced collections? | Interfaces exposing predictable encounter order and first/last/reversed operations. | Hash-based unordered implementations generally do not become ordered. |
| 12 | What is type erasure? | Generic type parameters are largely removed/translated at compile time. | You cannot use primitives as type arguments or create `new T()`/`new T[]` directly. |
| 13 | What does `<?>` mean? | Unknown type; safe reads are `Object`, and non-null writes are generally forbidden. | It is not equivalent to `Object` as a type argument. |
| 14 | What does `<? extends T>` favor? | Reading values as `T` (producer). | You cannot safely add a specific `T` because the actual subtype is unknown. |
| 15 | What does `<? super T>` favor? | Adding `T` values (consumer). | Reads are only safely typed as `Object`. |
| 16 | Are generics covariant? | No; `List<Integer>` is not a subtype of `List<Number>`. | Use bounded wildcards when variance is required. |
| 17 | How do `Collection.remove()` and `List.remove()` differ? | Collection removal is by object; List additionally overloads removal by index. | An `int` argument chooses the index overload unless boxed/cast. |
| 18 | What does `List.of()` reject? | Null elements and later modification. | Its fixed contents are not the same as a mutable fixed-size `Arrays.asList()` view. |
| 19 | How does `Arrays.asList()` behave? | It returns a fixed-size list backed by the array. | Element replacement is shared, but size-changing methods fail. |
| 20 | What ordering does a `HashSet` guarantee? | None. | Use `LinkedHashSet` for insertion order or `TreeSet` for sorted order. |
| 21 | What must elements in a `TreeSet` support? | Natural ordering or a supplied compatible comparator. | Incomparable elements can cause `ClassCastException` at runtime. |
| 22 | How do queue `offer/poll/peek` differ from `add/remove/element`? | The first group uses special return values on failure; the second tends to throw. | `poll()` and `peek()` return `null` for an empty queue. |
| 23 | What two ends does a `Deque` expose? | First and last, supporting queue and stack operations. | Method pairs differ in whether failure throws or returns a sentinel. |
| 24 | What does `Map.put()` return? | The previous value associated with the key, or `null`. | `null` can mean no mapping or a prior null value in maps that allow nulls. |
| 25 | How does `Map.merge()` handle a missing key? | It installs the supplied value without calling the remapping function. | A remapping result of `null` removes an existing mapping. |
| 26 | Why must `equals()` and `hashCode()` agree? | Equal objects must have equal hash codes for hash collections to find them reliably. | Equal hash codes do not require objects to be equal. |
| 27 | What contract should natural ordering have with equality? | It is strongly recommended that `compareTo()==0` agree with `equals()`. | Sorted collections use comparison equality to detect duplicates. |
| 28 | What is the diamond operator? | `<>` asks the compiler to infer generic constructor type arguments. | It cannot be used everywhere a type argument appears. |
| 29 | Where is a generic method's type parameter declared? | Before the return type, such as `static <T> T pick(T x)`. | Placing `<T>` after the return type is invalid. |
| 30 | What may safely be read from `<? extends Number>`? | Values as `Number` (or `Object`). | You cannot add a specific numeric subtype other than `null`. |

## Chapter 10 - Streams

| # | Front | Back | Exam trap |
|---:|---|---|---|
| 1 | How are streams evaluated? | Lazily; intermediate operations run only when a terminal operation requests data. | A pipeline with no terminal operation performs no processing. |
| 2 | Can a stream be reused? | No, after a terminal operation it is consumed. | Reusing it can throw `IllegalStateException`. |
| 3 | What is the difference between intermediate and terminal operations? | Intermediate returns a stream; terminal produces a result/side effect and ends the pipeline. | Some terminal operations short-circuit and do not visit every element. |
| 4 | What does `filter()` accept? | A predicate and retains matching elements. | It does not transform element types. |
| 5 | How do `map()` and `flatMap()` differ? | `map` transforms one element to one result; `flatMap` flattens nested streams. | Using `map` with a stream-returning function creates `Stream<Stream<T>>`. |
| 6 | What does `distinct()` rely on? | `equals()`/`hashCode()` semantics. | It is stateful and may affect parallel performance. |
| 7 | What does `sorted()` require? | Natural ordering or a supplied comparator. | Natural sorting fails at runtime for non-comparable elements. |
| 8 | Why is `peek()` dangerous in exam code? | It is intermediate and mainly for debugging; execution depends on the terminal pipeline. | Side effects may not run for all elements due to laziness/short-circuiting. |
| 9 | What does `reduce()` do? | Combines stream elements into one value using identity/accumulator/combiner forms. | Identity and combiner must be compatible and associative for parallel use. |
| 10 | What is mutable reduction? | Accumulation into a mutable result container, commonly via `collect()`. | Do not mutate a shared non-thread-safe container in a parallel reduction. |
| 11 | How should `Optional.of()` and `ofNullable()` be chosen? | `of` rejects null; `ofNullable` converts null to empty. | Calling `get()` on empty throws; prefer safe alternatives. |
| 12 | How do `orElse()` and `orElseGet()` differ? | `orElse` eagerly evaluates its argument; `orElseGet` lazily invokes a supplier. | Expensive/side-effecting fallback code may run even when optional is present with `orElse`. |
| 13 | What primitive streams exist? | `IntStream`, `LongStream`, `DoubleStream`. | They have specialized optionals and numeric operations such as `sum()`/`average()`. |
| 14 | How do you change primitive/object stream kinds? | Use methods such as `mapToInt`, `mapToObj`, `boxed`. | Plain `map()` generally stays within the same stream family. |
| 15 | What is an infinite-stream safety rule? | Use a short-circuiting operation such as `limit`, `findFirst`, or matching terminal operation. | Sorting or collecting an unbounded stream never completes. |
| 16 | What do matching terminals return on an empty stream? | `allMatch` and `noneMatch` are true; `anyMatch` is false. | This is vacuous truth, a frequent exam surprise. |
| 17 | What are common stream sources? | Collections, arrays, factories such as `Stream.of()`, generators, iterators, and I/O APIs. | Creating a stream does not usually traverse its source. |
| 18 | What do `limit()` and `skip()` do? | Truncate to a maximum count or discard an initial count. | On ordered parallel streams they may carry ordering costs. |
| 19 | How do `findFirst()` and `findAny()` differ? | `findFirst()` respects encounter order; `findAny()` permits any element. | Parallel execution makes `findAny()` intentionally less predictable. |
| 20 | What does `count()` return? | A `long`. | Do not assign it directly to `int` without conversion. |
| 21 | How do `min()` and `max()` report no element? | They return an empty `Optional`. | Their comparator determines ordering. |
| 22 | What does `Optional.get()` do when empty? | Throws `NoSuchElementException`. | Prefer conditional or fallback methods when emptiness is possible. |
| 23 | How do `ifPresent()` and `ifPresentOrElse()` differ? | The latter also supplies an action for the empty case. | Neither transforms the contained value. |
| 24 | What does `Optional.map()` do? | Transforms a present value and wraps the result, treating null as empty. | Use `flatMap()` when the mapper already returns an `Optional`. |
| 25 | What does `Collectors.toMap()` require for duplicate keys? | A merge function, unless duplicate keys should throw. | A map supplier can additionally choose the map implementation. |
| 26 | What does `groupingBy()` produce? | A map from classifier keys to collections or downstream results. | Key and value types depend on the classifier and downstream collector. |
| 27 | What does `partitioningBy()` guarantee? | A boolean-keyed map with `true` and `false` partitions. | Both keys are represented even when one partition is empty. |
| 28 | What does `Collectors.joining()` operate on? | A stream of character sequences, combining them with optional delimiter/prefix/suffix. | Map non-string elements before joining. |
| 29 | What does `IntStream.summaryStatistics()` provide? | Count, sum, minimum, maximum, and average in one object. | Empty statistics have special min/max sentinel values. |
| 30 | How do `boxed()` and `mapToObj()` differ? | `boxed()` wraps primitive elements; `mapToObj()` applies a mapping function to produce objects. | Neither is the same as `map()`, which stays in the primitive stream type. |

## Chapter 11 - Exceptions and Localization

| # | Front | Back | Exam trap |
|---:|---|---|---|
| 1 | What is the throwable hierarchy distinction? | `Throwable` branches into `Error` and `Exception`; application code generally handles exceptions, not errors. | Catching `Throwable` also catches serious errors. |
| 2 | Which exceptions are unchecked? | `RuntimeException` subclasses and `Error` subclasses. | Other `Exception` subclasses are checked and must be caught or declared. |
| 3 | What is the difference between `throw` and `throws`? | `throw` creates/propagates one throwable expression; `throws` declares possible method exceptions. | `throw` is followed by an object, `throws` by exception types. |
| 4 | What must accompany a traditional `try`? | At least one `catch` or `finally`. | A try-with-resources may stand without either because it has implicit cleanup. |
| 5 | How must catch blocks be ordered? | More specific exceptions before broader supertypes. | An earlier superclass catch makes a later subclass catch unreachable. |
| 6 | What is forbidden in multi-catch alternatives? | Alternatives where one is a subtype of another. | The multi-catch parameter is implicitly final. |
| 7 | Does `finally` always complete normally? | It runs in most cases, but abrupt JVM termination/system failure can prevent it. | A `return` or exception from `finally` can replace an earlier result/exception. |
| 8 | In what order are try-with-resources closed? | Reverse declaration order. | Close exceptions can become suppressed behind the primary exception. |
| 9 | What must a resource implement? | `AutoCloseable` (or `Closeable`). | An effectively final existing variable may be used as a resource. |
| 10 | How do overriding methods handle declared exceptions? | They may declare fewer/narrower checked exceptions. | They may freely declare unchecked exceptions. |
| 11 | What is valid locale casing? | Language lowercase and required; country uppercase and optional. | `en_US` follows language-country order, not the reverse. |
| 12 | Are date/number formatters locale-sensitive? | Yes; symbols, ordering, separators, currency, and text may vary. | Parsing formatted text with the wrong locale can fail or misinterpret. |
| 13 | What do percent and currency formatters do? | Percent scales values for display; currency uses locale/currency conventions. | Formatting `0.5` as percent commonly yields 50%, not 0.5%. |
| 14 | How are custom date pattern letters and literals handled? | Pattern letters have special meaning; quote literal text with single quotes. | Wrong case changes meaning, such as month versus minute. |
| 15 | What is the resource-bundle search idea? | Search increasingly general locale candidates, then default-locale candidates as specified, then base bundle. | Once a bundle family is selected, keys may fall back through its parent hierarchy. |
| 16 | What happens when a resource key is absent? | Lookup ultimately throws `MissingResourceException`. | Finding a bundle does not guarantee every requested key exists. |
| 17 | How do you create custom checked and unchecked exceptions? | Extend `Exception` for checked or `RuntimeException` for unchecked. | The class name does not determine the category; inheritance does. |
| 18 | What happens when a `finally` block returns or throws? | It can replace a pending return value or exception from `try`/`catch`. | Abrupt completion in `finally` can hide the original outcome. |
| 19 | What is a suppressed exception? | A secondary exception retained when another exception is already being propagated. | Try-with-resources commonly suppresses close exceptions behind the primary failure. |
| 20 | How are suppressed exceptions retrieved? | With `Throwable.getSuppressed()`. | They are not the same as the causal chain from `getCause()`. |
| 21 | May an existing variable be used in try-with-resources? | Yes, if it is final or effectively final and in scope. | Reassigning it before the try makes it ineligible. |
| 22 | When do catch and finally run relative to automatic resource closing? | Resources close before explicit `catch` and `finally` blocks execute. | The implicit resource-closing phase behaves like an inner finally. |
| 23 | What does `Locale.Builder` help validate? | Structured locale components such as language, region, script, and variant. | Locale language is conventionally lowercase and region uppercase. |
| 24 | How do `NumberFormat.getIntegerInstance()` and `getNumberInstance()` differ? | The integer formatter parses/formats without a fractional result; the number formatter supports fractions. | Parsing may stop at the first unrecognized character without consuming the whole string. |
| 25 | What does a percent formatter do numerically? | It scales between a fractional value and percent display, such as `0.5` and `50%`. | Formatting `50` does not mean fifty percent; it represents five thousand percent. |
| 26 | What compact number styles are available? | Short and long forms, such as abbreviated `1K` versus words depending on locale. | Output varies by locale and rounding rules. |
| 27 | Are `DateTimeFormatter` instances immutable and thread-safe? | Yes. | The temporal object still must contain the fields required by the formatter. |
| 28 | How are literal characters escaped in date/time patterns? | Enclose them in single quotes. | Unquoted letters may be interpreted as pattern symbols. |
| 29 | What does `MessageFormat` use for substitutions? | Numbered placeholders such as `{0}` with optional formatting information. | Single quotes have escaping meaning in message patterns. |
| 30 | After Java selects a resource-bundle family, where does key fallback occur? | Up the parent hierarchy of that selected bundle family. | It does not restart the entire locale search separately for every missing key. |

## Chapter 12 - Modules

| # | Front | Back | Exam trap |
|---:|---|---|---|
| 1 | Where does `module-info.java` belong? | At the root of a module's source tree. | It is not placed inside a normal package. |
| 2 | What does `requires` do? | Declares a dependency on another module. | Readability is not the same as package export/accessibility. |
| 3 | What does `requires transitive` do? | Consumers reading this module also read the required module. | Use it for API dependencies exposed through public signatures, not every implementation dependency. |
| 4 | What does `requires static` mean? | Dependency required at compile time but optional at runtime. | It does not mean a static Java member. |
| 5 | What does `exports` do? | Makes a package available to other modules at compile/runtime access. | Packages are concealed by default. |
| 6 | What is a qualified export? | `exports p to m1,m2;` exposes a package only to named target modules. | Other modules cannot access it even if they read the exporting module. |
| 7 | How does `opens` differ from `exports`? | `opens` permits deep reflection; `exports` provides ordinary public access. | Reflection frameworks may need opens even when code compiles via exports. |
| 8 | What do `uses` and `provides ... with` express? | Service consumption and provider implementation registration. | The provider class must meet service-loader construction rules. |
| 9 | What is a named module? | A module with a descriptor, normally on the module path. | Its name comes from `module-info`, not necessarily the JAR filename. |
| 10 | What is an automatic module? | A nonmodular JAR on the module path, assigned a module name and broad readability/export behavior. | Automatic-module naming can be unstable if derived from filenames. |
| 11 | What is the unnamed module? | Classpath code grouped without a descriptor. | Classpath code cannot be depended on by named modules in the same clean way. |
| 12 | What does `jdeps` do? | Analyzes class/package/module dependencies. | It reports dependencies; it does not compile or run the program. |
| 13 | What does `jlink` create? | A custom runtime image containing selected modules and dependencies. | It works with modular inputs and uses JMOD/runtime module content. |
| 14 | What does `jpackage` create? | Platform-specific application packages/installers. | It is distinct from `jar` and from runtime-image linking. |
| 15 | What migration strategy reduces risk? | Move bottom-up where dependencies allow, or use automatic modules as an intermediate step. | Cyclic dependencies and split packages become module-system obstacles. |
| 16 | Which module is implicitly required by every named module? | `java.base`. | Writing `requires java.base;` is normally redundant. |
| 17 | What option identifies the module path? | `--module-path`, abbreviated `-p`. | It is distinct from the classpath option. |
| 18 | How is a modular main class launched? | With `java -p path -m moduleName/package.Main`. | The module name and class name are separated by `/`. |
| 19 | How are modules compiled to an output directory? | Use `javac` with `-d` and the needed module path, compiling `module-info.java` with sources. | Package directory layout still matters. |
| 20 | Can a named module read classes from the unnamed module? | No. | Placing a dependency only on the classpath does not make it readable from named code. |
| 21 | What does an automatic module read and export? | It reads other modules and exports all of its packages. | This broad access is a migration convenience, not strong encapsulation. |
| 22 | How is an automatic module name chosen? | From `Automatic-Module-Name` in the manifest or derived from the JAR filename. | Filename-derived names can change when the JAR is renamed. |
| 23 | What does `open module` mean? | All packages are open for deep reflection. | It does not automatically export every package for ordinary compile-time access. |
| 24 | What does a qualified `opens` directive do? | Opens one package reflectively to named target modules. | It is different from a qualified export. |
| 25 | What are the four service roles? | Service provider interface, provider implementation, service locator, and consumer. | The provider is registered with `provides ... with`; the consumer declares `uses`. |
| 26 | Which API locates service implementations? | `ServiceLoader`. | Consumers should depend on the service interface rather than a provider class. |
| 27 | What does `java --show-module-resolution` reveal? | The modules resolved for a launch. | Resolution output helps diagnose transitive dependencies. |
| 28 | What does `jar --describe-module` show? | Module metadata for a modular or automatic JAR. | It does not perform dependency analysis like `jdeps`. |
| 29 | Why are cyclic module dependencies forbidden? | The module graph must resolve without cycles. | Packages/classes that once referenced each other may require redesign during migration. |
| 30 | What is a split package? | The same package distributed across multiple named modules. | The module system rejects this arrangement in a resolved layer. |

## Chapter 13 - Concurrency

| # | Front | Back | Exam trap |
|---:|---|---|---|
| 1 | How do platform and virtual threads differ? | Platform threads map closely to OS threads; virtual threads are lightweight and scheduled on carrier threads. | Virtual threads are for scale in blocking tasks, not automatic CPU speedups. |
| 2 | Should virtual threads be pooled? | Generally no; create one per task, for example with `newVirtualThreadPerTaskExecutor()`. | Pooling defeats much of their lightweight design. |
| 3 | How do `Runnable` and `Callable` differ? | Runnable returns nothing and cannot declare checked exceptions; Callable returns a value and may throw. | `submit()` returns a `Future` for either. |
| 4 | What does `Future.get()` do? | Waits for completion and returns/unwraps the task result. | Task exceptions are wrapped in `ExecutionException`; waiting can block indefinitely. |
| 5 | Why must an executor be shut down? | Its threads may keep the process alive and resources allocated. | `shutdown()` rejects new tasks but lets submitted tasks finish. |
| 6 | How do fixed-rate and fixed-delay scheduling differ? | Fixed rate targets start times; fixed delay waits after one completion before the next delay. | Long tasks affect the two schedules differently. |
| 7 | What makes code thread-safe? | Correctly coordinates access to shared mutable state. | Local variables alone are usually safe, but referenced shared objects may not be. |
| 8 | What monitor rule must synchronized threads share? | They must synchronize on the same object/monitor. | Two equal but distinct lock objects provide no mutual exclusion. |
| 9 | What advantages can `ReentrantLock` offer? | Timed/nonblocking acquisition, interruptibility, fairness options, conditions. | Always release it in `finally` after successful acquisition. |
| 10 | How does `volatile` differ from atomic classes? | Volatile provides visibility/order for reads/writes; atomic classes make supported compound operations atomic. | `volatile count++` is still not atomic. |
| 11 | When is `CopyOnWriteArrayList` useful? | Many reads/iterations and few writes. | Every mutation copies the backing structure, making writes expensive. |
| 12 | What are weakly consistent concurrent iterators? | They tolerate concurrent modification and may reflect some updates without throwing. | Do not expect a fixed snapshot unless the collection promises one. |
| 13 | Define deadlock, starvation, and livelock. | Deadlock: blocked cycle; starvation: denied resource; livelock: active reactions with no progress. | Livelock threads are running, which can hide the lack of progress. |
| 14 | What is a race condition? | Outcome depends on unpredictable interleaving of unsafely coordinated operations. | Reproducing correctly once does not prove thread safety. |
| 15 | What must a parallel reduction satisfy? | Associative, stateless/noninterfering operations and compatible identity/combiner. | Stateful lambdas or wrong combiners create nondeterministic results. |
| 16 | Does parallel always mean faster? | No; overhead, data size, ordering, blocking, and splitting characteristics matter. | Avoid assuming `.parallel()` is a performance guarantee. |
| 17 | What is the difference between calling `run()` and `start()` on a thread? | `run()` executes on the current thread; `start()` schedules a new thread that later invokes `run()`. | Calling `run()` directly is not concurrent execution. |
| 18 | May the same `Thread` instance be started twice? | No; a second start throws `IllegalThreadStateException`. | Create a new thread instance for another execution. |
| 19 | How do `execute()` and `submit()` differ on an executor? | `execute()` accepts `Runnable` and returns nothing; `submit()` returns a `Future`. | Exceptions from submitted work may be observed through the future. |
| 20 | What does `Future.isDone()` mean? | The task completed, failed, or was cancelled. | It does not mean the task completed successfully. |
| 21 | What does `Future.get(timeout, unit)` add? | A maximum wait followed by `TimeoutException` if unfinished. | Timing out does not automatically cancel the task. |
| 22 | What is the difference between `shutdown()` and `shutdownNow()`? | The first stops new submissions and finishes queued work; the second attempts interruption and returns never-started tasks. | Neither guarantees an already running task immediately stops. |
| 23 | What does `invokeAll()` return? | Futures for a collection of submitted callables, after completion or timeout behavior. | Result order corresponds to task-list order, not completion order. |
| 24 | What object does a synchronized instance method lock? | `this`. | A static synchronized method locks the `Class` object instead. |
| 25 | Why should `Lock.unlock()` usually be in `finally`? | To release the lock even when protected code throws. | Forgetting to unlock can permanently block other threads. |
| 26 | What does `tryLock()` provide? | A nonblocking or timed attempt to acquire a lock. | Code must check the boolean result before entering the protected section. |
| 27 | What is `CyclicBarrier` for? | Making a fixed number of threads wait at a common synchronization point. | The barrier can be reused after all parties arrive. |
| 28 | Which concurrent sorted collections are available? | `ConcurrentSkipListMap` and `ConcurrentSkipListSet`. | Their sorted behavior differs from hash-based `ConcurrentHashMap`. |
| 29 | What is a stateful lambda in a parallel stream? | One that reads or mutates shared changing state outside the operation. | It can create races and nondeterministic results. |
| 30 | How do `forEach()` and `forEachOrdered()` differ on parallel streams? | The latter preserves encounter order; the former may process in any order. | Preserving order can reduce parallel performance. |

## Chapter 14 - I/O

| # | Front | Back | Exam trap |
|---:|---|---|---|
| 1 | How are `File` and `Path` created? | `File` via constructors; immutable `Path` via `Path.of()`/filesystem APIs. | Creating either object does not create a filesystem entry. |
| 2 | Is `Path` immutable? | Yes; methods such as `resolve`, `normalize`, and `relativize` return new paths. | Ignoring the returned path ignores the operation. |
| 3 | What does `normalize()` do? | Removes redundant name elements such as `.` and resolvable `..` syntactically. | It does not necessarily access the filesystem or resolve symbolic links. |
| 4 | What does `toRealPath()` do? | Resolves an existing path to a real absolute path, handling links according to options. | Unlike normalize/absolute conversion, it generally requires existence. |
| 5 | What is required for `relativize()`? | Compatible path types/roots; it computes a route from one path to another. | Mixing absolute and relative paths usually fails. |
| 6 | How does `resolve()` treat an absolute argument? | The absolute argument usually replaces the base. | It does not blindly concatenate every argument. |
| 7 | What are the three major I/O stream classifications? | Byte vs. character; input vs. output; low-level vs. high-level. | `Stream` names are byte-oriented; `Reader`/`Writer` names are character-oriented. |
| 8 | What do input and output mean? | Input reads into the program; output writes from the program. | Interpret direction from the program's perspective. |
| 9 | What is stream wrapping? | A high-level stream decorates another stream for buffering, conversion, objects, etc. | Constructor types must form a compatible chain. |
| 10 | Why use buffering? | Reduce expensive underlying I/O calls and provide convenient bulk/line operations. | Flush output when required; closing generally flushes first. |
| 11 | Which classes serialize objects? | `ObjectOutputStream` writes; `ObjectInputStream` reads. | The write/read order and types must match. |
| 12 | What makes a class serializable? | Implements `Serializable`; reachable non-transient instance state must also be serializable. | Static fields are not instance state; transient fields restore default values. |
| 13 | Are constructors run during normal deserialization? | Serializable-class constructors are skipped; initialization rules involve the first nonserializable superclass. | Field initializers for serializable state do not simply rerun as in normal construction. |
| 14 | What is `serialVersionUID` for? | Version compatibility identity for serialized classes. | Letting it be generated can make small class changes break deserialization. |
| 15 | What are the standard system streams? | `System.in`, `System.out`, `System.err`. | Closing a wrapper may close the underlying global stream. |
| 16 | Why use `Console.readPassword()`? | It can read sensitive input without echoing and returns `char[]`. | `System.console()` may be `null`, especially in IDEs/noninteractive environments. |
| 17 | What is the Files API traversal trap? | Methods like `walk()` return lazy streams that should be closed. | Depth, symlink options, and laziness affect which files are visited and when errors occur. |
| 18 | How are file attributes accessed? | Individual `Files` methods or bulk/view APIs such as basic/POSIX attributes. | Attribute views are filesystem-specific; not all systems support every view. |
| 19 | What do `Path.getNameCount()` and `getName(i)` count? | Name elements excluding the root. | The root is not name element zero. |
| 20 | What does `Path.subpath(begin,end)` return? | A relative path using name elements from begin inclusive to end exclusive. | It never includes the original root. |
| 21 | How do `isAbsolute()` and `toAbsolutePath()` differ? | The first tests; the second converts using the current environment when needed. | An absolute path is not necessarily normalized or guaranteed to exist. |
| 22 | How do `Files.delete()` and `deleteIfExists()` differ? | `delete()` throws when absent; `deleteIfExists()` returns false. | Both can fail for a nonempty directory. |
| 23 | What option commonly allows `Files.copy()` to overwrite? | `StandardCopyOption.REPLACE_EXISTING`. | Copying a directory does not recursively copy all descendants by default. |
| 24 | What is notable about `Files.move()` with `ATOMIC_MOVE`? | It requests an indivisible filesystem move when supported. | Unsupported atomic moves can throw `AtomicMoveNotSupportedException`. |
| 25 | How do `Files.list()` and `Files.walk()` differ? | `list()` returns immediate children; `walk()` traverses recursively to a depth. | Both return lazy streams that should be closed. |
| 26 | What does `Files.find()` add over `walk()`? | A predicate receiving both the path and basic attributes during traversal. | The stream is still lazy and closeable. |
| 27 | How are byte and character stream classes recognized? | Byte streams end in `InputStream`/`OutputStream`; character streams in `Reader`/`Writer`. | Choose character streams for decoded text. |
| 28 | What do `mark()` and `reset()` require? | A stream that reports `markSupported()` as true and a valid mark within its read limit. | Not every stream supports repositioning. |
| 29 | Are static and transient fields serialized by default? | No. | Static state belongs to the class; transient instance state receives defaults after deserialization. |
| 30 | Which constructor runs when a serializable object is deserialized? | The first non-serializable superclass constructor. | Serializable-class constructors and field initializers are skipped in normal deserialization. |

## Rapid Review: Cross-Chapter Traps

| # | Front | Back | Exam trap |
|---:|---|---|---|
| 1 | What should you check first when code “almost compiles”? | Scope, types/promotions, access, checked exceptions, exhaustiveness, and effectively-final rules. | The exam often hides one compile-time failure before asking about output. |
| 2 | What should you do before tracing runtime output? | Confirm every line compiles and identify any exception that occurs first. | Do not trace unreachable output after a compile error or earlier exception. |
| 3 | What recurring immutability rule spans core APIs? | `String`, date/time classes, `Path`, and many value APIs return new objects. | Ignoring a return value is a frequent no-op trap. |
| 4 | What recurring identity-versus-value rule matters? | `==` checks primitive value or reference identity; `equals()` may check logical value. | Wrapper caching, strings, records, and collections make identity guesses unreliable. |
| 5 | What recurring “declared vs. actual type” distinction matters? | Overloads/fields/static members use compile-time information; overridden instance methods use runtime type. | Polymorphism does not apply uniformly to every member. |
| 6 | What recurring resource rule matters? | Executors, streams, files streams, and database-like resources need deterministic cleanup. | Relying on garbage collection is not resource management. |
