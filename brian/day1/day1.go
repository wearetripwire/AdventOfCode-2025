package day1

import (
	"fmt"
	"math"
	"strconv"
	"strings"

	"github.com/itsmebriand/aoc25/styles"
	"github.com/itsmebriand/aoc25/utils"
	"github.com/urfave/cli/v3"
)

func iterLines(input string, f func(int, int) error) error {
	for i, line := range strings.Split(input, "\n") {
		val, err := getLine(line)
		if err != nil {
			return err
		}
		if err := f(i, val); err != nil {
			return err
		}
	}
	return nil
}

func getLine(line string) (int, error) {
	val, err := strconv.Atoi(line[1:])
	if err != nil {
		return 0, err
	}
	if line[0] == 'L' {
		val *= -1
	}
	return val, nil
}

func part1(input string) (int, error) {
	ang := 50
	resultCount := 0
	diag := styles.MkTable().Headers("Line", "Prev", "Zerod")

	iterLines(input, func(i int, val int) error {
		ang += val
		ang %= 100
		if ang == 0 {
			resultCount++
		}
		diag.Row(fmt.Sprint(val), fmt.Sprint(ang), fmt.Sprint(ang == 0))

		return nil
	})
	diag.Row("", "", "")
	diag.Row("", "Result", fmt.Sprint(resultCount))

	fmt.Println(diag)
	return resultCount, nil
}

func part2(input string) (int, error) {
	diag := styles.MkTable().Headers("Line", "Prev", "Angle", "Cross", "Rots")
	ang := 50
	resultCount := 0

	iterLines(input, func(i int, val int) error {
		before := ang
		ang += val

		rotations := int(math.Abs(float64(ang))) / 100
		if ang < 0 && before > 0 {
			rotations++
		}
		if ang > 0 && before < 0 {
			rotations++
		}

		ang %= 100
		if ang == 0 && rotations == 0 {
			rotations++
		}
		diag.Row(
			fmt.Sprint(val),
			fmt.Sprint(before),
			fmt.Sprint(ang),
			fmt.Sprint(ang%100 == 0),
			fmt.Sprint(rotations),
		)
		resultCount += rotations

		return nil
	})
	diag.Row("", "", "", "", "")
	diag.Row("", "", "", "Result", fmt.Sprint(resultCount))
	fmt.Println(diag)
	return resultCount, nil
}

var Day1 *cli.Command

func init() {
	Day1 = utils.BaseDayCommand("Day 1", "day1", part1, part2, func(p1, p2 int) error {
		fmt.Printf("Part 1: %d\n", p1)
		fmt.Printf("Part 1: %d\n", p2)
		return nil
	})
}
