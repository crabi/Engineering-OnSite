package main

import (
	"fmt"
	"time"
)

const MAX_N = 10

func from(t0 time.Time) {
	fmt.Println(time.Now().Sub(t0))
}

func empty() {
	defer from(time.Now())
}

func main() {

	var N int
	var A [MAX_N][MAX_N]int
	var B [MAX_N][MAX_N]int
	var C [MAX_N][MAX_N]int

	N = 100

	A[0][0] = 2
	A[0][1] = 2
	A[1][0] = 4
	A[1][1] = 5

	B[0][0] = 2
	B[0][1] = 3
	B[1][0] = 2
	B[1][1] = 3

	fmt.Println(" Multiplicacion de Matriz A * Matriz B ")
	fmt.Println(" Introduce el valor de la dimension de la Matriz (entre 1 y 3):")
	fmt.Scanf("%d", &N)
	fmt.Println(" El valor introducido es:", N)

	fmt.Println(" Introduce los elementos de la primera matriz A: ")
	for i := 0; i < N; i++ {
		for j := 0; j < N; j++ {
			fmt.Println(" Matriz A - Fila:", i, "Columna:", j)
			fmt.Scanf("%d", &A[i][j])
		}
	}

	fmt.Println(" Introduce los elementos de la segunda matriz B:  ")
	for i := 0; i < N; i++ {
		for j := 0; j < N; j++ {
			fmt.Println(" Matriz B - Fila:", i, "Columna:", j)
			fmt.Scanf("%d", &B[i][j])
		}
	}

	for i := 0; i < N; i++ {
		for j := 0; j < N; j++ {
			for k := 0; k < N; k++ {
				C[i][j] = C[i][j] + (A[i][k] * B[k][j])
			}
		}
	}

	fmt.Println(" Resultado de multiplicar Matriz A x Matriz B: ")
	for i := 0; i < N; i++ {
		for j := 0; j < N; j++ {
			fmt.Println(" Matriz A x Matriz B: ", C[i][j])
		}
	}

	empty()

}
