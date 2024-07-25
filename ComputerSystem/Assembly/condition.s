	.file	"condition.c"
	.text
	.globl	absdiff_se
	.type	absdiff_se, @function
absdiff_se:
.LFB23:
	.cfi_startproc
	endbr64
	cmpq	%rsi, %rdi
	jge	.L2
	addq	$1, lt_cnt(%rip)
	movq	%rsi, %rax
	subq	%rdi, %rax
	ret
.L2:
	addq	$1, ge_cnt(%rip)
	movq	%rdi, %rax
	subq	%rsi, %rax
	ret
	.cfi_endproc
.LFE23:
	.size	absdiff_se, .-absdiff_se
	.globl	cond
	.type	cond, @function
cond:
.LFB24:
	.cfi_startproc
	endbr64
	testq	%rsi, %rsi
	je	.L4
	cmpq	%rdi, (%rsi)
	jge	.L4
	movq	%rdi, (%rsi)
.L4:
	ret
	.cfi_endproc
.LFE24:
	.size	cond, .-cond
	.globl	add1
	.type	add1, @function
add1:
.LFB25:
	.cfi_startproc
	endbr64
	leal	1(%rdi), %eax
	ret
	.cfi_endproc
.LFE25:
	.size	add1, .-add1
	.globl	absdiff
	.type	absdiff, @function
absdiff:
.LFB26:
	.cfi_startproc
	endbr64
	cmpl	%esi, %edi
	jge	.L8
	movl	%esi, %eax
	subl	%edi, %eax
	ret
.L8:
	movl	%edi, %eax
	subl	%esi, %eax
	ret
	.cfi_endproc
.LFE26:
	.size	absdiff, .-absdiff
	.globl	cmovdiff
	.type	cmovdiff, @function
cmovdiff:
.LFB27:
	.cfi_startproc
	endbr64
	movl	%esi, %edx
	subl	%edi, %edx
	movl	%edi, %eax
	subl	%esi, %eax
	cmpl	%edi, %esi
	jle	.L10
	movl	%edx, %eax
.L10:
	ret
	.cfi_endproc
.LFE27:
	.size	cmovdiff, .-cmovdiff
	.globl	absdiff1
	.type	absdiff1, @function
absdiff1:
.LFB28:
	.cfi_startproc
	endbr64
	cmpl	%esi, %edi
	jge	.L13
	movl	%esi, %eax
	subl	%edi, %eax
	ret
.L13:
	movl	%edi, %eax
	subl	%esi, %eax
	ret
	.cfi_endproc
.LFE28:
	.size	absdiff1, .-absdiff1
	.section	.rodata.str1.1,"aMS",@progbits,1
.LC0:
	.string	"%lu\n"
	.text
	.globl	main
	.type	main, @function
main:
.LFB29:
	.cfi_startproc
	endbr64
	pushq	%rbx
	.cfi_def_cfa_offset 16
	.cfi_offset 3, -16
	movl	$4, %edx
	leaq	.LC0(%rip), %rbx
	movq	%rbx, %rsi
	movl	$1, %edi
	movl	$0, %eax
	call	__printf_chk@PLT
	movl	$8, %edx
	movq	%rbx, %rsi
	movl	$1, %edi
	movl	$0, %eax
	call	__printf_chk@PLT
	movl	$8, %edx
	movq	%rbx, %rsi
	movl	$1, %edi
	movl	$0, %eax
	call	__printf_chk@PLT
	movl	$0, %eax
	popq	%rbx
	.cfi_def_cfa_offset 8
	ret
	.cfi_endproc
.LFE29:
	.size	main, .-main
	.globl	ge_cnt
	.bss
	.align 8
	.type	ge_cnt, @object
	.size	ge_cnt, 8
ge_cnt:
	.zero	8
	.globl	lt_cnt
	.align 8
	.type	lt_cnt, @object
	.size	lt_cnt, 8
lt_cnt:
	.zero	8
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
