"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Header } from "@/app/components/cap";
import cloud from "@/assets/cloud.svg";
import Image from "next/image";
import del from "@/assets/Close.svg";
import {deleteReport} from "@/app/page";

interface DataRow {
    uid: string;
    data_upload: string;
    file_path: string;
    class_num: number;
    confidence: number;
}

const instance = axios.create({
    baseURL: "http://localhost:8080/api/v1/neural/",
});



export function HandleModal({ onClose, params }: { onClose: () => void; params: { id: string } }) {

    const [files, setFiles] = useState<File[]>([]);
    const [isDragging, setIsDragging] = useState(false);

    const allowedExtensions = [".zip", ".rar", ".png", ".jpg", ".jpeg"];

    const isFileAllowed = (file: File) => {
        const fileExtension = file.name.substring(file.name.lastIndexOf(".")).toLowerCase();
        return allowedExtensions.includes(fileExtension);
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            const selectedFiles = Array.from(event.target.files).filter(isFileAllowed);
            setFiles(selectedFiles);
        }
    };

    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setIsDragging(false);
        if (event.dataTransfer.files) {
            const droppedFiles = Array.from(event.dataTransfer.files).filter(isFileAllowed);
            setFiles(droppedFiles);
        }
    };

    const handleClearFiles = () => {
        setFiles([]);
    };

    const handleSubmit = async () => {
        if (files.length === 0) {
            alert("Пожалуйста, выберите файлы для отправки.");
            return;
        }

        const formData = new FormData();
        files.forEach((file) => {
            formData.append("file", file);
        });

        try {
            const response = await instance.post(`upload_report/${params.id}`, formData);
            if (response.status === 200) {
                alert("Файлы успешно отправлены!");
                setFiles([]);
                onClose(); // Закрыть модальное окно после отправки
            } else {
                alert("Ошибка при отправке файлов.");
            }
        } catch (error) {
            console.error("Ошибка при отправке:", error);
            alert("Произошла ошибка при отправке файлов.");
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center text-white">
            <div className="bg-gray-800 p-4 rounded-lg shadow-lg w-[90%] max-w-md h-[500px]">
                <div className="flex justify-end">
                    <button onClick={onClose} className="pb-3">
                        <Image src={del} width={20} height={20} alt="Close"/>
                    </button>
                </div>
                <div
                    className={`flex flex-col items-center justify-center p-4 rounded-lg h-[380px]
                ${isDragging ? "border-2 border-dashed border-blue-500" : "border border-gray-600"}`}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                >
                    <label className="mb-4 cursor-pointer px-4 py-2 rounded text-center w-[100%]">
                        <div className="flex flex-col items-center justify-center">
                            <Image src={cloud} width={100} height={100} alt="Logo"/>
                            <input
                                type="file"
                                multiple
                                onChange={handleFileChange}
                                accept=".zip,.rar,.png,.jpg,.jpeg"
                                className="hidden"
                            />
                            <p className="mb-4">
                                {files.length > 0 ? `Выбрано файлов: ${files.length}` : "Файлы не выбраны"}
                            </p>
                        </div>
                    </label>

                </div>
                <div className="flex justify-center gap-4 mt-5">
                    <button
                        onClick={handleSubmit}
                        className="px-4 py-2 bg-green-500 hover:bg-green-600 rounded w-[120px]"
                    >
                        Отправить
                    </button>
                    <button
                        onClick={handleClearFiles}
                        className="px-4 py-2 bg-red-500 hover:bg-red-600 rounded w-[120px]"
                    >
                        Очистить
                    </button>
                </div>
            </div>
        </div>

    );
}

