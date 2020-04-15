import FileSaver from 'file-saver'
import Papa from 'papaparse'
import flatten from 'flat'
import { format } from 'date-fns'

export default (array, filename) => {
  const csv = Papa.unparse(array.map((data) => {
    var dateKeys = ['in', 'out', 'timestamp', 'clearedOn']
    var init = flatten(data)
    Object.keys(init).forEach((obj) => {
      if (dateKeys.includes(obj)) {
        init[obj] = init[obj] ? format(new Date(init[obj]), 'MM-dd-yyyy (hh:mm a)') : 'N/A'
      }
      if (obj === 'status') {
        init[obj] = init[obj] ? 'IN' : 'OUT'
      }
    })
    return init
  }))
  var csvData = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
  FileSaver.saveAs(csvData, `${new Date().getTime()}-${filename}.csv`)
}