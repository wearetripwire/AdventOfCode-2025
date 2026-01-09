package styles

import (
	"github.com/charmbracelet/lipgloss"
	"github.com/charmbracelet/lipgloss/table"
)

var Header = lipgloss.NewStyle().
	Align(lipgloss.Center).
	Bold(true).
	Foreground(lipgloss.Color("205")).
	Background(lipgloss.Color("240")).
	Padding(1, 2, 0)

var Subheader = lipgloss.NewStyle().
	Align(lipgloss.Center).
	Bold(true).
	Foreground(lipgloss.Color("108")).
	Background(lipgloss.Color("240")).
	Padding(0, 2, 1)

func MkHeader(h, s string) string {
	w := max(lipgloss.Width(Header.Render(h)), lipgloss.Width(Subheader.Render(s)))
	out := Header.Width(w).Render(h)
	return out + "\n" + Subheader.Width(w).Render(s) + "\n\n"
}

var (
	cellStyle = lipgloss.NewStyle().
			Align(lipgloss.Center).
			Bold(true).
			Foreground(lipgloss.Color("205")).
			Align(lipgloss.Left).Padding(0, 2)
	headerStyle = cellStyle.Bold(true).PaddingBottom(1)
)

func MkTable() *table.Table {
	return table.New().
		Border(lipgloss.NormalBorder()).
		BorderStyle(lipgloss.NewStyle().Foreground(lipgloss.Color("205"))).
		StyleFunc(func(row, col int) lipgloss.Style {
			if row == table.HeaderRow {
				return headerStyle
			}
			if row%2 == 0 {
				return cellStyle
			} else {
				return cellStyle
			}
		})
}