export default function ReportDetail({params}: { params: { id: string } }) {
    const [files, setFiles] = useState<File[]>([]);
    const [isDragging, setIsDragging] = useState(false);
    const [reportData, setReportData] = useState<DataRow[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [data, setData] = useState<any[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);


    const rowsPerPage = 8;
    const totalPages = Math.ceil(reportData.length / rowsPerPage);
    const currentData = reportData.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

    const allowedExtensions = [".zip", ".rar", ".png", ".jpg", ".jpeg"];

    const isFileAllowed = (file: File) => {
        const fileExtension = file.name.substring(file.name.lastIndexOf(".")).toLowerCase();
        return allowedExtensions.includes(fileExtension);
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            const selectedFiles = Array.from(event.target.files).filter(isFileAllowed);
            setFiles(selectedFiles);
        }
    };

    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setIsDragging(false);
        if (event.dataTransfer.files) {
            const droppedFiles = Array.from(event.dataTransfer.files).filter(isFileAllowed);
            setFiles(droppedFiles);
        }
    };

    const handleClearFiles = () => {
        setFiles([]);
    };

    const handleSubmit = async () => {
        if (files.length === 0) {
            alert("Пожалуйста, выберите файлы для отправки.");
            return;
        }

        const formData = new FormData();
        files.forEach((file) => {
            formData.append("file", file);
        });

        try {
            const response = await instance.post(`upload_report/${params.id}`, formData);
            if (response.status === 200) {
                alert("Файлы успешно отправлены!");
                setFiles([]);
                await fetchReportData();
            } else {
                alert("Ошибка при отправке файлов.");
            }
        } catch (error) {
            console.error("Ошибка при отправке:", error);
            alert("Произошла ошибка при отправке файлов.");
        }
    };


    const handlePageChange = (page: number) => {
        if (page > 0 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    const deleteReport = async (uid: string)=> {
        try {
            const response = await instance.delete(`reports/remove/${uid}`);
        } catch (error) {
            console.error(`Ошибка при удалении`, error);
        }
    }

    const handleDeleteReport = async (uid: string) => {
        try {
            await deleteReport(uid);
            await fetchReportData();
        } catch (error) {
            console.log("Ошибка при удалении", error);
        }
    };


    const fetchReportData = async () => {
        try {
            const response = await instance.get(`reports/all/${params.id}`);
            if (response.status === 200 && Array.isArray(response.data)) {
                setReportData(response.data);
            }
        } catch (error) {
            console.error("Ошибка при получении данных отчёта:", error);
        }
    };

    const handleSaveAsPDF = () => {
        window.print();  // Открывает диалоговое окно печати, где можно выбрать сохранение как PDF
    };


    useEffect(() => {
        fetchReportData();
    }, []);

    const handleDownloadCSV = async () => {
        try {
            // Запрос для получения CSV файла для всего отчета
            const response = await instance.get(`reports/csv/${params.id}`);

            // Проверка, что сервер вернул CSV данные
            if (response.status === 200) {
                const filename = `report_${params.id}.csv`;
                const csvContent = response.data;  // В response.data будет содержимое CSV как строка

                // Создание ссылки для скачивания
                const link = document.createElement("a");
                link.href = `data:text/csv;charset=utf-8,${encodeURIComponent(csvContent)}`;
                link.setAttribute("download", filename);  // Имя файла для скачивания
                document.body.appendChild(link);
                link.click();  // Имитируем клик по ссылке
                document.body.removeChild(link);  // Убираем ссылку после скачивания
            } else {
                alert("Ошибка при скачивании CSV файла.");
            }
        } catch (error) {
            console.error("Ошибка при скачивании CSV файла:", error);
            alert("Произошла ошибка при скачивании файла.");
        }
    };

    return (
        <div className="bg-gradient-to-b from-[#485563] to-[#29323c] h-[100vh]">
            <Header />
            <div className="h-[90vh] flex flex-col items-center justify-center text-white">
                {reportData.length === 0 ? (
                    // Если данных нет, отображаем интерфейс для загрузки файла
                    <div
                        className={`flex flex-col items-center justify-center p-4 bg-gray-800 rounded-lg shadow-lg h-[400px] w-[90%] max-w-md 
                        ${isDragging ? "border-2 border-dashed border-blue-500 transition-all duration-200 ease-in-out" : "border border-gray-600"}`}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                    >
                        <label className="mb-4 cursor-pointer px-4 py-2 rounded text-center w-[100%] h-[100%]">
                            <div className="flex flex-col items-center justify-center h-[100%] ">
                                <Image src={cloud} width={100} height={100} alt="Logo"/>
                                <input
                                    type="file"
                                    multiple
                                    onChange={handleFileChange}
                                    accept=".zip,.rar,.png,.jpg,.jpeg"
                                    className="hidden"
                                />
                                <p className="mb-4">
                                    {files.length > 0
                                        ? `Выбрано файлов: ${files.length}`
                                        : "Файлы не выбраны"}
                                </p>
                            </div>
                        </label>
                        <div className="flex gap-4 mt-5">
                            <button
                                onClick={handleSubmit}
                                className="px-4 py-2 bg-green-500 hover:bg-green-600 rounded w-[120px]"
                            >
                                Отправить
                            </button>
                            <button
                                onClick={handleClearFiles}
                                className="px-4 py-2 bg-red-500 hover:bg-red-600 rounded w-[120px]"
                            >
                                Очистить
                            </button>
                        </div>
                    </div>
                ) : (

                    <div className='w-full flex flex-col items-center h-[700px]'>
                        <div className="flex w-3/4 justify-end">
                            <div className="mt-4">
                                <button
                                    onClick={() => setIsModalOpen(true)}
                                    className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded w-[180px] mt-4"
                                >
                                    Добавить данных
                                </button>
                                <button
                                    onClick={handleDownloadCSV}
                                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded w-[150px]"
                                >
                                    Скачать CSV
                                </button>
                                <button
                                    onClick={handleSaveAsPDF}
                                    className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded w-[180px] mt-4"
                                >
                                    Сохранить как PDF
                                </button>
                            </div>
                        </div>
                        <div
                            className="bg-gray-800 text-white p-6 rounded-lg shadow-lg w-3/4 flex flex-col items-center h-[600px] tbl">
                            <h1 className="text-[22px] mb-4 text-center">Отчет</h1>
                            <div className="w-full overflow-auto flex-grow">
                                <table className="w-full text-left">
                                    <thead>
                                    <tr>
                                        <th className="px-4 py-2 border-b border-gray-700">Дата загрузки</th>
                                        <th className="px-4 py-2 border-b border-gray-700">Путь к файлу</th>
                                        <th className="px-4 py-2 border-b border-gray-700">Класс</th>
                                        <th className="px-4 py-2 border-b border-gray-700">Точность</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {currentData.map((row) => (
                                        <tr key={row.uid}>
                                            <td className="px-4 py-2">{row.data_upload}</td>
                                            <td className="px-4 py-2">{row.file_path}</td>
                                            <td className="px-4 py-2">{row.class_num}</td>
                                            <td className="px-4 py-2">{row.confidence}</td>
                                            <td className="px-4 py-2">
                                                <button onClick={() => handleDeleteReport(row.uid)}
                                                        className="text-red-500">
                                                    <Image className="fill-red-500" src={del} width={25} height={25}
                                                           alt="del"/>
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>
                            <div className="flex justify-center mt-4 w-full">
                                <button
                                    onClick={() => handlePageChange(currentPage - 1)}
                                    disabled={currentPage === 1}
                                    className="px-4 py-2 mx-1 bg-[#222E3A] disabled:bg-gray-500 rounded disabled:opacity-50 border-[1px]"
                                >
                                    Предыдущая
                                </button>
                                <span className="px-4 py-2 needhide">Страница {currentPage} из {totalPages}</span>
                                <button
                                    onClick={() => handlePageChange(currentPage + 1)}
                                    disabled={currentPage === totalPages}
                                    className="px-4 py-2 mx-1 bg-[#222E3A] disabled:bg-gray-500 rounded disabled:opacity-50 border-[1px]"
                                >
                                    Следующая
                                </button>
                            </div>

                        </div>
                    </div>
                )}

            </div>
            {isModalOpen && <HandleModal params={params} onClose={() => setIsModalOpen(false)} />}
        </div>
    );
}
