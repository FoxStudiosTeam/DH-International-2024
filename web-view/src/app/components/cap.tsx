"use client";
import Image from 'next/image';
import logo from "../../assets/logo.svg";

export function Header(){
    return (
        <div className="flex items-center bg-[#292e33]">
            <Image src={logo} width={70} height={70} alt="Logo" />
            <h1 className="font-[500] text-[20px] ml-2 text-[#f8f9fa]">Animal Detect</h1>
        </div>
    );
}
