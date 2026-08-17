---
chapter: 12
title: "Modules"
questionCount: 25
sourceQuestionPdfPages: "1091-1102"
sourceAnswerPdfPages: "1398-1402"
---

# Chapter 12: Modules

## Question 1

### Prompt

Which statement is true of the following module?

    |---zoo
       |-- staff
          |-- Vet.java
    A. The directory structure shown is a valid module.
    B. The directory structure would be a valid module if
        module.java were added directly underneath
        zoo/staff.
    C. The directory structure would be a valid module if
        module.java were added directly underneath zoo.
    D. The directory structure would be a valid module if
        module-info.java were added directly underneath
        zoo/staff.
    E. The directory structure would be a valid module if
        module-info.java were added directly underneath zoo.
    F. None of these changes would make this directory
        structure a valid module.

### Correct answer

E

### Explanation

Modules are required to have a module-info.java file at the root directory of the module. Option E matches this requirement.

## Question 2

### Prompt

Suppose module puppy depends on module dog and
   module dog depends on module animal. Fill in the blank
   so that code in module dog can access the
   animal.behavior package in module animal.

   module animal {
       _________ animal.behavior;
   }
    A. export
    B. exports
    C. require
    D. requires
    E. require transitive
    F. requires transitive
    G. None of the above

### Correct answer

B

### Explanation

Options A, C, and E are incorrect because they refer to directives that don’t exist. The exports directive is used when allowing a package to be called by code outside of the module, making option B the correct answer. Notice that options D and F are incorrect because requires is the wrong keyword to use.

## Question 3

### Prompt

Fill in the blanks so this command to run the program
   is correct:
   java
   _________ modules
   _________ zoo.animal.talks/zoo/animal/talks/Peacocks
    A. -d and -m
    B. -d and –p
    C. -m and -d
    D. -m and -p
    E. -p and -d
    F. -p and -m
    G. None of the above

### Correct answer

G

### Explanation

The -p or --module-path option is used to specify the location of the modules. The -m or --module option is used to specify the module and class name. However, running a program requires the package name to be specified with periods (.) instead of slashes. Since the command is incorrect, option G is correct.

## Question 4

### Prompt

Which of the following pairs make up a service?
    A. Consumer and service locator
    B. Consumer and service provider interface
    C. Service locator and service provider
    D. Service locator and service provider interface
    E. Service provider and service provider interface

### Correct answer

D

### Explanation

A service consists of the service provider interface and logic to look up implementations using a service locator. This makes option D correct. Make sure you know that the service provider itself is the implementation, which is not considered part of the service.

## Question 5

### Prompt

A(n) _____________ module is on the classpath while a(n)
   _____________ module is on the module path. (Choose all
   that apply.)
    A. automatic, named
    B. automatic, unnamed
    C. named, automatic
    D. named, unnamed
    E. unnamed, automatic
    F. unnamed, named
    G. None of the above

### Correct answer

E, F

### Explanation

Automatic modules are on the module path but do not have a module-info.java file. Named modules are on the module path and do have a module-info.java. Unnamed modules are on the classpath. Therefore, options E and F are correct.

## Question 6

### Prompt

Which of the following statements are true in a module-
   info.java file? (Choose all that apply.)
    A. The opens directive allows the use of reflection.
    B. The opens directive declares that an API is called.
    C. The use directive allows the use of reflection.
    D. The use directive declares that an API is called.
    E. The uses directive allows the use of reflection.
    F. The uses directive declares that an API is called.

### Correct answer

A, F

### Explanation

Options C and D are incorrect because there is no use directive. Options A and F are correct because opens is for reflection and uses declares that an API consumes a service.

## Question 7

### Prompt

An automatic module name is generated if one is not
   supplied. Which of the following JAR filenames and
   generated automatic module name pairs are correct?
   (Choose all that apply.)
    A. emily-1.0.0.jar and emily
    B. emily-1.0.0-SNAPSHOT.jar and emily
    C. emily_the_cat-1.0.0.jar and emily_the_cat
    D. emily_the_cat-1.0.0.jar and emily-the-cat
    E. emily.$.jar and emily
    F. emily.$.jar and emily.
    G. emily.$.jar and emily..

