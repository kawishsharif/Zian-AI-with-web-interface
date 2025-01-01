import MainLayout from "../components/layout";
import GrBorderBox from "../components/ui/gr-border-box";
import { PrimaryBtnNeon } from "../components/ui/buttons";
import LoadingSparkle from "@/components/LoadingSparkle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck, faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import CustomTooltip from "@/components/custom-tooltip";
import { GenerateApiResponse } from "@/types/response.types";
import useUiState from "@/components/hooks/useUiState";
import api from "@/api";
import useAuthUserStore from "@/lib/zustand/authUserStore";
import DashboardArticleLoaded from "./DashboardArticleLoaded";
import { useEffect, useState } from "react";

type StateType = "IDLE" | "FIRST_TIME" | "GENERATING_EXAMPLE";
export default function Dashboard() {
  const [curState, setCurState] = useState<StateType>("IDLE");
  const { uiState, setUiData, setProcessing } =
    useUiState<GenerateApiResponse>();
  const { authUser } = useAuthUserStore();

  const handleGenerateExample = async () => {
    setProcessing(true);
    const response = await api.other.generate();
    setUiData(response);
    setCurState(response.success ? "GENERATING_EXAMPLE" : "FIRST_TIME");
    setProcessing(false);
  };

  useEffect(() => {
    setCurState(
      authUser?.articlesample === "generating article"
        ? "GENERATING_EXAMPLE"
        : "FIRST_TIME"
    );
  }, [authUser]);

  return authUser?.articlesample === "claimed" ? (
    <DashboardArticleLoaded />
  ) : (
    <MainLayout>
      <GrBorderBox
        className="p-px md:p-[2px] rounded-20 lg:max-h-[calc(100vh_-_130px)]"
        type="lg"
      >
        <div className="px-3 md:px-5 pt-[30px] pb-20 h-full w-full flex flex-col backdrop-blur-[10px] bg-gr-purple-light opacity-90 rounded-20">
          {curState === "IDLE" ? (
            <div className="w-full h-screen flex items-center justify-center">
              <LoadingSparkle spark variant="large" />
            </div>
          ) : (
            <div className="flex md:h-screen w-full justify-center items-center">
              <div className="flex flex-col text-center justify-center items-center max-w-2xl">
                <div className="">
                  <h1 className="font-nebula text-2xl md:text-[32px] font-normal text-white">
                    Welcome, {authUser?.name}
                  </h1>
                  <h2 className="font-jakarta text-base md:text-2xl font-normal text-white">
                    To get started, click "GENERATE EXAMPLE" below!
                  </h2>
                  <p className="font-jakarta text-sm md:text-base font-normal text-white/80 py-5">
                    If no examples are available yet, please wait for our team
                    to notify you that your account is ready, and in the
                    meantime view Integration to connect the system with your
                    site. Reach out to <a href="mailto:hello@zian.ai" className="underline">hello@zian.ai</a> if you need support
                  </p>
                  
                </div>
                <div className="flex md:flex-row  flex-col items-center justify-center my-5 gap-3">
                  <CustomTooltip
                    title="Upgrade"
                    className="px-16 md:px-4"
                    content={
                      <>
                        To increase articles volume, please email{" "}
                        <a href="mailto:hello@zian.ai" className="underline">
                          hello@zian.ai
                        </a>
                      </>
                    }
                  />

                  {curState === "GENERATING_EXAMPLE" ? (
                    <PrimaryBtnNeon
                      onClick={() => window.location.reload()}
                      className="w-full max-w-[100%] h-[42px] md:w-auto"
                    >
                      Refresh
                    </PrimaryBtnNeon>
                  ) : (
                    <PrimaryBtnNeon
                      onClick={handleGenerateExample}
                      disabled={uiState.processing}
                      className="w-full max-w-[100%] h-[42px] md:w-auto"
                    >
                      {uiState.processing ? (
                        <LoadingSparkle variant="tiny" spark={true} />
                      ) : (
                        <span>Generate Example</span>
                      )}
                    </PrimaryBtnNeon>
                  )}
                </div>
                <div className="text-start mt-5">
                  {curState === "GENERATING_EXAMPLE" ? (
                    <p className="text-sm font-medium flex items-start gap-3">
                      <FontAwesomeIcon
                        icon={faCircleCheck}
                        className="text-th-green mt-1"
                      />
                      Success! We&apos;re crafting your examples. Check back in
                      2-5 mins for the results.
                    </p>
                  ) : (
                    uiState.state?.data && (
                      <p className="text-sm font-medium flex items-start gap-3">
                        <FontAwesomeIcon
                          icon={faCircleInfo}
                          className="text-red-500 mt-1"
                        />
                        {uiState.state.data as string}
                      </p>
                    )
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </GrBorderBox>
    </MainLayout>
  );
}
