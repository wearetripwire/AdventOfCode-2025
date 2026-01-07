package main

import (
	"context"
	"log"
	"os"

	"github.com/itsmebriand/aoc25/day1"
	"github.com/urfave/cli/v3"
)

func main() {
	cmd := &cli.Command{
		Name:  "aoc25",
		Usage: "Brian's 2025 Advent of Code",
		Flags: []cli.Flag{
			&cli.BoolFlag{
				Name:  "full",
				Value: false,
				Usage: "Run against personal input",
				Local: false,
			},
		},
		Commands: []*cli.Command{
			day1.Day1,
		},
	}

	if err := cmd.Run(context.Background(), os.Args); err != nil {
		log.Fatal(err)
	}
}