### Correct answer

A, B, E

### Explanation

Any version information at the end of the JAR filename is removed, making options A and B correct. Underscores (_) are turned into dots (.), making options C and D incorrect. Other special characters like a dollar sign ($) are also turned into dots. However, adjacent dots are merged, and leading/trailing dots are removed. Therefore, option E is also correct.

## Question 8

### Prompt

Which of the following statements are true? (Choose all
   that apply.)
    A. Modules with cyclic dependencies will not compile.
    B. Packages with a cyclic dependency will not
        compile.
    C. A cyclic dependency always involves exactly two
        modules.
    D. A cyclic dependency always involves at least two
        requires statements.
      E. An unnamed module can be involved in a cyclic
         dependency with an automatic module.

### Correct answer

A, D

### Explanation

A cyclic dependency is when a module graph forms a circle. Option A is correct because the Java Platform Module System does not allow cyclic dependencies between modules. No such restriction exists for packages, making option B incorrect. A cyclic dependency can involve two or more modules that require each other, making option D correct, while option C is incorrect. Finally, option E is incorrect because unnamed modules cannot be referenced from an automatic module.

## Question 9

### Prompt

Suppose you are creating a service provider that
    contains the following class. Which line of code needs
    to be in your module-info.java?

    package dragon;
    import magic.*;
    public class Dragon implements Magic {
       public String getPower() {
         return "breathe fire";
       }
    }
      A. provides dragon.Dragon by magic.Magic;
      B. provides dragon.Dragon using magic.Magic;
      C. provides dragon.Dragon with magic.Magic;
      D. provides magic.Magic by dragon.Dragon;
      E. provides magic.Magic using dragon.Dragon;
      F. provides magic.Magic with dragon.Dragon;

### Correct answer

F

### Explanation

The provides directive takes the interface name first and the implementing class name second and also uses with. Only option F meets these two criteria, making it the correct answer.

## Question 10

### Prompt

What is true of a module containing a file named module-
    info.java with the following contents? (Choose all that
    apply.)

    module com.food.supplier {}
      A. All packages inside the module are automatically
         exported.
      B. No packages inside the module are automatically
         exported.
      C. A main method inside the module can be run.
      D. A main method inside the module cannot be run
         since the class is not exposed.
      E. The module-info.java file contains a compiler error.
      F. The module-info.java filename is incorrect.

### Correct answer

B, C

### Explanation

Packages inside a module are not exported by default, making option B correct and option A incorrect. Exporting is necessary for other code to use the packages; it is not necessary to call the main() method at the command line, making option C correct and option D incorrect. The module-info.java file has the correct name and compiles, making options E and F incorrect.

## Question 11

### Prompt

Suppose module puppy depends on module dog and
    module dog depends on module animal. Which lines allow
    module puppy to access the animal.behavior package in
    module animal? (Choose all that apply.)

    module animal {
       exports animal.behavior;
    }
    module dog {
         _____________ animal;  // line S
    }
    module puppy {
         _____________ dog;     // line T
    }
      A. require on line S
      B. require on line T
      C. requires on line S
      D. requires on line T
      E. require transitive on line S
      F. require transitive on line T
      G. requires transitive on line S
      H. requires transitive on line T

### Correct answer

D, G, H

### Explanation

Options A, B, E, and F are incorrect because they refer to directives that don’t exist. The requires transitive directive is used when specifying a module to be used by the requesting module and any other modules that use the requesting module. Therefore, dog needs to specify the transitive relationship, and option G is correct. The module puppy just needs requires dog, and it gets the transitive dependencies, making option D correct. However, requires transitive does everything requires does and more, which makes option H the final correct answer.

## Question 12

### Prompt

Which of the following modules are provided by the
    JDK? (Choose all that apply.)
      A. java.base
      B. java.desktop
      C. java.logging
      D. java.util
      E. jdk.base
      F. jdk.compiler
      G. jdk.xerces

### Correct answer

A, B, C, F

### Explanation

Option D is incorrect because it is a package name rather than a module name. Option E is incorrect because java.base is the module name, not jdk.base. Option G is wrong because we made it up. Options A, B, C, and F are correct.

