	.file	"struct_union.c"
	.text
	.globl	moveij
	.type	moveij, @function
moveij:
.LFB23:
	.cfi_startproc
	endbr64
	movl	(%rdi), %eax
	movl	%eax, 4(%rdi)
	ret
	.cfi_endproc
.LFE23:
	.size	moveij, .-moveij
	.globl	opP
	.type	opP, @function
opP:
.LFB24:
	.cfi_startproc
	endbr64
	movl	4(%rdi), %eax
	addl	(%rdi), %eax
	cltq
	leaq	8(%rdi,%rax,4), %rax
	movq	%rax, 16(%rdi)
	ret
	.cfi_endproc
.LFE24:
	.size	opP, .-opP
	.section	.rodata.str1.8,"aMS",@progbits,1
	.align 8
.LC0:
	.string	"sizeof S3 is %lu, sizeof U3 is %lu"
	.align 8
.LC1:
	.string	"sizeof nodetype_t is %lu, sizeof node_t is %lu"
	.text
	.globl	main
	.type	main, @function
main:
.LFB25:
	.cfi_startproc
	endbr64
	subq	$8, %rsp
	.cfi_def_cfa_offset 16
	movl	$8, %ecx
	movl	$24, %edx
	leaq	.LC0(%rip), %rsi
	movl	$1, %edi
	movl	$0, %eax
	call	__printf_chk@PLT
	movl	$4, %ecx
	movl	$24, %edx
	leaq	.LC1(%rip), %rsi
	movl	$1, %edi
	movl	$0, %eax
	call	__printf_chk@PLT
	movl	$0, %eax
	addq	$8, %rsp
	.cfi_def_cfa_offset 8
	ret
	.cfi_endproc
.LFE25:
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
