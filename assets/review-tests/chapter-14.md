---
chapter: 14
title: "I/O"
questionCount: 25
sourceQuestionPdfPages: "1302-1316"
sourceAnswerPdfPages: "1411-1418"
---

# Chapter 14: I/O

## Question 1

### Prompt

Which class would be best to use to read a binary file
    into a Java object?
      A. BufferedStream
      B. FileReader
      C. ObjectInputStream
      D. ObjectReader
      E. ObjectOutputStream
      F. ObjectWriter
      G. None of the above

### Correct answer

C

### Explanation

Since the question asks about putting data into a structured object, the best class would be one that deserializes the data. Therefore, ObjectInputStream is the best choice, which is option C. ObjectWriter, BufferedStream, and ObjectReader are not I/O stream classes. ObjectOutputStream is an I/O class but is used to serialize data, not deserialize it. FileReader can be used to read text file data and construct an object, but the question asks what would be the best class to use for binary data.

## Question 2

### Prompt

Assuming that / is the root directory within the file
    system, which of the following are true statements?
    (Choose all that apply.)
      A. /home/parrot is an absolute path.
      B. /home/parrot is a directory.
      C. /home/parrot is a relative path.
      D. new File("/home") will throw an exception if /home
         does not exist.
      E. new File("/home").delete() will throw an exception if
         /home does not exist.
      F. A Reader offers character encoding, making it more
         useful when working with String data than an
         InputStream.
      G. A Reader offers multithreading support, making it
         more useful than an InputStream.

### Correct answer

A, F

### Explanation

Paths that begin with the root directory are absolute paths, so option A is correct, and option C is incorrect. Option B is incorrect because the path could be a file or directory within the file system. There is no rule that files have to end with a file extension. Option D is incorrect, as it is possible to create a File reference to files and directories that do not exist. Option E is also incorrect. The delete() method returns false if the file or directory cannot be deleted. Character stream classes often include built-in convenience methods for working with String data, so option F is correct. There is no such optimization for multithreading, making option G incorrect.

## Question 3

### Prompt

What are possible results of executing the following
   code? (Choose all that apply.)

   public static void main(String[] args) throws IOException {
      String line;
      var c = System.console();
      Writer w = c.writer();
      try (w) {
         if ((line = c.readLine("Enter your name: ")) != null)
            w.append(line);
          w.flush();
      }
   }
    A. The code runs, but nothing is printed.
    B. The code prints what was entered by the user.
    C. The code behaves the same if throws IOException is
        removed.
    D. A NullPointerException may be thrown.
    E. A NullPointerException will always be thrown.
    F. A NullPointerException will never be thrown.
    G. The code does not compile.

### Correct answer

B, D

### Explanation

If the console is unavailable, System.console() will return null, making option D correct and options E and F incorrect. The writer methods throw a checked IOException, making option C incorrect. The code works correctly, prompting for input and printing it. Therefore, option A is incorrect and option B is correct.

## Question 4

### Prompt

For which value of path sent to this method would it be
   guaranteed for the following code to output Success?

   public void removeBadFile(Path path) {
      if(Files.isDirectory(path))
         System.out.println(Files.deleteIfExists(path)
            ? "Success": "Try Again");
   }
    A. path refers to a regular file in the file system.
    B. path refers to a symbolic link in the file system.
    C. path refers to an empty directory in the file system.
    D. path refers to a directory with content in the file
        system.
    E. path does not refer to a record that exists within the
        file system.
    F. The code does not compile.

### Correct answer

F

### Explanation

The code does not compile, as Files.deleteIfExists() declares the checked IOException that must be handled or declared. Remember, most Files methods declare IOException, especially the ones that modify a file or directory. For this reason, option F is correct.

## Question 5

### Prompt

Assume that the directory /animals exists and is empty.
   What is the result of executing the following code?

   Path path = Path.of("/animals");
   try (var z = Files.walk(path)) {
      boolean b = z
         .filter((p,a) -> a.isDirectory() && !path.equals(p))
   // x
         .findFirst().isPresent();  // y
      System.out.print(b ? "No Sub": "Has Sub");
   }
    A. It prints No Sub.
    B. It prints Has Sub.
    C. The code will not compile because of line x.
    D. The code will not compile because of line y.
    E. The output cannot be determined.
    F. It produces an infinite loop at runtime.

### Correct answer

C

### Explanation