## Question 13

### Prompt

Which of the following compiles and is equivalent to
    this loop?

    List<Unicorn> all  = new ArrayList<>();
    for (Unicorn current : ServiceLoader.load(Unicorn.class))
       all.add(current);
      A.

         List<Unicorn> all = ServiceLoader.load(Unicorn.class)
         .getStream()
         .toList();
      B.

         List<Unicorn> all = ServiceLoader.load(Unicorn.class)
         .stream()
         .toList();
      C.

         List<Unicorn> all = ServiceLoader.load(Unicorn.class)
         .getStream()
         .map(Provider::get)
         .toList();
      D. List<Unicorn> all = ServiceLoader.load(Unicorn.class)
         .stream()
         .map(Provider::get)
         .toList();
      E. None of the above

### Correct answer

D

### Explanation

There is no getStream() method on a ServiceLoader, making options A and C incorrect. Option B does not compile because the stream() method returns a list of Provider interfaces and needs to be converted to the Unicorn interface we are interested in. Therefore, option D is correct.

## Question 14

### Prompt

Which of the following is a legal command to run a
    modular program where n is the module name and c is
    the fully qualified class name?
      A. java --module-path x -m n.c
      B. java --module-path x -p n.c
      C. java --module-path x-x -m n/c
     D. java --module-path x -p n/c
      E. java --module-path x-x -m n-c
      F. java --module-path x -p n-c
     G. None of the above

### Correct answer

C

### Explanation

The -p option is a shorter form of --module-path. Since the same option cannot be specified twice, options B, D, and F are incorrect. The module name and class name are separated with a slash, making option C the answer. Note that x-x is legal because the module path is a folder name, so dashes are allowed.

## Question 15

### Prompt

For a top-down migration, all modules other than
    named modules are _____________ modules and are on
    the _____________.
      A. automatic, classpath
      B. automatic, module path
      C. unnamed, classpath
     D. unnamed, module path
      E. None of the above

### Correct answer

B

### Explanation

A top-down migration strategy first places all JARs on the module path. Then it migrates the top-level module to be a named module, leaving the other modules as automatic modules. Option B is correct as it matches both of those characteristics.

## Question 16

### Prompt

Suppose you have separate modules for a service
    provider interface, service provider, service locator,
    and consumer. If you add a second service provider
    module, how many of the existing modules do you need
    to recompile?
      A. Zero
      B. One
      C. Two
     D. Three
      E. Four

### Correct answer

A

### Explanation

Since this is a new module, you need to compile it. However, none of the existing modules needs to be recompiled, making option A correct. The service locator will see the new service provider simply by having that new service provider on the module path.

## Question 17

### Prompt

Suppose we have a JAR file named cat-1.2.3-RC1.jar,
    and Automatic-Module-Name in the MANIFEST.MF is set to dog.
    What should an unnamed module referencing this
    automatic module include in module-info.java?
      A. requires cat;
      B. requires cat.RC;
      C. requires cat-RC;
      D. requires dog;
      E. None of the above

### Correct answer

E

### Explanation

Trick question! An unnamed module doesn’t use a module-info.java file. Therefore, option E is correct. An unnamed module can access an automatic module. The unnamed module would simply treat the automatic module as a regular JAR without involving the module- info.java file.

## Question 18

### Prompt

Two commands create artifacts that include smaller
    versions of the JDK. Which are used to create an .exe
    file and a directory, respectively?
      A. jimage and jlink
      B. jimage and jpackage
      C. jlink and jimage
      D. jlink and jpackage
      E. jpackage and jimage
      F. jpackage and jlink

### Correct answer

F

### Explanation

The jpackage command creates self-contained application such as an .exe. The jlink command creates a directory with a smaller Java runtime containing just what is needed. The jimage command is used to inspect a Java image file. Therefore, option F is correct.

## Question 19

### Prompt

Which is a true statement about the following module?

    class dragon {
       exports com.dragon.fire;
       exports com.dragon.scales to castle;
    }
      A. All modules can reference the com.dragon.fire
         package.
      B. All modules can reference the com.dragon.scales
         package.
      C. Only the castle module can reference the
         com.dragon.fire package.
      D. Only the castle module can reference the
         com.dragon.scales package.
      E. None of the above.

