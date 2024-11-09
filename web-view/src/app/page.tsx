"use client";
import Image from "next/image";
import {Header} from "@/app/components/cap";
import {Table} from "@/app/components/teable";



export default function Home() {
  // function handleDownloadPDF() {
  //   window.print(); // Откроет диалог печати
  // }
  //
  // return (
  //     <div>
  //       <div style={{ padding: '20px' }}>
  //         <h1>Содержимое страницы для скачивания</h1>
  //         <p>Здесь можно разместить любой контент, который вы хотите включить в PDF.</p>
  //       </div>
  //       <button onClick={handleDownloadPDF}>Скачать как PDF</button>
  //     </div>
  // );
    return(
        <div className="bg-gradient-to-b from-[#485563] to-[#29323c] h-[100vh]">
            <Header/>
            <Table/>
        </div>

    );

}
