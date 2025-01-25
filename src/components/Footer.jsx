import { DiAndroid } from "react-icons/di";
import { FaApple, FaYoutube , FaFacebookF, FaInstagram  } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const Footer = () => {
    const navigate = useNavigate();
  return (
    <div className="border-t border-gray-400">
        <div className='w-2/3 mx-auto my-10'>
            <div className='flex my-6 justify-between'>
                <div>
                    <p className="text-3xl text-[#00a264] font-bold">JobPro</p>
                </div>
                <div className="flex flex-col">
                    <h3 className="font-semibold">JobPro</h3>
                    <p onClick={() => {navigate("/about")}} className="hover:underline cursor-pointer">About</p>
                    <p className="hover:underline cursor-pointer">Blog</p>
                    <p onClick={() => {navigate("/contact")}} className="hover:underline cursor-pointer">Contact Us</p>
                </div>
                <div className="flex flex-col">
                    <h3 className="font-semibold">Employers</h3>
                    <p className="hover:underline cursor-pointer">Get a FREE Employer Account</p>
                    <p className="hover:underline cursor-pointer">Employer Center</p>
                </div>
                <div className="flex flex-col">
                    <h3 className="font-semibold">Information</h3>
                    <p onClick={() => {navigate("/contact")}} className="hover:underline cursor-pointer">Help / Contact Us</p>
                    <p className="hover:underline cursor-pointer">Guidelines</p>
                    <p className="hover:underline cursor-pointer">Terms of Use</p>
                    <p className="hover:underline cursor-pointer">Privacy and Ad Choices</p>
                    <p className="hover:underline cursor-pointer">Cookie Consent Tool</p>
                </div>
                <div className="flex flex-col">
                    <h3 className="font-semibold">Work With Us</h3>
                    <p className="hover:underline cursor-pointer">Advertisers</p>
                    <p className="hover:underline cursor-pointer">Careers</p>
                </div>
            </div>
            <div className="my-4 mt-10 flex flex-row justify-around">
                <div className="flex items-center gap-2">
                    <p>Download the App</p>
                    <DiAndroid fontSize={30} className="cursor-pointer hover:text-green-600 transition-all duration-300" />
                    <FaApple fontSize={30} className="cursor-pointer hover:text-green-600 transition-all duration-300" />
                </div>
                <div className="flex gap-2 ">
                    <div className="w-fit p-2 rounded-full border cursor-pointer hover:bg-blue-500 hover:text-white border-black transition-all duration-300">
                        <FaFacebookF fontSize={24} />
                    </div>
                    <div className="w-fit p-2 rounded-full border cursor-pointer hover:bg-red-600 hover:text-white border-black transition-all duration-300">
                        <FaYoutube fontSize={24} />
                    </div>
                    <div className="w-fit p-2 rounded-full border cursor-pointer hover:bg-pink-500 hover:text-white border-black transition-all duration-300">
                        <FaInstagram fontSize={24} />
                    </div>
                    <div className="w-fit p-2 rounded-full border cursor-pointer hover:bg-blue-500 hover:text-white border-black transition-all duration-300">
                        <FaXTwitter fontSize={24} />
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Footer