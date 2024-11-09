"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { Header } from "@/app/components/cap";

interface ReportData {
    uid: string;
    title: string;
    create_date: string;
}

export async function getAllCat(handler: (data: ReportData[]) => void) {
    try {
        const response = await axios.get("http://localhost:8080/api/v1/report/all", {
            headers: {
                "User-Agent": "insomnia/10.1.1",
            },
        });
        handler(response.data);
        console.log(response.data);
    } catch (error) {
        console.error("Ошибка при загрузке данных:", error);
    }
}

export default function Home() {
    const [data, setData] = useState<ReportData[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        getAllCat(setData).catch(() => setError("Ошибка при загрузке данных"));
    }, []);

    return (
        <div className="bg-gradient-to-b from-[#485563] to-[#29323c] h-[100vh]">
            <Header />
            <div className="container mx-auto p-4 text-white">
                {error ? (
                    <p className="text-red-500">{error}</p>
                ) : (
                    <ul>
                        {data.map((item) => (
                            <li key={item.uid} className="mb-2">
                                <p><strong>UID:</strong> {item.uid}</p>
                                <p><strong>Title:</strong> {item.title}</p>
                                <p><strong>Create Date:</strong> {item.create_date}</p>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}
