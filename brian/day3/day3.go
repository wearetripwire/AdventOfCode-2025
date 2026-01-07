package day3

import (
	"fmt"
	"math"
	"strconv"
	"strings"

	"github.com/itsmebriand/aoc25/utils"
	"github.com/urfave/cli/v3"
)

type Battery struct {
	First    int
	FirstIdx int
	Second   int
}

func (b Battery) Joltage() (int, error) {
	str := fmt.Sprintf("%d%d", b.First, b.Second)
	val, err := strconv.Atoi(str)
	if err != nil {
		return -1, err
	}
	return val, nil
}

var Day3 *cli.Command

func part1(input string) (int, error) {
	lines := strings.Split(input, "\n")
	batteries := []Battery{}

	for _, line := range lines {
		b := Battery{
			First:  math.MinInt,
			Second: math.MinInt,
		}
		// First, find the max
		for i := range line[:len(line)-1] {
			val, err := strconv.Atoi(fmt.Sprintf("%c", line[i]))
			if err != nil {
				return -1, err
			}
			if val > b.First {
				b.First = val
				b.FirstIdx = i
			}
		}

		for i := range line[b.FirstIdx+1:] {
			// fmt.Printf("Largest value (%d) was at index (%d). Will search %s\n", b.First, b.FirstIdx, line[b.FirstIdx+1:])
			val, err := strconv.Atoi(fmt.Sprintf("%c", line[i+b.FirstIdx+1]))
			if err != nil {
				return -1, err
			}
			// fmt.Printf("%c -> %d\n", line[i], val)
			if val > b.Second {
				b.Second = val
			}
		}
		batteries = append(batteries, b)
	}

	total := 0
	for _, b := range batteries {
		if j, err := b.Joltage(); err == nil {
			total += j
		} else {
			return -1, err
		}

	}

	return total, nil
}

func part2(input string) (int, error) {
	return -1, nil
}

func init() {
	Day3 = utils.BaseDayCommand("Day 3", "day3", part1, part2, func(r1, r2 int) error {
		fmt.Println("Part 1:", r1)
		fmt.Println("Part 2:", r2)
		return nil
	})
}

// 1227775554
// 1227775554
