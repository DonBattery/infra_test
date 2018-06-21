## Infra Test Task

### Required
1. Create a git repo, and commit your code into it - just like you would do on a normal work
day

2. The server can be started and listens on localhost:3030

3. Create the following endpoints:
a. GET /fizzbuzz/{number}​ - Depending on the value of number, the server should
return “fizz” it’s divisible by 3, “buzz” if divisible by 5 and “fizzbuzz” if divisible by
both.
b. POST /count​ - The request body should contain a JSON object with one field
called “data”. The value of data should be a string. The server takes the string
from the “data” field and returns an associative array (hash, map, dictionary,
however the implementation is called in the language) where the keys are the
letters of the input string and the values are the number of occurrences of that
letter. (e. g. if the input string is “aaa” then the response is ‘a: 3’)
c. POST /run​ - The request body should contain a JSON object with one field called
“command”. The value of command should be a string. The server takes the
command and runs it using a system call, waits for it to finish and returns the
output. (e. g. if the value of command is “pwd” then the return value will be the
current working directory)

4. Create a Dockerfile and run the server in a container

5. Create a shell script that builds the docker image and runs the container
