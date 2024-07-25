	.file	"op_data.c"
	.text
	.section	.rodata.str1.1,"aMS",@progbits,1
.LC0:
	.string	"func is called"
	.text
	.globl	func
	.type	func, @function
func:
.LFB23:
	.cfi_startproc
	endbr64
	pushq	%rbp
	.cfi_def_cfa_offset 16
	.cfi_offset 6, -16
	pushq	%rbx
	.cfi_def_cfa_offset 24
	.cfi_offset 3, -24
	subq	$8, %rsp
	.cfi_def_cfa_offset 32
	movl	%edi, %ebp
	movq	%rsi, %rbx
	leaq	.LC0(%rip), %rdi
	call	puts@PLT
	movl	(%rbx), %eax
	subl	$1, %eax
	movl	%eax, (%rbx)
	addl	%ebp, %eax
	addq	$8, %rsp
	.cfi_def_cfa_offset 24
	popq	%rbx
	.cfi_def_cfa_offset 16
	popq	%rbp
	.cfi_def_cfa_offset 8
	ret
	.cfi_endproc
.LFE23:
	.size	func, .-func
	.section	.rodata.str1.1
.LC1:
	.string	"func2 is called"
	.text
	.globl	func2
	.type	func2, @function
func2:
.LFB24:
	.cfi_startproc
	endbr64
	pushq	%rbp
	.cfi_def_cfa_offset 16
	.cfi_offset 6, -16
	pushq	%rbx
	.cfi_def_cfa_offset 24
	.cfi_offset 3, -24
	subq	$8, %rsp
	.cfi_def_cfa_offset 32
	movl	%edi, %ebp
	movq	%rsi, %rbx
	leaq	.LC1(%rip), %rdi
	call	puts@PLT
	movl	(%rbx), %eax
	addl	$1, %eax
	movl	%eax, (%rbx)
	addl	%ebp, %eax
	addq	$8, %rsp
	.cfi_def_cfa_offset 24
	popq	%rbx
	.cfi_def_cfa_offset 16
	popq	%rbp
	.cfi_def_cfa_offset 8
	ret
	.cfi_endproc
.LFE24:
	.size	func2, .-func2
	.globl	vframe
	.type	vframe, @function
vframe:
.LFB25:
	.cfi_startproc
	endbr64
	pushq	%rbp
	.cfi_def_cfa_offset 16
	.cfi_offset 6, -16
	movq	%rsp, %rbp
	.cfi_def_cfa_register 6
	subq	$16, %rsp
	movq	%rdi, %rcx
	movq	%rsi, %rdi
	movq	%fs:40, %rax
	movq	%rax, -8(%rbp)
	xorl	%eax, %eax
	leaq	15(,%rcx,8), %rax
	movq	%rax, %r8
	andq	$-16, %r8
	andq	$-4096, %rax
	movq	%rsp, %rsi
	subq	%rax, %rsi
.L6:
	cmpq	%rsi, %rsp
	je	.L7
	subq	$4096, %rsp
	orq	$0, 4088(%rsp)
	jmp	.L6
.L7:
	movq	%r8, %rax
	andl	$4095, %eax
	subq	%rax, %rsp
	testq	%rax, %rax
	je	.L8
	orq	$0, -8(%rsp,%rax)
.L8:
	leaq	7(%rsp), %rsi
	movq	%rsi, %rax
	shrq	$3, %rax
	andq	$-8, %rsi
	leaq	-16(%rbp), %r8
	movq	%r8, 0(,%rax,8)
	movq	$1, -16(%rbp)
	jmp	.L9
.L10:
	movq	%rdx, (%rsi,%rax,8)
	addq	$1, -16(%rbp)
.L9:
	movq	-16(%rbp), %rax
	cmpq	%rcx, %rax
	jl	.L10
	movq	(%rsi,%rdi,8), %rax
	movq	(%rax), %rax
	movq	-8(%rbp), %rdx
	subq	%fs:40, %rdx
	jne	.L13
	leave
	.cfi_remember_state
	.cfi_def_cfa 7, 8
	ret
.L13:
	.cfi_restore_state
	call	__stack_chk_fail@PLT
	.cfi_endproc
.LFE25:
	.size	vframe, .-vframe
	.section	.rodata.str1.1
.LC2:
	.string	"x = %d, y = %d\n"
.LC3:
	.string	"address of pc is %p\n"
	.section	.rodata.str1.8,"aMS",@progbits,1
	.align 8
.LC4:
	.string	"address of (int *)px + 7 = %p\n"
	.align 8
.LC5:
	.string	"address of (int *)(px + 7) = %p\n"
	.align 8
.LC6:
	.string	"address of (void *)px + 7 = %p\n"
	.text
	.globl	main
	.type	main, @function
main:
.LFB26:
	.cfi_startproc
	endbr64
	pushq	%rbp
	.cfi_def_cfa_offset 16
	.cfi_offset 6, -16
	pushq	%rbx
	.cfi_def_cfa_offset 24
	.cfi_offset 3, -24
	subq	$24, %rsp
	.cfi_def_cfa_offset 48
	movq	%fs:40, %rax
	movq	%rax, 8(%rsp)
	xorl	%eax, %eax
	movl	$2, 4(%rsp)
	leaq	4(%rsp), %rbp
	movq	%rbp, %rsi
	movl	$1, %edi
	call	func
	movl	4(%rsp), %ecx
	movl	$1, %edx
	leaq	.LC2(%rip), %rbx
	movq	%rbx, %rsi
	movl	$1, %edi
	movl	$0, %eax
	call	__printf_chk@PLT
	movl	$2, 4(%rsp)
	movq	%rbp, %rsi
	movl	$1, %edi
	call	func2
	movl	4(%rsp), %ecx
	movl	$1, %edx
	movq	%rbx, %rsi
	movl	$1, %edi
	movl	$0, %eax
	call	__printf_chk@PLT
	movb	$120, 3(%rsp)
	leaq	3(%rsp), %rdx
	leaq	.LC3(%rip), %rsi
	movl	$1, %edi
	movl	$0, %eax
	call	__printf_chk@PLT
	leaq	31(%rsp), %rdx
	leaq	.LC4(%rip), %rsi
	movl	$1, %edi
	movl	$0, %eax
	call	__printf_chk@PLT
	leaq	10(%rsp), %rbx
	movq	%rbx, %rdx
	leaq	.LC5(%rip), %rsi
	movl	$1, %edi
	movl	$0, %eax
	call	__printf_chk@PLT
	movq	%rbx, %rdx
	leaq	.LC6(%rip), %rsi
	movl	$1, %edi
	movl	$0, %eax
	call	__printf_chk@PLT
	movq	8(%rsp), %rax
	subq	%fs:40, %rax
	jne	.L17
	movl	$0, %eax
	addq	$24, %rsp
	.cfi_remember_state
	.cfi_def_cfa_offset 24
	popq	%rbx
	.cfi_def_cfa_offset 16
	popq	%rbp
	.cfi_def_cfa_offset 8
	ret
.L17:
	.cfi_restore_state
	call	__stack_chk_fail@PLT
	.cfi_endproc
.LFE26:
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
