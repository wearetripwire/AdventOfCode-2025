package utils

import (
	"context"
	"fmt"
	"os"

	"github.com/itsmebriand/aoc25/styles"
	"github.com/urfave/cli/v3"
)

func BaseDayCommand[T any](name string, slug string, part1 func(string) (T, error), part2 func(string) (T, error), results func(T, T) error) *cli.Command {
	out := &cli.Command{
		Name: slug,
		Action: func(ctx context.Context, c *cli.Command) error {
			useFullInput := c.Root().Bool("full")
			var input string
			if useFullInput {
				fmt.Println(styles.MkHeader(name, "Real Data"))
				r, err := os.ReadFile(fmt.Sprintf("./%s/input.txt", slug))
				if err != nil {
					return err
				}
				input = string(r)
			} else {
				fmt.Println(styles.MkHeader(name, "Test Data"))
				r, err := os.ReadFile(fmt.Sprintf("./%s/test.txt", slug))
				if err != nil {
					return err
				}
				input = string(r)
			}
			r1, err := part1(input)
			if err != nil {
				return err
			}

			r2, err := part2(input)
			if err != nil {
				return err
			}

			return results(r1, r2)
		},
	}
	Commands = append(Commands, out)
	return out
}
