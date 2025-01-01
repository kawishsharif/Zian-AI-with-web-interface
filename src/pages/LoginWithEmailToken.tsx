import { useNavigate, useParams } from "react-router-dom";
import MainLayout from "../components/layout";
import LoadingSparkle from "@/components/LoadingSparkle";
import { useEffect } from "react";
import api from "@/api";
import { useCookies } from "react-cookie";
import { useToast } from "@/components/ui/use-toast";

export default function LoginWithEmailPage() {
  const navigate = useNavigate()
  const { token } = useParams();
  const [_, setCookie] = useCookies(["authToken"]);
  const { toast } = useToast()



  useEffect(() => {
    if (!token) return navigate("/login");
    api.user.emaillogin({ type: "token", token })
      .then((res) => {
        console.log(res)
        if (res.success && res.data) {
          setCookie("authToken", res.data, {
            maxAge: 24 * 60 * 60,
            path: "/",
            sameSite: "lax",
          });
          return navigate("/");
        }
        toast({
          title: res.message,
          variant: res.success ? "default" : "destructive"
        })
      })
  })


  return (
    <MainLayout secure={false} sidebar={false}>
      <div className="flex flex-col items-center justify-center py-36 h-full">
        <LoadingSparkle variant="large" spark />
      </div>
    </MainLayout>
  );
}
