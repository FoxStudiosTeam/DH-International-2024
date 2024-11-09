"use client"
import { useState } from "react";
import { Header } from "@/app/components/cap";
import cloud from "@/assets/cloud.svg";
import Image from "next/image";
import axios from "axios";

const instance = axios.create({
    baseURL: 'http://localhost:8080/api/v1/neural/',
});

export default function ReportDetail({params}: { params: { id: string; } }) {
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
        files.forEach(file => {
            formData.append("file", file);
        });

        try {
            const response = await instance.post(`upload_report/${params.id}`, formData, );

            if (response.status === 200) {
                alert("Файлы успешно отправлены!");
                console.log("Ответ от сервера:", response.data);
            } else {
                alert("Ошибка при отправке файлов.");
            }
        } catch (error) {
            console.error("Ошибка при отправке:", error);

            if (error.response) {
                console.error("Ответ от сервера:", error.response);
                alert(`Ошибка от сервера: ${error.response.data.message || 'Неизвестная ошибка'}`);
            } else if (error.request) {
                console.error("Запрос был сделан, но ответа не было:", error.request);
                alert("Запрос был сделан, но сервер не ответил.");
            } else {
                console.error("Ошибка при настройке запроса:", error.message);
                alert("Произошла ошибка при настройке запроса.");
            }
        }
    };

    return (
        <div className="bg-gradient-to-b from-[#485563] to-[#29323c] h-[100vh]">
            <Header />
            <div className="h-[90vh] flex flex-col items-center justify-center text-white">
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
                </div>
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
        </div>
    );
}
