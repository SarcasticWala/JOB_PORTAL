import { useEffect, useRef, useState } from "react"
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { IoTrashOutline } from "react-icons/io5";
import { FiUpload } from "react-icons/fi";
import { useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../redux/Slices/profileSlice";
import { setToken } from "../redux/Slices/authSlice";
import { toast } from "react-toastify";

const genders = ["Male", "Female", "Other"]

const Settings = () => {

  const user = useSelector((state) => state.profile.user)
  const dispatch = useDispatch()

  const [imageFile, setImageFile] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)

  const [formData, setFormData] = useState({
    firstName: user.firstName ?? "",
    lastName: user.lastName ?? "",
    DOB: user.additionalDetails.DOB ?? "",
    gender: user.additionalDetails.gender ?? "",
    contact: user.additionalDetails.contact ?? "",
    about: user.additionalDetails.about ?? "",
  })

  const [showPassword1, setShowPassword1] = useState(true)
  const [showPassword2, setShowPassword2] = useState(true)
  const [pdfSelected, setPdfSelected] = useState(false)
  const [pdfFile, setPdfFile] = useState(null);

  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
  })

  const handlePasswordChange = (e) => {
    const { name, value } = e.target
    setPasswordData({
      ...passwordData,
      [name]: value
    })
  }

  const fileInputRef = useRef()
  const pdfInputRef = useRef()

  const navigate = useNavigate();

  const handleClick = () => {
    fileInputRef.current.click()
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setImageFile(file)
      previewFile(file)
    }
  }

  const handlePdfChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setPdfFile(file)
      setPdfSelected(true)
    }
  }

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImagePreview(reader.result)
    }
  }

  const handleFileUpload = async () => {
    // Upload image to server
    if(!imageFile) return

    const toastId = toast.loading("Uploading Image...");
    const formData = new FormData();
    formData.append('image', imageFile);

    let res = await fetch("http://localhost:3000/profile/updateImage", {
      method: "POST",
      credentials: 'include',
      body: formData
    })

    let data = await res.json()
    console.log(data)
    if(data.success === false) {
      toast.update(toastId, { render: data.message, type: "error", isLoading: false, autoClose: 2000 })
      return
    } else {
      toast.update(toastId, { render: "Image Uploaded Successfully!", type: "success", isLoading: false, autoClose: 2000 })
    }

    dispatch(setUser(data.user))
  }

  const hanldePdfUpload = async () => {
    // Upload pdf to server
    if(!pdfFile) return

    const toastId = toast.loading("Uploading Resume...");
    const formData = new FormData();
    formData.append('resume', pdfFile);

    let res = await fetch("http://localhost:3000/profile/updateResume", {
      method: "POST",
      credentials: 'include',
      body: formData
    })

    let data = await res.json()
    console.log(data)

    if(data.success === false) {
      toast.update(toastId, { render: data.message, type: "error", isLoading: false, autoClose: 2000 })
      return
    } else {
      toast.update(toastId, { render: "Resume Uploaded Successfully!", type: "success", isLoading: false, autoClose: 2000 })
    }

    dispatch(setUser(data.user))

    setPdfSelected(false)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
  }

  const handleSubmit = async (e) => {
    // Update user details
    e.preventDefault()
    console.log(formData)
    
    const toastId = toast.loading("Updating Profile...");
    let res = await fetch("http://localhost:3000/profile/updateProfile", {
      method: "POST",
      credentials: 'include',
      headers:{
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData)
    })

    let data = await res.json()
    console.log(data)
    if(data.success === false) {
      toast.update(toastId, { render: data.message, type: "error", isLoading: false, autoClose: 2000 })
      return
    } else {
      toast.update(toastId, { render: "Profile Updated Successfully!", type: "success", isLoading: false, autoClose: 2000 })
    }
    dispatch(setUser(data.user))
  }

  const handleUpdatePassword = async (e) => {
    e.preventDefault()
    if(passwordData.newPassword === passwordData.oldPassword) {
      toast.error("New password cannot be same as old password")
      return
    }
    
    const toastId = toast.loading("Updating Password...");
    let res = await fetch("http://localhost:3000/auth/changePassword", {
      method: "POST",
      credentials: 'include',
      headers:{
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
              old_pass: passwordData.oldPassword,
              new_pass: passwordData.newPassword
            })
    })

    let data = await res.json()
    console.log(data)
    
    if(data.success === false) {
      toast.update(toastId, { render: data.message, type: "error", isLoading: false, autoClose: 2000 })
      return
    } else {
      toast.update(toastId, { render: "Password Updated Successfully!", type: "success", isLoading: false, autoClose: 2000 })
    }

    setPasswordData({
      oldPassword: "",
      newPassword: ""
    })
  }

  const handleAccountDelete = () => {
    if(!window.confirm("Are you sure you want to delete your account?")) return;
    
    // Delete account
    let res = fetch("http://localhost:3000/profile/deleteProfile", {
      method: "DELETE",
      credentials: 'include',
      headers:{
        "Content-Type": "application/json",
      },
    })

    dispatch(setUser(null))
    dispatch(setToken(null))

    navigate("/")
  }

  useEffect(() => {
    if (imageFile) {
      previewFile(imageFile)
    }
  }, [imageFile])


  return (
    <div className="w-[calc(100vw-10rem)] overflow-y-auto">
      <div className="mx-auto w-10/12">
        <h1 className="text-3xl font-semibold">Edit Profile</h1>
        <div className="flex items-center gap-10 bg-gray-100 border border-gray-400 rounded-lg px-10 py-8 my-16">
          <img
            src={imagePreview || user.image}
            className="aspect-square h-28 w-28 rounded-full object-cover"
          />
          <div className="flex flex-col gap-y-4">
            <p className="text-xl text-black font-semibold">
              Change Profile Picture
            </p>
            <div className="flex gap-4">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
                accept="image/png, image/jpeg, image/jpg, image/gif"
              />
              <button
                onClick={handleClick}
                className="bg-gray-400 text-black py-2 px-4 rounded-md"
              >
                Select
              </button>
              <button
                onClick={handleFileUpload}
                className="flex items-center gap-x-1 rounded-md bg-black text-white py-2 px-4 hover:bg-[#00a264] transition-all duration-300">
                Upload <span><FiUpload /></span>
              </button>
            </div>
          </div>
        </div>

        {user.accountType === "employee" && <div className="bg-gray-100 rounded-lg mb-16 border border-gray-400 py-10">
          <div className="w-10/12 mx-auto flex flex-col">
            <h2 className="font-semibold text-xl">Upload Resume</h2>
            <p className="mt-4 font-semibold">{pdfSelected && "File Selected"}</p>
            <div className="flex gap-4 mt-4">
              <input
                type="file"
                className="hidden"
                ref={pdfInputRef}
                accept="application/pdf"
                onChange={handlePdfChange}
              />
              <button
                onClick={() => pdfInputRef.current.click()}
                className="bg-gray-400 text-black py-2 px-4 rounded-md">Select</button>
              <button
                onClick={hanldePdfUpload}
                className="flex items-center gap-x-1 rounded-md bg-black text-white py-2 px-4 hover:bg-[#00a264] transition-all duration-300"><p>Upload</p> <FiUpload /></button>
            </div>
          </div>
        </div>}

        <div className="border border-gray-400 bg-gray-100 rounded-xl py-10">
          <form onSubmit={handleSubmit}>
            <div className="w-10/12 mx-auto flex flex-col">
              <h2 className="text-xl font-semibold mb-8">Profile Information</h2>
              <div className="flex gap-10 w-full my-4">
                <div className="w-full">
                  <label>
                    <p>First Name</p>
                    <input
                      type="text"
                      name="firstName"
                      onChange={handleChange}
                      value={formData.firstName}
                      className="border border-gray-400 rounded-md mt-2 p-2 w-full"
                    />
                  </label>
                </div>
                <div className="w-full">
                  <label>
                    <p>Last Name</p>
                    <input
                      type="text"
                      name="lastName"
                      onChange={handleChange}
                      value={formData.lastName}
                      className="border border-gray-400 rounded-md mt-2 p-2 w-full"
                    />
                  </label>
                </div>
              </div>
              <div className="flex gap-10 w-full my-4">
                <div className="w-full">
                  <label>
                    <p>Date of Birth</p>
                    <input
                      type="date"
                      name="DOB"
                      onChange={handleChange}
                      value={formData.DOB}
                      className="border border-gray-400 rounded-md mt-2 p-2 w-full"
                    />
                  </label>
                </div>
                <div className="w-full">
                  <label>
                    <p>Contact Number</p>
                    <input
                      type="number"
                      name="contact"
                      onChange={handleChange}
                      value={formData.contact}
                      className="border border-gray-400 rounded-md mt-2 p-2 w-full"
                    />
                  </label>
                </div>
              </div>
              <div className="flex flex-col my-4">
                <label className="">
                  Gender
                </label>
                <select
                  type="text"
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="border border-gray-400 rounded-md mt-2 p-2 "
                >
                  <option value="" disabled>selected</option>
                  {genders.map((ele, i) => {
                    return (
                      <option key={i} value={ele}>
                        {ele}
                      </option>
                    )
                  })}
                </select>
              </div>
              <div className="my-4">
                <label>
                  <p>About</p>
                  <textarea
                    rows={7}
                    name="about"
                    value={formData.about}
                    onChange={handleChange}
                    className="border border-gray-400 rounded-md mt-2 p-2 w-full"
                    maxLength={1000}
                  />
                </label>
              </div>
              <div className="flex gap-4 self-end">
                <button onClick={() => { navigate("/myprofile") }} className="px-4 py-2 bg-gray-400 rounded-md">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-black hover:bg-[#00a264] text-white rounded-md transition-all duration-300">Save</button>
              </div>
            </div>
          </form>
        </div>

        <div className="border border-gray-400 bg-gray-100 my-16 rounded-lg  py-8">
          <div className="w-10/12 mx-auto">
            <h2 className="font-semibold text-xl mb-4">Update Password</h2>
            <form onSubmit={handleUpdatePassword} className="flex flex-col">
              <div className="flex gap-10 my-4">
                <div className="w-full">
                  <label className="relative">
                    <p>Old Password</p>
                    <input
                      type={showPassword1 ? "password" : "text"}
                      value={passwordData.oldPassword}
                      name="oldPassword"
                      onChange={handlePasswordChange}
                      className="border border-gray-400 rounded-md mt-2 p-2 w-full"
                    />
                    <span
                      onClick={() => setShowPassword1((prev) => !prev)}
                      className="absolute right-3 top-10 translate-y-[20%] z-[10] cursor-pointer text-xl"
                    >
                      {!showPassword1 ? (<AiOutlineEyeInvisible />) : (<AiOutlineEye />)}
                    </span>
                  </label>
                </div>
                <div className="w-full">
                  <label className="relative">
                    <p>New Password</p>
                    <input
                      type={showPassword2 ? "password" : "text"}
                      name="newPassword"
                      value={passwordData.newPassword}
                      onChange={handlePasswordChange}
                      className="border border-gray-400 rounded-md mt-2 p-2 w-full"
                    />
                    <span
                      onClick={() => setShowPassword2((prev) => !prev)}
                      className="absolute right-3 top-10 translate-y-[20%] z-[10] cursor-pointer text-xl"
                    >
                      {!showPassword2 ? (<AiOutlineEyeInvisible />) : (<AiOutlineEye />)}
                    </span>
                  </label>
                </div>
              </div>
              <div className="flex gap-4 my-2 self-end">
                <button onClick={() => { navigate("/myprofile") }} className="px-4 py-2 bg-gray-400 rounded-md">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-black hover:bg-[#00a264] text-white rounded-md transition-all duration-300">Save</button>
              </div>
            </form>
          </div>
        </div>

        <div className="border border-red-600 bg-[#f6bec4] my-16 rounded-lg py-8">
          <div className="mx-auto w-10/12">
            <div className="flex gap-3 items-center mb-4">
              <h2 className="text-xl font-semibold">Delete Account</h2>
              <div className="p-2 rounded-full border bg-red-300">
                <IoTrashOutline color="red" size={24} />
              </div>
            </div>
            <div>
              <p>Would you like to delete this account?</p>
              <p>Deleting your account is permanent and will remove all the contain associated with it.</p>
              <button
                onClick={handleAccountDelete}
                className="mt-3 italic font-semibold text-red-800 hover:underline"
              >
                I want to delete this account
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Settings