"use client"
import axios from "axios"
import {  useEffect , useState } from "react";
import { io } from "socket.io-client"

const socket = io('http://localhost:4000')


export default function Home() {
  const [judul, setJudul] = useState('')
  const [isi, setIsi] = useState('')
  const [message, setMessage] = useState<{judul: string; isi:string}[]>([])

  useEffect(() => {
    socket.on("halo", (msg) => {
      setMessage((prevMsg) => [...prevMsg, msg])
    })
    return () => {
      socket.off('halo')
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const res = await axios.post('http://localhost:4000', {judul, isi}
    )
    console.log(res)
    setJudul('')
    setIsi('')
  }


  return (
    <>
    test
    <p>saya akna mengirim pesan realtime menggunakan socket.io : </p><br />
    <br />
    judul :{judul} <br />
    
    isi : {isi}
    <br />
    pesan realtime!!! <br />{message.length === 0 ? "belum ada pesan" : message.map((msgObj, i) => (
      <div key={i}>
      <p> judul :{msgObj.judul}</p>
      <p> isi: {msgObj.isi}</p>
      </div>
    ))}
<br />
    <form onSubmit={handleSubmit} className="bg-slate-300 grid text-black justify-center">
      <input type="text" value={judul} onChange={e => setJudul(e.target.value)} />
      <input type="text" value={isi} onChange={e => setIsi(e.target.value)}/>
  <button className="w-22">submit</button>      
    </form>
    </>
    );
}
