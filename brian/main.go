package main

import (
	"context"
	"log"
	"os"

	_ "github.com/itsmebriand/aoc25/day1"
	_ "github.com/itsmebriand/aoc25/day2"
	"github.com/itsmebriand/aoc25/utils"
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
		Commands: utils.Commands,
	}

	if err := cmd.Run(context.Background(), os.Args); err != nil {
		log.Fatal(err)
	}
}
