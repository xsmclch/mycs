- Generate filename.s assembly file
    ```
    gcc -Og -S filename.c
    gcc -Og -S -masm=intel filename.c   # Intel syntax
    ```
- Generate filename.o file
    ```
    gcc -Og -c filename.c
    ```
- Then use
    ```
    objdump -d filename.o
    objdump -d -M intel filename.o      # Intel syntax
    ```
    
    to disassemble!