#include <stdio.h>
#include <math.h>

int main()
{
    int a;
    scanf("%d", &a);
    int h = a / 3600;
    int m = (a - 3600 * h) / 60;
    int s = a - 3600 * h - 60 * m;
    printf("%d:%d:%d\n", h, m, s);
    return 0;
}