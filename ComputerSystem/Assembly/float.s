	.file	"float.c"
	.text
	.globl	float_mov
	.type	float_mov, @function
float_mov:
.LFB0:
	.cfi_startproc
	endbr64
	movaps	%xmm0, %xmm1
	movss	(%rdi), %xmm0
	movss	%xmm1, (%rsi)
	ret
	.cfi_endproc
.LFE0:
	.size	float_mov, .-float_mov
	.globl	fcvt
	.type	fcvt, @function
fcvt:
.LFB1:
	.cfi_startproc
	endbr64
	movss	(%rsi), %xmm0
	movq	(%rcx), %rax
	cvttsd2siq	(%rdx), %r8
	movq	%r8, (%rcx)
	pxor	%xmm1, %xmm1
	cvtsi2ssl	%edi, %xmm1
	movss	%xmm1, (%rsi)
	pxor	%xmm1, %xmm1
	cvtsi2sdq	%rax, %xmm1
	movsd	%xmm1, (%rdx)
	cvtss2sd	%xmm0, %xmm0
	ret
	.cfi_endproc
.LFE1:
	.size	fcvt, .-fcvt
	.globl	func
	.type	func, @function
func:
.LFB2:
	.cfi_startproc
	endbr64
	cvtss2sd	%xmm1, %xmm1
	mulsd	%xmm0, %xmm1
	pxor	%xmm0, %xmm0
	cvtsi2sdl	%edi, %xmm0
	divsd	%xmm0, %xmm2
	subsd	%xmm2, %xmm1
	movapd	%xmm1, %xmm0
	ret
	.cfi_endproc
.LFE2:
	.size	func, .-func
	.globl	cel2fahr
	.type	cel2fahr, @function
cel2fahr:
.LFB3:
	.cfi_startproc
	endbr64
	addsd	.LC0(%rip), %xmm0
	ret
	.cfi_endproc
.LFE3:
	.size	cel2fahr, .-cel2fahr
	.globl	find_range
	.type	find_range, @function
find_range:
.LFB4:
	.cfi_startproc
	endbr64
	pxor	%xmm1, %xmm1
	comiss	%xmm0, %xmm1
	ja	.L9
	ucomiss	%xmm1, %xmm0
	jp	.L12
	jne	.L12
	movl	$1, %eax
	ret
.L12:
	comiss	.LC1(%rip), %xmm0
	jbe	.L14
	movl	$2, %eax
	ret
.L9:
	movl	$0, %eax
	ret
.L14:
	movl	$3, %eax
	ret
	.cfi_endproc
.LFE4:
	.size	find_range, .-find_range
	.section	.rodata.cst8,"aM",@progbits,8
	.align 8
.LC0:
	.long	0
	.long	1077936128
	.set	.LC1,.LC0
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
