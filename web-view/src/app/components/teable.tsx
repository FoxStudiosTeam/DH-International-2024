"use client"
import { useState } from "react";

interface DataRow {
    id: number;
    uploadDate: string;
    filePath: string;
    category: string;
}

const data: DataRow[] = [
    { id: 1, uploadDate: "2023-11-09 18.31.01", filePath: "/path/to/file1", category: "Хорошее качество" },
    { id: 2, uploadDate: "2023-11-09", filePath: "/path/to/file2", category: "Class B" },
    { id: 3, uploadDate: "2023-11-09", filePath: "/path/to/file3", category: "Class C" },
    { id: 4, uploadDate: "2023-11-09", filePath: "/path/to/file1", category: "Class A" },
    { id: 5, uploadDate: "2023-11-09", filePath: "/path/to/file2", category: "Class B" },
    { id: 6, uploadDate: "2023-11-09", filePath: "/path/to/file3", category: "Class C" },
    { id: 7, uploadDate: "2023-11-09", filePath: "/path/to/file1", category: "Class A" },
    { id: 8, uploadDate: "2023-11-09", filePath: "/path/to/file2", category: "Class B" },
    { id: 9, uploadDate: "2023-11-09", filePath: "/path/to/file3", category: "Class C" },
    { id: 10, uploadDate: "2023-11-09", filePath: "/path/to/file1", category: "Class A" },
    { id: 11, uploadDate: "2023-11-09", filePath: "/path/to/file2", category: "Class B" },
    { id: 12, uploadDate: "2023-11-09", filePath: "/path/to/file3", category: "Class C" },
    { id: 13, uploadDate: "2023-11-09", filePath: "/path/to/file1", category: "Class A" },
    { id: 14, uploadDate: "2023-11-09", filePath: "/path/to/file2", category: "Class B" },
    { id: 15, uploadDate: "2023-11-09", filePath: "/path/to/file3", category: "Class C" },
];

export function Table() {
    const rowsPerPage = 10;
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(data.length / rowsPerPage);
    const currentData = data.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

    const handlePageChange = (page: number) => {
        if (page > 0 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    return (
        <div className="w-full h-[90vh] flex justify-center items-center">
            <div className="bg-gray-800 text-white p-6 rounded-lg shadow-lg w-3/4 flex flex-col items-center h-[600px]">
                <h1 className="text-[22px] mb-4 text-center">Отчет</h1>
                <div className="w-full overflow-auto flex-grow">
                    <table className="w-full text-left">
                        <thead>
                        <tr>
                            <th className="px-4 py-2 border-b border-gray-700">№(id)</th>
                            <th className="px-4 py-2 border-b border-gray-700">Дата загрузки</th>
                            <th className="px-4 py-2 border-b border-gray-700">Путь к файлу</th>
                            <th className="px-4 py-2 border-b border-gray-700">Класс</th>
                        </tr>
                        </thead>
                        <tbody>
                        {currentData.map((row) => (
                            <tr key={row.id}>
                                <td className="px-4 py-2">{row.id}</td>
                                <td className="px-4 py-2">{row.uploadDate}</td>
                                <td className="px-4 py-2">{row.filePath}</td>
                                <td className="px-4 py-2">{row.category}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
                <div className="flex justify-center mt-4 w-full">
                    <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="px-4 py-2 mx-1 bg-gray-600 rounded disabled:opacity-50"
                    >
                        Предыдущая
                    </button>
                    <span className="px-4 py-2">Страница {currentPage} из {totalPages}</span>
                    <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="px-4 py-2 mx-1 bg-gray-600 rounded disabled:opacity-50"
                    >
                        Следующая
                    </button>
                </div>
            </div>
        </div>

    );
}
