import MainLayout from "../components/layout";
import GrBorderBox from "../components/ui/gr-border-box";
import { Input } from "@/components/ui/input";
import JSONPretty from 'react-json-pretty';
import useAuthUserStore from "@/lib/zustand/authUserStore";
import { ExternalLinkIcon } from "@radix-ui/react-icons";
import { CopyAPIKeyButton, PrimaryBtn, PrimaryBtnNeon } from "@/components/ui/buttons";
import { Link } from "react-router-dom";






export default function ApiIntegrationPage() {
    const { authUser } = useAuthUserStore()

    return (
        <MainLayout secure heading="INTEGRATE API">
            <GrBorderBox className="p-px md:p-[2px] rounded-20 lg:max-h-[calc(100vh_-_130px)] " type="lg">
                <div className="py-3 md:py-7 h-full w-full flex flex-col backdrop-blur-[10px] bg-gr-purple-light opacity-90 rounded-20">
                    <div className="max-h-full px-3 space-y-2 overflow-y-auto md:px-7 md:space-y-7">
                        <div className="space-y-[10px]">
                            <h1 className="text-xl font-bold text-white font-jakarta md:text-xl">
                                API Key
                            </h1>
                            <div className="relative">
                                <Input className="pr-24" readOnly
                                    value={authUser?.authorization} />
                                <CopyAPIKeyButton />
                            </div>

                            <div className="  mb-[9px]" >
                                <p className="mt-3 text-xl font-bold text-white font-jakarta md:mt-[18px]">
                                    Select your Integration:
                                </p>
                                <div className="mt-3 md:mt-5  flex md:flex-row flex-col gap-[10px]   mb-[15px]">
                                    <Link to="/wordpress">
                                        <PrimaryBtn className="font-normal text-[15px] py-[8px] w-full ">
                                            Wordpress Integration
                                        </PrimaryBtn>
                                    </Link>

                                    <Link to="/shopify">
                                        <PrimaryBtnNeon className="font-normal text-[15px] w-full ">
                                            Shopify Integration Via Zapier
                                        </PrimaryBtnNeon>
                                    </Link>
                                    <Link to="/wix">
                                        <PrimaryBtnNeon className="font-normal text-[15px] w-full ">
                                            Wix Integration Via zapier
                                        </PrimaryBtnNeon>
                                    </Link>
                                </div>


                            </div>
                            <hr className="!p-0 border-2 border-primary " />

                            <div className="font-jakarta text-white text-3xl md:text-[32px] font-bold md:pb-3 pb-1 pt-5">
                                Wordpress Integration
                            </div>
                            <hr className="border border-white/10" />
                        </div>

                        <div className="space-y-3">
                            <div>
                                <h1 className="text-base font-bold text-white font-jakarta md:text-xl ">
                                    How to install on Wordpress
                                </h1>
                                <ol className="text-sm font-normal text-white/70 md:text-base font-jakarta">
                                    <li>
                                        1. Download, install and activate this <a href="https://seo.zian.ai/zian-wordpress-plugin" target="_blank" className="text-white underline cursor-pointer">Zain Wordpress</a> plugin
                                    </li>
                                    <li>2. Go to Setting -{">"} Zian.ai API
                                    </li>
                                    <li>
                                        3. Fill the API Key
                                    </li>
                                    <li>
                                        4. Save Changes
                                    </li>
                                </ol>
                            </div>

                            <div className="pt-1">
                                <VideoComponent />
                                <div className="flex flex-col pt-[10px]">
                                    <a className="pb-2 text-base font-normal text-white cursor-pointer font-jakarta md:pb-5" target="_blank">
                                        Installing Zian AI into Your WordPress Website 🚀 - Watch Video
                                    </a>
                                    <hr className="border border-white/10 " />
                                    <h1 className="pt-5 text-xl font-bold text-white font-jakarta md:pt-10 ">
                                        Default Posts Page, How To Select Where Articles Are Posted:
                                    </h1>
                                    <div className="flex gap-[6px] md:pt-5  pt-2 pb-5 md:pb-10 text-primary items-center ">

                                        <a className="flex text-base font-normal underline cursor-pointer font-jakarta text-primary " target="_blank" href="https://wordpress.com/support/posts-page/">
                                            How to Select WordPress Default Posts Page
                                        </a>
                                        <ExternalLinkIcon />
                                    </div>
                                    <hr className="boreder border-white/10" />
                                </div>
                            </div>
                            <div className="pt-2 space-y-5 md:pt-4">
                                <div className="space-y-[10px]">
                                    <h1 className="text-xl font-bold text-white font-jakarta">
                                        If you can't find where your posts are going:
                                    </h1>
                                    <p className="font-jakarta text-base font-normal text-white/70 lg:max-w-[70%]">
                                        You should already have a page the posts are going to automatically, you just need to find it. However this will depend on however the developers of your website configured your system.
                                    </p>
                                </div>
                                <div>
                                    <ol className="text-sm font-normal text-white/70 md:text-base font-jakarta">
                                        <li>
                                            1.<span className="ps-1" />Find it. WP-Admin &gt; Pages &gt; Posts Page.
                                        </li>
                                        <li>
                                            2. Click that page in backend to see the URL it goes to.

                                        </li>
                                        <li className="lg:max-w-[70%]">
                                            3.<span className="ps-1" />  Add that URL to the website's menu if you want to display them, which will be custom for your site. If you need help you will need a developer. Note that without displaying them on the main menu, they are still going on your website and will count for SEO.
                                        </li>
                                    </ol>
                                </div>
                                <div className="">
                                    <img src="/images/url-instrusctions-integrate-api.png" className="w-auto h-auto object-contain object-center md:w-[633px]" />
                                </div>
                                <div className="">
                                    <img src="/images/url-location-instructions-integrate.png" className="w-auto h-auto object-contain object-center md:w-[635px]" />
                                </div>
                            </div>

                        </div>

                        <div className="pt-6 space-y-4">
                            <h1 className="text-base font-jakarta font-bold text-white md:text-[32px]">
                                List the industry
                            </h1>
                            <div className="border rounded-xl border-white/10">
                                <pre className="px-5 py-4 overflow-x-auto text-xs font-semibold text-white/70 md:text-sm font-jakarta">
                                    <code>
                                        Method : GET
                                        <br /><br />
                                        Parameters :
                                        <br /><br />
                                        list : industry
                                        <br /><br />
                                        Endpoint :
                                        <br /><br />
                                        https://seo.zian.ai/api?list=industry
                                        <br /><br />
                                        Result :
                                        <JSONPretty className="pl-10" id="json-pretty" data={
                                            {
                                                "industry": [
                                                    {
                                                        "id": 1,
                                                        "name": "Bitcoin"
                                                    },
                                                    {
                                                        "id": 2,
                                                        "name": "Fitness"
                                                    }
                                                ],
                                                "status": true
                                            }
                                        }>
                                        </JSONPretty>
                                    </code>
                                </pre>
                            </div>
                        </div>
                        <div className="space-y-4">
                            <h1 className="text-base font-jakarta font-bold text-white md:text-[32px]">
                                Update the keyword
                            </h1>
                            <div className="border rounded-xl border-white/10">
                                <pre className="px-5 py-4 overflow-x-auto text-xs font-semibold text-white/70 md:text-sm font-jakarta">
                                    <code>
                                        Method : POST
                                        <br /><br />
                                        Parameters :
                                        <br /><br />
                                        industry_id : int
                                        <br /><br />
                                        keyword : str
                                        <br /><br />
                                        Endpoint :
                                        <br /><br />
                                        https://seo.zian.ai/api
                                        <br /><br />
                                        Result :
                                        <JSONPretty className="pl-10" id="json-pretty" data={
                                            {
                                                "data": {
                                                    "industry_id": "3",
                                                    "keyword": "Business valuations Sydney, business valuations Brisbane, accountants Sydney"
                                                },
                                                "status": true
                                            }
                                        }>
                                        </JSONPretty>
                                        {

                                        }
                                    </code>
                                </pre>

                            </div>
                        </div>
                        <div className="space-y-4">
                            <h1 className="text-base font-jakarta font-bold text-white md:text-[32px]">
                                List the article
                            </h1>
                            <div className="border rounded-xl border-white/10">
                                <pre className="px-5 py-4 overflow-x-auto text-xs font-semibold text-white/70 md:text-sm font-jakarta">
                                    <code>
                                        Method : GET
                                        <br /><br />
                                        Parameters :
                                        <br /><br />
                                        limit : optional : default = 1 : example : https://seo.zian.ai/api?limit=5
                                        <br /><br />
                                        Endpoint :
                                        <br /><br />
                                        https://seo.zian.ai/api
                                        <br /><br />
                                        Result :
                                        <JSONPretty className="pl-10" id="json-pretty" data={
                                            {
                                                "articles": [
                                                    {
                                                        "article": `As India continues to experience extreme weather conditions, with temperatures soaring and heat waves showing no sign of abating, the harsh summer sun can take its toll on the eyes if left unprotected.According to the World Health Organisation, approximately 2.2,  billion people are affected by near or distance vision impairment, with around half of these cases potentially preventable with simple protective measures.In order to help protect the eyes during the summer months, Dr. Rishi Raj Borah, Country Director - India at Orbis has offered some advice.`,
                                                        "headline": "Protect Your Vision from Scorching Heat this Summer",
                                                        "id": 13,
                                                        "image": "image",
                                                        "summary": "With the summer heatwaves in India causing temperatures to soar, it is important to take precautions to protect your eyes from the harmful UV rays. Dr. Rishi Raj Borah, Country Director - India, Orbis, recommends taking simple yet effective measures such as using eye drops, wearing UV-protected sunglasses and other protective gear to keep your eyes healthy and happy all summer long. These best practices can help reduce the existing burden of global eye diseases, which affects 2.2 billion people worldwide, and prevent further vision impairment.",
                                                        "timestamp": "Fri, 19 May 2023 06:41:29 GMT"
                                                    }
                                                ],
                                                "status": true
                                            }
                                        }>
                                        </JSONPretty>

                                    </code>
                                </pre>
                            </div>
                        </div>
                    </div>

                </div>

            </GrBorderBox>
        </MainLayout >
    );
}