The filter() operation applied to a Stream<Path> takes only one parameter, not two, so the code does not compile, and option C is correct. If the code were rewritten to use the Files.find() method with the BiPredicate as input (along with a maxDepth value), the output would be option B, Has Sub, since the directory is given to be empty. For fun, we reversed the expected output of the ternary operation.

## Question 6

### Prompt

What would be the value of name if the instance of Eagle
   created in the main() method were serialized and then
   deserialized?

   import java.io.Serializable;
   class Bird {
      protected transient String name;
      public void setName(String name) { this.name = name; }
      public String getName() { return name; }
      public Bird() {
         this.name = "Matt";
      }
   }
   public class Eagle extends Bird implements Serializable {
      { this.name = "Olivia"; }
      public Eagle() {
         this.name = "Bridget";
      }
      public static void main(String[] args) {
         var e = new Eagle();
         e.name = "Adeline";
      }
   }
    A. Adeline
    B. Bridget
    C. Matt
    D. Olivia
    E. null
    F. The code does not compile.
    G. The code compiles but throws an exception at
        runtime.

### Correct answer

C

### Explanation

The code compiles and runs without issue, so options F and G are incorrect. The key here is that while Eagle is serializable, its parent class, Bird, is not. Therefore, none of the members of Bird will be serialized. Even if you didn’t know that, you should know what happens on deserialization. During deserialization, Java calls the constructor of the first nonserializable parent. In this case, the Bird constructor is called, with name being set to Matt, making option C correct. Note that none of the constructors or instance initializers in Eagle is executed as part of deserialization.

## Question 7

### Prompt

Assume that /kang exists as a symbolic link to the
   directory /mammal/kangaroo within the file system. Which
   of the following statements are correct about this code
   snippet? (Choose all that apply.)

   var path = Path.of("/kang");
   if(Files.isDirectory(path) && Files.isSymbolicLink(path))
      Files.createDirectory(path.resolve("joey"));
    A. A new directory will always be created.
    B. A new directory may be created.
    C. If the code creates a directory, it will be reachable
        at /kang/joey.
    D. If the code creates a directory, it will be reachable
        at /mammal/joey.
    E. The code does not compile.
    F. The code will compile but will always throw an
        exception at runtime.

### Correct answer

B, C

### Explanation

The code snippet will attempt to create a directory if the target of the symbolic link exists and is a directory. If the directory already exists, though, it will throw an exception. For this reason, option A is incorrect, and option B is correct. It will be created in /mammal/kangaroo/joey and also reachable at /kang/joey because of the symbolic link, making option C correct.

## Question 8

### Prompt

Assuming that the /fox/food-schedule.csv file exists with
   the specified contents, what is the expected output of
   calling printData() on it?

   /fox/food-schedule.csv
   6am,Breakfast
   9am,SecondBreakfast
   12pm,Lunch
   6pm,Dinner

   void printData(Path path) throws IOException {
      Files.readAllLines(path) // r1
         .flatMap(p -> Stream.of(p.split(","))) // r2
          .map(q -> q.toUpperCase())  // r3
          .forEach(System.out::println);
   }
    A. The code will not compile because of line r1.
    B. The code will not compile because of line r2.
    C. The code will not compile because of line r3.
    D. It throws an exception at runtime.
    E. It does not print anything at runtime.
    F. None of the above.

### Correct answer

B

### Explanation

The readAllLines() method returns a List, not a Stream. Therefore, the call to flatMap() is invalid, and option B is correct. If the Files.lines() method were used instead, it would print the contents of the file one capitalized word at a time with the commas removed.

## Question 9

### Prompt

Given the following method and file1 data, which
   statements are correct? (Choose all that apply.)

   // file1 data
   ABCDEF

   public void copyFile(File file1, File file2) throws
   Exception {
      var reader = new InputStreamReader(new
   FileInputStream(file1));
      try (var writer = new FileWriter(file2)) {
         char[] buffer = new char[5];
         while(reader.read(buffer) != -1) {
             writer.write(buffer);
             // n1
         }
       }
    }
      A. The code does not compile because reader is not a
         buffered stream.
      B. The code does not compile because writer is not a
         buffered stream.
      C. The contents of the copied file are: ABCDEF
      D. The contents of the copied file are: ABCDEFBCDE
      E. The contents of the copied file cannot be
         determined.
      F. If we check file2 on line n1 within the file system
         after five iterations of the while loop, it may be
         empty.
      G. If we check file2 on line n1 within the file system
         after five iterations, it will contain exactly 50
         characters.
      H. This method contains a resource leak.

### Correct answer

D, F, H

### Explanation

