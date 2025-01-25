import React from 'react'
import profile_image from '../assets/images/profile.png'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const MyProfile = () => {
  // Give fixed height of every fields

  const user = useSelector((state) => state.profile.user)

  const navigate = useNavigate();

  return (
    <>
      <div className=' w-2/3 border-2 border-b-[#ededed] rounded-lg my-8 mx-auto '>
        <div className="box1 border-b-2 border-b-[#ededed]">
          <div className=' flex justify-between mt-6 mx-8 mb-0 '>
            <div className=' flex flex-col '>
              <div className=' text-3xl font-medium mb-3'>Profile</div>
              <div className=' font-medium'>Build a better Glassdoor experience </div>
              <div className=' font-medium'>by managing your employment information.</div>
            </div>
            <div>
              <img className=' w-64' src={profile_image} alt="" />
            </div>
          </div>
        </div>

        <div className="box2 border-b-2 border-b-[#ededed]">
          <div className=' flex flex-col mx-8 my-6  '>
            <div className=' flex items-center gap-x-3'>
              <div className=' text-2xl font-medium '>My information</div>
              <span onClick={() => { navigate('/settings') }} className="material-symbols-outlined rounded-full p-1 cursor-pointer hover:bg-[#f2f4f5]">edit</span>
            </div>
            <div className=' font-normal mb-3 '>Updating your information will offer you the most relevant jobs</div>
            <div className=' flex items-center gap-x-5'>
              <img className=' self-start w-32 rounded-full' src={user?.image} alt="" />
              <div className='profile-info flex flex-col gap-y-4 '>
                <div>
                  <div className=' text-xs '>Full name*</div>
                  <div className=' text-xl'>{user?.firstName + " " + user?.lastName}</div>
                </div>
                <div>
                  <div className=' text-xs '>Employement status*</div>
                  <div className=' text-xl'>{user?.accountType[0].toUpperCase() + user?.accountType.slice(1)}</div>
                </div>
                <div className='min-h-16 '>
                  <div className=' text-xs '>About*</div>
                  <div className=' text-xl max-h-[200px] overflow-y-auto'>{user?.additionalDetails.about ?? "Not Added by user"}</div>
                </div>
                <div>
                  <div className=' text-xs '>Email address*</div>
                  <div className=' text-xl'>{user?.email}</div>
                </div>
                <div className=' min-h-10'>
                  <div className=' text-xs'>Contact*</div>
                  <div className=' text-xl'>{user?.additionalDetails.contact ?? "Not specified"}</div>
                </div>
                <div className=' min-h-10'>
                  <div className=' text-xs '>Gender*</div>
                  <div className=' text-xl'>{user?.additionalDetails.gender ?? "Not specified"}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {
          user?.accountType === "employee" &&
          <div className="box3">
            <div className=' flex flex-col mt-6 mx-8 mb-8 '>
              <div className=' text-2xl font-medium mb-3'>CV</div>
              <div className=' font-normal mb-3'>After you upload a CV, it will be used to pre-fill job applications that you submit via Easy Apply. You can also make your CV visible or not visible to employers that are currently hiring.</div>
              {
                user?.resume ?
                  <div onClick={() => { window.open(`${user?.resume}`) }} className=' flex items-center gap-x-2 mb-3'>
                    <span className="material-symbols-outlined">description</span>
                    <div className=' text-xl font-medium hover:underline cursor-pointer'>{user?.firstName + "_" + user?.lastName + "_" + "resume"}</div>
                  </div>
                  :
                  <button onClick={() => { navigate('/settings') }} className='  bg-[#4cd681] px-4 py-1 rounded-md font-medium hover:bg-[#4cd681d1] hover:text-[#000000b0]'>Upload Resume</button>
              }
            </div>
          </div>
        }
      </div>
    </>
  )
}

export default MyProfile
