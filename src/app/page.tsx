import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronRight, Mail, Phone, BookPlus, ListChecks, HandCoins} from "lucide-react";
import { FaInstagram, FaYoutube, FaFacebook } from "react-icons/fa";

export default function Home() {
  return (
    <>
    <main>
      <section className="bg-gradient-to-r from-slate-100 to-slate-500 w-full px-8 lg:px-16 py-12 space-y-10 grid grid-cols-2 justify-center items-center">
        <div>
          <h1 className="text-3xl font-bold">Let's prepare your exams</h1>
        <h2 className="text-3xl font-bold uppercase">Together</h2>

        <p className="py-5 text-wrap w-[300px] mb-10 font-semibold">Lorem ipsum dolor sit amet consectetur adipisicing elit.
           Repellat libero sit aperiam consectetur veniam vel alias? Quos architecto,
            hic sapiente asperiores cum eos minima aperiam ratione necessitatibus perferendis iusto quibusdam.
        </p>
        <Button size="lg" className="font-bold" asChild><Link href="/register">Create your account <ChevronRight className="ml-1"/></Link></Button>  
        </div>  
        
      </section>

      <section className="mx-auto px-8 py-16">
        <h2>Additional content</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores nobis beatae minus quis ipsum laborum corporis impedit quo et ullam amet a, error atque in aliquid. Dolore eligendi necessitatibus minus. Dicta repellendus suscipit reiciendis error optio voluptate expedita, quod enim praesentium, in dolorem, illum sed. Dicta excepturi et velit dolore, eaque eos perferendis porro cupiditate, ab blanditiis perspiciatis voluptates in illum! Autem distinctio et fuga quam magni, voluptate praesentium, eos totam placeat corrupti sequi repudiandae! Accusantium, itaque reprehenderit quisquam assumenda eum ad quas dolores non maxime ducimus obcaecati numquam nemo similique commodi labore sint provident voluptatem, impedit mollitia! Ipsam, eligendi!</p>
      </section>


      <section className="bg-slate-100 flex flex-col sm:flex-row justify-evenly px-5 lg:px-12 py-16  gap-10 sm:gap-3 text-xl">
        <div className="flex flex-col items-center gap-5 justify-center">
          <BookPlus size={64}/>
          <h3>Courses designed for your needs</h3>
        </div>

        <div className="flex flex-col items-center gap-5 justify-center">
          <ListChecks size={64}/>
          <h3>Exercises and quizzes</h3>
        </div>

        <div className="flex flex-col items-center gap-5 justify-center">
          <HandCoins size={64}/>
          <h3>Fair and accesible prices</h3>
        </div>
      </section>
    </main>


    <footer>
      <section className="bg-slate-900 text-white w-full px-5 lg:px-10 py-12 border-b border-white ">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 justify-center items-center">
          <div className="flex flex-col  items-center">
            <h2 className="text-2xl font-bold text-gray-300">About us</h2>
            <p className="py-5 text-wrap text-justify w-[300px] mb-10 font-semibold ">Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Repellat libero sit aperiam consectetur veniam vel alias? Quos architecto,
              
            </p>
            <a href="#">Terms and conditions</a>
          </div>
          <div className="flex flex-col items-center">
            <h2 className="text-2xl font-bold text-gray-300">Contact us</h2>
            <p className="py-5 text-wrap text-justify w-[300px] mb-2 font-semibold">Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Repellat libero sit aperiam consectetur veniam vel alias? Quos architecto,
              
            </p>
            <span className="flex justify-center items-center p-2"><Phone className="mr-2"/> contact number </span>
            <span className="flex justify-center items-center p-2"><Mail className="mr-2"/> contact mail </span>
          </div>
          <div className="flex flex-col items-center gap-4 justify-center">
            <h2 className="text-2xl font-bold text-gray-300">Social media</h2>
            <a className="border-solid b-white border p-2 rounded-full hover:bg-slate-800" href="#"><FaInstagram className="text-3xl"/></a>
            <a className="border-solid b-white border p-2 rounded-full hover:bg-slate-800" href="#"><FaYoutube className="text-3xl" href="#"/></a>
            <a className="border-solid b-white border p-2 rounded-full hover:bg-slate-800" href="#"><FaFacebook className="text-3xl" href="#"/></a>
          </div>
        </div>


      </section>

      <section className="bg-slate-900 text-white w-full px-5 lg:px-10 py-8">
        <div className="flex justify-between items-center">
          <p>© 2024 All rights reserved</p>
          <a href="#">Privacy policy</a>
        </div>
      </section>
    </footer>
    </>

  );
}