First, the method does compile, so options A and B are incorrect. Methods to read/write byte[] values exist in the abstract parent of all I/O stream classes. This implementation is not correct, though, as the return value of read(buffer) is not used properly. It will only correctly copy files whose character count is a multiple of 5, making option D correct and options C and E incorrect. Option F is also correct as the data may not have made it to disk yet. Option G would be correct if the flush() method were called after every write. Finally, option H is correct as the reader stream is never closed.

## Question 10

### Prompt

Which of the following correctly create Path instances?
    (Choose all that apply.)
      A. new Path("jaguar.txt")
      B. Path.get("cats","lynx.txt")
      C. new java.io.File("tiger.txt").toPath()
      D. Paths.get("ocelot.txt")
      E. Path.of(".")

### Correct answer

C, D, E

### Explanation

Option A is incorrect because Path is an abstract type so there is no constructor. Option B is incorrect because the static method in the Path interface is of(), not get(). Options C, D, and E are correct ways to obtain a Path instance.

## Question 11

### Prompt

Which classes will allow the following to compile?
    (Choose all that apply.)

    var is = new BufferedInputStream(new
    FileInputStream("z.txt"));
    InputStream wrapper = new
    ____________________________________________ (is);
    try (wrapper) {}
      A. BufferedInputStream
      B. BufferedReader
      C. BufferedWriter
      D. FileInputStream
      E. ObjectInputStream
      F. ObjectOutputStream
      G. None of the above, as the first line does not compile

### Correct answer

A, E

### Explanation

The code will compile if the correct classes are used, so option G is incorrect. Remember, a try-with- resources statement can use resources declared before the start of the statement. The reference type of wrapper is InputStream, so we need a class that inherits InputStream. We can eliminate BufferedWriter, ObjectOutputStream, and BufferedReader since their names do not end in InputStream. Next, we see the class must take another stream as input, so we need to choose the remaining streams that are high-level streams. BufferedInputStream is a high-level stream, so option A is correct. Even though the instance is already a BufferedInputStream, there’s no rule that it can’t be wrapped multiple times by a high-level stream. Option D is incorrect, as FileInputStream operates on a file, not another stream. Finally, option E is correct—an ObjectInputStream is a high-level stream that operates on other streams.

## Question 12

### Prompt

What is the result of executing the following code?
    (Choose all that apply.)

    4: var p = Path.of("sloth.schedule");
    5: var a = Files.readAttributes(p,
    BasicFileAttributes.class);
    6: Files.mkdir(p.resolve(".backup"));
    7: if(a.size()>0 && a.isDirectory()) {
    8:    a.setTimes(null,null,null);
    9: }
      A. It compiles and runs without issue.
      B. The code will not compile because of line 5.
      C. The code will not compile because of line 6.
      D. The code will not compile because of line 7.
      E. The code will not compile because of line 8.
      F. None of the above.

### Correct answer

C, E

### Explanation

The method to create a directory in the Files class is createDirectory(), not mkdir(). For this reason, line 6 does not compile, and option C is correct. In addition, the setTimes() method is available only on BasicFileAttributeView, not the read-only BasicFileAttributes, so line 8 will also not compile, making option E correct.

## Question 13

### Prompt

Which of the following are true statements about
    serialization in Java? (Choose all that apply.)
      A. All non-null instance members of the class must be
         serializable or marked transient.
      B. Records are automatically serializable.
      C. Serialization involves converting data into Java
         objects.
      D. Serializable is a functional interface.
      E. The class must declare a static serialVersionUID
         variable.
      F. The class must extend the Serializable class.
      G. The class must implement the Serializable interface.

### Correct answer

A, G

### Explanation

For a class to be serialized, it must implement the Serializable interface and contain instance members that are serializable or marked transient. For these reasons, options A and G are correct, and option F is incorrect. Option B is incorrect because even records are required to implement Serializable to be serialized. Option C is incorrect because it describes deserialization. The Serializable interface is a marker interface that does not contain any abstract methods, making option D incorrect. While it is a good practice for a serializable class to include a static serialVersionUID variable, it is not required. Therefore, option E is incorrect as well.

## Question 14

### Prompt

