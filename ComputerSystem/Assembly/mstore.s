	.file	"mstore.c"
	.text
	.globl	mult2
	.def	mult2;	.scl	2;	.type	32;	.endef
	.seh_proc	mult2
mult2:
	.seh_endprologue
	movl	%ecx, %eax
	imull	%edx, %eax
	ret
	.seh_endproc
	.globl	multstore
	.def	multstore;	.scl	2;	.type	32;	.endef
	.seh_proc	multstore
multstore:
	pushq	%rbx
	.seh_pushreg	%rbx
	subq	$32, %rsp
	.seh_stackalloc	32
	.seh_endprologue
	movq	%r8, %rbx
	call	mult2
	movl	%eax, (%rbx)
	addq	$32, %rsp
	popq	%rbx
	ret
	.seh_endproc
	.def	__main;	.scl	2;	.type	32;	.endef
	.section .rdata,"dr"
.LC0:
	.ascii "2 * 3 --> %1d\12\0"
	.text
	.globl	main
	.def	main;	.scl	2;	.type	32;	.endef
	.seh_proc	main
main:
	subq	$56, %rsp
	.seh_stackalloc	56
	.seh_endprologue
	call	__main
	leaq	44(%rsp), %r8
	movl	$3, %edx
	movl	$2, %ecx
	call	multstore
	movl	44(%rsp), %edx
	leaq	.LC0(%rip), %rcx
	call	printf
	movl	$0, %eax
	addq	$56, %rsp
	ret
	.seh_endproc
	.ident	"GCC: (x86_64-win32-seh-rev0, Built by MinGW-W64 project) 8.1.0"
	.def	printf;	.scl	2;	.type	32;	.endef
