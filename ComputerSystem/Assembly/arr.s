	.file	"arr.c"
	.text
	.globl	var_ele
	.type	var_ele, @function
var_ele:
.LFB0:
	.cfi_startproc
	endbr64
	imulq	%rdi, %rdx
	leaq	(%rsi,%rdx,4), %rax
	movl	(%rax,%rcx,4), %eax
	ret
	.cfi_endproc
.LFE0:
	.size	var_ele, .-var_ele
	.globl	var_prod_ele
	.type	var_prod_ele, @function
var_prod_ele:
.LFB1:
	.cfi_startproc
	endbr64
	movq	%rsi, %r10
	movq	%rdx, %r11
	movl	$0, %esi
	movl	$0, %eax
	jmp	.L3
.L4:
	movq	%rcx, %rdx
	imulq	%rdi, %rdx
	leaq	(%r10,%rdx,4), %r9
	movq	%rax, %rdx
	imulq	%rdi, %rdx
	leaq	(%r11,%rdx,4), %rdx
	movl	(%rdx,%r8,4), %edx
	addl	(%r9,%rax,4), %edx
	addl	%edx, %esi
	addq	$1, %rax
.L3:
	cmpq	%rdi, %rax
	jl	.L4
	movl	%esi, %eax
	ret
	.cfi_endproc
.LFE1:
	.size	var_prod_ele, .-var_prod_ele
	.globl	var_prod_ele_opt
	.type	var_prod_ele_opt, @function
var_prod_ele_opt:
.LFB2:
	.cfi_startproc
	endbr64
	movq	%rdi, %r9
	movq	%rsi, %r10
	leaq	0(,%rdi,4), %r11
	imulq	%rdi, %rcx
	leaq	(%rdx,%r8,4), %rsi
	movl	$0, %eax
	movl	$0, %edi
	jmp	.L6
.L7:
	leaq	(%rcx,%rax), %r8
	movl	(%rsi), %edx
	imull	(%r10,%r8,4), %edx
	addl	%edx, %edi
	addq	%r11, %rsi
	addq	$1, %rax
.L6:
	cmpq	%r9, %rax
	jl	.L7
	movl	%edi, %eax
	ret
	.cfi_endproc
.LFE2:
	.size	var_prod_ele_opt, .-var_prod_ele_opt
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
