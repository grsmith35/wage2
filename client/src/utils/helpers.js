import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

export function exportPayReport(jobList, jobTitle) {
    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const fileExtension = '.xlsx';
  
    const ws = XLSX.utils.json_to_sheet(jobList);
    const wb = {Sheets: {'data': ws}, SheetNames: ['data']};
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, jobTitle + Date.now() + fileExtension);
  };