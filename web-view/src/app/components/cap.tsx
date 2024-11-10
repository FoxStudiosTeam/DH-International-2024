"use client";
import Image from 'next/image';
import logo from "../../assets/logo.svg";
import Link from "next/link";

export function Header(){
    return (
        <div className="flex items-center bg-[#222E3A] ">
            <Link href={"/"} className="flex items-center bg-[#222E3A] ">
                <Image src={logo} width={70} height={70} alt="Logo" />
                <h1 className="font-[500] text-[20px] ml-2 text-[#f8f9fa]">Обнаружение животных</h1>
            </Link>

        </div>
    );
}