function VideoComponent() {


    return (
        <div className="">
            <div className="relative w-full md:w-[500px]">
                <iframe width={500} height={300} src="https://www.loom.com/embed/55bd2943e2b54559a85ae44695671b99?sid=a03a9b2a-754d-48cc-bb83-0f8b00e540e1" className="object-cover w-full h-auto overflow-hidden rounded-20 aspect-video"> </iframe>
            </div>
        </div>
    )
}


// function VideoComponent() {

//     const videoRef = useRef<HTMLVideoElement>(null);
//     const [showBtn, setShowBtn] = useState(false);


//     useEffect(() => {
//         videoRef.current?.addEventListener("play", function () {
//             if (!videoRef.current) return;
//             setShowBtn(!videoRef.current.paused)
//         })
//     }, [videoRef])


//     const onPlayVideoClicked = async () => {
//         if (!videoRef.current) return;
//         await videoRef.current.play()
//         videoRef.current.controls = true;
//     }

//     return (
//         <div className="">
//             <div className="relative w-full md:w-[500px]">
//                 <video ref={videoRef} src="/videos/test_video.mp4" width={500} height={300} className="object-cover w-full h-auto overflow-hidden rounded-20 aspect-video" />
//                 <button onClick={onPlayVideoClicked} className={cn(
//                     "aspect-square px-4 bg-transparent/60 flex items-center justify-center border rounded-full",
//                     "absolute top-1/2 right-1/2 -translate-y-1/2 translate-x-1/2",
//                     showBtn && "hidden"
//                 )}>
//                     <FontAwesomeIcon className="text-lg text-white " icon={faPlay} />
//                 </button>
//             </div>
//         </div>
//     )}


