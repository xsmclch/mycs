- Generate filename.s assembly file
    ```
    gcc -Og -S filename.c
    ```
- Generate filename.o file
    ```
    gcc -Og -c filename.c
    ```
- Then use
    ```
    objdump -d filename.o
    ```
    
    to disassemble!