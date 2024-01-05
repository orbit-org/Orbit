import { useState } from "react"
import { useNavigate } from "react-router-dom"

import { apple, google, welcomeBg } from "@/assets"
import { WelcomeButton } from "@/components"
import { Wrapper } from "@/hoc"

type Views = "default" | "signin" | "signup"

const Welcome = () => {
   const [activeView, setActiveView] = useState<Views>("default")

   const navigateTo = useNavigate()

   return (
      <>
         <video
            className="absolute h-full w-full object-cover"

            src={welcomeBg}
            autoPlay loop muted
         />

         <div className="absolute flex flex-col items-center justify-between h-full w-full p-8 bg-black/50">
            <p className="mt-36 text-center text-4xl font-bold text-white">
               Welcome, to your personal orbit.
            </p>

            <div className="flex flex-col gap-2 w-full center">
               {
                  activeView === "default" ? <>
                     <WelcomeButton
                        btnType="ring"
                        text="Create an account"
                        onClick={() => setActiveView("signup")}
                     />
                     <WelcomeButton
                        btnType="transparent"
                        text="Sign in"
                        onClick={() => setActiveView("signin")}
                     />
                  </> : activeView === "signin" ? <>
                     <WelcomeButton
                        btnType="white"
                        image={apple}
                        text="Sign in with Apple"
                        onClick={() => { }}
                     />
                     <WelcomeButton
                        btnType="white"
                        image={google}
                        text="Sign in with Google"
                        onClick={() => { }}
                     />
                     <WelcomeButton
                        btnType="ring"
                        text="With email and password"
                        onClick={() => navigateTo("/onboarding/signin")}
                     />
                     <WelcomeButton
                        btnType="transparent"
                        text="Back"
                        onClick={() => setActiveView("default")}
                     />
                  </> : <>
                     <WelcomeButton
                        btnType="white"
                        image={apple}
                        text="Sign up with Apple"
                        onClick={() => { }}
                     />
                     <WelcomeButton
                        btnType="white"
                        image={google}
                        text="Sign up with Google"
                        onClick={() => { }}
                     />
                     <WelcomeButton
                        btnType="ring"
                        text="With email and password"
                        onClick={() => navigateTo("/onboarding/signup")}
                     />
                     <WelcomeButton
                        btnType="transparent"
                        text="Back"
                        onClick={() => setActiveView("default")}
                     />
                  </>
               }
            </div>
         </div>
      </>
   )
}

export default Wrapper({ children: <Welcome /> })