"use client";
import {useEffect, useState} from "react";
import axios from "axios";
import Image from 'next/image';
import {Header} from "@/app/components/cap";
import {useRouter} from "next/navigation";
import Link from "next/link";
import add from "@/assets/Add.svg";
import edit from "@/assets/Edit.svg";
import del from "@/assets/Close.svg";



interface ReportData {
    uid: string;
    title: string;
    create_date: string;
}

const instance = axios.create({
    baseURL: 'http://localhost:8080/api/v1/',
    timeout: 10000
});

// Получить все отчеты
export async function getAllReports(handler: (data: ReportData[]) => void) {
    try {
        const response = await instance.get('report/all');
        handler(response.data);
    } catch (error) {
        console.error("Ошибка при загрузке всех отчетов:", error);
        throw error; // Прокидываем ошибку для дальнейшей обработки
    }
}

// Получить один отчет по UID
export async function getReportByUid(uid: string, handler: (data: ReportData) => void) {
    try {
        const response = await instance.get(`report/get/${uid}`);
        handler(response.data);
        console.log(response.data); // Для дебага
    } catch (error) {
        console.error(`Ошибка при загрузке отчета с UID ${uid}:`, error);
        throw error; // Прокидываем ошибку для дальнейшей обработки
    }
}

// Создать новый отчет (название по умолчанию)
export async function createReport() {
    try {
        const title = `Отчет ${new Date().toLocaleString()}`; // Название отчета по умолчанию
        const response = await instance.post('report/create', {title});
        console.log('Отчет создан:', response.data);
        return response.data;
    } catch (error) {
        console.error("Ошибка при создании отчета:", error);
        throw error; // Прокидываем ошибку
    }
}

// Обновить отчет
export async function updateReport(uid: string, title: string) {
    try {
        const response = await instance.put(`report/update/${uid}`, {title});
        console.log('Отчет обновлен:', response.data);
    } catch (error) {
        console.error(`Ошибка при обновлении отчета с UID ${uid}:`, error);
        throw error; // Прокидываем ошибку
    }
}

// Удалить отчет
export async function deleteReport(uid: string) {
    try {
        const response = await instance.delete(`report/delete/${uid}`);
        console.log(`Отчет с UID ${uid} удален:`, response.data);
    } catch (error) {
        console.error(`Ошибка при удалении отчета с UID ${uid}:`, error);
        throw error; // Прокидываем ошибку
    }
}

export default function Home() {
    const [data, setData] = useState<ReportData[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [editingReport, setEditingReport] = useState<ReportData | null>(null);
    const [updatedTitle, setUpdatedTitle] = useState<string>("");
    const [currentPage, setCurrentPage] = useState(1);

    const itemsPerPage = 16;
    const totalPages = Math.ceil(data.length / itemsPerPage);

    const router = useRouter();

    useEffect(() => {
        getAllReports(setData).catch(() => setError("Ошибка при загрузке данных"));
    }, []);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const paginatedData = data.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handleCreateReport = async () => {
        try {
            const newReport = await createReport();
            setData([...data, newReport]);
        } catch (error) {
            setError("Ошибка при создании отчета");
        }
    };

    const handleDeleteReport = async (uid: string) => {
        try {
            await deleteReport(uid);
            setData(data.filter((report) => report.uid !== uid));
        } catch (error) {
            setError("Ошибка при удалении отчета");
        }
    };

    const handleEditReport = (report: ReportData) => {
        setEditingReport(report);
        setUpdatedTitle(report.title);
    };

    const handleUpdateReport = async () => {
        if (editingReport && updatedTitle.trim()) {
            try {
                await updateReport(editingReport.uid, updatedTitle);
                setData(data.map((report) =>
                    report.uid === editingReport.uid ? { ...report, title: updatedTitle } : report
                ));
                setEditingReport(null);
                setUpdatedTitle("");
            } catch (error) {
                setError("Ошибка при обновлении отчета");
            }
        } else {
            setError("Название отчета не может быть пустым");
        }
    };

    return (
        <div className="bg-gradient-to-b from-[#485563] to-[#29323c] h-[100vh]">
            <Header/>
            <div className="container mx-auto p-4 text-white">
                {error && <p className="text-red-500">{error}</p>}

                <div className="mb-4">
                    <button onClick={handleCreateReport} className="text-white">
                        <Image src={add} width={50} height={50} alt="add" />
                    </button>
                </div>

                {editingReport && (
                    <div className="mb-4">
                        <input
                            type="text"
                            value={updatedTitle}
                            onChange={(e) => setUpdatedTitle(e.target.value)}
                            className="p-2 text-black"
                            placeholder="Редактировать название отчета"
                        />
                        <button onClick={handleUpdateReport} className="ml-2 px-4 py-2 bg-yellow-500 text-white">Обновить отчет</button>
                    </div>
                )}

                <div className="flex flex-row gap-5 flex-wrap">
                    {paginatedData.map((item) => (
                        <div key={item.uid}
                             className="w-[350px] bg-[#323D48] text-wrap h-[150px] p-5 border-[1px] rounded-xl relative overflow-y-auto overflow-x-hidden">
                            <Link href={`/pages/report/${item.uid}`} className="block">
                                <p className="text-wrap"><strong>Название:</strong> {item.title}</p>
                                <p><strong>Дата создания:</strong> {item.create_date}</p>
                            </Link>
                            <div className="absolute top-2 right-2 flex space-x-2">
                                <button onClick={() => handleEditReport(item)} className="text-yellow-500">
                                    <Image className="fill-yellow-500" src={edit} width={25} height={25} alt="edit" />
                                </button>
                                <button onClick={() => handleDeleteReport(item.uid)} className="text-red-500">
                                    <Image className="fill-red-500" src={del} width={25} height={25} alt="del" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Фиксированные кнопки пагинации внизу */}
                <div className="fixed bottom-5 right-5 w-full flex justify-center p-4">
                    <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="px-3 py-1 bg-gray-500 text-white disabled:bg-gray-400 mx-2"
                    >
                        Назад
                    </button>
                    <span className="mx-2">{currentPage} из {totalPages}</span>
                    <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="px-3 py-1 bg-gray-500 text-white disabled:bg-gray-400 mx-2"
                    >
                        Вперед
                    </button>
                </div>

            </div>
        </div>
    );
}