What is the output of the following code? (Choose
    three.)

    22: var p1 = Path.of("/zoo/./bear","../food.txt");
    23: p1.normalize().relativize(Path.of("/lion"));
    24: System.out.println(p1);
    25:
    26: var p2 = Path.of("/zoo/animals/bear/koala/food.txt");
    27: System.out.println(p2.subpath(1,3).getName(1));
    28:
    29: var p3 = Path.of("/pets/../cat.txt");
    30: var p4 = Path.of("./dog.txt");
    31: System.out.println(p4.resolve(p3));
      A. ../../lion
      B. /zoo/./bear/../food.txt
      C. animal
      D. bear
      E. /pets/../cat.txt
      F. /pets/../cat.txt/./dog.txt

### Correct answer

B, D, E

### Explanation

Path is immutable, so line 23 is ignored. If it were assigned to p1, option A would be correct. Since it is not assigned, the original value is still present, which is option B. Moving on to the second section, the subpath() method on line 27 is applied to the absolute path, which returns the relative path animals/bear. Next, the getName() method is applied to the relative path, and since this is indexed from 0, it returns the relative path bear. Therefore, option D is correct. Finally, remember calling resolve() with an absolute path as a parameter returns the absolute path, so option E is correct.

## Question 15

### Prompt

Suppose that the working directory is /weather and the
    absolute path /weather/winter/snow.dat represents a file
    that exists within the file system. Which of the following
    lines of code create an object that represents the file?
    (Choose all that apply.)
      A. new File("/weather", "winter", "snow.dat")
      B. new File("/weather/winter/snow.dat")
      C. new File("/weather/winter", new File("snow.dat"))
      D. new File("weather", "/winter/snow.dat")
      E. new File(new File("/weather/winter"), "snow.dat")
      F. Path.of("/weather/winter/snow.dat").toFile()
      G. None of the above

### Correct answer

B, E, F

### Explanation

Option A does not compile, as there is no File constructor that takes three parameters. Option B is correct and is the proper way to create a File instance with a single String parameter. Option C is incorrect, as there is no constructor that takes a String followed by a File. There is a constructor that takes a File followed by a String, making option E correct. Option D is incorrect because the first parameter is missing a slash (/) to indicate it is an absolute path. Since it’s a relative path, it is correct only when the user’s current directory is the root directory. Finally, option F is correct as it creates a File from a Path.

## Question 16

### Prompt

Assuming zoo-data.txt exists and is not empty, what
    statements about the following method are correct?
    (Choose all that apply.)

    private void echo() throws IOException {
       var o = new FileWriter("new-zoo.txt");
       try (var f = new FileReader("zoo-data.txt");
          var b = new BufferedReader(f); o) {

          o.write(b.readLine());
       }
       o.write("");
    }
      A. When run, the method creates a new file with one
         line of text in it.
      B. When run, the method creates a new file with two
         lines of text in it.
      C. When run, the method creates a new file with the
         same number of lines as the original file.
      D. The method compiles but will produce an exception
         at runtime.
      E. The method does not compile.
      F. The method uses byte stream classes.

### Correct answer

A, D

### Explanation

The method compiles, so option E is incorrect. The method creates a new-zoo.txt file and copies the first line from zoo-data.txt into it, making option A correct. The try-with-resources statement closes all of the declared resources, including the FileWriter o. For this reason, the Writer is closed when the last o.write() is called, resulting in an IOException at runtime and making option D correct. Option F is incorrect because this implementation uses the character stream classes, which inherit from Reader or Writer.

## Question 17

### Prompt

Which are true statements? (Choose all that apply.)
      A. NIO.2 includes a method to delete an entire
         directory tree.
      B. NIO.2 includes a method to traverse a directory
         tree.
      C. NIO.2 includes methods that are aware of symbolic
         links.
      D. Files.readAttributes() cannot access file system
         dependent attributes.
      E. Files.readAttributes() is often more performant
         since it reads multiple attributes rather than
         accessing individual attributes.
      F. Files.readAttributes() works with the File object.

### Correct answer

B, C, E

### Explanation

Options B and C are properties of NIO.2 and are good reasons to use it over the java.io.File class. Option A is incorrect as both APIs can delete only empty directories, not a directory tree. Using a view to read multiple attributes leads to fewer round-trips between the process and the file system and better performance, making option E correct. Views can be used to access file system–specific attributes that are not available in Files methods; therefore, option D is incorrect. Files is part of NIO.2, whereas File is part of java.io, which means option F is incorrect.

## Question 18

### Prompt

