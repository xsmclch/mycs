	.file	"operator.c"
	.text
	.globl	swap
	.type	swap, @function
swap:
.LFB17:
	.cfi_startproc
	endbr64
	movq	(%rsi), %rax
	xorq	(%rdi), %rax
	movq	%rax, (%rdi)
	xorq	(%rsi), %rax
	movq	%rax, (%rsi)
	xorq	%rax, (%rdi)
	ret
	.cfi_endproc
.LFE17:
	.size	swap, .-swap
	.globl	main
	.type	main, @function
main:
.LFB16:
	.cfi_startproc
	endbr64
	subq	$40, %rsp
	.cfi_def_cfa_offset 48
	movq	%fs:40, %rax
	movq	%rax, 24(%rsp)
	xorl	%eax, %eax
	movq	$1, 8(%rsp)
	movq	$-1, 16(%rsp)
	leaq	16(%rsp), %rsi
	leaq	8(%rsp), %rdi
	call	swap
	movq	24(%rsp), %rax
	subq	%fs:40, %rax
	jne	.L5
	movl	$0, %eax
	addq	$40, %rsp
	.cfi_remember_state
	.cfi_def_cfa_offset 8
	ret
.L5:
	.cfi_restore_state
	call	__stack_chk_fail@PLT
	.cfi_endproc
.LFE16:
	.size	main, .-main
	.globl	sal
	.type	sal, @function
sal:
.LFB18:
	.cfi_startproc
	endbr64
	movq	(%rdi), %rax
	addq	%rax, %rax
	ret
	.cfi_endproc
.LFE18:
	.size	sal, .-sal
	.globl	not
	.type	not, @function
not:
.LFB19:
	.cfi_startproc
	endbr64
	movq	(%rdi), %rax
	notq	%rax
	ret
	.cfi_endproc
.LFE19:
	.size	not, .-not
	.globl	scale
	.type	scale, @function
scale:
.LFB20:
	.cfi_startproc
	endbr64
	leaq	(%rdi,%rsi,4), %rax
	leaq	(%rdi,%rdi,2), %rdx
	leaq	(%rax,%rdx,4), %rax
	ret
	.cfi_endproc
.LFE20:
	.size	scale, .-scale
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
