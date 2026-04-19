import * as XLSX from "xlsx"

export function exportToExcel<T extends Record<string, any>>(
  data: T[],
  filename: string = "export.xlsx",
  sheetName: string = "Sheet1"
) {
  // Create workbook and worksheet
  const wb = XLSX.utils.book_new()
  const ws = XLSX.utils.json_to_sheet(data)

  // Add worksheet to workbook
  XLSX.utils.book_append_sheet(wb, ws, sheetName)

  // Generate Excel file and trigger download
  XLSX.writeFile(wb, filename)
}

export function exportMultipleSheets(
  sheets: Array<{ data: any[]; name: string }>,
  filename: string = "export.xlsx"
) {
  const wb = XLSX.utils.book_new()

  sheets.forEach(({ data, name }) => {
    const ws = XLSX.utils.json_to_sheet(data)
    XLSX.utils.book_append_sheet(wb, ws, name)
  })

  XLSX.writeFile(wb, filename)
}