Assume that reader is a valid stream whose next
    characters are PEACOCKS. Which is true about the output
    of the following code snippet?

    var sb = new StringBuilder();
    sb.append((char)reader.read());
    reader.mark(10);
    for(int i=0; i<2; i++) {
       sb.append((char)reader.read());
       reader.skip(2);
    }
    reader.reset();
    reader.skip(0);
    sb.append((char)reader.read());
    System.out.println(sb.toString());
      A. The code may print PEAE.
      B. The code may print PEOA.
      C. The code may print PEOE.
      D. The code may print PEOS.
      E. The code will always print PEAE.
      F. The code will always print PEOA.
      G. The code will always print PEOE.
      H. The code will always print PEOS.

### Correct answer

C

### Explanation

To begin with, P is added to the StringBuilder first. Next, assuming mark() is supported, the position in the stream is marked before E. The E is added to the StringBuilder, with AC being skipped, and then the O is added to the StringBuilder, with CK being skipped. The stream is then reset() to the position before the E. The call to skip(0) doesn’t do anything since there are no characters to skip, so E is added onto the StringBuilder in the next read() call. The value PEOE is printed, and option C is correct. Option G is incorrect because mark() may not be supported.

## Question 19

### Prompt

Assuming that the directories and files referenced exist
    and are not symbolic links, what is the result of
    executing the following code?

    var p1 =
    Path.of("/lizard",".").resolve(Path.of("walking.txt"));
    var p2 = new
    File("/lizard/././actions/../walking.txt").toPath();
    System.out.print(Files.isSameFile(p1,p2));
    System.out.print(" ");
    System.out.print(p1.equals(p2));
    System.out.print(" ");
    System.out.print(Files.mismatch(p1,p2));
      A. true true -1
      B. true true 0
      C. true false -1
      D. true false 0
      E. false true -1
      F. false true 0
      G. The code does not compile.
      H. The result cannot be determined.

### Correct answer

C

### Explanation

The code compiles and runs without issue, so option G is incorrect. If you simplify the redundant path symbols, p1 and p2 represent the same path, /lizard/walking.txt. Therefore, isSameFile() returns true. The second output is false, because equals() checks only if the path values are the same, without reducing the path symbols. Finally, mismatch() sees that the contents are the same and returns -1. For these reasons, option C is correct.

## Question 20

### Prompt

Assume that monkey.txt is a file that exists in the current
    working directory. Which statement about the following
    code snippet is correct?

    Files.move(Path.of("monkey.txt"), Path.of("/animals"),
       StandardCopyOption.ATOMIC_MOVE);
      A. If /animals/monkey.txt exists, it will be overwritten at
         runtime.
      B. If /animals exists as an empty directory,
         /animals/monkey.txt will be the new location of the
         file.
      C. If the move is successful and another process is
          monitoring the file system, it will not see an
          incomplete file at runtime.
      D. None of the above.

### Correct answer

C

### Explanation

The target path of the file after the move() operation is /animals, not /animals/monkey.txt, so options A and B are both incorrect. Both will throw an exception at runtime since /animals already exists and is a directory. The option ATOMIC_MOVE means that any process monitoring the file system will not see an incomplete file during the move, so option C is correct.

## Question 21

### Prompt

Assume that /monkeys exists as a directory containing
    multiple files, symbolic links, and subdirectories. Which
    statement about the following code is correct?

    var f = Path.of("/monkeys");
    try (var m =
       Files.find(f, 0, (p,a) -> a.isSymbolicLink())) { // y1
          m.map(s -> s.toString())
             .collect(Collectors.toList())
             .stream()
             .filter(s -> s.toString().endsWith(".txt")) // y2
             .forEach(System.out::println);
    }
      A. It will print all symbolic links in the directory tree
          ending in .txt.
      B. It will print the target of all symbolic links in the
          directory ending in .txt.
      C. It will print nothing.
      D. It does not compile because of line y1.
      E. It does not compile because of line y2.
      F. It compiles but throws an exception at runtime.

### Correct answer

C

### Explanation

The code compiles and runs without issue, so options D, E, and F are incorrect. The most important thing to notice is that the depth parameter specified as the second argument to find() is 0, meaning the only record that will be searched is the top-level directory. Since we know that the top directory is a directory and not a symbolic link, no other paths will be visited, and nothing will be printed. For these reasons, option C is the correct answer.

## Question 22

### Prompt

