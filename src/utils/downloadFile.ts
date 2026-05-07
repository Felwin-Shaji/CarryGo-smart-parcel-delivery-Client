export const downloadFile = (blob: Blob, type: "excel" | "pdf") => {
    const url = window.URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;

    const fileName = `sales-report-${new Date().toISOString()}.${type === "excel" ? "xlsx" : "pdf"}`;
    link.setAttribute("download", fileName);

    document.body.appendChild(link);
    link.click();

    link.remove();
    window.URL.revokeObjectURL(url);
};