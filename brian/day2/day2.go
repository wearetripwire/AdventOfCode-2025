package day2

import (
	"fmt"
	"strconv"
	"strings"

	"github.com/itsmebriand/aoc25/styles"
	"github.com/itsmebriand/aoc25/utils"
	"github.com/urfave/cli/v3"
)

var Day2 *cli.Command

type Id string

func (id Id) validate(min int) bool {
	// 2 parts
	// remain evenly divisible
	for i := 2; i <= len(id) && i <= min; i++ {
		sliceSize := len(id) / i
		if sliceSize*i != len(id) {
			continue
		}
		pattern := string(id)[:sliceSize]
		every := true
		for j := sliceSize; j < len(id); j += sliceSize {

			part := string(id)[j : j+sliceSize]

			if pattern != part {
				every = false
			}
		}
		if every {
			return false
		}
	}

	return true
}

type Range struct {
	Start int
	End   int
}

func (r Range) explode(
	fn func(id Id),
) {
	for i := r.Start; i <= r.End; i++ {
		fn(Id(strconv.Itoa(i)))
	}
}

func splitRanges(input string) ([]Range, error) {
	out := []Range{}
	for _, part := range strings.Split(input, ",") {
		parts := strings.Split(part, "-")

		start, err := strconv.Atoi(parts[0])
		if err != nil {
			return nil, err
		}
		end, err := strconv.Atoi(parts[1])
		if err != nil {
			return nil, err
		}
		out = append(out, Range{
			Start: start,
			End:   end,
		})
	}
	return out, nil
}

func part1(input string) (int, error) {
	ranges, err := splitRanges(input)
	if err != nil {
		return -1, err
	}
	rangeDiag := styles.MkTable().Headers("Start", "End", "InvalidIds")

	invalidCount := 0
	for _, r := range ranges {
		invalids := []int{}
		r.explode(
			func(id Id) {
				if !id.validate(2) {
					idNum, _ := strconv.Atoi(string(id))
					invalids = append(invalids, idNum)
					invalidCount += idNum
				}
			},
		)
		rangeDiag.Row(
			fmt.Sprint(r.Start),
			fmt.Sprint(r.End),
			fmt.Sprintf("%v", invalids),
		)
	}
	fmt.Println(rangeDiag)
	return invalidCount, nil
}

func part2(input string) (int, error) {
	ranges, err := splitRanges(input)
	if err != nil {
		return -1, err
	}
	rangeDiag := styles.MkTable().Headers("Start", "End", "InvalidIds")

	invalidCount := 0
	for _, r := range ranges {
		invalids := []int{}
		r.explode(
			func(id Id) {
				if !id.validate(len(id)) {
					idNum, _ := strconv.Atoi(string(id))
					invalids = append(invalids, idNum)
					invalidCount += idNum
				}
			},
		)
		rangeDiag.Row(
			fmt.Sprint(r.Start),
			fmt.Sprint(r.End),
			fmt.Sprintf("%v", invalids),
		)
	}
	fmt.Println(rangeDiag)
	return invalidCount, nil
}

func init() {
	Day2 = utils.BaseDayCommand("Day 2", "day2", part1, part2, func(r1, r2 int) error {
		fmt.Println("Part 1:", r1)
		fmt.Println("Part 2:", r2)
		return nil
	})
}

// 1227775554
// 1227775554