Which of the following fields will be null after an
    instance of the class created on line 17 is serialized and
    then deserialized using ObjectOutputStream and
    ObjectInputStream?

    1:  import java.io.Serializable;
    2:  import java.util.List;
    3:  public class Zebra implements Serializable {
    4:     private transient String name = "George";
    5:     private static String birthPlace = "Africa";
    6:     private transient Integer age;
    7:     List<Zebra> friends = new java.util.ArrayList<>();
    8:     private Object stripes = new Object();
    9:     { age = 10;}
    10:    public Zebra() {
    11:       this.name = "Sophia";
    12:    }
    13:    static Zebra writeAndRead(Zebra z) {
    14:       // Implementation omitted
    15:    }
    16:    public static void main(String[] args) {
    17:       var zebra = new Zebra();
    18:       zebra = writeAndRead(zebra);
    19:    } }
      A. age
      B. birthplace
      C. friends
      D. name
      E. stripes
      F. The code does not compile.
      G. The code compiles but throws an exception at
          runtime.

### Correct answer

G

### Explanation

The code compiles, so option F is incorrect. To be serializable, a class must implement the Serializable interface, which Zebra does. It must also contain instance members that either are marked transient or are serializable. The instance member stripes is of type Object, which is not serializable. If Object implemented Serializable, all objects would be serializable by default, defeating the purpose of having the Serializable interface. Therefore, the Zebra class is not serializable, with the program throwing an exception at runtime if serialized and making option G correct. If stripes were removed from the class, options A and D would be the correct answers, as name and age are both marked transient.

## Question 23

### Prompt

What are some possible results of executing the
    following code? (Choose all that apply.)

    var x = Path.of("/animals/fluffy/..");
    Files.walk(x.toRealPath().getParent())      // u1
       .map(p -> p.toAbsolutePath().toString()) // u2
       .filter(s -> s.endsWith(".java"))
       .forEach(System.out::println);
      A. It prints some files in the root directory.
      B. It prints all files in the root directory.
      C. FileSystemLoopException is thrown at runtime.
      D. Another exception is thrown at runtime.
      E. The code will not compile because of line u1.
      F. The code will not compile because of line u2.

### Correct answer

A, D

### Explanation

The code compiles without issue, so options E and F are incorrect. The toRealPath() method will simplify the path to /animals and throw an exception if it does not exist, making option D correct. If the path does exist, calling getParent() on it returns the root directory. Walking the root directory with the filter expression will print all .java files in the root directory (along with all .java files in the directory tree), making option A correct. Option B is incorrect because it will skip files and directories that do not end in the .java extension. Option C is also incorrect as Files.walk() does not follow symbolic links by default. Only if the FOLLOW_LINKS option is provided and a cycle is encountered will the exception be thrown.

## Question 24

### Prompt

Assume that the source instance passed to the following
    method represents a file that exists. Also assume that
    /flip/sounds.txt exists as a file prior to executing this
    method. When this method is executed, which
    statement correctly copies the file to the path specified
    by /flip/sounds.txt?

    void copyIntoFlipDirectory(Path source) throws IOException
    {
       var dolphinDir = Path.of("/flip");
       dolphinDir = Files.createDirectories(dolphinDir);
       var n = Path.of("sounds.txt");

    Files.copy(source,_________________________________________
    ___);
    }
      A. dolphinDir
      B. dolphinDir.resolve(n),
         StandardCopyOption.REPLACE_EXISTING
      C. dolphinDir, StandardCopyOption.REPLACE_EXISTING
      D. dolphinDir.resolve(n)
      E. The method does not compile, regardless of what is
         placed in the blank.
      F. The method compiles but throws an exception at
         runtime, regardless of what is placed in the blank.

### Correct answer

B

### Explanation

The method compiles without issue, so option E is incorrect. Option F is also incorrect. Even though /flip exists, createDirectories() does not throw an exception if the path already exists. If createDirectory() were used instead, option F would be correct. Next, the copy() command takes a target that is the path to the new file location, not the directory to be copied into. Therefore, the target path should be /flip/sounds.txt, not /flip. For this reason, options A and C are incorrect. Since the question says the file already exists, the REPLACE_EXISTING option must be specified or an exception will be thrown at runtime, making option B the correct answer.

## Question 25

### Prompt

Suppose that you need to read text data from a file and
    want the data to be performant on large files. Which
    two java.io stream classes can be chained together to
    best achieve this result? (Choose two.)
      A. BufferedInputStream
      B. BufferedReader
C. FileInputStream
D. FileReader
E. PrintInputStream
F. ObjectInputStream
G. PrintReader

### Correct answer

B, D

### Explanation

Since you need to read characters, the Reader classes are appropriate. Therefore, you can eliminate options A, C, and F. Additionally, options E and G are incorrect, as they reference classes that do not exist. Options B and D are correct since they read from a file and buffer for performance.
