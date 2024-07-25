float float_mov(float v1, float *src, float *dst)
{
	 float v2 = *src;
	 *dst = v1;
	 return v2;
}

// 类型转换cvtsi2ss,cvttss2si...
double fcvt(int i, float *fp, double *dp, long *lp)
{
	float f = *fp; double d = *dp; long l = *lp;
	*lp = (long)	d;
	*fp = (float)	i;
	*dp = (double)	l;
	return (double)	f;
}

// 传递参数储存在%xmm0~%xmm7,更多的可以用栈上的空间来储存
// 浮点运算操作
double func(double a, float x, double b, int i)
{
	return a * x - b / i;
}

// 定义和使用浮点常数
double cel2fahr(double temp)
{
	return 1.0 * temp + 32.0;
}

// 浮点数比较
typedef enum { NEG, ZERO, POS, OTHER } range_t;

range_t find_range(float x)
{
	int result;
	if (x < 0)
		result = NEG;
	else if (x == 0)
		result = ZERO;
	else if (x > 0)
		result = POS;
	else
		result = OTHER;
	return result;
}
