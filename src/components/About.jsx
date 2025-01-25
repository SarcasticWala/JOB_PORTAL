import React from 'react'
import background from '../assets/images/about.jpg'
import emplyee from '../assets/images/employee.png'
import hr from '../assets/images/hr.jpg'
import Footer from './Footer'

const About = () => {
  return (
    <>
        <div className=' flex justify-center items-center gap-x-4 my-16 mx-36'>
            <div className=' flex flex-col gap-y-6'>
                <div className=' text-5xl font-semibold text-[#00a264] '>What We Are Doing?</div>
                <div className=' text-3xl font-semibold text-[#fb246a] '>24k Talented people are getting Jobs</div>
                <div className=' text-xl '>So, what is JobPro? We are a thriving community for workplace conversations, driven by a simple mission to make worklife better, together.</div>
                <div className=' text-xl '>Every day, we are inspired to build a healthier, more transparent work community for all. Through the products we make and the communities we create, we’re breaking down barriers that lead to discrimination, pay gaps and toxic work environments. Together, we’re fostering a world where people have the support and resources they need to make the most of their worklife.</div>
            </div>
            
            <img className=' h-96' src={background} alt="" />
        </div>

        <div className=' bg-[#f5f6f7] flex flex-col justify-center items-center mt-4'>
            <div className=' text-center my-5'>
                <div className=' text-5xl font-semibold text-[#00a264]'>Making worklife better</div>
                <div className=' text-xl font-semibold mt-4 '>Wherever you are on your career journey, JobPro makes it easier for workers and companies to find the perfect match.</div>
            </div>

            <div className=' mt-10 mb-5 flex justify-around items-center gap-x-8 w-full'>
                <div className=' flex flex-col justify-center items-center w-80'>
                    <div className=' w-28'>
                        <img src={emplyee} alt="" />
                    </div>
                    <div className=' text-center'>
                        <div className=' text-2xl font-bold mt-7 mb-1'>For job seekers</div>
                        <div className=' text-lg'>We simplify your search, so you can apply for jobs with confidence. Filter millions of jobs and ratings, talk to professionals, and get smart on salary—then apply with ease.</div>
                    </div>
                </div>

                <div className=' flex flex-col justify-center items-center w-80'>
                    <div className=' w-28'>
                        <img src={hr} alt="" />
                    </div>
                    <div className=' text-center'>
                        <div className=' text-2xl font-bold mt-7 mb-1'>For employers</div>
                        <div className=' text-lg'>We give you a place to shape and share your story, so you can find and keep the best talent. Post jobs, respond to reviews, and gain insights to shape your messaging.</div>
                    </div>
                </div>
            </div>
        </div>

        <Footer/>
    </>
  )
}

export default About
