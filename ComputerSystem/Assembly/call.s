	.file	"call.c"
	.text
	.globl	proc
	.type	proc, @function
proc:
.LFB0:
	.cfi_startproc
	endbr64
	movq	16(%rsp), %rax
	addq	%rdi, (%rsi)
	addl	%edx, (%rcx)
	addw	%r8w, (%r9)
	movl	8(%rsp), %edx
	addb	%dl, (%rax)
	ret
	.cfi_endproc
.LFE0:
	.size	proc, .-proc
	.globl	swap_add
	.type	swap_add, @function
swap_add:
.LFB1:
	.cfi_startproc
	endbr64
	movq	(%rdi), %rax
	movq	(%rsi), %rdx
	movq	%rdx, (%rdi)
	movq	%rax, (%rsi)
	addq	%rdx, %rax
	ret
	.cfi_endproc
.LFE1:
	.size	swap_add, .-swap_add
	.globl	caller
	.type	caller, @function
caller:
.LFB2:
	.cfi_startproc
	endbr64
	subq	$40, %rsp
	.cfi_def_cfa_offset 48
	movq	%fs:40, %rax
	movq	%rax, 24(%rsp)
	xorl	%eax, %eax
	movq	$534, 8(%rsp)
	movq	$1057, 16(%rsp)
	leaq	16(%rsp), %rsi
	leaq	8(%rsp), %rdi
	call	swap_add
	movq	8(%rsp), %rdx
	subq	16(%rsp), %rdx
	imulq	%rdx, %rax
	movq	24(%rsp), %rdx
	subq	%fs:40, %rdx
	jne	.L6
	addq	$40, %rsp
	.cfi_remember_state
	.cfi_def_cfa_offset 8
	ret
.L6:
	.cfi_restore_state
	call	__stack_chk_fail@PLT
	.cfi_endproc
.LFE2:
	.size	caller, .-caller
	.globl	call_proc
	.type	call_proc, @function
call_proc:
.LFB3:
	.cfi_startproc
	endbr64
	subq	$40, %rsp
	.cfi_def_cfa_offset 48
	movq	%fs:40, %rax
	movq	%rax, 24(%rsp)
	xorl	%eax, %eax
	movq	$1, 16(%rsp)
	movl	$2, 12(%rsp)
	movw	$3, 10(%rsp)
	movb	$4, 9(%rsp)
	leaq	12(%rsp), %rcx
	leaq	16(%rsp), %rsi
	leaq	9(%rsp), %rax
	pushq	%rax
	.cfi_def_cfa_offset 56
	pushq	$4
	.cfi_def_cfa_offset 64
	leaq	26(%rsp), %r9
	movl	$3, %r8d
	movl	$2, %edx
	movl	$1, %edi
	call	proc
	movslq	28(%rsp), %rax
	addq	32(%rsp), %rax
	movswl	26(%rsp), %edx
	movsbl	25(%rsp), %ecx
	subl	%ecx, %edx
	movslq	%edx, %rdx
	imulq	%rdx, %rax
	addq	$16, %rsp
	.cfi_def_cfa_offset 48
	movq	24(%rsp), %rdx
	subq	%fs:40, %rdx
	jne	.L10
	addq	$40, %rsp
	.cfi_remember_state
	.cfi_def_cfa_offset 8
	ret
.L10:
	.cfi_restore_state
	call	__stack_chk_fail@PLT
	.cfi_endproc
.LFE3:
	.size	call_proc, .-call_proc
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