### Correct answer

E

### Explanation

There is a trick here. A module definition uses the keyword module rather than class. Since the code does not compile, option E is correct. If the code did compile, options A and D would be correct.

## Question 20

### Prompt

Which would you expect to see when describing any
    module?
      A. requires java.base mandated
      B. requires java.core mandated
      C. requires java.lang mandated
     D. requires mandated java.base
      E. requires mandated java.core
      F. requires mandated java.lang
     G. None of the above

### Correct answer

A

### Explanation

When running java with the -d option, all the required modules are listed. Additionally, the java.base module is listed since it is included automatically. The line ends with mandated, making option A correct. The java.lang is a trick since it is a package that is imported by default in a class rather than a module.

## Question 21

### Prompt

Suppose you have separate modules for a service
    provider interface, service provider, service locator,
    and consumer. Which module(s) need to specify a
    requires directive on the service provider?
      A. Service locator
      B. Service provider interface
      C. Consumer
     D. Consumer and service locator
      E. Consumer and service provider
      F. Service locator and service provider interface
     G. Consumer, service locator, and service provider
         interface
     H. None of the above

### Correct answer

H

### Explanation

This question is tricky. The service locator must have a uses directive, but that is on the service provider interface. No modules need to specify requires on the service provider since that is the implementation. Since none of the options are correct, option H is the answer.

## Question 22

### Prompt

Which are true statements? (Choose all that apply.)
      A. An automatic module exports all packages to
         named modules.
      B. An automatic module exports only the specified
         packages to named modules.
      C. An automatic module exports no packages to
         named modules.
      D. An unnamed module exports only the named
         packages to named modules.
      E. An unnamed module exports all packages to named
         modules.
      F. An unnamed module exports no packages to named
         modules.

### Correct answer

A, F

### Explanation

An automatic module exports all packages, making option A correct. An unnamed module is not available to any modules on the module path. Therefore, it doesn’t export any packages, and option F is correct.

## Question 23

### Prompt

Which is the first line to contain a compiler error?

    1: module snake {
    2:    exports com.snake.tail;
    3:    exports com.snake.fangs to bird;
    4:    requires skin;
    5:    requires transitive skin;
    6: }
      A. Line 1.
      B. Line 2.
      C. Line 3.
      D. Line 4.
      E. Line 5.
      F. The code does not contain any compiler errors.

### Correct answer

E

### Explanation

The module name is valid, as are the exports statements. Lines 4 and 5 are tricky because each is valid independently. However, the same module name is not allowed to be used in two requires statements. The second one fails to compile on line 5, making option E the answer.

## Question 24

### Prompt

Which is a true statement about a package in a JAR on
    the classpath containing a module-info.java file?
      A. It is possible to make the package available to all
         other modules on the classpath.
      B. It is possible to make the package available to all
         other modules on the module path.
      C. It is possible to make the package available to
         exactly one other specific module on the classpath.
      D. It is possible to make the package available to
         exactly one other specific module on the module
         path.
      E. It is possible to make sure the package is not
         available to any other modules on the classpath.

### Correct answer

A

### Explanation

Since the JAR is on the classpath, it is treated as a regular unnamed module even though it has a module- info.java file inside. Remember from learning about top- down migration that modules on the module path are not allowed to refer to the classpath, making options B and D incorrect. The classpath does not have a facility to restrict packages, making option A correct and options C and E incorrect.

## Question 25

### Prompt

Suppose you have separate modules for a service
    provider interface, service provider, service locator,
    and consumer. Which statements are true about the
    directives you need to specify? (Choose all that apply.)
      A. The consumer must use the requires directive.
      B. The consumer must use the uses directive.
      C. The service locator must use the requires directive.
      D. The service locator must use the uses directive.
      E. None of the above.

### Correct answer

A, C, D

### Explanation

Options A and C are correct because both the consumer and the service locator depend on the service provider interface. Additionally, option D is correct because the service locator must specify that it uses the service provider interface to look it up.
