// src/lib/utils/csvExport.js

/**
 * Converts an array of objects to a CSV string and triggers a download.
 * @param {Array<Object>} data - The data array (e.g., submissions).
 * @param {string} filename - The name for the downloaded file.
 */
export function exportToCsv(data, filename) {
    if (!data || data.length === 0) {
        alert("No data to export.");
        return;
    }

    // 1. Get the headers (keys of the first object)
    const headers = Object.keys(data[0]);

    // 2. Create the CSV header row
    const csvHeader = headers.join(',');

    // 3. Create the CSV body rows
    const csvBody = data.map(row => {
        // Map each header to the corresponding value in the row
        return headers.map(header => {
            // Escape double quotes within data and wrap fields in quotes
            let value = row[header] === null || row[header] === undefined ? '' : String(row[header]);
            value = value.replace(/"/g, '""'); // Escape inner quotes
            return `"${value}"`;
        }).join(',');
    }).join('\n');

    // 4. Combine header and body
    const csvContent = csvHeader + '\n' + csvBody;

    // 5. Trigger download (browser method)
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    
    // Create a temporary link element and click it
    if (link.download !== undefined) { 
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', filename);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
}