	.file	"loop.c"
	.text
	.globl	func_do
	.type	func_do, @function
func_do:
.LFB0:
	.cfi_startproc
	endbr64
	movl	$1, %eax
.L2:
	imull	%edi, %eax
	subl	$1, %edi
	cmpl	$1, %edi
	jg	.L2
	ret
	.cfi_endproc
.LFE0:
	.size	func_do, .-func_do
	.globl	func_while
	.type	func_while, @function
func_while:
.LFB1:
	.cfi_startproc
	endbr64
	movl	$1, %eax
	jmp	.L4
.L5:
	imull	%edi, %eax
	subl	$1, %edi
.L4:
	cmpl	$1, %edi
	jg	.L5
	ret
	.cfi_endproc
.LFE1:
	.size	func_while, .-func_while
	.globl	func_for
	.type	func_for, @function
func_for:
.LFB2:
	.cfi_startproc
	endbr64
	movl	$2, %eax
	movl	$1, %edx
	jmp	.L7
.L8:
	imull	%eax, %edx
	addl	$1, %eax
.L7:
	cmpl	%edi, %eax
	jle	.L8
	movl	%edx, %eax
	ret
	.cfi_endproc
.LFE2:
	.size	func_for, .-func_for
	.globl	switch_eg
	.type	switch_eg, @function
switch_eg:
.LFB3:
	.cfi_startproc
	endbr64
	subl	$100, %esi
	cmpl	$6, %esi
	ja	.L16
	movl	%esi, %esi
	leaq	.L12(%rip), %rcx
	movslq	(%rcx,%rsi,4), %rax
	addq	%rcx, %rax
	notrack jmp	*%rax
	.section	.rodata
	.align 4
	.align 4
.L12:
	.long	.L15-.L12
	.long	.L16-.L12
	.long	.L14-.L12
	.long	.L13-.L12
	.long	.L11-.L12
	.long	.L16-.L12
	.long	.L11-.L12
	.text
.L15:
	leal	(%rdi,%rdi,2), %eax
	leal	(%rdi,%rax,4), %edi
.L10:
	movl	%edi, (%rdx)
	ret
.L14:
	addl	$10, %edi
	jmp	.L10
.L13:
	addl	$11, %edi
	jmp	.L10
.L11:
	imull	%edi, %edi
	jmp	.L10
.L16:
	movl	$0, %edi
	jmp	.L10
	.cfi_endproc
.LFE3:
	.size	switch_eg, .-switch_eg
	.globl	main
	.type	main, @function
main:
.LFB4:
	.cfi_startproc
	endbr64
	movl	$0, %eax
	ret
	.cfi_endproc
.LFE4:
	.size	main, .-main
	.ident	"GCC: (Ubuntu 11.4.0-1ubuntu1~22.04) 11.4.0"
	.section	.note.GNU-stack,"",@progbits
	.section	.note.gnu.property,"a"
	.align 8
	.long	1f - 0f
	.long	4f - 1f
	.long	5
0:
	.string	"GNU"
1:
	.align 8
	.long	0xc0000002
	.long	3f - 2f
2:
	.long	0x3
3:
	.align 8
4:
