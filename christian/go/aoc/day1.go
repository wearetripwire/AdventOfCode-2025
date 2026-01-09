package aoc

import (
	"os"
	"fmt"
	"bufio"
	"strconv"
)
func Day1() int {
	amt := 0
	dial := 50
	DIAL_MAX := 100
	var line string
	var startOnZero bool

	DIAG := true;

	// read the aoc1 text file in
	file, err := os.Open("day1.txt")
	if err != nil {
		fmt.Println("opening file error", err)
	}

	scanner := bufio.NewScanner(file)
	scanner.Split(bufio.ScanLines)
	for scanner.Scan() {
		line = scanner.Text()
		lineAmtAsStr := line[1:len(line)]
		lineAmt, err := strconv.Atoi(lineAmtAsStr)
		if err != nil {
			fmt.Println("Error converting string", err)
		}

		startOnZero = dial == 0

		if(DIAG) {
			fmt.Println("---")
			fmt.Println("Dial:", dial)
			fmt.Println(line)
			fmt.Println("Starting on 0:", startOnZero)
		}
		// calculate number of times it would pass over 0 during a full rotation, then take the remainder for futher usage
		amt += (lineAmt / DIAL_MAX)
		lineAmt = lineAmt % DIAL_MAX


		
		if line[0] == 'L' {
			if(DIAG) {
				fmt.Println("-", lineAmt)
			}
			dial -= lineAmt
			
		} else {
			if(DIAG) {
				fmt.Println("+", lineAmt)
			}
			dial += lineAmt
		}

		if dial < 0 {
			dial += DIAL_MAX
			// only iterate if it *crosses over* 0. When it starts on 0 and travels to the left, it wraps, but never crosses over 0.
			if !startOnZero {
				amt += 1
			}
		} else if dial > 99 {
			dial -= DIAL_MAX
			amt += 1
		} else if dial == 0 {
			amt += 1
		}

		if(DIAG) {
			fmt.Println("Dial:", dial)
			fmt.Println("Amt:", amt)
		}
		
	}

	file.Close()

	return amt
} 